$(document).ready(function(){


	function loadOnPage(productdata, j) {
		$('.row').append(
			'<div class="col-xs-6 col-sm-4 col-md-3">'+
				'<div class="add-to-cart" data-id="'+productdata[j].id +
				'" data-name="'+productdata[j].product_name+
				'" data-price="'+productdata[j].product_price+'">'+
					'<img class="img-responsive" src="images/' + 
						productdata[j].product_image +
						'" alt="'+productdata[j].product_name+'"/>'+
					'<p>'+productdata[j].product_name +'</p>'+
					'<p>Price: '+productdata[j].product_price +' &#8364;</p>'+
					'<label>Quantity:</label>'+
					'<input class="qty" value="1">'+
					'<button class="btn-add">Add to Cart</button>'+
				'</div>'+
			'</div>');			
	};	


	//put the pictures and data on the page 
	$.getJSON('data.json', function(res){
		var sz=res.length;
		for(var i=0;i<sz;i++){
			// fill the html
			loadOnPage(res,i);
		};

		//the cart button animation 
		$('.theCart').hide();	
		$('.cart').click(function(e){
			$('.theCart').fadeToggle('show');
		});




		// starting with the cart
		var cartItems;
		var MyApp = {};

		console.log(localStorage['myapp.cart']);
		
		MyApp.getCart = function() {
    // Check for localStorage
    	if(localStorage) {
          console.log('dgkdkhkdjfgh');
        if(localStorage['myapp.cart'] != null) {
            // Get the cart
          cartItems = JSON.parse(localStorage['myapp.cart']);
          checkoutCounter = cartItems.count;
          // Update the button counter value
					$('.nr-of-products').html(checkoutCounter);
          // // External function to enable the button
          // MyApp.theCounter();
        }
    	} else {
        console.log('localStorage not detected, cannot get cart.');
    	}
		};



		// // check if local storage exists, if it does not we create one
		// if(!localStorage){
		// 	localStorage = {};
		// 	localStorage.prototype.removeItem = function(key){
		// 		this[key] = null;
		// 	};
		// }
		// store = {
		// 	read: function(key){
		// 		if(localStorage[key]){
		// 			return JSON.parse(localStorage[key]);
		// 		}
		// 		return null;
		// 	},
		// 	write: function(key,value){
		// 		localStorage[key] = JSON.stringify(value);
		// 	},
		// 	clear: function(key){
		// 		localStorage.removeItem(key);
		// 	}
		// };


		// //look for a preexisting cart to load
		// MyCart.getCart = function(){
		// 	cartItems = store.read('mycart.cart');
		// 	checkoutCounter = cartItems.count;
		// 	$('.nr-of-products').html(checkoutCounter);
		// 	// MyCart.theCounter();
		// }

		// ShoppingCart = function(name) {
  // 		this.name = name;
  // 		this.items = store.read(name)
		// }

// ShoppingCart.prototype = {
//   save: function () {
//     store.write(this.name, this.items)
//   },
//   addItem: function (role) {
//     if (this.items[role])
//       this.items[role] += 1;
//     else
//       this.items[role] = 1;

//     this.save()
//   },
//   removeItem: function(role) {
//     if (this.items[role])
//       this.items[role] -= 1;

//     if (this.items[role] == 0)
//       delete this.items[role];

//     this.save()
//   }
// }


	// // create local storage
	// var cart = [];
	// localStorage.setItem('cart', JSON.stringify(cart));
	// var total=0;
	
	// // retrieve items from local storage
	// function openStorage(){
	// 	var cart = JSON.parse(localStorage.getItem('cart'));
	// 	return cart;
	// };

	// //the number of items in the cart 
	// function numberOfProducts(nr){
	// 	$('.nr-of-products').html(nr);
	// };

	// function newProduct(itemData){
	//   var quantity=parseInt($(itemData).find('input.qty').val());
	//   if (isNaN(quantity)===true) {
	//       alert('Please enter a valid quantity');
	//       return;
	//     }
	// 	var product = {};
 //    product.id = parseInt($(itemData).attr('data-id'));
 //    product.name = $(itemData).attr('data-name');
 //    product.price = parseFloat($(itemData).attr('data-price')).toFixed(2);
 //    product.quantity = quantity;
 //    return product;
	// }

	// 	// add to cart button
		// $('.btn-add').click(function(e) {
	 //    var dta = $(this).parent();	
	 //    newProduct(dta);
	//     addToCart(newProduct(dta));
	// 	});

	// 	function addToCart(item) {
	//     if (localStorage && localStorage.getItem('cart')) {
	//       openStorage();
	//       cart.push(item);
	//       localStorage.setItem('cart', JSON.stringify(cart));
	//       numberOfProducts(cart.length);
			
	// 			total=total+parseFloat(item.price * item.quantity);
	// 			$('#stotal').html(total.toFixed(2)+" &#8364;");

	//       // in the html
	//       var itemsinCart = cart.length;
	//       $('.shopping-cart tbody').html("");
	//       for (var i = 0; i < itemsinCart; i++) {
	//       	displayProductsinCart(cart[i]);
	//       };
	//       console.log(cart);
	// 	  } 
	// 	};
		
	// 	function displayProductsinCart(obj){
	// 		$('.shopping-cart tbody').append(
	// 			'<tr>'+
	// 				'<td>'+obj.name+'</td>'+
	// 				'<td>'+obj.quantity+'</td>'+
	// 				'<td>'+obj.price+' &#8364;</td>'+
	// 				'<td>'+(obj.price * obj.quantity).toFixed(2) +' &#8364;</td>'+
	// 			'</tr>');
	// 	};

	});

})