const API_BASE = "https://alma-kirala-api.onrender.com";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);

    alert("Giriş başarılı");
    window.location.href = "index.html";
  } else {
    alert(data.message);
  }
}