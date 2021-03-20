const prodContainer = document.querySelector('.main.products');
let dataArray = [];
let cart = [];

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

        //  find product in list
        let currentProduct = products.forEach((product) => {
          if (id === product._id) {
            console.log(product)
          let parsedProduct = {
            id : product._id,
            name: product.name,
            price: product.price,
            qty: 1
          }
          basket.every((parsedProduct) => {
            return parsedProduct = this.id
          })
          basket.push(parsedProduct)
          console.log(basket);
        }})
      });
    });
  });
