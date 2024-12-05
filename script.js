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
