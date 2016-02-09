$(document).ready(function(){
	
// ----------------ALL THE FUNCTIONS THAT ARE USED

	//using the data from json to get the products 
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
					'<button class="btn-add">Add to Cart</button>'+
				'</div>'+
			'</div>');			
	};

	// add new items to the localStorage & display all products in cart after adding
	function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    numberOfProducts(cart.length);
    // in the html
    $('.shopping-cart tbody').html("");
    displayProductsinCart();
    console.log(cart);
	};

	//the number of items in the cart 
	function numberOfProducts(nr){
		$('.nr-of-products').html(nr);
	};

	// creating object for the new item added to the cart
	function newProduct(itemData){
	  var quantity=parseInt($(itemData).find('input.qty').val());
	  if (!isNaN(quantity)) {
			var product = {};
	    product.id = parseInt($(itemData).attr('data-id'));
	    product.name = $(itemData).attr('data-name');
	    product.price = parseFloat($(itemData).attr('data-price')).toFixed(2);
	    product.quantity = quantity;
	    return product;
	   }else{
	      alert('Please enter a valid quantity');
	      return;
	   };
	};

	// displays the table with products
	function displayProductsinCart() {
		$('.shopping-cart tbody').html("");
	  total = 0;
	  for (var i = 0; i < cart.length; i++) {
			$('.shopping-cart tbody').append(
				'<tr>'+
					'<td>'+cart[i].name+'</td>'+
					'<td>'+cart[i].quantity+'</td>'+
					'<td>'+cart[i].price+' &#8364;</td>'+
					'<td>'+(cart[i].price * cart[i].quantity).toFixed(2) +' &#8364;</td>'+
				'</tr>');
  		
  		cartTotalAmount(cart[i]);
		};
	}

	// calculate the total amount for the cart
	function cartTotalAmount(prod){
		var totalPerItem=parseFloat(prod.price * prod.quantity);
		total=total+totalPerItem;
		$('#stotal').html(total.toFixed(2)+" &#8364;");
	};

// ----------------WILL EXECUTE ON PAGE LOAD


	// cart table animation
	$('.theCart').hide();	
	$('.cart').click(function(e){
		$('.theCart').fadeToggle('show');
	});

	// check if local storage exists
	if (localStorage.cart) {
		var cart = JSON.parse(localStorage.getItem('cart'));
	}else{
		var cart = [];
		localStorage.setItem('cart', JSON.stringify(cart));
	};

	// display number of products in cart on page load
	numberOfProducts(cart.length);
		
	// populate the table of the shopping cart
	displayProductsinCart();
	  var total = 0;

	// to remve all items from th cart
	$('.deleteAll').click(function(e){
		cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
		displayProductsinCart();
		$('#stotal').html("");
		numberOfProducts(cart.length);
	});

	
	//put the pictures and data on the page 
	$.getJSON('data.json', function(res){
		var sz=res.length;
		for(var i=0;i<sz;i++){
			// fill the html
			loadOnPage(res,i);
		};

		// add to cart button
		$('.btn-add').click(function(e) {
	    var dta = $(this).parent();	
	    newProduct(dta);
	    addToCart(newProduct(dta));
		});

	});

})