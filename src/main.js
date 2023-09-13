let shop = document.getElementById("shop");

let cart=JSON.parse(localStorage.getItem('list')) || [];

  const generateShop = () => {
    shop.innerHTML=shopItemsData.map((currElem) => {

      let {id,name,price,desc,img}=currElem;
      let search =cart.find(c => c.id===id) || [];
      return `
      <div id=product-id-${id}  class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price}</h2>
          <div class="buttons">
            <i  class="bi bi-dash-lg" onclick="decrement(${id})"></i>
            <div id=${id} class="quantity">
            ${typeof search.item === "undefined" ? 0 : search.item}

            </div>
            <i  class="bi bi-plus-lg" onclick="increment(${id})"></i>
          </div>
        </div>
      </div>
    </div>
      `
    }).join('')
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
     localStorage.setItem("list",JSON.stringify(cart));
  }

  const update =(id) => {
    let existingItem=cart.find(elem => elem.id===id);
    document.getElementById(id).innerHTML= existingItem.item;
    calculateItemQuantity();
  }
  
  const calculateItemQuantity = () => {
     let cartAmount=document.getElementById("cartAmount");
     let totalItem=cart.map(c => c.item).reduce((acc,currVal) => {
        return acc+currVal;
     },0)
     cartAmount.innerHTML=totalItem;
     
  }
  generateShop();
  calculateItemQuantity();

  
  