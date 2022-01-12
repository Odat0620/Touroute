FactoryBot.define do
  factory :comment do
    text { Faker::Lorem.word }
    created_at { Faker::Time.between(from: DateTime.now - 1, to:DateTime.now) }
    association :user
    association :post
  end
end
