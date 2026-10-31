document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("admin")) return;
  mulaiHalamanBersama();

  var jumlahUser = 0;
  var pengguna = ambilPengguna();
  for (var i = 0; i < pengguna.length; i++) { if (pengguna[i].peran === "user") jumlahUser++; }

  isiTeks("stat_resto", ambilResto().length.toLocaleString("id-ID"));
  isiTeks("stat_reservasi", ambilReservasi().length.toLocaleString("id-ID"));
  isiTeks("stat_user", jumlahUser.toLocaleString("id-ID"));
});