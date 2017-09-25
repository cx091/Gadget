// 大图轮播
$(function(){
			var currIndex = 0, // 当前显示图片索引
				nextIndex = 1, // 即将（下一张）显示图片索引
				$allImgs = $(".box li"), // 所需轮播的所有图片的盒子
				len = $allImgs.length, // 所有待轮播图片的张数
				timer = null; // 轮播切换时所使用计时器的 id

			// 添加小圆点
			for (var i = 0; i < len; i++) {
				$("<div></div>").appendTo(".pages");
			}
			// 为小圆点绑定点击事件(事件委派)
			$(".pages").on("click", "div", function(){
				//var next=nextIndex;
				// 获取点击的小圆点索引，也就是即将显示出来的图片索引
				
				if ($(this).index() === currIndex){
					//nextIndex=next;
					return;
				}
				nextIndex = $(this).index();

				// 切换
				move();
			}).children(":first").addClass("curr");
			// 默认第一个小圆点选中
			// $(".pages div").eq(0).trigger("click");
			// $(".pages div").eq(0).addClass("curr");

			// 上一页
			$(".prev").click(function() {
				nextIndex = currIndex - 1;
				if (nextIndex < 0)
					nextIndex = len - 1;
				move();
			});

			// 下一页
			$(".next").click(move);

			// 鼠标移入盒子停止轮播，移出继续轮播
			$("#container").hover(function(){
				clearInterval(timer);
			}, function(){
				timer = setInterval(move, 3000);
			}).trigger('mouseleave');

			$("#container").hover(function(){
				$(".prev").attr("display","none");
			}, function(){
				$(".prev").attr("display","block");
			});

			// 自动轮播切换
			// timer = setInterval(move, 3000);

			// 切换显示轮播图片
			function move(){
				$allImgs.eq(currIndex).fadeOut(); // 正显示的图片淡出
				$allImgs.eq(nextIndex).fadeIn(); // 下一张图片淡入

				// 小圆点样式切换
				$(".pages div").eq(currIndex).removeClass("curr");
				$(".pages div").eq(nextIndex).addClass("curr");

				// 修改索引
				currIndex = nextIndex;
				nextIndex++;
				if (nextIndex >= len)
					nextIndex = 0;
			};
			$(".container").
		});
//楼层导航
$(function(){
			var headerHeight=$(".top").height()+$(".middle").height()+$(".nav").height()+$("#banner").height()+$("#pointbuy").height()+$("#limitbuy").height();
			var winHeight=$(window).height();
			 var isScrolling=false;
			//滚动事件
			$(window).on("scroll",function(){
				if (!isScrolling) {
				//获取滚动距离
				var scTop=$(this).scrollTop();
				if (scTop>headerHeight-winHeight) {
					$("#navlc").show(1000);
				}
				else{
					//隐藏
					$("#navlc").hide(1000);
				}
				}
				//显示楼层
				$(".floorinner").each(function(index,element){
					//楼层与文档顶部的距离
					var _top=$(this).offset().top;
					if (scTop>_top-winHeight/2) {
						$("#navlc>li").addClass("currlc").eq(index).children("span").show().end()
						.siblings().removeClass("currlc").children("span").hide(); 
					}
				})
				

				
				});
				//鼠标滑过特效
				$("#navlc>li").hover(function(){
					$(this).children("span").show();
				},function(){
						$(this).not(".currlc").children("span").hide();
				}).on("click",function(){
					isScrolling=true;
					var index=$(this).index();//楼层索引
					var _top=$(".floorinner").eq(index).offset().top;//获取对应楼层滚动到的目标位置
					$(this).addClass("currlc").children("span").show().end()
						.siblings().removeClass("currlc").children("span").hide();
					$("html,body").animate({"scrollTop":_top},1000,function(){
							 var isScrolling=false;
					});

				})

		})
//放大镜
$(function(){ 
			var showboxWidth = $(".showbox").width(),
				showboxHeight = $(".showbox").height(),
				popWidth = $(".pop").width(),
				popHeight = $(".pop").height();

			$(".showbox").hover(function(){
				$(".pop,.big").show();
			}, function(){
				$(".pop,.big").hide();
			}).on("mousemove", function(event){
				// 计算出遮罩在整个文档中的绝对定位位置(即使光标在遮罩中心的位置)
				var _left = event.pageX - popWidth / 2,
					_top = event.pageY - popHeight / 2;
				$(".pop").offset({
					"top":_top,
					"left":_left
				});
				
				// 获取到遮罩相对 .showbox 的定位
				_left = $(".pop").position().left;
				_top = $(".pop").position().top;
				// 判断是否越界
				if (_left < 0)
					_left = 0;
				else if (_left > showboxWidth - popWidth)
					_left = showboxWidth - popWidth;
				if (_top < 0)
					_top = 0;
				else if (_top > showboxHeight - popHeight)
					_top = showboxHeight - popHeight;
				// 重新设置定位
				$(".pop").css({
					"top":_top,
					"left":_left
				});

				// 设置放大镜效果：将 .big 盒子中的图片按比率移动位置
				$(".big img").css({
					"top": -2 * _top,
					"left": -2 * _left
				});
				//切换图

				
			});
			$(".sbe_center>span").on("click",function(){
					
					$(".showbox").children("img").hide().end();
					$(".big").children("img").hide().end();
					var index=$(this).index();
					$(".showbox").children("img").eq(index).show();
					$(".big").children("img").eq(index).show();
					
				});
		});
//商品切换
$(function(){
	$(".shangpingfenye>li").on("click",function(){();

		$(this).addClass("bai").siblings().removeClass("bai");
		var index=$(this).index		$(".fenyehide").hide();
		$(".fenyehide").eq(index).show()
		console.log(index);

	})
})
//全部商品分类
$(function(){
	$(".cateMenu>ul>li").css("position","relative");
	$(".cateMenu>ul>li").hover(function(){
		$(this).css("background","white");
		var index=$(this).index();
		$(".catelist_first>a").css("color","#fff");
		$(".catelist_first>a>span").css("background-positionX","0");
		$(".catelist_first>a>span").eq(index).css("background-positionX","-35px");
		$(".catelist_first>a").eq(index).css("color","#e5004a");
		$(".catelist_hide").eq(index).css("display","block");
	},function(){
		$(this).css("background","none");
		$(".catelist_first>a").css("color","#fff");
		$(".catelist_first>a>span").css("background-positionX","0");
		$(".catelist_hide").css("display","none");
		
	})
})
