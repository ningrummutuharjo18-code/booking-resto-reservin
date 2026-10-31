/* login.js - halaman login */
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form_auth");
  var inUser = document.getElementById("username");
  var inSandi = document.getElementById("sandi");
  var btnMata = document.getElementById("btn_mata");
  var pesan = document.getElementById("pesan_error");

  // --- tombol mata ---
  var garis = btnMata.querySelector(".garis_miring");
  garis.style.display = "block"; // awal: sandi tersembunyi -> ada garis

  btnMata.addEventListener("click", function () {
    var tampil = inSandi.type === "password";
    inSandi.type = tampil ? "text" : "password";
    garis.style.display = tampil ? "none" : "block";
  });

  // --- proses login ---
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    pesan.textContent = "";
    var username = inUser.value.trim();
    var sandi = inSandi.value;

    if (!username || !sandi) { pesan.textContent = "Username dan password wajib diisi."; return; }

    var pengguna = cariPengguna(username);
    if (!pengguna || pengguna.sandi !== sandi) {
      pesan.textContent = "Username atau password salah.";
      return;
    }

    buatSesi(pengguna);

    // sesuaikan tujuan halaman dengan peran
    if (pengguna.peran === "admin") {
      window.location.href = "dashboard_admin.html";
    } else {
      window.location.href = "dashboard_user.html";
    }
  });
});