class Message < ApplicationRecord
  mount_uploader :image, ImageUploader

  belongs_to :user
  belongs_to :group

  validates :messages, presence: true, unless: :image?

end
