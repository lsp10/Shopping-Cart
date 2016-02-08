$(document).ready(function(){
		
	$('.theCart').hide();	
	$('.cart').click(function(e){
		$('.theCart').fadeToggle('show');
	});	

	// create local storage
	var cart = [];
	localStorage.setItem('cart', JSON.stringify(cart));
	var total=0;
	
	// retrieve items from local storage
	function openStorage(){
		var cart = JSON.parse(localStorage.getItem('cart'));
		return cart;
	};

	//the number of items in the cart 
	function numberOfProducts(nr){
		$('.nr-of-products').html(nr);
	};

	function newProduct(itemData){
	  var quantity=parseInt($(itemData).find('input.qty').val());
	  if (isNaN(quantity)===true) {
	      alert('Please enter a valid quantity');
	      return;
	    }
		var product = {};
    product.id = parseInt($(itemData).attr('data-id'));
    product.name = $(itemData).attr('data-name');
    product.price = parseFloat($(itemData).attr('data-price')).toFixed(2);
    product.quantity = quantity;
    return product;
	}
	
	//put the pictures and data on the page 
	$.getJSON('data.json', function(res){
		var sz=res.length;
		for(var i=0;i<sz;i++){
			// fill the html
			$('.row').append(
				'<div class="col-xs-6 col-sm-4 col-md-3">'+
					'<div class="add-to-cart" data-id="'+res[i].id +
					'" data-name="'+res[i].product_name+
					'" data-price="'+res[i].product_price+'">'+
						'<img class="img-responsive" src="images/' + 
							res[i].product_image +
							'" alt="'+res[i].product_name+'"/>'+
						'<p>'+res[i].product_name +'</p>'+
						'<p>Price: '+res[i].product_price +' &#8364;</p>'+
						'<label>Quantity:</label>'+
						'<input class="qty" value="1">'+
						'<button class="btn-add">Add to Cart</button>'+
					'</div>'+
				'</div>');			
		};

		// add to cart button
		$('.btn-add').click(function(e) {
	    var dta = $(this).parent();	
	    newProduct(dta);
	    addToCart(newProduct(dta));
		});

		function addToCart(item) {
	    if (localStorage && localStorage.getItem('cart')) {
	      openStorage();
	      cart.push(item);
	      localStorage.setItem('cart', JSON.stringify(cart));
	      numberOfProducts(cart.length);
			
				total=total+parseFloat(item.price * item.quantity);
				$('#stotal').html(total.toFixed(2)+" &#8364;");

	      // in the html
	      var itemsinCart = cart.length;
	      $('.shopping-cart tbody').html("");
	      for (var i = 0; i < itemsinCart; i++) {
	      	displayProductsinCart(cart[i]);
	      };
	      console.log(cart);
		  } 
		};
		
		function displayProductsinCart(obj){
			$('.shopping-cart tbody').append(
				'<tr>'+
					'<td>'+obj.name+'</td>'+
					'<td>'+obj.quantity+'</td>'+
					'<td>'+obj.price+' &#8364;</td>'+
					'<td>'+(obj.price * obj.quantity).toFixed(2) +' &#8364;</td>'+
				'</tr>');
		};

	});

})