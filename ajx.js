$(document).ready(function(){
	$.getJSON('data.json', function(res){
		console.log(res[0].id);
		var sz=res.length;
		for(var i=0;i<sz;i++){
			console.log(res[i].product_name);
			$('.row').append(

				'<div class="col-sm-3"><img src="images/' + res[i].product_image+
				'" alt="'+res[i].product_name+'"/>' +
				res[i].product_name +'</div>');			
		}
	});
})