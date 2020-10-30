class Score < ApplicationRecord
  validates :username, :score, presence: true
  
end
