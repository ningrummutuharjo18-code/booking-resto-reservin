/* =========================================================
   common.js  -  dipakai halaman yang punya header + sidebar
   (buka/tutup sidebar, popup logout, toast, penjaga login)
   ========================================================= */

/* ---------- penjaga halaman ----------
   Dipanggil di awal tiap halaman yang butuh login.
   peranDiminta: "user" atau "admin"                         */
function wajibLogin(peranDiminta) {
  var sesi = ambilSesi();
  if (!sesi || !cariPengguna(sesi.username)) {
    window.location.replace("login.html");
    return null;
  }
  if (sesi.peran !== peranDiminta) {
    window.location.replace(sesi.peran === "admin" ? "dashboard_super_admin.html" : "dashboard_user.html");
    return null;
  }
  return cariPengguna(sesi.username);
}

/* ---------- toast (pesan kecil di bawah layar) ---------- */
var timerToast = null;
function tampilToast(pesan) {
  var el = document.getElementById("toast");
  if (!el) return;
  el.textContent = pesan;
  el.classList.add("aktif");
  clearTimeout(timerToast);
  timerToast = setTimeout(function () { el.classList.remove("aktif"); }, 2600);
}

/* ---------- popup umum (overlay + class "aktif") ---------- */
function bukaPopup(id) {
  var el = document.getElementById(id);
  if (el) { el.classList.add("aktif"); document.body.style.overflow = "hidden"; }
}
function tutupPopup(id) {
  var el = document.getElementById(id);
  if (el) { el.classList.remove("aktif"); document.body.style.overflow = ""; }
}
// klik area gelap di luar kotak popup = tutup; tombol Esc = tutup semua
function pasangPenutupPopup() {
  var daftar = document.querySelectorAll(".overlay");
  for (var i = 0; i < daftar.length; i++) {
    daftar[i].addEventListener("click", function (e) {
      if (e.target === this) tutupPopup(this.id);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var terbuka = document.querySelectorAll(".overlay.aktif");
    for (var j = 0; j < terbuka.length; j++) tutupPopup(terbuka[j].id);
    tutupSidebar();
  });
}

/* ---------- sidebar ---------- */
function bukaSidebar() {
  var sb = document.getElementById("sidebar");
  var ov = document.getElementById("sidebar_overlay");
  if (sb) sb.classList.add("aktif");
  if (ov) ov.classList.add("aktif");
}
function tutupSidebar() {
  var sb = document.getElementById("sidebar");
  var ov = document.getElementById("sidebar_overlay");
  if (sb) sb.classList.remove("aktif");
  if (ov) ov.classList.remove("aktif");
}
function pasangSidebar() {
  var btnBuka = document.getElementById("btn_menu");
  var btnTutup = document.getElementById("btn_tutup_sidebar");
  var overlay = document.getElementById("sidebar_overlay");
  var btnLogout = document.getElementById("item_logout");
  if (btnBuka) btnBuka.addEventListener("click", bukaSidebar);
  if (btnTutup) btnTutup.addEventListener("click", tutupSidebar);
  if (overlay) overlay.addEventListener("click", tutupSidebar);
  if (btnLogout) btnLogout.addEventListener("click", function () {
    tutupSidebar();
    bukaPopup("popup_logout");
  });
}

/* ---------- popup logout ---------- */
function pasangLogout() {
  var batal = document.getElementById("btn_logout_batal");
  var ya = document.getElementById("btn_logout_ya");
  var btnAdmin = document.getElementById("btn_keluar_admin");
  if (batal) batal.addEventListener("click", function () { tutupPopup("popup_logout"); });
  if (ya) ya.addEventListener("click", function () {
    hapusSesi();
    window.location.href = "login.html";
  });
  if (btnAdmin) btnAdmin.addEventListener("click", function () { bukaPopup("popup_logout"); });
}

/* ---------- mulai (dipanggil tiap halaman) ---------- */
function mulaiHalamanBersama() {
  pasangPenutupPopup();
  pasangSidebar();
  pasangLogout();
}

/* ---------- bantu: isi teks elemen berdasarkan id ---------- */
function isiTeks(id, teks) {
  var el = document.getElementById(id);
  if (el) el.textContent = teks;
}
/* ---------- bantu: baca parameter URL, mis. ?id=2 ---------- */
function ambilParam(nama) {
  var cari = window.location.search.replace("?", "").split("&");
  for (var i = 0; i < cari.length; i++) {
    var pasangan = cari[i].split("=");
    if (pasangan[0] === nama) return decodeURIComponent(pasangan[1] || "");
  }
  return "";
}
/* ---------- bantu: buat elemen foto (gradasi + foto kalau ada) ---------- */
function isiFoto(el, src) {
  if (!el) return;
  var lama = el.querySelector("img");
  if (lama) el.removeChild(lama);
  if (!src) return;
  var img = document.createElement("img");
  img.alt = "";
  img.src = src;
  // kalau file foto belum ada, sembunyikan saja: gradasi krem tetap tampil
  img.onerror = function () { if (img.parentNode) img.parentNode.removeChild(img); };
  el.appendChild(img);
}

/* ---------- bantu: amankan teks sebelum dimasukkan ke innerHTML ---------- */
function esc(teks) {
  return String(teks)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/* ---------- bantu: tanggal hari ini dalam format ISO (YYYY-MM-DD) ---------- */
function isoDariTanggal(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
/* ---------- bantu: 4,6 bukan 4.6 ---------- */
function komaDesimal(angka) { return String(angka).replace(".", ","); }

/* ---------- bantu: tampilkan / hapus pesan error di bawah kolom form ----------
   Pesan ditaruh di elemen [data-error="nama"], kolomnya ditandai class "salah". */
function setError(nama, teks) {
  var p = document.querySelector('[data-error="' + nama + '"]');
  var el = document.getElementById(nama);
  if (p) p.textContent = teks;
  if (el && el.classList) el.classList.toggle("salah", !!teks);
}

/* ---------- bantu: isi kotak detail reservasi (dipakai detail user & admin) ---------- */
function isiDetail(rsv) {
  isiTeks("d_tanggal", formatTanggalPanjang(rsv.tanggal));
  isiTeks("d_jam", rsv.waktu + " WIB");
  isiTeks("d_tamu", rsv.tamu + " tamu");
  isiTeks("d_hp", rsv.hp);
  isiTeks("d_nama", rsv.nama);
  isiTeks("d_catatan", rsv.catatan || "-");
  var badge = document.getElementById("badge_status");
  badge.className = "badge_status status_" + rsv.status;
  badge.textContent = LABEL_STATUS[rsv.status];
}
