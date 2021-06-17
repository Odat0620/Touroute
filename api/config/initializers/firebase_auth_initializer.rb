FirebaseIdToken.configure do |config|
  config.redis = Redis.new
  config.project_ids = ['auth-56079']
end