const prodContainer = document.querySelector('.main.products');
const cartQty = document.querySelector('.qty-number');
let dataArray = [];
let cart = [];
let qty = 0;

if(localStorage.getItem('products')) {
  cart =  JSON.parse(localStorage.getItem('products'));
  qty =  JSON.parse(localStorage.getItem('qty'));
  cartQty.innerText = qty;
  cart.forEach(item => {
    document.querySelector('.shopping-list').innerHTML += `
    <li id="${item.id}">
    <strong>Name: </strong><span>${item.name}</span>
    <strong>Qty: </strong><span>${item.qty}</span>
    <strong>Price: </strong><span>${item.price}</span>
    </li>
    `
  })
}

async function populateCart(product) {

if (cart.indexOf(product)) {
  for (let i = 0; i < cart.length; i++) {
    if (product.id === cart[i].id) {
      cart[i].qty += 1;
      qty++;
      cartQty.textContent = qty;
      localStorage.setItem('qty', JSON.stringify(qty));
      return localStorage.setItem('products', JSON.stringify(cart));
    }
  }
} 
  cart.push(product);
  qty++
  cartQty.innerText = qty;
  localStorage.setItem('qty', JSON.stringify(qty));
  localStorage.setItem('products', JSON.stringify(cart))
}


async function request(url, parent, callback) {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  const { products } = data;
  await products.forEach((product) => {
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `
        <img src="/api/products/${product._id}/image" id="${product._id}" alt="${product.name}" width="100%" height="auto" style="object-fit:cover;">
        <ul>
            <li><strong>Name: </strong>${product.name}</li>
            <li><strong>Price: </strong>${product.price}</li>
            <li><strong>Description: </strong>${product.description}</li>
            <li><strong>Inventory: </strong>${product.setInventory}</li>
        </ul>
        <button class="addToCart" data-id="${product._id}">Add To Cart</button>
        `;
    prodContainer.append(div);
  });
  return products;
}

request('/api/products')
  .then((products) => {
    const prodImg = document.querySelectorAll('.product-card img');
    prodImg.forEach((img) => {
      img.addEventListener('click', (e) => {
        const id = img.getAttribute('id');
        location.assign(`/api/products/${id}`);
      });
    });
    return products;
  })
  .then((products) => {
    const prodCard = document.querySelectorAll('.product-card');
    const prodBtns = document.querySelectorAll('.addToCart');
    const shoppingList = document.querySelector('.shopping-list');
    let basket = [];
    prodBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');

        //  find product in product Inventory
        let currentProduct = products.forEach((product) => {
          if (id === product._id) {
          let parsedProduct = {
            id : product._id,
            name: product.name,
            price: product.price,
            qty: 1
          }
          populateCart(parsedProduct)         
        }})

      });
    });
  });
