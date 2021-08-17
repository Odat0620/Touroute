class Post < ApplicationRecord
  # アソシエーション
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes,    dependent: :destroy
  has_many :liked_users, through: :likes, source: :user

  # バリデーション
  validates :title, presence: true, length: { maximum: 20 }

  def liked_by(user)
    likes.find{|l| l.user_id == user.id}
  end
end
