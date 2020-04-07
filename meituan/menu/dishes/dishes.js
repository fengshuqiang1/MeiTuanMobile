(function(){
	// 商品列表HTML
	var dishesHtml = '<div class="dishes-item">'+
					     '<img class="dishes-img" src="$img-src">'+
					     '<div class="dishes-detail">'+
					     	'<p class="dishes-title">$dishes_title</p>'+
					     	'<p class="dishes-description">$description</p>'+
					     	'<p class="dishes-praise">$dishes_praise</p>'+
					     	'<p class="dishes-price">￥$price/$unit</p>'+
					     	'<div class="dishes-operation">'+
					     		'<span class="dishes-minus"></span>'+
					     		'<span class="chooseCount">$chooseCount</span>'+
					     		'<span class="dishes-plus"></span>'+
					     	'</div>'+
					     '</div>'+   
					 '</div>';
	// 渲染商品列表
	function initDishesList(dataList){
		var dishesList = $('.dishes-list');
		dishesList.html('');//清空以前给dishesList渲染的HTML结构
		// 将dishes-item的HTML结构循环渲染到dishes-list的标签中
		dataList.forEach(function(item,index){
			if (!item.chooseCount) {
				item.chooseCount = 0;
			}
			var html = dishesHtml.replace('$img-src', item.picture)
								 .replace('$dishes_title', item.name)
								 .replace('$description', item.description)
								 .replace('$dishes_praise', item.praise_content)
								 .replace('$price', item.min_price)
								 .replace('$unit', item.unit)
								 .replace('$chooseCount', item.chooseCount);
			//将html结构字符串转换为jQuery对象，然后将数据保存在dishes-item中
			var $target = $(html);
			$target.data('itemData', item);
			dishesList.append($target);
		});
	}
	//修改渲染商品列表的标题
	function initDishesTitle(str){
		$('.dishes-typeTitle').text(str);
	}

	function addClick(){
		$('.dishes-item').on('click', '.dishes-plus', function(e){
			//获取商品数量的dom
			var $count = $(e.currentTarget).parent().find('.chooseCount');
			// 点击加号时商品数量加一
			$count.text(parseInt($count.text() || '0') + 1);
			// 获取dishes-item标签
			var $item = $(e.currentTarget).parents('.dishes-item').first();
			//修改保存在dishes-item标签的数据，防止切换后重新变回0
			$item.data('itemData').chooseCount += 1;
			//修改被选择菜品菜单的内容
			window.shopBar.renderItems();
		});
		$('.dishes-item').on('click', '.dishes-minus', function(e){
			//获取商品数量的dom
			var $count = $(e.currentTarget).parent().find('.chooseCount');
			if ($count.text() == 0) return console.log('不可能为负数的，你是傻逼吗？');
			// 点击减号时商品数量加一
			$count.text(parseInt($count.text() || '0') - 1);
			// 获取dishes-item标签
			var $item = $(e.currentTarget).parents('.dishes-item').first();
			//修改保存在dishes-item标签的数据，防止切换后重新变回0
			$item.data('itemData').chooseCount -= 1;
			//修改被选择菜品菜单的内容
			window.shopBar.renderItems();
		});
	}
	// 初始化
	function init(data){
		initDishesList(data.spus || []);
		initDishesTitle(data.name);
		addClick();
	}	

	window.dishes = {
		refresh:init
	}
})();