document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("admin")) return;
  mulaiHalamanBersama();

  var tbody = document.getElementById("isi_tabel");
  var pengguna = ambilPengguna();
  var reservasi = ambilReservasi();
  var html = "";
  for (var i = 0; i < pengguna.length; i++) {
    var p = pengguna[i];
    if (p.peran !== "user") continue;
    var total = 0;
    for (var j = 0; j < reservasi.length; j++) { if (reservasi[j].username === p.username) total++; }
    html += "<tr><td class=\"tebal\">" + esc(p.nama) + "</td><td>" + esc(p.email || "-") + "</td><td>" +
      esc(p.hp || "-") + "</td><td>" + total + "</td></tr>";
  }
  tbody.innerHTML = html;
});