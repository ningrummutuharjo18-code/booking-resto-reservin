/* detail_reservasi.js - detail satu reservasi (admin, hanya lihat) */

document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("admin")) return;
  mulaiHalamanBersama();

  var rsv = cariReservasi(ambilParam("id"));
  if (!rsv) { window.location.replace("daftar_reservasi.html"); return; }
  var r = cariResto(rsv.restoId) || { nama: "-" };

  isiDetail(rsv);
  isiTeks("info_resto", "Restoran: " + r.nama + "  ·  Kode booking: " + rsv.kode);
});