class Comment < ApplicationRecord
  # アソシエーション
  belongs_to :post
  belongs_to :user

  # バリデーション
  validates :text, presence: true, length: { maximum: 150 }
end
