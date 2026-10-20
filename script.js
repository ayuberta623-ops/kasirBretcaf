let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();
}

function updateCartDisplay() {
    const list = document.getElementById('cart-list');
    const totalDisp = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        list.innerHTML = "Belum ada pesanan.";
        totalDisp.innerText = "0";
        return;
    }

    list.innerHTML = cart.map((item) => 
        `<div style="display:flex; justify-content:between; margin-bottom:5px;">
            <span>${item.name}</span>
            <span style="margin-left:auto">Rp ${item.price.toLocaleString()}</span>
        </div>`
    ).join('');

    total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisp.innerText = total.toLocaleString();
}

function toggleCashInput() {
    const method = document.getElementById('payMethod').value;
    const cashDiv = document.getElementById('cash-input-div');
    cashDiv.style.display = (method === 'Cash') ? 'block' : 'none';
}

function processPayment() {
    const name = document.getElementById('customerName').value;
    const method = document.getElementById('payMethod').value;
    const cashInput = document.getElementById('cashAmount').value;
    const cash = parseInt(cashInput) || 0;
    
    // Validasi Dasar
    if (!name) { 
        alert("Mohon masukkan nama pembeli."); 
        return; 
    }
    if (cart.length === 0) { 
        alert("Keranjang masih kosong!"); 
        return; 
    }
    
    let change = 0;
    if (method === 'Cash') {
        if (cash < total) { 
            alert("Uang tunai tidak mencukupi!"); 
            return; 
        }
        change = cash - total;
    }

    // Mengisi Data ke Struk
    document.getElementById('r-name').innerText = name;
    document.getElementById('r-time').innerText = new Date().toLocaleString('id-ID');
    document.getElementById('r-total').innerText = total.toLocaleString();
    document.getElementById('r-method').innerText = method;
    
    const rItems = document.getElementById('r-items');
    rItems.innerHTML = cart.map(item => 
        `<div>${item.name} <span style="float:right">Rp ${item.price.toLocaleString()}</span></div>`
    ).join('');

    // Logika baris pembayaran tunai
    const payRow = document.getElementById('r-pay-row');
    const changeRow = document.getElementById('r-change-row');

    if (method === 'Cash') {
        payRow.classList.remove('hidden');
        changeRow.classList.remove('hidden');
        document.getElementById('r-cash').innerText = cash.toLocaleString();
        document.getElementById('r-change').innerText = change.toLocaleString();
    } else {
        payRow.classList.add('hidden');
        changeRow.classList.add('hidden');
    }

    // Tampilkan Struk dan gulung layar ke bawah
    document.getElementById('receipt').style.display = 'block';
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}