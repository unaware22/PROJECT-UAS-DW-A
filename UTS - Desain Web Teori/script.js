// Fungsi untuk menambahkan item ke dalam localStorage
function addToCart(name, price, event) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Mendapatkan URL gambar dari elemen yang di-click
    const imageUrl = event.target.parentElement.querySelector('img').src;

    // Memeriksa apakah item sudah ada di keranjang
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        // Jika item sudah ada, tambahkan quantity
        cart[itemIndex].quantity += 1;
    } else {
        // Jika item belum ada, tambahkan item baru
        cart.push({
            name: name,
            price: price,
            image: imageUrl,
            quantity: 1
        });
    }

    // Simpan keranjang yang diperbarui ke dalam localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} berhasil ditambahkan ke keranjang!`,
        showConfirmButton: false,
        timer: 2000,
      });
   
}

// Fungsi untuk menampilkan item dari localStorage ke dalam keranjang
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = '';

    let totalAmount = 0;

    // Tampilkan setiap item di keranjang
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
            <p>${item.name}</p>
            <p>Harga: Rp${item.price}</p>
            <p>Jumlah: 
                <button onclick="updateQuantity(${index}, -1)">-</button> 
                ${item.quantity} 
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </p>
            <button onclick="removeItem(${index})" class="remove-btn">Hapus</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalAmount += item.price * item.quantity;
    });

    // Tampilkan total harga
    document.getElementById('totalAmount').textContent = `Total: Rp${totalAmount}`;
}

// Fungsi untuk memperbarui jumlah item di keranjang
function updateQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += amount;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Hapus item jika jumlahnya 0
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Perbarui tampilan keranjang
}

document.getElementById('cartItemsContainer').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const index = Array.from(document.querySelectorAll('.remove-btn')).indexOf(event.target);
        removeItem(index);
    }
});


function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (index < 0 || index >= cart.length) return; // Validasi indeks

    Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Item akan dihapus dari keranjang Anda!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            cart.splice(index, 1); // Hapus item berdasarkan indeks
            localStorage.setItem('cart', JSON.stringify(cart)); // Simpan perubahan
            displayCartItems(); // Perbarui tampilan keranjang
            Swal.fire("Terhapus!", "Item telah dihapus dari keranjang.", "success");
        }
    });
}


function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        Swal.fire({
            title: "Keranjang Kosong!",
            text: "Silakan tambahkan barang ke keranjang sebelum melanjutkan ke pembayaran.",
            icon: "warning",
            confirmButtonText: "OK",
        });
        return;
    }

    Swal.fire({
        title: "Lanjutkan Checkout?",
        text: "Anda yakin ingin melanjutkan ke pembayaran?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Checkout",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart'); // Hapus semua item
            displayCartItems(); // Perbarui tampilan keranjang
            Swal.fire("Checkout Berhasil!", "Terima kasih telah berbelanja.", "success");
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    document.querySelector('.checkout-btn').addEventListener('click', checkout);
});


// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();

    // Tambahkan event listener ke tombol checkout
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
});

