let lebel=document.querySelector("#label");
let shopping_cart=document.querySelector("#shopping-cart");


let cart=JSON.parse(localStorage.getItem('list')) || [];

const calculateItemQuantity = () => {
    let cartAmount=document.getElementById("cartAmount");
    let totalItem=cart.map(c => c.item).reduce((acc,currVal) => {
       return acc+currVal;
    },0)
    cartAmount.innerHTML=totalItem;
}

const generateCart = () => {
    if(cart.length!=0){
        shopping_cart.innerHTML=cart.map((currElem) => {
            let {id,item}=currElem;
            let search=shopItemsData.find(x => x.id===id) || [];
            return `
            <div class="cart-item">
            <img width="100" src=${search.img} alt="" />
            <div class="details">
    
              <div class="title-price-x">
                  <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                  </h4>
                  <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>
    
              <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
    
              <h3>$ ${item * search.price}</h3>
            </div>
          </div>
            `
        }).join('')
    }else{
        shopping_cart.innerHTML="";
        lebel.innerHTML=`
        <h2>Cart is Empty</h2>
        <a href="index.html">
          <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
}

const increment = (id) => {
    let selectedItem=id;
    let existingItem=cart.find(elem => elem.id===selectedItem.id)
    if(existingItem){
     existingItem.item+=1;
    }else{
     cart.push({
       id:selectedItem.id,
       item:1
     })
    }
    
   update(selectedItem.id);
   generateCart();
   localStorage.setItem("list",JSON.stringify(cart));
 }

 const decrement = (id) => {
    let selectedItem=id;
    let existingItem=cart.find(elem => elem.id===selectedItem.id);
    if (existingItem === undefined) return;
    if (existingItem.item === 0) return;
    else {
      existingItem.item -= 1;
    }
    
    update(selectedItem.id);
    cart=cart.filter(c => c.item!==0);
    generateCart();
    localStorage.setItem("list",JSON.stringify(cart));
 }

 const update =(id) => {
    let existingItem=cart.find(elem => elem.id===id);
    document.getElementById(id).innerHTML= existingItem.item;
    calculateItemQuantity();
    totalAmount();
  }

const removeItem = (id) => {
    let removeItem=id;
    cart=cart.filter(currElem => currElem.id!==removeItem.id)
    localStorage.setItem("list",JSON.stringify(cart));
    generateCart();
    totalAmount();
    calculateItemQuantity();
}

const totalAmount = () => {
    if(cart.length!==0){
        let totalPrice=cart.map((currElem) => {
        let {id,item}=currElem;
        let search=shopItemsData.find(x => x.id===id) || [];
        return search.price*item
       }).reduce((acc,currElem) => {
        return acc+currElem;
       },0);
       lebel.innerHTML=`
        <h2>TotalAmount: $${totalPrice}</h2>
        <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
       `
       
    }else{
        return;
    }
}

const clearCart = () => {
    console.log("clicked")
    cart.length=0;
    generateCart();
    calculateItemQuantity();
    localStorage.setItem("list",JSON.stringify(cart));
    
}



calculateItemQuantity();
generateCart();
totalAmount();