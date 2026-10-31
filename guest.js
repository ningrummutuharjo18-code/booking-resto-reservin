/* guest.js - halaman awal */
document.addEventListener("DOMContentLoaded", function () {
  // kalau sudah login, "Jelajahi Restoran" langsung ke beranda masing-masing
  //var sesi = ambilSesi();
  //var tombol = document.querySelector(".hero_guest .btn");
  //if (sesi && tombol) {
    //tombol.href = sesi.peran === "admin" ? "dashboard_super_admin.html" : "dashboard_user.html";
  //}

  // tombol "Gabung Sekarang" -> buka WhatsApp
  var NOMOR_WA = "6289680887215";
  var PESAN_WA = "Halo Reservin, saya ingin bergabung sebagai mitra restoran.";

  var gabung = document.getElementById("btn_gabung");
  gabung.addEventListener("click", function () {
    var link = "https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(PESAN_WA);
    window.open(link, "_blank", "noopener");
  });
});