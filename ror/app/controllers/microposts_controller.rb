class MicropostsController < ApplicationController
	before_action :logged_in_user, only: [:create, :destroy]
	before_action :correct_micropost, only: :destroy
	def create
		# @micropost = current_user.microposts.build(micropost_params)
		@micropost = Micropost.build_current_user(micropost_params)
		if @micropost.save
			flash[:success] = "Micropost created !"
			redirect_to root_url
		else
  		@feed_items = current_user.feed.paginate(page: params[:page])
			render "static_pages/home"
		end
	end

	def destroy
		@micropost.destroy
		flash[:success] = "Micropost deleted"
		redirect_back(fallback_location: root_url)
		# redirect_to request.referrer || root_url
		# referrer: Chỉ dùng được khi submit form. Mục đích lấy đường dẫn trang trước đó
		# request.referrer: microposts appear on both the Home page and on the user’s profile page, so by using request.referrer we arrange to redirect back to the page issuing the delete request in both cases. 
	end

	private

		def micropost_params
			params.require(:micropost).permit(:content, :picture)
		end

		def correct_micropost
			@micropost = current_user.microposts.find_by(id: params[:id])
			redirect_to root_url if @micropost.nil?
		end
end
