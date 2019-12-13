/*
* @Author: ll
* @Date:   2019-12-11 12:52:56
* @Last Modified by:   ll
* @Last Modified time: 2019-12-13 16:35:34
*/
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			console.log(cur);
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

var botton = document.getElementById("botton");
var picBox = document.getElementById("picBox");
var num = 1;
var moving = true;
var changeNext = function(){
	if(!moving){
		return;
	}
	moving = false;
	num += 1;
	liColor();
	animate(picBox,{left:(-1200 * num)}, function(){
		if(num == 6){
			num = 1;
			picBox.style.left = "-1200px";
		}	
			moving = true;
	});
}

var rotationChart = setInterval(changeNext, 3000);
//鼠标划入图片范围，清除定时执行
botton.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(rotationChart);
}
//鼠标画出图片范围，继续定时执行
botton.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	rotationChart = setInterval(changeNext, 3000);
}

var left = document.getElementById("left");
var right = document.getElementById("right");

var changePrevious = function(){
	if(!moving){
		return;
	}
	moving = false;
	num -= 1;
	liColor();
	animate(picBox,{left:(-1200 * num)}, function(){
		if(num == 0){
			num = 5;
			picBox.style.left = "-6000px";
		}
		moving = true;
	});
}

left.onclick = changePrevious;
right.onclick = changeNext;

var tag = document.getElementById("tag");
var liList = tag.children;
for (var i = 0; i < liList.length; i++){
	liList[i].nowNum = i;
	liList[i].onclick = function(){
		num = this.nowNum + 1;
		liColor();
		animate(picBox,{left:(-1200 * num)});
	}
}

function liColor(){
	for (var i = 0; i < liList.length; i++){
		liList[i].className = "";
	}
	if(num ==6){
		liList[0].className = "select";
	}
	else if(num == 0){
		liList[4].className = "select";
	}
	else{
		liList[num-1].className = "select";
	}	
}