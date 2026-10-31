/* daftar_reservasi.js - semua reservasi dari semua restoran */
document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("admin")) return;
  mulaiHalamanBersama();

  var tbody = document.getElementById("isi_tabel");
  var daftar = ambilReservasi().slice();
  daftar.sort(function (a, b) { return a.tanggal < b.tanggal ? 1 : -1; });
  var html = "";
  for (var i = 0; i < daftar.length; i++) {
    var rsv = daftar[i];
    var r = cariResto(rsv.restoId) || { nama: "-" };
    html += "<tr><td class=\"tebal\">" + esc(r.nama) + "</td><td>" + esc(rsv.nama) + "</td><td>" +
      formatTanggalPendek(rsv.tanggal) + "</td><td><span class=\"badge_tabel " + rsv.status + "\">" +
      LABEL_STATUS_PENDEK[rsv.status] + "</span></td><td><a class=\"btn_detail\" href=\"detail_reservasi.html?id=" +
      rsv.id + "\">Detail</a></td></tr>";
  }
  tbody.innerHTML = html;
});