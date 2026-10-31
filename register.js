/* /* register.js - halaman buat akun */
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form_auth");
  var inUser = document.getElementById("username");
  var inSandi = document.getElementById("sandi");
  var btnMata = document.getElementById("btn_mata");
  var pesan = document.getElementById("pesan_error");
  inSandi.autocomplete = "new-password";

  // --- tombol mata (sama seperti login) ---
  var garis = btnMata.querySelector(".garis_miring");
  garis.style.display = "block"; // awal: sandi tersembunyi -> ada garis

  btnMata.addEventListener("click", function () {
    var tampil = inSandi.type === "password";
    inSandi.type = tampil ? "text" : "password";
    garis.style.display = tampil ? "none" : "block";
  });

  // --- proses daftar ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    pesan.textContent = "";
    var username = inUser.value.trim();
    var sandi = inSandi.value;

    if (username.length < 4) { pesan.textContent = "Username minimal 4 karakter."; return; }
    if (!/^[A-Za-z0-9_.]+$/.test(username)) { pesan.textContent = "Username hanya boleh huruf, angka, titik, dan garis bawah."; return; }
    if (sandi.length < 6) { pesan.textContent = "Password minimal 6 karakter."; return; }
    if (cariPengguna(username)) { pesan.textContent = "Username sudah dipakai, coba yang lain."; return; }

    var daftar = ambilPengguna();
    var baru = { username: username, sandi: sandi, peran: "user", nama: username, hp: "", email: "" };
    daftar.push(baru);
    simpanPengguna(daftar);

    buatSesi(baru);
    window.location.href = "dashboard_user.html";
  });
});