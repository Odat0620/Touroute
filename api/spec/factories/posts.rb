FactoryBot.define do
  factory :post do
    title { Faker::Lorem.word }
    text { Faker::Lorem.word }
    created_at { Faker::Time.between(from: DateTime.now - 1, to:DateTime.now) }
    association :user
  end
end
