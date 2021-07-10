class User < ApplicationRecord
  # アソシエーション
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  # バリデーション
  validates :name,  presence: true, length: { maximum: 20 }
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: true
end
