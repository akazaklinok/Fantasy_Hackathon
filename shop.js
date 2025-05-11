
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartSummary = document.getElementById("cart-summary");
  const totalQuantityElement = document.getElementById("total-quantity");
  const totalPriceElement = document.getElementById("total-price");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const clearCartButton = document.getElementById("clear-cart-btn");
  const checkoutButton = document.getElementById("checkout-btn");
  const cartCountHeaderElement = document.getElementById("cart-count-header");

  let playerCoins = parseInt(localStorage.getItem("playerCoins") || "150");
  const walletDisplay = document.createElement("div");
  walletDisplay.style.position = "fixed";
  walletDisplay.style.top = "20px";
  walletDisplay.style.left = "20px";
  walletDisplay.style.background = "#000000a0";
  walletDisplay.style.color = "#ffeaa7";
  walletDisplay.style.padding = "10px 20px";
  walletDisplay.style.border = "2px solid #ffeaa7";
  walletDisplay.style.borderRadius = "10px";
  walletDisplay.style.zIndex = "10000";
  walletDisplay.style.fontSize = "24px";
  walletDisplay.textContent = `Монети: ${playerCoins}`;
  document.body.appendChild(walletDisplay);

  function updateWalletDisplay() {
    walletDisplay.textContent = `Монети: ${playerCoins}`;
    localStorage.setItem("playerCoins", playerCoins);
  }

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");
      const priceText = productCard.querySelector("p:last-of-type").textContent;
      const match = priceText.match(/(\d+)/);
      const price = match ? parseInt(match[1]) : 0;

      if (playerCoins >= price) {
        playerCoins -= price;
        updateWalletDisplay();
        button.textContent = "Придбано!";
        button.disabled = true;
      } else {
        button.textContent = "Недостатньо!";
        button.style.background = "#a00";
        setTimeout(() => {
          button.textContent = "покласти в кошик";
          button.style.background = "";
        }, 1500);
      }
    });
  });

  function getCart() {
    const cartData = localStorage.getItem("shoppingCart");
    try {
      if (cartData && cartData.trim() !== "") {
        const parsedData = JSON.parse(cartData);
        return Array.isArray(parsedData) ? parsedData : [];
      }
    } catch (e) {
      console.error("Помилка розбору кошика з localStorage:", e);
    }
    return [];
  }

  function saveCart(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    renderCart();
    updateCartCounterHeader();
  }

  function updateCartCounterHeader() {
    const cart = getCart();
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountHeaderElement) {
      cartCountHeaderElement.textContent = totalQuantity;
    }
  }

  function renderCart() {
    const cart = getCart();
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartSummary.style.display = "none";
      emptyCartMessage.style.display = "block";
      checkoutButton.disabled = true;
    } else {
      cartSummary.style.display = "block";
      emptyCartMessage.style.display = "none";
      checkoutButton.disabled = false;

      let totalQuantity = 0;
      let totalPrice = 0;

      cart.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Ціна: $${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-change-btn" data-id="${
                          item.id
                        }" data-change="-1">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-change-btn" data-id="${
                          item.id
                        }" data-change="1">+</button>
                    </div>
                    <div class="cart-item-price">$${(
                      item.price * item.quantity
                    ).toFixed(2)}</div>
                    <button class="remove-item-btn" data-id="${
                      item.id
                    }" title="Видалити товар">×</button>
                `;
        cartItemsContainer.appendChild(itemElement);

        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
      });

      totalQuantityElement.textContent = totalQuantity;
      totalPriceElement.textContent = totalPrice.toFixed(2);
      addEventListenersToButtons();
    }
    updateCartCounterHeader();
  }

  function addEventListenersToButtons() {
    document.querySelectorAll(".remove-item-btn").forEach((button) => {
      button.replaceWith(button.cloneNode(true));
    });
    document.querySelectorAll(".remove-item-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        removeItem(itemId);
      });
    });

    document.querySelectorAll(".quantity-change-btn").forEach((button) => {
      button.replaceWith(button.cloneNode(true));
    });
    document.querySelectorAll(".quantity-change-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        const change = parseInt(event.target.dataset.change, 10);
        changeQuantity(itemId, change);
      });
    });
  }

  function removeItem(itemId) {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== itemId);
    saveCart(cart);
  }

  function changeQuantity(itemId, change) {
    let cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += change;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    saveCart(cart);
  }

  function clearCart() {
    if (confirm("Ви впевнені, що хочете очистити кошик?")) {
      saveCart([]);
    }
  }

  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
  }

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      alert("Перехід до сторінки оформлення (не реалізовано)");
    });
  }

  renderCart();
});
