require 'rails_helper'

RSpec.describe Post, type: :model do
  before do
    @post = FactoryBot.build(:post)
  end

  describe "投稿の保存" do
    context "投稿が保存できる場合" do
      it "全てのフォームに入力されていれば投稿可能である" do
        expect(@post).to be_valid
      end
      it "本文が空でも保存できる" do
        @post.text = ""
        expect(@post).to be_valid
      end
    end

    context "投稿できない場合" do
      it "user_idがnilの場合保存できない" do
        @post.user = nil
        @post.valid?
        expect(@post.errors[:user]).to include("を入力してください")
      end
      it "タイトルがnilの場合保存できない" do
        @post.title = nil
        @post.valid?
        expect(@post.errors[:title]).to include("を入力してください")
      end
      it "タイトルが21文字以上の場合保存できない" do
        @post.title = Faker::Lorem.characters(number: 21)
        @post.valid?
        expect(@post.errors[:title]).to include("は20文字以内で入力してください")
      end
    end
  end
end
