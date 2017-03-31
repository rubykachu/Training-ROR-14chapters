$(document).ready(function(){
	var $content = $('.content');
	var item = [];

	// SETUP
	init();

	// PREPARE
	function init() {
		var i = 1;
		$.each(data, function(key, val){
			var html  = '<figure class="box-item" id="box-item-'+ (i++) +'">';
					html += '<div class="image">';
					html += '<img src="images/'+ key +'" alt="">';
					html += '<a href="#" class="buy-item"><i class="fa fa-shopping-basket"></i></a>';
					html += '</div>';
					html += '<figcaption>';
					html += '<p class="title"><a href="">'+ val.title +'</a></p>';
					html += '<p class="price">Giá tour: <span class="color-price"><label>'+ val.price +'</label> VNĐ</span></p>';
					html += '</figcaption>';
					html += '</figure>';
					item.push(html)
		});
		$content.html(item);
	}
});
