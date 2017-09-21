define(function(require,exports,module){
       var $  = require('zepto');
	         require('tap');
	   var validate = require('./common'),
	       template = require('template');
	       require("swiper");
	       require("isroll");

       var flag = 0;
       template.helper("gender",function(sex){
            if (sex == 0) {
                 return "女"
            }else{
                 return "男"
            };
       });
        //1:
        var winHeight = window.innerHeight;
            fHeight = $('footer').height();
            hHeight = $('header').height();

        $("#swiper-container1").find('.swiper-slide').height(winHeight-(fHeight+hHeight))

		var mySwiper = new Swiper('#swiper-container1',{
            onSlideChangeEnd: function(swiper){
              var lis = $('#nav_list').find('li');
              lis.find('a').removeClass('active');
              lis.eq(swiper.activeIndex).find('a').addClass('active');
              getListLife(swiper.activeIndex);
		    }
		})
          

		 function getListLife(activeIndex){
		 	if(activeIndex > 0 && flag < 2){
		 		$.get('/api/listLife' + activeIndex, function(data) {
                  var html = template("listLive_tmpl",data);
                  $("#slider"+activeIndex).html(html);
                  flag++;
                });
		 	}
		 }

		//初始化iscroll
        var myscroll = new IScroll("#wrapper",{
           mouseWheel: true,
           probeType: 2
           //startY: -100 //重点，长杰同学好牛X
          // tap:true
        });
        
    /*    myscroll.on('beforeScrollStart',function(){
              console.log(11);
        });*/

        myscroll.on('scroll',function(){
              //console.log(this.y);
        });

        $('#scroller').on('tap',function(event) {
        	event.preventDefault();
        	
        });
        //1:为nav下面的li绑定tap 事件

        $("#nav_list").on('tap', 'li', function(event) {
        	event.preventDefault();
        	var $this = $(this),index = $this.index();
        	mySwiper.slideTo(index, 500, false);
        	$this.parent().find('a').removeClass('active');
        	$this.find('a').addClass('active');
        });

       var section = $('section');
       //2:请求后台
       $.get("/api/listLive",{'index':1},function(data){
          var str = "",listData = data.data;
          if (data.error===0) {
/*             for (var i = 0; i < listData.length; i++) {
             	 //console.log(listData[i])
if (i%2==0) {
   var s = "<dl class='mr'><dt><img src="+listData[i].imgSrc+"></dt><dd>"+listData[i].descripition+"</dd></dl>";
}else{
   var s = "<dl><dt><img src="+listData[i].imgSrc+"></dt><dd>"+listData[i].descripition+"</dd></dl>";
};             	 

             str += s;
             };*/
              // 开始准备模板
              //template 这个函数就是 为我们提供的渲染方法
              //template 语法规则 必须要传json对象，这个json对象要是
              //json数组，在each里面传的第二个参数就是这个json对象的
              //key ,假如使用到each的时候，返回给你的是数组，我就要
              //包装成json对象，然后在把key写在第二个参数

             var html = template("listLive_tmpl",{data:listData});

             $("#scroller").html(html);
             myscroll.refresh();
          /*   setTimeout(function(){
             	myscroll.scrollTo(0,-100,1000);
             },2000)
               setTimeout(function(){
             	myscroll.scrollToElement($('dl').last()[0],2000);
             },4000)*/
          }else{
          	alert(data.msg);
          };
       })
})