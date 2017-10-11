// var =document.getElementById("aaa");
// onmessage.=function(e){
// 	var num=e.data;
// 	var r=0;
// 	for (var i = 0; i<num; i++) {
// 		r+=i;
// 	}
// 	postMessage(r);
// }
onmessage=function(e){
	var num=e.data;
	var r=0;
	for (var i = 0; i<num; i++) {
		r+=i;
	}
	postMessage(r);
}