(function(){
	var topItemHtml = '<div class="cart-chooseContent hide">'+
						  '<div class="cart-top">'+
						      '<div class="cart-clear">清空购物车</div>'+
						  '</div>'+
					  '</div>';
	var bottomItemHtml = '<div class="cart-bottom">'+
						     '<div class="cart-dishesIcon">'+
						     	'<div class="cart-dishesNum hide"></div>'+
						     '</div>'+
						     '<div class="cart-price">'+
						     	'<p class="cart-totalPrice">￥<span class="cart-innerTotal bold">0</span></p>'+
						     	'<p class="cart-otherPrice">另需配送&nbsp;<span class="cart-shippingFee bold">0</span></p>'+
						     '</div>'+
						     	'<div class="cart-submitBtn">去结算</div>'+
						 '</div>';
	// 将这两个HTML结构的模板转换为jQuery对象，方便使用data()方法取得数据
	var $strBottom = $(bottomItemHtml),
		$strTop = $(topItemHtml);

	//根据选择的商品渲染购物车中HTML结构
	function renderItems(){
		$strTop.find('.cart-item').remove();
		var list = window.food_spu_tags;
		var cartItem = '<div class="cart-item">'+
					       '<p class="cart-itemName">$name</p>'+
					       '<p class="cart-itemPrice">￥<span class="cart-total">$price</span></p>'+
					       '<div class="cart-operation">'+
					     		'<span class="cart-minus"></span>'+
					     		'<span class="cart-chooseCount">$chooseCount</span>'+
					     		'<span class="cart-plus"></span>'+
					     	'</div>'+
					   '</div>';
		var totalPrice = 0;
		list.forEach(function(item){
			item.spus.forEach(function(_item){
				//如果菜品被选择的数量大于零，就渲染该数据
				if (_item.chooseCount>0) {
					//计算每个菜品的总价
					var _totalPrice = _item.min_price*_item.chooseCount;
					var row = cartItem.replace('$name', _item.name)
									  .replace('$price', _totalPrice)
									  .replace('$chooseCount', _item.chooseCount);
				    //计算所有菜品的总价
					totalPrice += _totalPrice;
					var $row = $(row);
					$row.data('itemData', _item);
					$strTop.append($row);
				};
			});
			//改变购物车总价
			changeTotalPrice(totalPrice);
			//改变红点中数量
			changeRedDot();
		});			   	
	}
	//改变购物车bottom的配送价格
	function changeShoppingPrice(str){
		$strBottom.find('.cart-shippingFee').text(str);
	}
	//改变购物车底部的总价
	function changeTotalPrice(str){
		$strBottom.find('.cart-innerTotal').text(str)
	}
	//给购物车中的加减按钮添加事件，控制数量，并与商品界面联动
	function addClick(){
		$strTop.on('click', '.cart-plus', function(e){
			//获取显示当前商品数量的dom
			var $count = $(e.currentTarget).parent().find('.cart-chooseCount');
			// 点击加号时当前商品数量+1
			$count.text(parseInt($count.text() || '0') + 1);

			// 修改挂载到cart-item中的数据
			// 获取cart-item标签。parents返回的是数组
			var $item = $(e.currentTarget).parents('.cart-item').first();
			//修改保存在cart-item标签的数据
			$item.data('itemData').chooseCount += 1;
			//修改被选择菜品菜单的内容进行渲染
			renderItems();
			//找到当前右侧详情的数据，进行联动。触发点击事件
			$('.sidebar-item.active').click();
		});
		$strTop.on('click', '.cart-minus', function(e){
			//获取显示当前商品数量的dom
			var $count = $(e.currentTarget).parent().find('.cart-chooseCount');
			//当商品数量为0时，不能在进行减少
			if($count.text() == 0) return;
			// 点击加号时当前商品数量-1
			$count.text(parseInt($count.text() || '0') - 1);

			// 修改挂载到cart-item中的数据
			// 获取cart-item标签。parents返回的是数组
			var $item = $(e.currentTarget).parents('.cart-item').first();
			//修改保存在cart-item标签的数据
			$item.data('itemData').chooseCount -= 1;
			//修改被选择菜品菜单的内容进行渲染
			renderItems();
			//找到当前右侧详情的数据，进行联动.触发点击事件
			$('.sidebar-item.active').click();
		});
		// 给购物车图标绑定事件控制已选商品的显示和隐藏
		$('.cart-dishesIcon').on('click', function(e){
			$('.cart-cover').toggle();
			$('.cart-chooseContent').toggle();
		});
		//清空购物车
		$('.cart-clear').on('click', function(e){
			// 修改挂载到cart-item中的数据
			// 获取所有的cart-item标签(被选中的商品)。
			var $item = $strTop.find('.cart-item');
			//循环将所有标签的chooseCount数据修改为零
			for(var i=0; i < $item.length; i++){
				console.log($item[i]);
				//修改保存在cart-item标签的数据
				$($item[i]).data('itemData').chooseCount = 0;
			}
			//修改数据之后，重新渲染
			renderItems();
			//重新联动页面
			$('.sidebar-item.active').click();
		});
	} 
	function changeRedDot(){
		var $count = $strTop.find('.cart-chooseCount');
		var totalNum = 0;
		for(var i = 0; i < $count.length; i++){
			totalNum += parseInt($($count[i]).text());
		}
		if (totalNum>0) {
			$strBottom.find('.cart-dishesNum').text(totalNum).show();
		}else{
			$strBottom.find('.cart-dishesNum').hide();
		}
	}
	//初始化
	function init(){
		//将bottom的内容渲染到HTML中
		$('.cart-container').append($strTop);
		$('.cart-container').append($strBottom);
		addClick();
	}

	init();

	window.shopBar = {
		renderItems: renderItems,
		changeShoppingPrice: changeShoppingPrice
	}
})();