class User < ApplicationRecord
  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password
  after_initialize :ensure_session_token


  def self.find_by_credentials(username, password) 
    queryResult = []
    user = User.find_by(username: username)
    
    return [nil, {usernameError: "This Username Does Not Exist!"}] if user.nil?
    queryResult.push(user)
    user.verify_password(password) ? queryResult : [nil, { passwordError: "That password was incorrect. Please try again."}]
    end


  def verify_password(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end



  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end


  def reset_session_token!
    self.session_token = SecureRandom.base64(64)
    self.save
    self.session_token
  end


  private

  def ensure_session_token
    self.session_token ||= SecureRandom.base64(64)
  end

end
