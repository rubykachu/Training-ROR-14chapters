class Category < ActiveRecord::Migration[5.0]
  def self.up
  	create_table :category do |t|
  		t.column :title, :string, :null => false
  		t.column :description, :text, :null => true
  		t.column :status, :boolean
  	end
  end

  def self.down
  	drop_table :category
  end
end
