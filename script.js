// Toggle
const navbarBtn = document.getElementById("navbar-btn");
const mobileMenu = document.getElementById("mobile-menu");

navbarBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Filter Button
const filterButtons = document.querySelectorAll(".filter-button");
const menuItems = document.querySelectorAll(".menu-item");

// Function to apply filter
function applyFilter(filter) {
  // Highlight the active button
  filterButtons.forEach((btn) => {
    btn.classList.remove("bg-yellow-500");
    btn.classList.add("bg-gray-700");
  });
  const activeButton = document.querySelector(`.filter-button[data-filter="${filter}"]`);
  if (activeButton) {
    activeButton.classList.add("bg-yellow-500");
    activeButton.classList.remove("bg-gray-700");
  }

  // Show/Hide menu items based on filter
  menuItems.forEach((item) => {
    if (filter === "all" || item.getAttribute("data-category") === filter) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Default: Apply 'All' filter on page load
applyFilter("all");

// Add event listener to each filter button
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    applyFilter(filter);
  });
});

// CART
const toggleCartButton = document.getElementById("toggleCartButton");
const closeCartButton = document.getElementById("closeCartButton");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton1 = document.getElementById("checkoutButton");

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage

// Open cart
toggleCartButton.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-full");
  toggleCartButton.classList.add("hidden");
  renderCartItems();
});

// Close cart
closeCartButton.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
  toggleCartButton.classList.remove("hidden");
});

// Add item to cart
function addToCart(button) {
  const name = button.getAttribute("data-name");
  const price = parseInt(button.getAttribute("data-price"), 10);
  const image = button.getAttribute("data-image");

  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1; // Tambahkan jumlah
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  saveCart();
  renderCartItems();
  updateCartNotification();

  Swal.fire({
    position: "center",
    icon: "success",
    title: `${name} berhasil ditambahkan ke keranjang!`,
    showConfirmButton: false,
    timer: 2000,
  });
}

// Remove item from cart
function removeFromCart(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Item has been removed from your cart.",
        icon: "success",
      });
      cart.splice(index, 1); // Hapus item
      saveCart();
      renderCartItems();
      updateCartNotification();
    }
  });
}

// Increase item quantity
function increaseQuantity(index) {
  cart[index].quantity += 1;
  saveCart();
  renderCartItems();
  updateCartNotification();
}

// Decrease item quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    removeFromCart(index);
    return;
  }
  saveCart();
  renderCartItems();
  updateCartNotification();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Fungsi untuk update notifikasi
function updateCartNotification() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems > 0) {
    cartNotification.textContent = totalItems;
    cartNotification.classList.remove("hidden");
  } else {
    cartNotification.classList.add("hidden");
  }
}

