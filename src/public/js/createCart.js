const cartIcon = document.querySelector('.fas.fa-cart-arrow-down');
const cartItems = document.querySelector('.shopping-list')
const cartContainer = document.querySelector('.shopping-cart');

cartIcon.addEventListener('click', (e) => {
    cartContainer.classList.toggle('active');
    cartItems.classList.toggle('active');
})