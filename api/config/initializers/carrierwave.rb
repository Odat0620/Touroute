CarrierWave.configure do |config|
  config.asset_host = "http://localhost:3000"
  config.storage = :file
  config.cache_storage = :file
  config.delete_tmp_file_after_storage = true
end