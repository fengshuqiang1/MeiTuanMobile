(function(){
	//商家的模板字符串
	var htmlItem = '<div class="shops-item">'+
						'<img class="shops-img" src="$pic_url">'+
						'$brand'+
						'<div class="shops-info">'+
							'<p class="shops-title">$name</p>'+
							'<div class="shops-detail clearfix">'+
								'<div class="shops-stars">$stars</div>'+
								'<span class="shops-sales">月售$monthNum</span>'+
								'<span class="shops-distance">|&nbsp;$distance</span>'+
								'<span class="shops-time">$time&nbsp;</span>'+
							'</div>'+
							'<p class="shops-price">$min_price_tip</p>'+
							'<div class="shops-promotion">$others</div>'+
						'</div>'+
				   '</div>';
	var page = 0,//加载的次数
		isloading = false,//加载的状态
		preNum = 0,//用于加载数据时，跳过已经加载的内容
		loadingNum = 0;//规定加载到第几个商家
	//获取ShopsList的HTML结构数据
	function getShopsList(){
		page++;
		isloading = true;
		$.get('../json/homelist.json', function(data){
			console.log(data);
			var shopsList = data.data.poilist || [];//防止报错
			initShopsList(shopsList);
			isloading = false;
		});
	}
	//获取商家的标签——品牌、新到等
	function getBrand(data){
		if (data.brand_type) {
			return '<div class="shops-tag shops-brand">品牌</div>';
		}else{
			return '<div class="shops-tag shops-newShop">新到</div>';
		}
	}
	//处理月售的表现形式
	function getMonthNum(data){
		if (data.month_sale_num > 999) {
			return '999+';
		}else{
			return data.month_sale_num;
		}
	}
	//渲染商家活动
	function getPromotion(data){
		var promotionArr = data.discounts2,//商家活动数据，数组
			html = '';//用于保存HTML结构
		if (promotionArr.length != 0) {
			for(var i=0,num = promotionArr.length; i<num; i++){
				html += '<div class="shops-promotion-item">'+
							'<img class="shops-promotion-img" src="'+ promotionArr[i].icon_url+'">'+
							'<span class="shops-promotion-text one-line">'+promotionArr[i].info+'</span>'+
						'</div>';
			}
			return html;
		}
		return '';
	}
	//渲染商家数据列表
	function initShopsList(shopsList){
		var shopsListContainer = $('.shops-list');
		loadingNum += 6;
		try{
			shopsList.forEach(function(item, index){
				var str = htmlItem
						  .replace('$pic_url', item.pic_url)
						  .replace('$name', item.name)
						  .replace('$distance', item.distance)
						  .replace('$time', item.mt_delivery_time)
						  .replace('$min_price_tip', item.min_price_tip)

						  .replace('$brand', getBrand(item))
						  .replace('$monthNum', getMonthNum(item))
						  .replace('$others', getPromotion(item))
						  .replace('$stars', new Stars(item.wm_poi_score).getStars());
				if (index === loadingNum) {
					preNum = loadingNum;
					throw new Error("end");
				}
				if (index >= preNum) {
					shopsListContainer.append(str);
				}
			});
		}catch(e){
			if (e.message!="end") throw e;
		}
	}
	//给window绑定scroll事件实现滚动加载
	window.addEventListener('scroll', function(){
		var scrollHeight = document.body.scrollHeight,
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			clientHeight = document.documentElement.clientHeight;

		var preset = 30;//预先加载的距离值
		if ((scrollTop+clientHeight) >= (scrollHeight - preset)) {
			if(isloading === false){
				if(page<3){
					getShopsList();
				}else{
					$('.shops-loading').text('加载完成');
				}
			}
		}
	}, false);
	//初始化
	function init(){
		getShopsList();
	}
	init();
})();