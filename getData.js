$(document).ready(function(){

//creaing the template for the product display 
	function loadOnPage(productData,j){
		$('.row').append(
			'<div class="col-xs-6 col-sm-4 col-md-3">'+
				'<div class="add-to-cart" data-id="'+productData[j].id +
				'" data-name="'+productData[j].product_name+
				'" data-price="'+productData[j].product_price+'">'+
					'<img class="img-responsive" src="images/' + 
						productData[j].product_image +
						'" alt="'+productData[j].product_name+'"/>'+
					'<p>'+productData[j].product_name +'</p>'+
					'<p>Price: '+productData[j].product_price +' &#8364;</p>'+
					'<label>Quantity:</label>'+
					'<input class="qty" value="1">'+
					'<button class="btn-add btn btn-default">Add to Cart</button>'+
				'</div>'+
			'</div>');			
	};

	// reading the data from the JSONfile and filling the HTML template
	$.getJSON('data.json', function(res){
		var sz=res.length;
		for(var i=0;i<sz;i++){
			// fill the html
			loadOnPage(res,i);
		};
		// when the add to cart button is clicked
		$('.btn-add').click(function(e) {
	    var dta = $(this).parent();	
	    newProduct(dta);
	    addToCart(newProduct(dta));
		});	
	});

})