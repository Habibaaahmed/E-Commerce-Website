function addToCart(product) {
    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));


    displayCartItems();
}

function removeFromCart(productId) {
    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    cartItems = cartItems.filter(item => item.id !== productId);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    displayCartItems();
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    let cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    if (cartItems.length === 0) {

        const emptyCartImage = document.createElement('img');
        emptyCartImage.src = '../assets/cart.jpg';
        emptyCartImage.alt = 'Empty Cart';
        emptyCartImage.className = 'empty-cart-image';

        cartItemsContainer.appendChild(emptyCartImage);
     
        totalPriceElement.style.display = 'none';
    } else {

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';

            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.title;
            itemImage.className = 'cart-item-image';

            const itemDetails = document.createElement('div');
            itemDetails.className = 'item-details';

            const itemName = document.createElement('h4');
            itemName.textContent = item.title;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `$${item.price}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-button';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });

            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemPrice);

            itemElement.appendChild(itemImage);
            itemElement.appendChild(itemDetails);
            itemElement.appendChild(removeButton);

            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
        totalPriceElement.style.display = 'block'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});
