const menu = [
  { id:1, name:"蓮藕茶", price:40 },
  { id:2, name:"洛神花茶", price:40 },
  { id:3, name:"紅茶", price:30 }
];

let cart = [];
let currentItem = null;

function renderMenu(){
  const el = document.getElementById("menu");
  el.innerHTML="";

  menu.forEach(item=>{
    const div=document.createElement("div");
    div.className="menu-item";
    div.innerHTML=`
      <h3>${item.name} - $${item.price}</h3>
      <button onclick="openModal(${item.id})">選擇</button>
    `;
    el.appendChild(div);
  });
}

function openModal(id){
  currentItem = menu.find(m=>m.id===id);
  document.getElementById("modalTitle").innerText=currentItem.name;
  document.getElementById("customModal").classList.remove("hidden");
}

function closeModal(){
  document.getElementById("customModal").classList.add("hidden");
}

function addToCart(){
  const ice = document.getElementById("ice").value;
  if(!ice){ alert("請選擇冰塊"); return; }

  const container = document.getElementById("container").value;
  const qty = parseInt(document.getElementById("qty").value);

  cart.push({
    name: currentItem.name,
    price: currentItem.price,
    ice,
    container,
    qty
  });

  closeModal();
  renderCart();
}

function renderCart(){
  const el = document.getElementById("cartItems");
  el.innerHTML = cart.map(i=>`${i.name} (${i.container}/${i.ice}) x${i.qty}`).join("<br>");
  document.getElementById("total").innerText = calculateTotal();
}

function calculateTotal(){
  return cart.reduce((sum,i)=>sum+i.price*i.qty,0);
}

function generateOrderId(){
  const d=new Date();
  return d.getFullYear()+""+(d.getMonth()+1)+d.getDate()+"-"+Math.floor(Math.random()*1000);
}

function submitOrder(){
  const orderId=generateOrderId();

  const data={
    orderId,
    cart,
    total:calculateTotal(),
    name:document.getElementById("name").value,
    phone:document.getElementById("phone").value,
    time:document.getElementById("pickupTime").value,
    status:"pending"
  };

  fetch("YOUR_GAS_API",{
    method:"POST",
    body:JSON.stringify(data)
  });

  alert("訂單成立："+orderId);
  cart=[];
  renderCart();
}

function toggleCart(){
  document.getElementById("cartPanel").classList.toggle("hidden");
}

function toggleOrder(){
  document.getElementById("orderPanel").classList.toggle("hidden");
}

function checkOrder(){
  document.getElementById("orderStatus").innerText="需接Firebase";
}

renderMenu();
