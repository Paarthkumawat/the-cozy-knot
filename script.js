/*
  IMPORTANT: Add the business WhatsApp number below.
  Use country code + number, digits only. India example: 91XXXXXXXXXX
  Also add the Instagram profile URL.
*/
const BUSINESS_WHATSAPP = "919413763999";
const INSTAGRAM_URL = "https://www.instagram.com/jyoti_artzillacrocheter/#";
let cart = [];
const $ = (id) => document.getElementById(id);
const money = (n) => "₹" + Number(n).toLocaleString("en-IN");
const safeText = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function renderProducts(filter="all") {
  const list = PRODUCTS.filter(p => filter === "all" || p.category === filter);
  $("productGrid").innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${safeText(p.image)}" alt="${safeText(p.name)}" loading="lazy"><span class="product-tag">${safeText(p.category)}</span></div>
      <div class="product-info"><h3>${safeText(p.name)}</h3><div class="product-meta"><strong>${money(p.price)}</strong><button class="add-button" data-add="${p.id}">＋ Add to bag</button></div></div>
    </article>`).join("");
}
function toast(message) {
  $("toast").textContent = message; $("toast").classList.add("show");
  setTimeout(() => $("toast").classList.remove("show"), 2200);
}
function addToCart(id) {
  const item = cart.find(x => x.id === id);
  if (item) item.qty++; else cart.push({id, qty:1});
  renderCart(); toast("Added to your bag ♡");
}
function renderCart() {
  const count = cart.reduce((n,x)=>n+x.qty,0);
  $("cartCount").textContent = count; $("drawerCount").textContent = `(${count})`;
  const lines = cart.map(x => {
    const p = PRODUCTS.find(y=>y.id===x.id);
    return `<div class="cart-line"><img src="${safeText(p.image)}" alt=""><div><h4>${safeText(p.name)}</h4><p>${money(p.price)} each</p><div class="qty"><button data-qty="${p.id}" data-change="-1">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-change="1">＋</button></div></div><button class="remove" data-remove="${p.id}">Remove</button></div>`;
  }).join("");
  $("cartItems").innerHTML = lines || '<p class="empty-cart">Your bag is waiting for something lovely.</p>';
  $("cartTotal").textContent = money(cart.reduce((n,x)=>n+PRODUCTS.find(p=>p.id===x.id).price*x.qty,0));
}
function openCart(){ $("cartDrawer").classList.add("open"); $("cartOverlay").classList.add("open"); }
function closeCart(){ $("cartDrawer").classList.remove("open"); $("cartOverlay").classList.remove("open"); }
function whatsappUrl(message) {
  if (!/^\d{10,15}$/.test(BUSINESS_WHATSAPP)) {
    toast("Please add your WhatsApp number in script.js first.");
    return null;
  }
  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
function sendCustomMessage() {
  const url = whatsappUrl("Hello The Cozy Knot! I'd like to ask about a custom crochet order.");
  if(url) window.open(url, "_blank", "noopener");
}
$("productGrid").addEventListener("click", e => {
  const b = e.target.closest("[data-add]"); if(b) addToCart(Number(b.dataset.add));
});
$("cartItems").addEventListener("click", e => {
  const q=e.target.closest("[data-qty]"), r=e.target.closest("[data-remove]");
  if(q){const item=cart.find(x=>x.id===Number(q.dataset.qty));item.qty+=Number(q.dataset.change);if(item.qty<=0)cart=cart.filter(x=>x!==item);renderCart();}
  if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));renderCart();}
});
$("filters").addEventListener("click", e => {
  const b=e.target.closest("[data-filter]"); if(!b)return;
  document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts(b.dataset.filter);
});
$("cartOpen").addEventListener("click",openCart);$("cartClose").addEventListener("click",closeCart);$("cartOverlay").addEventListener("click",closeCart);
$("checkout").addEventListener("click",()=>{
  if(!cart.length){toast("Your bag is empty.");return;}
  const lines=cart.map(x=>{const p=PRODUCTS.find(y=>y.id===x.id);return `• ${p.name} × ${x.qty} — ${money(p.price*x.qty)}`;}).join("\n");
  const total=cart.reduce((n,x)=>n+PRODUCTS.find(p=>p.id===x.id).price*x.qty,0);
  const url=whatsappUrl(`Hello The Cozy Knot! I'd like to place an order:\n\n${lines}\n\nSubtotal: ${money(total)}\n\nPlease confirm availability, delivery charges and payment details.`);
  if(url)window.open(url,"_blank","noopener");
});
$("customWhatsApp").addEventListener("click",e=>{e.preventDefault();sendCustomMessage();});
$("contactWhatsApp").addEventListener("click",e=>{e.preventDefault();const url=whatsappUrl("Hello The Cozy Knot! I'd like to know more about your crochet creations.");if(url)window.open(url,"_blank","noopener");});
$("instagramLink").href=INSTAGRAM_URL;
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));
$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
