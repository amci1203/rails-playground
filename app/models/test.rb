class Test < ApplicationRecord
  validates :name, uniqueness: true
end
