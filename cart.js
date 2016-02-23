
//    NOTE: the addToCart & newProduct functions are called in getData.js, 
//          inside $.getJSON on btn-add click


// check if local storage exists
if (localStorage.cart) {
  var cart = JSON.parse(localStorage.getItem('cart'));
}else{
  var cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
};

// ========= ALL THE FUNCTIONS

//show the number of items in the cart 
function numberOfProducts(nr){
  $('.nr-of-products').html(nr);
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
        '<td><button class="delete-btn btn btn-default" id="'+cart[i].id+'">Delete</button></td>'+
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

function addToCart(item) {
  if (checkDuplicates(item)) {
    for (var i=0;i<cart.length;i++){
      if(item.id === cart[i].id){
        cart[i].quantity = cart[i].quantity + item.quantity;
      };
    };
  }else {
    cart.push(item);
  };
  localStorage.setItem('cart', JSON.stringify(cart));
  numberOfProducts(cart.length);
  // in the html
  $('.shopping-cart tbody').html("");
  displayProductsinCart();
};

//check for duplicates before adding the new object(product) 
function checkDuplicates (newObj) {
  if (cart.length>0){
    for(var i=0; i<cart.length; i++){
      if(newObj.id === cart[i].id){
        return true;
      }
    }
  }
};

// the buttons to delete one item in the cart
function buttonsDelete(){
  displayProductsinCart();
  var allDeleteButtons = document.querySelectorAll('.delete-btn');
  for (var i = 0; i<allDeleteButtons.length; i++){
    $(allDeleteButtons[i]).click(function(e){   
      var buttonId = this.id;
      for(var j=0; j<cart.length; j++){
        if(cart[j].id == buttonId){
          cart.splice(j,1);
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }   
      $('#stotal').html("");
      numberOfProducts(cart.length);
    });
  };
};


// ========== ACTIONS


// display number of products in cart
numberOfProducts(cart.length);
  
// fill in the table of the shopping cart
displayProductsinCart();
var total = 0;

// delete all items from the cart
$('.deleteAll').click(function(e){
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displayProductsinCart();
  $('#stotal').html("");
  numberOfProducts(cart.length);
});

// update the table of the cart after one item is deleted
$('body').click(function(e){
  buttonsDelete();
});