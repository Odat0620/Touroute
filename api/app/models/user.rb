class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  # アソシエーション
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_posts, through: :likes, source: :post

  has_many :relationships
  has_many :followings, through: :relationships, source: :follow
  has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id'
  has_many :followers,  through: :reverse_of_relationships, source: :user

  # バリデーション
  validates :name,  presence: true, length: { maximum: 20 }
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: { case_sensitive: false }

  # フォロー関係のメソッド
  def follow(other_user)
    unless self == other_user
      self.relationships.find_or_create_by(follow_id: other_user.id)
    end
  end

  def unfollow(other_user)
    relationship = self.relationships.find_or_create_by(follow_id: other_user.id)
    relationship.destroy if relationship
  end

  def following?(other_user)
    self.followings.include?(other_user)
  end


  #  すでにいいねしているか
  def already_liked?(post)
    self.likes.exists?(post_id: post.id)
  end
end
