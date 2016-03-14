class User < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:username]

  has_attached_file :avatar,
    default_url: "stats.jpg",
    styles: { 
      thumb: ["140x100#", :png],
      small: ["140x125#", :png]
    }
    
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  validates :username, :session_token, :password_digest, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :reviews
  has_many :courses, through: :reviews, source: :course

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)

    return user if user && user.is_password?(password)
    nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)

    return user if user
    
    User.create(
      provider: provider,
      uid: uid,
      username: auth_hash[:info][:name],
      password: SecureRandom::urlsafe_base64
    )
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password);
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64(16);
    self.save!
    self.session_token
  end



  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16);
  end

end
