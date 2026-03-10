document.addEventListener('DOMContentLoaded', () => {

    const token = localStorage.getItem('velvet_token');
    const userStr = localStorage.getItem('velvet_user');

    // Auth Guard
    if (!token || !userStr) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(userStr);
    document.getElementById('user-name').textContent = user.name;

    const API_URL = 'http://localhost:5000/api';

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('velvet_token');
        localStorage.removeItem('velvet_user');
        window.location.href = 'index.html';
    });

    // Menu Data (Mocked on frontend for simplicity, normally fetched from DB)
    const menuItems = [
        { id: '1', name: 'Velvet Latte', price: 5.50 },
        { id: '2', name: 'Gold Leaf Pour Over', price: 9.00 },
        { id: '3', name: 'Vanilla Sweet Cold Brew', price: 5.00 },
        { id: '4', name: 'Butter Croissant', price: 3.50 }
    ];

    let cart = {}; // { itemId: quantity }

    // Render Menu
    const menuContainer = document.getElementById('menu-items-container');
    const cartTotalEl = document.getElementById('cart-total');
    const placeOrderBtn = document.getElementById('btn-place-order');

    const renderMenu = () => {
        menuContainer.innerHTML = '';
        menuItems.forEach(item => {
            const qty = cart[item.id] || 0;

            const row = document.createElement('div');
            row.className = 'menu-item-row';
            row.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-controls">
                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                    <span class="qty-display">${qty}</span>
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                </div>
            `;
            menuContainer.appendChild(row);
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => updateCart(e.target.dataset.id, 1));
        });
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => updateCart(e.target.dataset.id, -1));
        });

        updateTotal();
    };

    const updateCart = (id, delta) => {
        if (!cart[id]) cart[id] = 0;
        cart[id] += delta;
        if (cart[id] < 0) cart[id] = 0;
        renderMenu();
    };

    const updateTotal = () => {
        let total = 0;
        let totalItems = 0;

        menuItems.forEach(item => {
            const qty = cart[item.id] || 0;
            total += qty * item.price;
            totalItems += qty;
        });

        cartTotalEl.textContent = `$${total.toFixed(2)}`;
        placeOrderBtn.disabled = totalItems === 0;
    };

    // Load Order History
    const loadHistory = async () => {
        const historyContainer = document.getElementById('order-history-container');
        try {
            const res = await fetch(`${API_URL}/orders/myorders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const orders = await res.json();

            if (orders.length === 0) {
                historyContainer.innerHTML = '<p class="text-muted">No orders yet.</p>';
                return;
            }

            historyContainer.innerHTML = orders.map(order => {
                const date = new Date(order.createdAt).toLocaleDateString();
                const itemsList = order.items.map(i => `${i.quantity}x ${i.name}`).join(', ');
                return `
                    <div class="history-card">
                        <div class="history-top">
                            <span>Order #${order._id.substring(order._id.length - 6)}</span>
                            <span>${date}</span>
                        </div>
                        <p style="margin: 5px 0 10px; font-size: 0.9rem;">${itemsList}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 600; color: var(--color-primary)">$${order.totalAmount.toFixed(2)}</span>
                            <span class="history-status">${order.status}</span>
                        </div>
                    </div>
                `;
            }).join('');
        } catch (err) {
            historyContainer.innerHTML = '<p class="error-msg">Failed to load history.</p>';
        }
    };

    // Place Order
    placeOrderBtn.addEventListener('click', async () => {
        placeOrderBtn.textContent = 'Processing...';
        placeOrderBtn.disabled = true;

        const itemsToOrder = [];
        let totalAmount = 0;

        menuItems.forEach(item => {
            const qty = cart[item.id] || 0;
            if (qty > 0) {
                itemsToOrder.push({ name: item.name, price: item.price, quantity: qty });
                totalAmount += qty * item.price;
            }
        });

        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ items: itemsToOrder, totalAmount })
            });

            if (res.ok) {
                alert('Order placed successfully!');
                cart = {}; // Clear cart
                renderMenu();
                loadHistory(); // Refresh history
            } else {
                alert('Failed to place order.');
            }
        } catch (err) {
            alert('Server connection error.');
        } finally {
            placeOrderBtn.textContent = 'Submit Order';
            updateTotal(); // Re-evaluate disabled state
        }
    });

    // Init
    renderMenu();
    loadHistory();
});
