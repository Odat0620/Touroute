class User < ApplicationRecord
  # アソシエーション
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post

  # バリデーション
  validates :name,  presence: true, length: { maximum: 20 }
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: { case_sensitive: false }

  #  すでにいいねしているか
  def already_liked?(post)
    self.likes.exists?(post_id: post.id)
  end
end
