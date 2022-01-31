class RelationshipSerializer < ActiveModel::Serializer
  attributes :uid, :other_user_id
end