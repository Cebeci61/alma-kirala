const API_URL = "http://localhost:5001/api";

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

    data.forEach(r => {
      container.innerHTML += `
        <div class="reservation-card">
          <h3>${r.product.title}</h3>
          <p>${r.product.description}</p>

          <strong>${r.product.price} TL</strong>

          <p>Durum: ${r.status}</p>
          <p>Başlangıç: ${new Date(r.startDate).toLocaleDateString()}</p>
          <p>Bitiş: ${new Date(r.endDate).toLocaleDateString()}</p>
        </div>
      `;
    });

  } catch (error) {
    console.log(error);
  }
}

loadReservations();