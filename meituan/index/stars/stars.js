(function(){

	function Stars(score){
		this.score = score || '';
		this.getStars = this._getStars;
	}
	//获取各种星星的数量并生成HTML结构
	Stars.prototype._getStars = function(){
		//以得分4.7为例，将其拆分为数组
		var numArr = this.score.toString().split('.');
		//获取满星、半星、零星的数量
		var fullStar = parseInt(numArr[0]),
			halfStar = parseInt(numArr[1]) >= 5? 1 : 0,
			noneStar = 5 - fullStar - halfStar,
			html = '';
		//生成HTML结构
		for(var i=0; i<fullStar; i++){
			html += '<img class="shops-stars-img" src="$fullStar_url">';
		}
		if (halfStar !=0 ) {
			for(var j=0; j<halfStar; j++){
				html += '<img class="shops-stars-img" src="$halfStar_url">';
			}
		}
		if (noneStar != 0) {
			for(var k=0; k<noneStar; k++){
				html += '<img class="shops-stars-img" src="$noneStar_url">';
			}
		}
		html = html.replace(/(\$fullStar_url)/g, "stars/img/fullstar.png")
				   .replace(/(\$halfStar_url)/g, "stars/img/halfstar.png")
				   .replace(/(\$noneStar_url)/g, "stars/img/gray-star.png");
		return html;
	};

	window.Stars = Stars;
})();