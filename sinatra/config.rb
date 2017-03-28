require 'sinatra'
Tilt.register Tilt::ERBTemplate, 'html.erb'
class MyApp < Sinatra::Base
	LOG_FILE = "log.txt"
	def self.run!
		super
		if !File.exists?(LOG_FILE)
			File.open(LOG_FILE, 'w') do |file|
				file.puts "Time/Title/Content"
			end
		end
	end

	get '/' do
		erb:index
	end

	post '/' do
		@title   = params[:title]
		@content = params[:content]
		File.open(LOG_FILE, 'a') do |file|
			time    = Time.now
			file.puts "#{time}/#{@title}/#{@content}"

			@message = "Success!"
			erb:index
		end
	end
end

MyApp.run!
