const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001/api"
    : "https://alma-kirala-api.onrender.com/api";

async function loadReservations() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/reservations/my`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    const container = document.getElementById("reservation-list");
    container.innerHTML = "";

    const reservations = Array.isArray(data)
      ? data
      : data.reservations || data.data || [];

    reservations.forEach(r => {
      container.innerHTML += `
        <div class="reservation-card">
          <h3>${r.product?.title || "Ürün adı yok"}</h3>
          <p>${r.product?.description || ""}</p>

          <strong>${r.product?.price || 0} TL</strong>

          <p>Durum: ${r.status || "Beklemede"}</p>
          <p>Başlangıç: ${r.startDate ? new Date(r.startDate).toLocaleDateString("tr-TR") : "-"}</p>
          <p>Bitiş: ${r.endDate ? new Date(r.endDate).toLocaleDateString("tr-TR") : "-"}</p>
        </div>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}

loadReservations();