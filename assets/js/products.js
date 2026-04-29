const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/api"
    : "https://alma-kirala-api.onrender.com/api";
const productList = document.getElementById("product-list");
const resultCount = document.getElementById("resultCount");
const heroTotalCount = document.getElementById("heroTotalCount");
const emptyState = document.getElementById("emptyState");
const paginationBox = document.getElementById("pagination");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const applyFilters = document.getElementById("applyFilters");
const clearFilters = document.getElementById("clearFilters");

let currentPage = 1;
const limit = 6;

async function loadProducts(page = 1) {
  try {
    currentPage = page;

    const params = new URLSearchParams();

    if (searchInput.value.trim()) {
      params.append("search", searchInput.value.trim());
    }

    if (minPrice.value) {
      params.append("minPrice", minPrice.value);
    }

    if (maxPrice.value) {
      params.append("maxPrice", maxPrice.value);
    }

    params.append("page", currentPage);
    params.append("limit", limit);

    const res = await fetch(`${API_URL}/products?${params.toString()}`);
    const data = await res.json();

    renderProducts(data.products || []);
    renderPagination(data.pagination);

    resultCount.textContent = `${data.pagination.total} sonuç bulundu`;
    heroTotalCount.textContent = data.pagination.total;

  } catch (error) {
    console.log("Ürünler yüklenemedi:", error);
  }
}

function renderProducts(products) {
  productList.innerHTML = "";

  if (!products.length) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  products.forEach((p) => {
    productList.innerHTML += `
      <a href="product-detail.html?id=${p.id}" class="product-card">
        <div class="product-image">
          <span>AK</span>
        </div>

        <div class="product-info">
          <div class="product-top">
            <span class="product-badge">Kiralık</span>
            <span class="product-price">${p.price} TL / gün</span>
          </div>

          <h3>${p.title}</h3>
          <p>${p.description || "Açıklama bulunmuyor."}</p>

          <div class="product-store">
            <strong>${p.store?.name || "Mağaza"}</strong>
            <span>${p.store?.status === "active" ? "Aktif mağaza" : "Mağaza"}</span>
          </div>
        </div>
      </a>
    `;
  });
}

function renderPagination(pagination) {
  if (!paginationBox || !pagination) return;

  paginationBox.innerHTML = "";

  if (pagination.totalPages <= 1) return;

  for (let i = 1; i <= pagination.totalPages; i++) {
    paginationBox.innerHTML += `
      <button 
        class="${i === pagination.page ? "active" : ""}" 
        onclick="loadProducts(${i})">
        ${i}
      </button>
    `;
  }
}

searchButton.addEventListener("click", () => loadProducts(1));
applyFilters.addEventListener("click", () => loadProducts(1));

clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  minPrice.value = "";
  maxPrice.value = "";
  loadProducts(1);
});

loadProducts();