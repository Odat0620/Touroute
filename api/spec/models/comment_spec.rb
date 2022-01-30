require 'rails_helper'

RSpec.describe Comment, type: :model do
  before do
    @comment = FactoryBot.build(:comment)
  end

  describe "コメントの保存" do
    context "コメントが保存できる場合" do
      it "本文が入力されていれば保存できる" do
        expect(@comment).to be_valid
      end
    end

    context "コメントが保存できない場合" do
     it "本文がnilの場合保存できない" do
       @comment.text = nil
       @comment.valid?
       expect(@comment.errors[:text]).to include("を入力してください")
     end
     it "本文が150文字以上の場合保存できない" do
       @comment.text = Faker::Lorem.characters(number: 151)
       @comment.valid?
       expect(@comment.errors[:text]).to include("は150文字以内で入力してください")
     end
     it "userがnilの場合保存できない" do
       @comment.user = nil
       @comment.valid?
       expect(@comment.errors[:user]).to include("を入力してください")
     end
     it "postがnilの場合保存できない" do
       @comment.post = nil
       @comment.valid?
       expect(@comment.errors[:post]).to include("を入力してください")
     end
    end
  end
end
