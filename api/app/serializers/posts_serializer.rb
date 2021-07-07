class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :user_id, route: {}
end