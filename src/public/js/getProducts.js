const prodContainer = document.querySelector('.main.products');
console.log(prodContainer)
async function request (url, parent) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type' : 'application/json'}
    })

    const data = await res.json();
    const {products} = data;
    console.log(products)

    products.forEach((product) => {
        const div = document.createElement('div');
        div.classList.add('product-card')
        div.innerHTML = `
        <img src="/products/${product._id}/image" alt="${product.name}" width="100%" height="auto" style="object-fit:cover;">
        <ul>
            <li><strong>Name: </strong>${product.name}</li>
            <li><strong>Price: </strong>${product.price}</li>
            <li><strong>Description: </strong>${product.description}</li>
            <li><strong>Inventory: </strong>${product.setInventory}</li>
        </ul>
        <button class="addToCart" data-id="${product._id}">Add To Cart</button>
        `;
        prodContainer.append(div);
    })
}

request('/products');