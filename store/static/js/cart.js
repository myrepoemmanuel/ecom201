var updateBtns = document.getElementsByClassName('update-cart');


for (var i = 0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:', productId, 'Action:', action);
        
        if (user == 'AnonymousUser'){
            addCookieItem(productId,action);
            }else{
            updateUserOrder(productId, action);
            }
        
    })
    
}


function addCookieItem(productId,action){
    console.log('user not authenticated')

    if (action == 'add'){
        if (cart[productId] == undefined) {
            cart[productId] = {'quantity':1};

        }else{
            cart[productId]['quantity'] +=1;
        }
    }

    if (action == 'remove'){
        cart[productId]['quantity'] -= 1;

        if (cart[productId]['quantity'] <= 0) {
            console.log('delete item')
            delete cart[productId];
        }

    }
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/";
    location.reload();
}





function updateUserOrder(productId, action){
                console.log('user logged in, sending data..');
                var url = '/update_item/';

                fetch(url, {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body:JSON.stringify({'productId': productId, 'action': action,})

                }).then(response =>{
                    return response.json();
                }).then(data => {
                    console.log('data:',data);
                    location.reload()
                })
}

//js for navigation menu...............

$(document).ready(function() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar").addClass("active");
    });
  
    $("#sidebarCollapseX").on("click", function() {
      $("#sidebar").removeClass("active");
    });
  
    $("#sidebarCollapse").on("click", function() {
      if ($("#sidebar").hasClass("active")) {
        $(".overlay").addClass("visible");
        console.log("it's working!");
      }
    });
  
    $("#sidebarCollapseX").on("click", function() {
      $(".overlay").removeClass("visible");
    });
});






















