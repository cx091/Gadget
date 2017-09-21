define(function(require,exports,module){
	var $ = require('zepto');
	         require('tap');
	var validate = require('./common');    
	var telephone = $("#telephone"),pwd = $("#pwd"),btn = $("#btn");
		btn.on('tap',function(event){
			$('#loadingToast').show();
			event.preventDefault();
			var parame = {};
			parame.telephone = $.trim(telephone.val());
			parame.pwd = $.trim(pwd.val());
			//对输入的数据进行判断
			if(!validate.phone(parame.telephone)){
				alert("您输入的手机号码有误，请重新输入！");
				$('#loadingToast').hide();
				return;
			};
			if(parame.pwd == ""){
				alert("您的密码有误，请重新输入！");
				$('#loadingToast').hide();
				return;
			};
			//获取到数据后 提交的后台进行处理
			$.post('/api/login',parame,function(data){//   "/api/login":后台接口
				console.log(data)
				if(data.error===1){
					alert("登陆成功");
					setTimeout(function(){
						location.href = "/index.html";
					},300)
				}else{
					$('#loadingToast').hide();
					alert(data.msg);
				}
			});
		});		
})