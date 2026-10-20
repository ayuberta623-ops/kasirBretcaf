// LOGIN
function login(){
let user = document.getElementById("user").value;
let pass = document.getElementById("pass").value;

if(user==="admin" && pass==="123"){
window.location="kasir.html";
return false;
}else{
alert("Login gagal");
return false;
}
}

// DATA MENU
let menu = [
{name:"Espresso", harga:15000, img:"https://images.unsplash.com/photo-1511920170033-f8396924c348"},
{name:"Cappuccino", harga:20000, img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735"},
{name:"Latte", harga:22000, img:"https://images.unsplash.com/photo-1498804103079-a6351b050096"},
{name:"Mocha", harga:25000, img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"},
{name:"Matcha Latte", harga:23000, img:"https://images.unsplash.com/photo-1517705008128-361805f42e86"}
];

let cart=[];

// TAMPIL MENU
if(document.getElementById("menuList")){
let menuHTML="";
menu.forEach((m,i)=>{
menuHTML+=`
<div class="menu-item" onclick="addCart(${i})">
<img src="${m.img}">
<div>${m.name} - Rp ${m.harga}</div>
</div>`;
});
document.getElementById("menuList").innerHTML=menuHTML;
}

// TAMBAH KE CART
function addCart(i){
cart.push(menu[i]);
renderCart();
}

// RENDER CART
function renderCart(){
let html="";
let total=0;

cart.forEach((c)=>{
html+=`<div>${c.name} - Rp ${c.harga}</div>`;
total+=c.harga;
});

document.getElementById("cart").innerHTML=html;
document.getElementById("total").innerText=total;
}

// CHECKOUT
function checkout(){
let nama=document.getElementById("nama").value;
let metode=document.getElementById("metode").value;
let uang=parseInt(document.getElementById("uang").value)||0;

let total=cart.reduce((a,b)=>a+b.harga,0);
let kembalian=uang-total;
let waktu=new Date().toLocaleString();

let struk=`
Brettcaf
Jalan Tapak Liman
---------------------
Nama: ${nama}
Total: Rp ${total}
Metode: ${metode}
Waktu: ${waktu}
`;

if(metode==="Cash"){
struk+=`Uang: Rp ${uang}
Kembalian: Rp ${kembalian}`;
}

document.getElementById("struk").innerText=struk;

// SIMPAN TRANSAKSI
let data = JSON.parse(localStorage.getItem("transaksi")) || [];
data.push({nama,total,waktu});
localStorage.setItem("transaksi", JSON.stringify(data));

tampilLaporan();
cart=[];
renderCart();
}

// LAPORAN
function tampilLaporan(){
let data = JSON.parse(localStorage.getItem("transaksi")) || [];
let html="";
let total=0;

data.forEach(d=>{
html+=`<div>${d.nama} - Rp ${d.total}</div>`;
total+=d.total;
});

html+=`<hr>Total Pendapatan: Rp ${total}`;

document.getElementById("laporan").innerHTML=html;
}

tampilLaporan();