document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      title: "Sony A7 IV Kamera Seti",
      category: "kamera",
      categoryText: "Fotoğraf & Kamera",
      city: "Trabzon",
      district: "Ortahisar",
      price: 450,
      rating: 4.8,
      brand: "Sony",
      availableToday: true,
      verifiedStore: true,
      noDeposit: false,
      sponsored: true,
      newest: 9,
      image: "assets/images/product-placeholder.jpg"
    },
    {
      id: 2,
      title: "Canon EOS R6 Profesyonel Kamera",
      category: "kamera",
      categoryText: "Fotoğraf & Kamera",
      city: "İstanbul",
      district: "Kadıköy",
      price: 600,
      rating: 4.9,
      brand: "Canon",
      availableToday: true,
      verifiedStore: true,
      noDeposit: true,
      sponsored: false,
      newest: 8,
      image: "assets/images/product-placeholder.jpg"
    },
    {
      id: 3,
      title: "DJI Mini 4 Pro Drone",
      category: "drone",
      categoryText: "Drone",
      city: "Ankara",
      district: "Çankaya",
      price: 750,
      rating: 4.7,
      brand: "DJI",
      availableToday: false,
      verifiedStore: true,
      noDeposit: false,
      sponsored: true,
      newest: 7,
      image: "assets/images/product-placeholder.jpg"
    },
    {
      id: 4,
      title: "GoPro Hero Aksiyon Kamera",
      category: "kamera",
      categoryText: "Fotoğraf & Kamera",
      city: "Antalya",
      district: "Muratpaşa",
      price: 280,
      rating: 4.5,
      brand: "GoPro",
      availableToday: true,
      verifiedStore: false,
      noDeposit: true,
      sponsored: false,
      newest: 6,
      image: "assets/images/product-placeholder.jpg"
    },
    {
      id: 5,
      title: "Premium Gelinlik Kiralama",
      category: "moda",
      categoryText: "Moda & Özel Gün",
      city: "İzmir",
      district: "Konak",
      price: 900,
      rating: 4.6,
      brand: "Premium",
      availableToday: true,
      verifiedStore: true,
      noDeposit: false,
      sponsored: false,
      newest: 5,
      image: "assets/images/product-placeholder.jpg"
    },
    {
      id: 6,
      title: "Profesyonel Matkap Seti",
      category: "tamir",
      categoryText: "Yapı & Tamir",
      city: "Antalya",
      district: "Muratpaşa",
      price: 180,
      rating: 4.4,
      brand: "Profesyonel",
      availableToday: true,
      verifiedStore: true,
      noDeposit: true,
      sponsored: false,
      newest: 4,
      image: "assets/images/product-placeholder.jpg"
    },
    {
      id: 7,
      title: "Etkinlik Ses Sistemi",
      category: "etkinlik",
      categoryText: "Etkinlik & Organizasyon",
      city: "Trabzon",
      district: "Ortahisar",
      price: 650,
      rating: 4.5,
      brand: "Profesyonel",
      availableToday: false,
      verifiedStore: true,
      noDeposit: false,
      sponsored: true,
      newest: 3,
      image: "assets/images/product-placeholder.jpg"
    },
    {
      id: 8,
      title: "DJI Air 3 Fly More Combo",
      category: "drone",
      categoryText: "Drone",
      city: "İstanbul",
      district: "Kadıköy",
      price: 950,
      rating: 4.9,
      brand: "DJI",
      availableToday: true,
      verifiedStore: true,
      noDeposit: false,
      sponsored: false,
      newest: 2,
      image: "assets/images/product-placeholder.jpg"
    },
    {
      id: 9,
      title: "Organizasyon Işık Sistemi",
      category: "etkinlik",
      categoryText: "Etkinlik & Organizasyon",
      city: "Ankara",
      district: "Çankaya",
      price: 520,
      rating: 4.3,
      brand: "Profesyonel",
      availableToday: true,
      verifiedStore: false,
      noDeposit: true,
      sponsored: false,
      newest: 1,
      image: "assets/images/product-placeholder.jpg"
    }
  ];

  const districtsByCity = {
    all: ["all"],
    İstanbul: ["all", "Kadıköy"],
    Ankara: ["all", "Çankaya"],
    İzmir: ["all", "Konak"],
    Antalya: ["all", "Muratpaşa"],
    Trabzon: ["all", "Ortahisar"]
  };

  const productList = document.getElementById("productList");
  const resultCount = document.getElementById("resultCount");
  const resultInfo = document.getElementById("resultInfo");
  const emptyState = document.getElementById("emptyState");
  const activeFilterRow = document.getElementById("activeFilterRow");
  const heroTotalCount = document.getElementById("heroTotalCount");

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const clearFilters = document.getElementById("clearFilters");
  const emptyClearBtn = document.getElementById("emptyClearBtn");
  const applyFilters = document.getElementById("applyFilters");

  const cityFilter = document.getElementById("cityFilter");
  const districtFilter = document.getElementById("districtFilter");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const dateFilter = document.getElementById("dateFilter");
  const availableToday = document.getElementById("availableToday");
  const verifiedStore = document.getElementById("verifiedStore");
  const noDeposit = document.getElementById("noDeposit");
  const sponsoredOnly = document.getElementById("sponsoredOnly");
  const brandFilter = document.getElementById("brandFilter");
  const sortFilter = document.getElementById("sortFilter");

  const mobileFilterBtn = document.getElementById("mobileFilterBtn");
  const filtersPanel = document.getElementById("filters");
  const filterOverlay = document.getElementById("filterOverlay");

  const viewButtons = document.querySelectorAll(".view-btn");
  const quickCategories = document.querySelectorAll(".quick-category");

  const favoriteKey = "almaKiralaFavorites";
  let favorites = JSON.parse(localStorage.getItem(favoriteKey)) || [];

  function getSelectedRadio(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "all";
  }

  function setSelectedRadio(name, value) {
    const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (radio) radio.checked = true;
  }

  function saveFavorites() {
    localStorage.setItem(favoriteKey, JSON.stringify(favorites));
  }

  function updateDistrictOptions() {
    const selectedCity = cityFilter.value;
    const districts = districtsByCity[selectedCity] || ["all"];

    districtFilter.innerHTML = "";

    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district === "all" ? "Tüm İlçeler" : district;
      districtFilter.appendChild(option);
    });
  }

  function sortProducts(list) {
    const sorted = [...list];

    if (sortFilter.value === "lowPrice") {
      sorted.sort((a, b) => a.price - b.price);
    }

    if (sortFilter.value === "highPrice") {
      sorted.sort((a, b) => b.price - a.price);
    }

    if (sortFilter.value === "highRating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    if (sortFilter.value === "newest") {
      sorted.sort((a, b) => b.newest - a.newest);
    }

    if (sortFilter.value === "recommended") {
      sorted.sort((a, b) => {
        if (a.sponsored !== b.sponsored) return Number(b.sponsored) - Number(a.sponsored);
        if (a.verifiedStore !== b.verifiedStore) return Number(b.verifiedStore) - Number(a.verifiedStore);
        return b.rating - a.rating;
      });
    }

    return sorted;
  }

  function renderActiveFilters() {
    const active = [];
    const selectedCategory = getSelectedRadio("category");
    const selectedRating = getSelectedRadio("rating");

    if (searchInput.value.trim()) active.push(`Arama: ${searchInput.value.trim()}`);
    if (selectedCategory !== "all") active.push(`Kategori: ${getCategoryText(selectedCategory)}`);
    if (cityFilter.value !== "all") active.push(`Şehir: ${cityFilter.value}`);
    if (districtFilter.value !== "all") active.push(`İlçe: ${districtFilter.value}`);
    if (minPrice.value) active.push(`Min: ₺${minPrice.value}`);
    if (maxPrice.value) active.push(`Max: ₺${maxPrice.value}`);
    if (dateFilter.value) active.push(`Tarih: ${dateFilter.value}`);
    if (availableToday.checked) active.push("Bugün müsait");
    if (verifiedStore.checked) active.push("Doğrulanmış");
    if (noDeposit.checked) active.push("Depozitosuz");
    if (sponsoredOnly.checked) active.push("Sponsorlu");
    if (selectedRating !== "all") active.push(`${selectedRating}+ puan`);
    if (brandFilter.value !== "all") active.push(`Marka: ${brandFilter.value}`);

    activeFilterRow.innerHTML = "";

    if (active.length === 0) {
      activeFilterRow.classList.remove("show");
      return;
    }

    activeFilterRow.classList.add("show");

    active.forEach((item) => {
      activeFilterRow.innerHTML += `<span class="active-filter-chip">${item}</span>`;
    });
  }

  function getCategoryText(category) {
    const map = {
      all: "Tümü",
      kamera: "Fotoğraf & Kamera",
      drone: "Drone",
      etkinlik: "Etkinlik",
      moda: "Moda",
      tamir: "Yapı & Tamir"
    };

    return map[category] || category;
  }

  function renderProducts(list) {
    productList.innerHTML = "";

    if (list.length === 0) {
      emptyState.classList.add("show");
      resultCount.textContent = "0 sonuç bulundu";
      resultInfo.textContent = "Filtreleri genişleterek tekrar deneyebilirsin.";
      renderActiveFilters();
      return;
    }

    emptyState.classList.remove("show");

    list.forEach((product) => {
      const isFavorite = favorites.includes(product.id);

      productList.innerHTML += `
        <a href="product-detail.html?id=${product.id}" class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.title}">

            <div class="product-badges">
              ${product.sponsored ? `<span class="product-badge badge-sponsored">Sponsorlu</span>` : ""}
              ${product.availableToday ? `<span class="product-badge badge-available">Bugün Müsait</span>` : ""}
              ${product.verifiedStore ? `<span class="product-badge badge-verified">Doğrulanmış</span>` : ""}
              ${product.noDeposit ? `<span class="product-badge badge-deposit">Depozitosuz</span>` : ""}
            </div>

            <button class="favorite-btn ${isFavorite ? "active" : ""}" type="button" data-id="${product.id}">
              ${isFavorite ? "♥" : "♡"}
            </button>
          </div>

          <div class="product-body">
            <div>
              <span class="product-category">${product.categoryText}</span>

              <h3>${product.title}</h3>

              <div class="product-meta">
                <span>${product.city}</span>
                <span>•</span>
                <span>${product.district}</span>
              </div>

              <div class="product-rating">
                ★★★★★ <span>${product.rating} mağaza puanı</span>
              </div>
            </div>

            <div class="product-footer">
              <div class="product-price">
                ₺${product.price} <span>/ gün</span>
              </div>

              <div class="detail-link">Detayları Gör</div>
            </div>
          </div>
        </a>
      `;
    });

    resultCount.textContent = `${list.length} sonuç bulundu`;
    resultInfo.textContent = "Sonuçlar filtrelerine göre güncellendi.";

    renderActiveFilters();
    bindFavoriteButtons();
  }

  function filterProducts() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = getSelectedRadio("category");
    const selectedRating = getSelectedRadio("rating");

    let filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchText) ||
        product.categoryText.toLowerCase().includes(searchText) ||
        product.city.toLowerCase().includes(searchText) ||
        product.district.toLowerCase().includes(searchText) ||
        product.brand.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesCity =
        cityFilter.value === "all" || product.city === cityFilter.value;

      const matchesDistrict =
        districtFilter.value === "all" || product.district === districtFilter.value;

      const matchesMinPrice =
        minPrice.value === "" || product.price >= Number(minPrice.value);

      const matchesMaxPrice =
        maxPrice.value === "" || product.price <= Number(maxPrice.value);

      const matchesAvailable =
        !availableToday.checked || product.availableToday;

      const matchesVerified =
        !verifiedStore.checked || product.verifiedStore;

      const matchesDeposit =
        !noDeposit.checked || product.noDeposit;

      const matchesSponsored =
        !sponsoredOnly.checked || product.sponsored;

      const matchesRating =
        selectedRating === "all" || product.rating >= Number(selectedRating);

      const matchesBrand =
        brandFilter.value === "all" || product.brand === brandFilter.value;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity &&
        matchesDistrict &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesAvailable &&
        matchesVerified &&
        matchesDeposit &&
        matchesSponsored &&
        matchesRating &&
        matchesBrand
      );
    });

    renderProducts(sortProducts(filtered));
  }

  function resetFilters() {
    searchInput.value = "";
    cityFilter.value = "all";
    updateDistrictOptions();
    districtFilter.value = "all";
    minPrice.value = "";
    maxPrice.value = "";
    dateFilter.value = "";
    availableToday.checked = false;
    verifiedStore.checked = false;
    noDeposit.checked = false;
    sponsoredOnly.checked = false;
    brandFilter.value = "all";
    sortFilter.value = "recommended";

    setSelectedRadio("category", "all");
    setSelectedRadio("rating", "all");

    quickCategories.forEach((btn) => btn.classList.remove("active"));
    const allQuick = document.querySelector('.quick-category[data-category="all"]');
    if (allQuick) allQuick.classList.add("active");

    filterProducts();
  }

  function bindFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const id = Number(button.dataset.id);

        if (favorites.includes(id)) {
          favorites = favorites.filter((item) => item !== id);
        } else {
          favorites.push(id);
        }

        saveFavorites();

        button.classList.toggle("active");
        button.textContent = button.classList.contains("active") ? "♥" : "♡";
      });
    });
  }

  function setView(view) {
    if (view === "list") {
      productList.classList.add("list-view");
    } else {
      productList.classList.remove("list-view");
    }

    viewButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === view);
    });
  }

  function openMobileFilters() {
    filtersPanel.classList.add("open");
    filterOverlay.classList.add("show");
  }

  function closeMobileFilters() {
    filtersPanel.classList.remove("open");
    filterOverlay.classList.remove("show");
  }

  function syncQuickCategory(category) {
    quickCategories.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });
  }

  function initEvents() {
    searchButton.addEventListener("click", filterProducts);

    searchInput.addEventListener("input", filterProducts);

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") filterProducts();
    });

    applyFilters.addEventListener("click", () => {
      filterProducts();
      closeMobileFilters();
    });

    clearFilters.addEventListener("click", resetFilters);
    emptyClearBtn.addEventListener("click", resetFilters);

    cityFilter.addEventListener("change", () => {
      updateDistrictOptions();
      filterProducts();
    });

    districtFilter.addEventListener("change", filterProducts);

    [
      minPrice,
      maxPrice,
      dateFilter,
      availableToday,
      verifiedStore,
      noDeposit,
      sponsoredOnly,
      brandFilter,
      sortFilter
    ].forEach((item) => {
      item.addEventListener("change", filterProducts);
      item.addEventListener("input", filterProducts);
    });

    document.querySelectorAll('input[name="category"]').forEach((item) => {
      item.addEventListener("change", () => {
        syncQuickCategory(item.value);
        filterProducts();
      });
    });

    document.querySelectorAll('input[name="rating"]').forEach((item) => {
      item.addEventListener("change", filterProducts);
    });

    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setView(button.dataset.view);
      });
    });

    quickCategories.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.category;

        setSelectedRadio("category", category);
        syncQuickCategory(category);
        filterProducts();
      });
    });

    if (mobileFilterBtn) {
      mobileFilterBtn.addEventListener("click", openMobileFilters);
    }

    if (filterOverlay) {
      filterOverlay.addEventListener("click", closeMobileFilters);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileFilters();
    });
  }

  function init() {
    heroTotalCount.textContent = products.length;
    updateDistrictOptions();
    initEvents();
    renderProducts(sortProducts(products));
  }

  init();
});