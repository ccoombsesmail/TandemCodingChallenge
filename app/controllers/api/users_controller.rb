
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
        errors = @user.errors.full_messages
        if errors.length == 2
          errors = { usernameError: errors[0], passwordError: errors[1] }
        else
          errors = { passwordError: errors[0] }
        end
        
        render json: errors, status: 422
    end

    end


    private
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
