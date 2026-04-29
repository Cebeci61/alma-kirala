const showcaseProducts = [
  {
    title: "Sony A7 IV Kamera Seti",
    price: "₺850 / gün"
  },
  {
    title: "DJI Mini 4 Pro Drone",
    price: "₺650 / gün"
  },
  {
    title: "Premium Nişan Elbisesi",
    price: "₺500 / gün"
  },
  {
    title: "Etkinlik Ses Sistemi",
    price: "₺900 / gün"
  },
  {
    title: "Projeksiyon Cihazı",
    price: "₺300 / gün"
  },
  {
    title: "Matkap ve Tamir Seti",
    price: "₺180 / gün"
  },
  {
    title: "GoPro Aksiyon Kamera",
    price: "₺280 / gün"
  },
  {
    title: "Kamp Çadırı",
    price: "₺220 / gün"
  },
  {
    title: "Işık Seti",
    price: "₺350 / gün"
  },
  {
    title: "Düğün Masa Takımı",
    price: "₺1.200 / gün"
  }
];

const popularProducts = [
  {
    title: "Sony A7 IV Kamera Seti",
    city: "İstanbul / Kadıköy",
    store: "Kamera Dünyam",
    price: "₺850 / gün",
    labels: ["Bugün müsait", "Doğrulanmış"]
  },
  {
    title: "DJI Mini 4 Pro Drone",
    city: "Ankara / Çankaya",
    store: "Drone Kirala",
    price: "₺650 / gün",
    labels: ["Sponsorlu", "Depozito Var"]
  },
  {
    title: "Premium Nişan Elbisesi",
    city: "İzmir / Konak",
    store: "Moda Vitrini",
    price: "₺500 / gün",
    labels: ["Popüler", "Depozitosuz"]
  },
  {
    title: "Etkinlik Ses Sistemi",
    city: "Antalya / Muratpaşa",
    store: "Event Pro",
    price: "₺900 / gün",
    labels: ["Premium", "Kurulum Dahil"]
  }
];

const stores = [
  {
    name: "Kamera Dünyam",
    city: "İstanbul",
    rating: "4.9",
    category: "Kamera & Video"
  },
  {
    name: "Event Pro",
    city: "Antalya",
    rating: "4.8",
    category: "Etkinlik"
  },
  {
    name: "Moda Vitrini",
    city: "İzmir",
    rating: "4.7",
    category: "Özel Gün"
  },
  {
    name: "Tamir Market",
    city: "Trabzon",
    rating: "4.8",
    category: "Yapı & Tamir"
  }
];

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