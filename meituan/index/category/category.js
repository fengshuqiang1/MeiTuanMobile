(function(){
	//类目的模板字符串
	var htmlItem = '<div class="category-item">'+
						'<a class="category-link" href="###">'+
							'<img class="category-img" src="$src"></img>'+
							'<p class="category-title">$name</p>'+
						'</a>'+
				   '</div>'
	//渲染category的HTML结构
	function initCategory(){
		$.get('../json/head.json', function(data){
			console.log(data);
			var arr = data.data.primary_filter.slice(0,8),
				categoryContainer = $('.category-container');
			arr.forEach(function(item, index){
				var str = htmlItem.replace('$src', item.url)
								  .replace('$name', item.name);	
				categoryContainer.append(str);
			});

		});
	}
	//给每一个categody-item绑定click事件
	function addclick(){
		$('.category-container').on('click', '.category-item', function(){
			alert(1);
		});
	}
	//初始化
	function init(){
		initCategory();
		addclick();
	}
	init();
})();