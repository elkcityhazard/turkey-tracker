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
        <img src="/api/products/${product._id}/image" alt="${product.name}" width="100%" height="auto" style="object-fit:cover;">
        <ul>
            <li><strong>Name: </strong>${product.name}</li>
            <li><strong>Price: </strong>${product.price}</li>
            <li><strong>Description: </strong>${product.description}</li>
            <li><strong>Inventory: </strong>${product.setInventory}</li>
        </ul>
        <button class="addToCart" data-id="${product._id}">Add To Cart</button>
        `;
    prodContainer.append(div);
    return data;
  });
}

async function updateCart(array) {
    document.getElementById('cartHolder').innerHTML = '';
    const ul = document.createElement('ul');
    await array.forEach(arr => {
        let li = document.createElement('li');
        li.textContent = arr;
        ul.append(li)
    })
    document.getElementById('cartHolder').append(ul);
    console.log(array);
}

request('/api/products').then(async (data) => {
  const productBtns = document.querySelectorAll('.addToCart');
  localStorage.setItem('product', []);
  productBtns.forEach((product) => {
    product.addEventListener('click', async (e) => {
      const data = product.getAttribute('data-id');
      dataArray.push(data);
      localStorage.setItem('product', dataArray);
      updateCart(dataArray);
    });
  });
});
