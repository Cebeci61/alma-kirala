

const showcaseGrid = document.getElementById("showcaseGrid");
const popularProductsEl = document.getElementById("popularProducts");
const featuredStoresEl = document.getElementById("featuredStores");

if (showcaseGrid) {
  showcaseGrid.innerHTML = showcaseProducts.map(item => `
    <a href="product-detail.html" class="ak-mini-card">
      <div class="ak-mini-img"></div>
      <h4>${item.title}</h4>
      <p>${item.price}</p>
    </a>
  `).join("");
}

if (popularProductsEl) {
  popularProductsEl.innerHTML = popularProducts.map(item => `
    <a href="product-detail.html" class="ak-product-card">
      <div class="ak-product-img"></div>
      <div class="ak-heart">♡</div>

      <div class="ak-product-content">
        <h3>${item.title}</h3>
        <div class="ak-product-meta">
          ${item.city} • ${item.store} • ⭐ 4.9
        </div>
        <div class="ak-product-price">${item.price}</div>

        <div class="ak-product-labels">
          ${item.labels.map(label => `<span class="ak-label">${label}</span>`).join("")}
        </div>
      </div>
    </a>
  `).join("");
}

if (featuredStoresEl) {
  featuredStoresEl.innerHTML = stores.map(store => `
    <a href="store-detail.html" class="ak-store-card">
      <div class="ak-store-cover"></div>

      <div class="ak-store-body">
        <div class="ak-store-logo">${store.name.substring(0, 2).toUpperCase()}</div>
        <h3>${store.name}</h3>
        <p>${store.city} • ${store.category}</p>
        <strong>⭐ ${store.rating}</strong>
      </div>
    </a>
  `).join("");
}