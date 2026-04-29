const API_URL = "http://localhost:5001/api";

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadProductFromAPI() {
  const id = getIdFromUrl();
  if (!id) return;

  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const p = await res.json();

    document.getElementById("productTitle").textContent = p.title;
    document.getElementById("productDescription").textContent = p.description || "";
    document.getElementById("productPrice").textContent = p.price + " TL";

    document.getElementById("sellerName").textContent = p.store.name;

  } catch (e) {
    console.log(e);
  }
}

loadProductFromAPI();