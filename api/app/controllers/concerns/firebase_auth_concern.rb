require "jwt"
require "yaml"
require "net/http"

module FirebaseAuthConcern
  extend ActiveSupport::Concern
  include ActionController::HttpAuthentication::Token::ControllerMethods # フロントからのトークンをRailsで受け取れるようにするための機能を追加（Rails標準搭載）

  # 大まかな流れ
  # 1. JWTをデコードする
  # 2. トークン情報のフォーマットをチェックする
  # 3. トークンが正しい秘密鍵から作られているか確認する


  # ymlファイルに書いたfirebaseの設定項目などを読み込む
  CONFIG = YAML.load_file(Rails.root.join("config/firebase_config.yml"))

  # `~~~.freeze`とつけることでその値を容易に変更不可の定数化させることができる
  ALGORITHM = "RS256".freeze
  ISSUER_BASE_URL = "https://securetoken.google.com/".freeze
  CLIENT_CERT_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com".freeze



  # Firebaseから受け取ったトークンを検証してデコード後のユーザーデータを返すメソッド
  def authenticate_token_by_firebase
    # `Authorization: Token ${token}` or `Bearer ${token}` がない場合、これら一連の処理はスキップされる
    # `authenticate_with_http_token`でフロント側から送られてきたトークンを受け取る（ 「authorization: Bearer トークン」 のところのやつ ）
    authenticate_with_http_token do |token, _|
      return { data: verify_id_token(token) } # 最終的に { data: { uid: ~~~, decoded_token: { header: ~~~, payload: ~~~ } } } のような形で返却される
    rescue StandardError => e # トークンに不備がある場合は例外処理でエラーを返す
      return { error: e.message }
    end
    { error: "トークンが無効です" }
  end



  private

  # 送られてきたトークンを確認して諸々の検証をした後、デコード後の uid と、トークンそのものを返す処理
  def verify_id_token(token)
    # 引数として受け取ったトークンが文字列以外であった場合は、強制的に例外処理を発生させて処理を中断する
    raise "IDトークンは文字列型でなければなりません" unless token.is_a?(String)


    puts "--------------- IDトークン 検証開始 ---------------" # 削除予定
    puts "IDトークンを受け取りました" # 削除予定


    puts "1回目の デコード（decode_jwtメソッド） 開始" # 削除予定
    # デコードしたJWTトークンを変数に格納
    full_decoded_token = decode_jwt(token)
    puts "1回目の デコード（decode_jwtメソッド） 終了" # 削除予定


    puts "フォーマットチェック 開始" # 削除予定
    # デコードしたJWTトークンを Firebase からの認証トークンとしてのフォーマットに沿っているかをチェックする（エラーがあればエラーが入った配列が返ってくる。エラーなければ空配列）
    errors = validate(full_decoded_token)
    raise errors.join(' / ') if errors.present? # errors の中に一つでもエラーが入っていれば、そこで例外処理を発動させる。joinメソッドは、配列の中の要素に引数の文字を足して返却するメソッド
    puts "フォーマットチェック 終了" # 削除予定


    puts "公開鍵の取得 開始" # 削除予定
    # Google側から公開鍵の取得
    public_key = fetch_public_keys[full_decoded_token[:header]['kid']] # 原理はよくわからないけど、2つの公開鍵を取得した後、ここで "kid" に一致する方の公開鍵を public_key に代入している
    # 公開鍵がなければエラーメッセージを返す。 <<-EOS ~ EOSはヒアドキュメントと言って、その間の文字を文字列として改行を含めて認識してくれるらしい。まとまった文字列を記載するのに便利みたい。.squishは改行とかを無視するメソッド（意味は「潰す」）
    unless public_key
      raise <<-EOS.squish
        Firebase ID token has "kid" claim which does not correspond to a known public key.
        Most likely the ID token is expired, so get a fresh token from your client app and try again.
      EOS
    end
    puts "公開鍵の取得 終了" # 削除予定


    puts "証明書の発行 開始" # 削除予定
    # 取得した公開鍵を用いて証明書の作成を行う（Googleの公開鍵はX.509で作成されているので、それに沿う形で証明書を作成）
    certificate = OpenSSL::X509::Certificate.new(public_key)
    puts "証明書の発行 終了" # 削除予定


    puts "2回目の デコード（decode_jwtメソッド） 開始（最悪この下の verify_iat を false にすれば`iat`の問題は対応可）" # 削除予定
    # 作成した証明書を使って再度JWTトークンのデコードを実行する
    decoded_token = decode_jwt(token, true, { algorithm: ALGORITHM, verify_iat: true }, certificate.public_key)
    puts "2回目の デコード（decode_jwtメソッド） 終了" # 削除予定


    puts "↓ 証明書で確認後のデコードされたトークン" # 削除予定
    puts decoded_token

    puts "--------------- IDトークン 検証終了 ---------------" # 削除予定


    # 最後に証明書等で諸々の確認が済んだデコード後のJWTトークンを返す。この時 uid キーで subクレーム の値を設定しておく
    {
      uid: decoded_token[:payload]['sub'],
      decoded_token: decoded_token
    }
  end



  # 受け取ったJWTトークンをデコードする
  def decode_jwt(token, verify = false, options = {}, key = nil)
    begin # begin ~ rescue ~ end で例外処理
      # `ruby-jwt`の decodeメソッド でデコード
      decoded_token = JWT.decode(token, key, verify, options)
    rescue JWT::ExpiredSignature => e
      raise "FirebaseのIDトークンの有効期限が切れています。クライアント側で新しいトークンを取得して、再度試してみてください。"
    rescue StandardError => e
      raise "Firebase IDトークンの署名が無効な署名です。  #{e.message}"
    end

    # デコードされたJWTの、ペイロードの情報を payload に設定し、ヘッダーの情報を header に設定して返す
    {
      payload: decoded_token[0],
      header: decoded_token[1]
    }
  end



  # Googleが用意した鍵からトークンが生成されているかどうかを確認する（ RailsからHTTPリクエストを送ってデータ（ここでは公開鍵の情報）を取得する ）
  def fetch_public_keys
    uri = URI.parse(CLIENT_CERT_URL) # URIライブラリのparseメソッドで、引数に指定したURI(URL)のドメインなどを簡単にとりだすことが出来るようになる。URIクラスのインスタンスを作成
    https = Net::HTTP.new(uri.host, uri.port) # よくわからないけどNet::HTTPオブジェクトを返してくれてる。引数はURIクラスのインスタンスしか受け付けない
    https.use_ssl = true # #ssl(https)を利用する場合はtrueにする。 ここで`HTTPS通信`の設定をしている

    res = https.start { https.get(uri.request_uri) } # 実際にGoogle側にリクエストを投げて公開鍵の情報を取得する
    data = JSON.parse(res.body) # 受け取ったJSONデータをハッシュ（JSで言うオブジェクト）に変換する。JSON.parse()メソッドは、JSON形式の文字列をRubyのハッシュ形式に変換するためのメソッド

    # エラーなどなくちゃんと公開鍵を取得できたならそのデータをそのまま返却（この時点では複数の公開鍵をそのまま返却している。2つの公開鍵）
    return data unless data['error']

    # エラーがあった場合はエラーメッセージを返却して例外処理を発生させる
    msg = "Error fetching public keys for Google certs: #{data['error']} (#{res['error_description']})"
    raise msg
  end



  # デコード後のトークンの中身がFirebaseの認証トークンとして正しいフォーマットになっているかをチェックする
  def validate(json)
    errors = [] # トークンの中にフォーマットに沿わない部分があった場合のエラーメッセージを全てここに格納する
    project_id = CONFIG["project_info"]["project_id"]
    payload = json[:payload]
    header = json[:header]
    issuer = ISSUER_BASE_URL + project_id

    # 以下でトークンの各情報をチェックし、フォーマットに沿っているか判定する

    # キーIDの存在を確認
    errors << 'Firebase ID token has no "kid" claim.' unless header["kid"]
    # 署名の作成アルゴリズムがRS256であることの確認
    unless header['alg'] == ALGORITHM
      errors << "Firebase ID token has incorrect algorithm. Expected '#{ALGORITHM}' but got '#{header['alg']}'"
    end
    # aud(audience)が自分のFirebaseのプロジェクトIDとなっていることを確認
    unless payload['aud'] == project_id
      errors << 'Firebase ID token has incorrect aud (audience) claim.' \
                "Expected'#{project_id}' but got '#{payload['aud']}'."
    end
    # 署名の発行者が https://securetoken.google.com/<aud> となっていることを確認
    unless payload['iss'] == issuer
      errors << "Firebase ID token has incorrect 'iss' (issuer) claim." \
                "Expected '#{issuer}' but got '#{payload['iss']}'."
    end
    # ペイロードに sub(Subject=Firebase uid) が文字列型で存在するかどうかを確認（ is_a(String)メソッドは、その値が引数に指定した型かどうか（ここでは文字列型かどうか）を判定するメソッド ）
    errors << 'Firebase ID token has no "sub" (subject) claim.' unless payload['sub'].is_a?(String)
    # ペイロードの sub(Subject=Firebase uid) が空じゃないかどうかを確認
    errors << 'Firebase ID token has an empty string "sub" (subject) claim.' if payload['sub'].empty?
    # sub(Subject=Firebase uid)が1文字以上128文字以下の文字列であることを確認
    errors << 'Firebase ID token has "sub" (subject) claim longer than 128 characters.' if payload['sub'].size > 128


    # 最後にエラーを格納した配列を返す（確りとFirebaseの発行したJWTのフォーマットに沿っていればそのまま空配列を返すことになる）
    errors
  end
end