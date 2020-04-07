(function(){
	var htmlItem = '<a class="bottomBar-item $key" href="../$key/$key.html">'+
						'<div class="bottomBar-icon"></div>'+
						'<p class="bottomBar-title">$text</p>'+
				   '</a>';
	function init(){
		var items = [{
			key:'index',
			text:'首页'
		},{
			key:'order',
			text:'订单'
		},{
			key:'my',
			text:'我的'
		}];
		var html = '';
		items.forEach(function(item, index){
			html += htmlItem.replace(/\$key/g, item.key)
							.replace('$text', item.text);
		});
		$('.bottomBar-container').append(html);

		//获取到当前页面的url值.有缺点，URL必须是以.html结尾
		var arr = window.location.pathname.split('/');
		var page = arr[arr.length-1].replace('.html', '');
		// 给当前页面设置active类
		$('a.'+page).addClass('active');
	}
	init();
})();