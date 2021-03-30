async function fetchData(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}


fetchData('/api/products/')
.then((data) => {
  const productContainer = document.querySelector('.products');
  console.log(data.products);
  data.products.forEach((item) => {
    const card = document.createElement('div');
    card.className="card";
    cardText = document.createTextNode(item.name);
    card.append(cardText);
    productContainer.append(card);
  })
});