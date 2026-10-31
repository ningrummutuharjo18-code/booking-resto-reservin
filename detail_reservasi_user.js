/* detail_reservasi_user.js - detail reservasi (user) + popup batalkan */
var rsvAktif = null;
var restoDetail = null;


document.addEventListener("DOMContentLoaded", function () {
  var pengguna = wajibLogin("user");
  if (!pengguna) return;
  mulaiHalamanBersama();

  rsvAktif = cariReservasi(ambilParam("id"));
  if (!rsvAktif || rsvAktif.username !== pengguna.username) {
    window.location.replace("riwayat.html");
    return;
  }
  restoDetail = cariResto(rsvAktif.restoId) || { nama: "Restoran" };
  isiDetail(rsvAktif);

  if (ambilParam("baru") === "1") {
    tampilToast("Reservasi terkirim. Menunggu konfirmasi restoran.");
  }

  var btnBatalkan = document.getElementById("btn_batalkan");
  var bisaBatal = rsvAktif.status === "menunggu" || rsvAktif.status === "dikonfirmasi";
  if (!bisaBatal) {
    // reservasi selesai / sudah dibatalkan tidak bisa dibatalkan lagi
    btnBatalkan.previousElementSibling.hidden = true;   // garis pemisah
    btnBatalkan.hidden = true;
    return;
  }

  btnBatalkan.addEventListener("click", function () {
    isiTeks("r_resto", restoDetail.nama);
    isiTeks("r_waktu", formatTanggalPanjang(rsvAktif.tanggal) + "  ·  " + rsvAktif.waktu + " WIB  ·  " + rsvAktif.tamu + " tamu");
    isiTeks("r_kode", "Kode booking: " + rsvAktif.kode + "  ·  Status: " + LABEL_STATUS[rsvAktif.status]);
    // peringatan kebijakan hanya muncul kalau reservasi sudah dikonfirmasi
    document.getElementById("peringatan_kebijakan").hidden = rsvAktif.status !== "dikonfirmasi";
    bukaPopup("popup_batal");
  });

  document.getElementById("btn_batal_tutup").addEventListener("click", function () { tutupPopup("popup_batal"); });
  document.getElementById("btn_batal_kembali").addEventListener("click", function () { tutupPopup("popup_batal"); });

  document.getElementById("btn_batal_ya").addEventListener("click", function () {
    var daftar = ambilReservasi();
    for (var i = 0; i < daftar.length; i++) {
      if (daftar[i].id === rsvAktif.id) {
        daftar[i].status = "dibatalkan";
        var alasan = document.getElementById("alasan").value;
        var tambahan = document.getElementById("catatan_batal").value.trim();
        daftar[i].alasan = alasan + (alasan && tambahan ? " - " : "") + tambahan;
      }
    }
    simpanReservasi(daftar);
    tutupPopup("popup_batal");
    tampilToast("Reservasi dibatalkan.");
    setTimeout(function () { window.location.href = "riwayat.html"; }, 900);
  });
});