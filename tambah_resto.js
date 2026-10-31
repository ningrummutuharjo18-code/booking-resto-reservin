/* tambah_resto.js - form tambah resto mitra + buat akun login resto */
var PEMETAAN_SELERA = { Indonesian: "indonesia", Japanese: "jepang", Cafe: "bakery" };
var LABEL_SELERA = { Indonesian: "Makanan Indonesia", Japanese: "Makanan Jepang", Cafe: "Bakery & Kafe" };

/* password acak 10 karakter (tanpa huruf yang mirip: l, I, O, 0) */
function buatSandiAcak() {
  var huruf = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  var hasil = "";
  for (var i = 0; i < 10; i++) hasil += huruf.charAt(Math.floor(Math.random() * huruf.length));
  return hasil;
}

document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("admin")) return;
  mulaiHalamanBersama();

  var form = document.getElementById("form_tambah");

  document.getElementById("btn_generate").addEventListener("click", function () {
    document.getElementById("sandi").value = buatSandiAcak();
    setError("sandi", "");
  });

  document.getElementById("btn_reset").addEventListener("click", function () {
    form.reset();
    var p = form.querySelectorAll(".pesan_error");
    for (var i = 0; i < p.length; i++) p[i].textContent = "";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nama = document.getElementById("nama").value.trim();
    var kategori = document.getElementById("kategori").value;
    var telepon = document.getElementById("telepon").value.trim();
    var kota = document.getElementById("kota").value.trim();
    var email = document.getElementById("email").value.trim();
    var sandi = document.getElementById("sandi").value;
    var ok = true;

    if (nama.length < 3) { setError("nama", "Nama restoran minimal 3 huruf."); ok = false; } else setError("nama", "");
    if (!kategori) { setError("kategori", "Pilih kategori kuliner."); ok = false; } else setError("kategori", "");
    var digit = telepon.replace(/\D/g, "");
    if (!/^[0-9+\-\s]+$/.test(telepon) || digit.length < 9 || digit.length > 15) { setError("telepon", "Nomor telepon belum benar."); ok = false; } else setError("telepon", "");
    if (kota.length < 3) { setError("kota", "Isi kota / lokasi."); ok = false; } else setError("kota", "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Format email belum benar."); ok = false; }
    else if (cariPengguna(email)) { setError("email", "Email ini sudah dipakai akun lain."); ok = false; }
    else setError("email", "");
    if (sandi.length < 6) { setError("sandi", "Password minimal 6 karakter (atau klik Generate)."); ok = false; } else setError("sandi", "");
    if (!ok) return;

    tambahResto({
      nama: nama, kategori: kategori, tipe: kategori,
      selera: PEMETAAN_SELERA[kategori] || "lain", label: LABEL_SELERA[kategori] || kategori,
      singkat: "Restoran mitra baru di Reservin", deskripsi: nama + " adalah restoran mitra baru di Reservin.",
      kota: kota, jamBuka: "10.00", jamTutup: "22.00",
      hargaMin: 25000, hargaMax: 100000, jarak: 3.0, rating: 4.0,
      foto: "", emailOwner: email, telepon: telepon, menu: []
    });

    // akun login untuk pemilik restoran (dashboard restoran belum dibuat)
    var daftar = ambilPengguna();
    daftar.push({ username: email, sandi: sandi, peran: "resto", nama: nama, hp: telepon, email: email });
    simpanPengguna(daftar);

    tampilToast("Restoran tersimpan dan akses login diterbitkan.");
    setTimeout(function () { window.location.href = "daftar_resto.html"; }, 1100);
  });
});