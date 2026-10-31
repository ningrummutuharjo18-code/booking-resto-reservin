/* akun.js - kelola akun */
document.addEventListener("DOMContentLoaded", function () {
  var pengguna = wajibLogin("user");
  if (!pengguna) return;
  mulaiHalamanBersama();

  document.getElementById("nama").value = pengguna.nama || "";
  document.getElementById("hp").value = pengguna.hp || "";
  document.getElementById("email").value = pengguna.email || "";

  document.getElementById("form_akun").addEventListener("submit", function (e) {
    e.preventDefault();
    var nama = document.getElementById("nama").value.trim();
    var hp = document.getElementById("hp").value.trim();
    var email = document.getElementById("email").value.trim();
    var digit = hp.replace(/\D/g, "");
    var ok = true;

    if (nama.length < 3) { setError("nama", "Nama minimal 3 huruf."); ok = false; } else setError("nama", "");
    if (!/^[0-9+\-\s]+$/.test(hp) || digit.length < 9 || digit.length > 15) { setError("hp", "Nomor HP belum benar (9–15 angka)."); ok = false; } else setError("hp", "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Format email belum benar."); ok = false; } else setError("email", "");
    if (!ok) return;

    var daftar = ambilPengguna();
    for (var i = 0; i < daftar.length; i++) {
      if (daftar[i].username === pengguna.username) {
        daftar[i].nama = nama; daftar[i].hp = hp; daftar[i].email = email;
      }
    }
    simpanPengguna(daftar);
    tampilToast("Perubahan tersimpan.");
  });
});