FactoryBot.define do
  factory :user do
    name  { Faker::Name.last_name }
    email { Faker::Internet.email }
    uid   { Faker::Lorem.characters(number: 28) }
  end
end
