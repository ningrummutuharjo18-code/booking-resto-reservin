/* daftar_resto.js - daftar resto mitra */
document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("admin")) return;
  mulaiHalamanBersama();

  var tbody = document.getElementById("isi_tabel");
  var daftar = ambilResto();
  var html = "";
  for (var i = 0; i < daftar.length; i++) {
    var r = daftar[i];
    html += "<tr><td class=\"tebal\">" + esc(r.nama) + "</td>" +
      "<td><span class=\"badge_tipe\">" + esc(r.tipe) + "</span></td>" +
      "<td>" + esc(r.emailOwner) + "</td></tr>";
  }
  tbody.innerHTML = html;
});