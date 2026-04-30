const menu = [
  { name: "珍珠奶茶", price: 50, hasMilk: true },
  { name: "紅茶", price: 30, hasMilk: false }
];

let cart = [];

function renderMenu() {
  const container = document.getElementById("menu");

  menu.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <button onclick="addItem('${item.name}')">加入</button>
    `;
    container.appendChild(div);
  });
}

function addItem(name) {
  cart.push({ name, qty: 1 });
  renderCart();
}

function renderCart() {
  document.getElementById("cartItems").innerHTML =
    cart.map(i => `${i.name} x${i.qty}`).join("<br>");
}

function submitOrder() {
  const total = calculateTotal(cart);

  fetch("https://script.google.com/macros/s/AKfycbw7CvH7y0gRgRSH6lide79FG1OSCRtYf9JK_nKWNG9AmH7bHYN_YERTtFQLOhBqtyDbGQ/exec", {
    method: "POST",
    body: JSON.stringify({
      items: cart,
      total: total,
      time: document.getElementById("pickupTime").value
    })
  });

  alert("訂單已送出！");
}

renderMenu();
