# DB Design
## users_table
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|password|string|null: false|
|username|string|null: false, index: true|
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups

## groups_table
|Column|Type|Options|
|------|----|-------|
|group|string|null: false|
### Association
- has_many :messages

## groups_users_table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messages_table
|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## images_table
|Column|Type|Options|
|------|----|-------|
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
