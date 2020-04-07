(function(){
	var htmlItem = '<a class="tabbar-item $key" href="../$key/$key.html">'+
						'$text'+
				   '</a>';
	function init(){
		var items = [{
			key:'menu',
			text:'点菜'
		},{
			key:'comment',
			text:'评价'
		},{
			key:'shops',
			text:'商家'
		}];
		var html = '';
		items.forEach(function(item, index){
			html += htmlItem.replace(/\$key/g, item.key)
							.replace('$text', item.text);
		});
		$('.tabbar-container').append(html);

		//获取到当前页面的url值.有缺点，URL必须是以.html结尾
		var arr = window.location.pathname.split('/');
		var page = arr[arr.length-1].replace('.html', '');
		// 给当前页面设置active类
		$('a.'+page).addClass('active');
	}
	init();
})();