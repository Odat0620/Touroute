CarrierWave.configure do |config|
  if Rails.env.production?
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_public = false
    config.fog_directory  = ENV['FOG_DIRECTORY']
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'ap-northeast-1'
    }
  else
    config.asset_host = "http://localhost:3000"
    config.storage = :file
    config.cache_storage = :file
    config.delete_tmp_file_after_storage = true
  end
end