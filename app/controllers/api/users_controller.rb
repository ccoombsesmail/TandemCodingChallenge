
class Api::UsersController < ApplicationController

  
  def index
    @users = User.all
    render :users
  end

  def create
    @user = User.new(user_params)
    if @user.save
        login!(@user)
        render :new_user
    else
        render json: @user.errors.full_messages, status: 422
    end

    end


    private
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
