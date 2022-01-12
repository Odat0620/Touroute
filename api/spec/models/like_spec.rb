require 'rails_helper'

RSpec.describe Like, type: :model do

  describe "likeモデルのバリデーション" do 
    context "いいねできる場合" do
      it "user_idとpost_idがあれば保存できる" do
        expect(FactoryBot.create(:like)).to be_valid
      end
      it "同じユーザーでも投稿が違うと保存できる" do
        like = create(:like)
        expect(FactoryBot.create(:like, user_id: like.user_id)).to be_valid
      end
      it "同じ投稿でもユーザーが違うと保存できる" do
        like = create(:like)
        expect(FactoryBot.create(:like, post_id: like.post_id)).to be_valid
      end
    end

    context "いいねできない場合" do
      it "ログインしていなければ無効" do
        like = build(:like, user_id: nil)
        like.valid?
        expect(like.errors[:user]).to include("を入力してください")
      end
      it "投稿がなければ無効" do
        like = build(:like, post_id: nil)
        like.valid?
        expect(like.errors[:post]).to include("を入力してください")
      end
      it "user_idとpost_idは一意でなければ保存できない" do
        like = create(:like)
        like2 = build(:like, user_id: like.user_id, post_id: like.post_id)
        like2.valid?
        expect(like2.errors[:post_id]).to include("はすでに存在します")
      end
    end
  end

  describe "アソシエーション" do
    let(:association) do
      described_class.reflect_on_association(target)
    end

    context "postモデルとの関係" do
      let(:target) { :post }
      it "postが1に対して、likeは多" do
        expect(association.macro).to eq :belongs_to
      end
    end

    context "userモデルとの関係" do
      let(:target) { :user }
      it "userが1に対して、likeは多" do
        expect(association.macro).to eq :belongs_to
      end
    end
  end
end