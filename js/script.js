/* ===============================
   LOGIN
================================ */
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const valid = users.some(
    u => u.email === email && u.password === password
  );

  const container = document.getElementById("authContainer");

  if (valid) {
    const popup = document.getElementById("successPopup");
    container.classList.add("blur");
    popup.classList.add("show");

    setTimeout(() => popup.classList.add("fade-out"), 1200);
    setTimeout(() => (window.location.href = "dashboard.html"), 1500);
  } else {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.classList.add("show");
    setTimeout(() => errorPopup.classList.remove("show"), 1500);
  }
}

/* ===============================
   MODAL
================================ */
function showModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

/* ===============================
   STOK (LOCAL STORAGE)
================================ */
let stokData = JSON.parse(localStorage.getItem("stokData")) || dataBahanAjar;
localStorage.setItem("stokData", JSON.stringify(stokData));

function tampilkanStok() {
  const table = document.getElementById("stokTable");
  if (!table) return;

  table.innerHTML = `
    <tr>
      <th>Nama Bahan Ajar</th>
      <th>Stok</th>
    </tr>
  `;

  stokData.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.stok}</td>
      </tr>
    `;
  });
}

function tambahStok() {
  const nama = document.getElementById("namaBahan").value;
  const stok = document.getElementById("stokBahan").value;

  if (!nama || !stok) {
    alert("Data tidak boleh kosong");
    return;
  }

  stokData.push({ nama, stok: parseInt(stok) });
  localStorage.setItem("stokData", JSON.stringify(stokData));

  tampilkanStok();

  document.getElementById("namaBahan").value = "";
  document.getElementById("stokBahan").value = "";
}

/* ===============================
   TRACKING (TABLE VERSION)
================================ */
function cariPengiriman() {
  const input = document.getElementById("noDO").value.trim();
  const hasil = document.getElementById("hasilTracking");

  const data = dataPengiriman.find(p => p.noDO === input);

  if (data) {
    hasil.innerHTML = `
      <tr>
        <td>${data.noDO}</td>
        <td>${data.nama}</td>
        <td>
          <span class="status ${data.status === "Sudah" ? "selesai" : "kirim"}">
            ${data.status}
          </span>
        </td>
        <td>${data.ekspedisi}</td>
        <td>${data.tanggal}</td>
        <td>${data.paket}</td>
        <td>Rp ${data.total}</td>
      </tr>
    `;
  } else {
    hasil.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;color:red;">
          Data tidak ditemukan
        </td>
      </tr>
    `;
  }
}

/* ===============================
   LOGOUT
================================ */
function logout() {
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "login.html";
  }
}

/* ===============================
   DASHBOARD INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* STATS */
  if (document.getElementById("totalUser")) {
    document.getElementById("totalUser").textContent = users.length;
    document.getElementById("totalBahan").textContent = stokData.length;
    document.getElementById("totalPengiriman").textContent = dataPengiriman.length;
  }

  /* TABLE STOK (DASHBOARD) */
  tampilkanStok();

  /* TABLE PENGIRIMAN (DASHBOARD) */
  const pengirimanTable = document.getElementById("pengirimanTable");
  if (!pengirimanTable) return;


  dataPengiriman.forEach(p => {
    pengirimanTable.innerHTML += `
      <tr>
        <td>${p.noDO}</td>
        <td>${p.nama}</td>
        <td>
          <span class="status ${p.status === "Sudah" ? "selesai" : "kirim"}">
            ${p.status}
          </span>
        </td>
        <td>${p.ekspedisi}</td>
      </tr>
    `;
  });
});

function showModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}


