class Api::ScoresController < ApplicationController

  def index
    @scores = Score.all.order(score: :desc)
    render :scores
  end

  def create
    @score = Score.new(score_params)

    if @score.save
      render :new_score
    else
      render json: @score.errors.full_messages, status: 422
    end
  end

  private
  def score_params
    params.require(:score).permit(:username, :score)
  end
end
