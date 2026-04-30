const menu = [
  { name: "珍珠奶茶", price: 50, milk: true },
  { name: "紅茶", price: 30, milk: false }
];

let cart = [];

function renderMenu() {
  const el = document.getElementById("menu");
  el.innerHTML = "";

  menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <h3>${item.name} - $${item.price}</h3>
      <button onclick="selectItem('${item.name}')">選擇</button>
    `;
    el.appendChild(div);
  });
}

function selectItem(name) {
  const item = menu.find(m => m.name === name);

  let milkExtra = false;
  if (item.milk) {
    milkExtra = confirm("是否加牛奶+5？");
  }

  cart.push({ name, price: item.price, milkExtra, qty: 1 });
  renderCart();
}

renderMenu();
