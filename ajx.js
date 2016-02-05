$(document).ready(function(){
	$.getJSON('data.json', function(res){
		console.log(res[0].id);
		var sz=res.length;
		for(var i=0;i<sz;i++){
			console.log(res[i].product_name);
			$('.row').append(

				'<div class="col-xs-6 col-sm-4 col-md-3"><div class="prod"><img class="img-responsive" src="images/' + res[i].product_image+
				'" alt="'+res[i].product_name+'"/><p>' +
				res[i].product_name +'</p><span>Quantity:</span><input class="qinput" type="number"><button>Add to Cart</button></div></div>');			
		}
	});
})