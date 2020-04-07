(function(){
	var sidebarHtml = '<div class="sidebar-item">'+
					      '<a class="sidebar-link" href="###">$getSidebarContent</a>'+
					  '</div>';
	// 请求数据
	function getSidebarList(){
		$.get('../json/food.json', function(data){
			console.log(data);
			window.food_spu_tags = data.data.food_spu_tags || [];
			initSidebarList(window.food_spu_tags);

			window.shopBar.changeShoppingPrice(data.data.poi_info.shipping_fee || 0);
		});
	}
	// 渲染sidebar数据到页面中
	function initSidebarList(sidebarList){
		var sidebarContainer = $('.sidebar-container');
		sidebarList.forEach(function(item,index){
			var html = sidebarHtml.replace('$getSidebarContent', getSidebarContent(item));
			// 将html标签字符串的数据挂载在sidebar-item上面(方便在渲染dishes.js商品列表时不用再次ajax请求)
			//将sidebarList中的每一项数据保存在每一项sidebar-item中，方便在渲染商品列表时从每一项的sidebar-item标签中获取json数据
			var $target = $(html);
			$target.data('itemData', item);

			sidebarContainer.append($target);
		});
		// 给第一个类为.sidebar-item的标签触发点击事件
		$('.sidebar-item').first().click();
	}
	// 处理渲染sidebar列表时是否有小图标
	function getSidebarContent(data){
		if (data.icon) {
			return '<img class="sidebar-icon" src="'+ data.icon +'">' + data.name;
		}else{
			return data.name;
		}
	}
	//给所有的sidebar-item绑定点击事件
	function addClick(){
		$('.sidebar-container').on('click', '.sidebar-item', function(e){
			var $target = $(e.currentTarget);
			$target.siblings().removeClass('active');
			$target.addClass('active');
			//将数据传给dishes列表(dishes.js)进行渲染
			window.dishes.refresh($target.data('itemData'));
		});
	}
	//初始化
	function init(){
		addClick();
		getSidebarList();
	}	

	init();
})();