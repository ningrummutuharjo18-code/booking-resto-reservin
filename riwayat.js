/* riwayat.js - riwayat reservasi + filter status */
var semuaReservasi = [];
var filterAktif = "semua";

function buatKartuReservasi(rsv) {
  var r = cariResto(rsv.restoId) || { nama: "Restoran", foto: "" };
  var catatan = rsv.status === "dibatalkan" ? "Dibatalkan oleh pengguna." : (rsv.catatan || "-");
  var kartu = document.createElement("article");
  kartu.className = "kartu_reservasi";
  kartu.innerHTML =
    '<div class="foto foto_reservasi"><span class="ikon foto_ikon">🖼️</span></div>' +
    '<div class="info_reservasi">' +
      '<div class="baris_nama"><h3>' + esc(r.nama) + '</h3>' +
        '<span class="badge_status status_' + rsv.status + '">' + LABEL_STATUS[rsv.status] + '</span></div>' +
      '<div class="meta">' +
        '<span><span class="ikon">📅</span>' + formatTanggalPanjang(rsv.tanggal) + '</span>' +
        '<span><span class="ikon">🕐</span>' + esc(rsv.waktu) + ' WIB</span>' +
        '<span><span class="ikon">👤</span>' + rsv.tamu + ' tamu</span>' +
      '</div>' +
      '<div class="catatan_kartu">Catatan: ' + esc(catatan) + '</div>' +
    '</div>' +
    '<a class="btn btn_garis btn_kecil" href="detail_reservasi_user.html?id=' + rsv.id + '">Lihat Detail</a>';
  isiFoto(kartu.querySelector(".foto_reservasi"), r.foto);
  return kartu;
}

function tampilkan() {
  var wadah = document.getElementById("daftar_reservasi");
  wadah.innerHTML = "";
  var ada = 0;
  for (var i = 0; i < semuaReservasi.length; i++) {
    var rsv = semuaReservasi[i];
    if (filterAktif === "semua" || rsv.status === filterAktif) {
      wadah.appendChild(buatKartuReservasi(rsv));
      ada++;
    }
  }
  document.getElementById("pesan_kosong").hidden = ada > 0;
}

document.addEventListener("DOMContentLoaded", function () {
  var pengguna = wajibLogin("user");
  if (!pengguna) return;
  mulaiHalamanBersama();

  semuaReservasi = reservasiMilik(pengguna.username);

  var chips = document.querySelectorAll(".chip_filter");
  for (var i = 0; i < chips.length; i++) {
    chips[i].addEventListener("click", function () {
      for (var j = 0; j < chips.length; j++) chips[j].classList.remove("aktif");
      this.classList.add("aktif");
      filterAktif = this.getAttribute("data-status");
      tampilkan();
    });
  }
  tampilkan();
});