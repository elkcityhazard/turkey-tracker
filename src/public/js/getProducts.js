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
    return data;
  });
}


request('/api/products').then((data) => {
  const prodBtns = document.querySelectorAll('.addToCart');
  const prodImg = document.querySelectorAll('.product-card img');

  prodImg.forEach((img) => {
    img.addEventListener('click', (e) => {
      const id = img.getAttribute('id');
      location.assign(`/api/products/${id}`)
    })
  })
}).then(() => {
  const prodCard = document.querySelectorAll('.product-card');
  prodCard.forEach((card) => {
      card.addEventListener('mouseover', (e) => {
          card.classList.add('tooltip');
          const tooltip = document.querySelector('.tooltip');
          tooltip.style.left = e.clientX;
          tooltip.style.top = e.clientY;
      })
  })

  prodCard.forEach((card) => {
    card.addEventListener('mouseleave', () => {
      card.classList.remove('tooltip');
    })
  })

});

