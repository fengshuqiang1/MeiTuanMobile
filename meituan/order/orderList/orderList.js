(function(){
	var htmlItem = '<div class="order-item">'+
						'<div class="order-item-top">'+
							'<img class="order-img" src="$pic_src">'+
							'<div class="order-info">'+
								'<div class="order-title clearfix">'+
									'<p class="order-name one-line">$name</p>'+
									'<p class="order-status">$status</p>'+
								'</div>'+
								'<div class="order-product">'+
									'$product'+
								'</div>'+
							'</div>'+ 
						'</div>'+
						'$getcomment'+
				   '</div>';
	var page = 0,
		isLoading = false;
	//获取订单列表数据
	function getOrderList(){
		page ++;
		isLoading = true;
		setTimeout(function(){
			$.get('../json/orders.json', function(data){
				console.log(data);
				var orderList = data.data.digestlist;
				initOrderList(orderList);
				isLoading = false;
			});
		}, 1000);
	}
	//渲染订单列表到页面中
	function initOrderList(orderList){
		var orderContainer = $('.order-container');
		orderList.forEach(function(item){
			var html = htmlItem.replace('$pic_src', item.poi_pic)
							   .replace('$name', item.poi_name)
							   .replace('$status', item.status_description)
							   .replace('$product', getProduct(item))
							   .replace('$getcomment', getComment(item));
			orderContainer.append(html);
		});
	}
	//获取订单具体商品的HTML结构字符串，用于与$product交换
	function getProduct(data){
		var productList = data.product_list || [];
		var html = '<p class="order-product-item">'+
						'<span class="order-product-name">$product_name</span>'+
						'<span class="order-product-num">x$product_num</span>'+
				   '</p>';
		var productNum = 0,
			htmlNow = "";
		productList.forEach(function(item,index){
			htmlNow += html.replace('$product_name', item.product_name)
				          .replace('$product_num', item.product_count);
			productNum += item.product_count;
		});
		
		var str = '<p class="order-product-total">总计<strong>'+productNum+'</strong>个菜，实付<strong>￥'+data.total+'</strong></p>';
		htmlNow += str;
		return htmlNow;
	}
	//检测是否需要评价
	function getComment(data){
		var comment = !data.is_comment;
		if (comment) {
			return '<div class="order-comment">'+
						'<a href="###" class="order-comment-link">评价</a>'+
					'</div>';
		}
		return '';
	}
	//给window绑定scroll事件实现滚动加载
	window.addEventListener('scroll', function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			scrollHeight = document.documentElement.scrollHeight,
			clientHeight = document.documentElement.clientHeight;
		var preLoading = 30;//预先加载距离
		if ((clientHeight+scrollTop) > (scrollHeight-preLoading)) {
			if (!isLoading) {
				if (page<3) {
					getOrderList();
				}else{
					$('.order-loading').text('加载完成');
				}
			}
		}
	}, false);
	function init(){
		getOrderList();
	}
	init();
})();