class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :user_id, :image, :route, :prefecture
end