// Fungsi renderCartItems...
function renderCartItems() {
  cartItems.innerHTML = ""; // Clear previous items
  let subtotal = 0;
  const taxRate = 0.1;
  let tax = 0;
  let total = 0;

  cart.forEach((item, index) => {
    const { name, price, image, quantity } = item;
    subtotal += price * quantity;

    const itemElement = document.createElement("div");
    itemElement.classList.add("flex", "items-center", "justify-between", "bg-gray-800", "p-4", "rounded", "mb-2");

    itemElement.innerHTML = `
      <div class="flex items-center">
        <img src="${image}" alt="${name}" class="xl:w-36 xl:h-36 sm360:w-16 sm360:h-16 object-cover rounded mr-4">
        <div>
          <h3 class="font-semibold">${name}</h3>
          <p class="text-sm text-gray-400">Rp. ${price.toLocaleString("id-ID")} x ${quantity}</p>
        </div>
      </div>
      <div class="flex items-center">
        <button class="px-2 py-1 text-sm bg-gray-700 text-white rounded mr-2" onclick="decreaseQuantity(${index})">-</button>
        <button class="px-2 py-1 text-sm bg-gray-700 text-white rounded" onclick="increaseQuantity(${index})">+</button>
        <button 
          class="ml-4 text-red-500 hover:text-red-700 transition"
          onclick="removeFromCart(${index})">
          Remove
        </button>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });

  tax = subtotal * taxRate;
  total = subtotal + tax;

  cartTotal.innerHTML = `
    <div class="text-sm text-gray-400 mb-2">Subtotal: Rp. ${subtotal.toLocaleString("id-ID")}</div>
    <div class="text-sm text-gray-400 mb-2">Tax (10%): Rp. ${tax.toLocaleString("id-ID")}</div>
    <div class="text-lg font-bold">Total: Rp. ${total.toLocaleString("id-ID")}</div>
  `;
  updateCartNotification(); // Update notifikasi setiap render
}

// Jalankan saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  updateCartNotification();
});

// DOM Elements
const takeawayCheckbox = document.getElementById("takeawayCheckbox");

// Disable "Book Table" if Takeaway is selected
takeawayCheckbox.addEventListener("change", () => {
  if (takeawayCheckbox.checked) {
    bookTableBtn.disabled = true; // Disable Book Table
    bookTableBtn.classList.add("bg-gray-500", "cursor-not-allowed");
    tableBooked = false; // Reset booking status if previously booked
  } else {
    bookTableBtn.disabled = false; // Enable Book Table
    bookTableBtn.classList.remove("bg-gray-500", "cursor-not-allowed");
  }
});

// Checkout
checkoutButton1.addEventListener("click", () => {
  if (!tableBooked && !takeawayCheckbox.checked) {
    Swal.fire({
      title: "Selection Required",
      text: "Please choose either 'Book Table' or 'Takeaway' before proceeding to checkout.",
      icon: "warning",
    });
    return;
  }

  if (cart.length === 0) {
    Swal.fire({
      title: "Error",
      text: "Your cart is empty.",
      icon: "error",
    });
    return;
  }

  const checkoutMessage = takeawayCheckbox.checked ? "Thank you for choosing takeaway!" : "Thank you for booking a table!";

  // Confirm checkout
  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to complete the payment of Rp. ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("id-ID")}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, pay now!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Payment Successful",
        text: checkoutMessage,
        icon: "success",
      });

      // Reset cart and booking
      cart = [];
      saveCart();
      renderCartItems();

      // Reset table booking if applicable
      if (!takeawayCheckbox.checked) {
        tableBooked = false;
        bookTableBtn.disabled = false;
        bookTableBtn.textContent = "Book Table";
        bookTableBtn.classList.remove("bg-gray-500", "cursor-not-allowed");

        // Deselect Table
        if (selectedTable) {
          selectedTable.classList.remove("bg-green-300");
          selectedTable = null;
        }
      }

      // Reset Takeaway checkbox after checkout
      takeawayCheckbox.checked = false;

      // Ensure "Book Table" button is enabled after reset
      bookTableBtn.disabled = false;
      bookTableBtn.classList.remove("bg-gray-500", "cursor-not-allowed");
    }
  });
});

// Initial render
renderCartItems();

// API JADWAL
const API_KEY = "1aae3fba4ac64352ba3bc853b0f65389"; // Ganti dengan API Key Anda

// Mendapatkan jadwal buka restoran berdasarkan koordinat
fetch(`https://api.opencagedata.com/geocode/v1/json?q=-6.2088,106.8456&key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      console.error("Error:", data.error);
      return;
    }

    // Mendapatkan zona waktu restoran
    const timezone = data.results[0].annotations.timezone.name;

    // Mengambil jadwal buka sesuai zona waktu
    const schedule = {
      "Asia/Jakarta": {
        sunday: "10:00 - 21:00",
        monday: "09:00 - 22:00",
        tuesday: "09:00 - 22:00",
        wednesday: "09:00 - 22:00",
        thursday: "09:00 - 22:00",
        friday: "09:00 - 23:00",
        saturday: "10:00 - 23:00",
      },
    };

    // Mengambil hari-hari untuk ditampilkan
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = new Date().getDay();
    const nextDay = (today + 1) % 7;
    const selectedDays = [daysOfWeek[today], daysOfWeek[nextDay]];

    const scheduleContainer = document.querySelector(".space-y-2");
    scheduleContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan data baru

    selectedDays.forEach((day, index) => {
      const scheduleDiv = document.createElement("div");

      // Menentukan gaya background untuk hari pertama dan kedua
      const isFirstDay = index === 0; // Hari pertama (misalnya hari ini)
      const backgroundClass = isFirstDay ? "bg-white text-black" : "bg-transparent text-white";

      scheduleDiv.className = `
        flex flex-col md:flex-row sm360:flex-row items-center justify-between gap-4 
        p-2 rounded-md border ${backgroundClass}
        `;
      scheduleDiv.innerHTML = `
        <p class="font-bold sm360:text-sm md:text-lg xl:text-xl">${day.toUpperCase()}</p>
        <p class="sm360:text-sm md:text-lg xl:text-xl">${schedule[timezone][day]}</p>
        `;
      scheduleContainer.appendChild(scheduleDiv);
    });
  })
  .catch((error) => console.error("Failed to fetch schedule:", error));

// Book table
// Booking Table Logic
const bookTableBtn = document.getElementById("bookTableBtn");
const tableModal = document.getElementById("tableModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const bookNowBtn = document.getElementById("bookNowBtn");
const tableButtons = document.querySelectorAll(".table-btn");
let selectedTable = null; // Track selected table
let tableBooked = false; // Track booking status

// Show modal
bookTableBtn.addEventListener("click", () => {
  tableModal.classList.remove("hidden");
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  tableModal.classList.add("hidden");
});

// Select table
tableButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return; // Skip disabled tables

    // Deselect previously selected table
    if (selectedTable) {
      selectedTable.classList.remove("bg-green-300");
    }

    // Select new table
    selectedTable = button;
    selectedTable.classList.add("bg-green-300");

    // Enable "Book Now" button
    bookNowBtn.disabled = false;
  });
});

// Book the table
bookNowBtn.addEventListener("click", () => {
  if (selectedTable) {
    Swal.fire({
      title: `Table ${selectedTable.dataset.tableId} booked successfully!`,
      icon: "success",
    });

    tableModal.classList.add("hidden");

    // Mark table as booked
    bookTableBtn.disabled = true;
    bookTableBtn.textContent = `Table ${selectedTable.dataset.tableId} Booked`;
    bookTableBtn.classList.add("bg-gray-500", "cursor-not-allowed");
    tableBooked = true; // Update booking status
  }
});

function showPopup(imageSrc, title, description, rating, price) {
  // Mengatur konten popup
  document.getElementById("popup-img").src = imageSrc;
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-description").textContent = description;
  document.getElementById("popup-price").textContent = `Rp. ${price.toLocaleString()}`;

  // Menambahkan rating bintang
  const ratingContainer = document.getElementById("popup-rating");
  ratingContainer.innerHTML = ""; // Bersihkan rating sebelumnya
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    ratingContainer.innerHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
          <path d="M11.48 3.5a.562.562 0 0 1 1.04 0l2.125 5.11a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.98 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557L3.04 9.985a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
        </svg>`;
  }

  if (halfStar) {
    ratingContainer.innerHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stop-color="currentColor"></stop>
              <stop offset="50%" stop-color="transparent"></stop>
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M11.48 3.5a.562.562 0 0 1 1.04 0l2.125 5.11a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.98 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557L3.04 9.985a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
        </svg>`;
  }

  // Tampilkan popup
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  // Sembunyikan popup
  document.getElementById("popup").classList.add("hidden");
}
