/* =========================================================
   data.js  -  data contoh (dummy) + penyimpanan di localStorage
   Nanti, saat backend (Express + MySQL) siap, isi fungsi-fungsi
   di bawah ini diganti dengan fetch() ke API. Halaman lain
   tidak perlu diubah karena semuanya memanggil fungsi ini.
   ========================================================= */

var KUNCI = {
  pengguna: "reservin_pengguna",
  sesi: "reservin_sesi",
  reservasi: "reservin_reservasi",
  resto: "reservin_resto"
};

/* ---------- baca / tulis localStorage (aman kalau diblokir) ---------- */
function bacaData(kunci, cadangan) {
  try {
    var teks = localStorage.getItem(kunci);
    return teks ? JSON.parse(teks) : cadangan;
  } catch (e) {
    return cadangan;
  }
}
function simpanData(kunci, nilai) {
  try { localStorage.setItem(kunci, JSON.stringify(nilai)); } catch (e) {}
}

/* ---------- data awal ---------- */
var RESTO_AWAL = [
  {
    id: 1, nama: "Aroma Nusantara", kategori: "Indonesian Food", tipe: "Indonesian",
    selera: "indonesia", label: "Makanan Indonesia",
    singkat: "Masakan khas Nusantara dengan suasana cozy",
    deskripsi: "Aroma Nusantara menyajikan masakan khas Nusantara dengan bumbu rempah pilihan dalam suasana cozy. Cocok untuk makan bersama keluarga maupun teman.",
    kota: "Jakarta Selatan", jamBuka: "10.00", jamTutup: "22.00",
    hargaMin: 50000, hargaMax: 100000, jarak: 1.2, rating: 4.6,
    foto: "assets/img/aroma-nusantara.jpg", emailOwner: "owner@aromanusantara.id", telepon: "+62 812-3456-7001",
    menu: [
      { nama: "Nasi Liwet Komplit", harga: 48000, foto: "assets/img/menu-aroma-1.jpg" },
      { nama: "Rendang Sapi", harga: 62000, foto: "assets/img/menu-aroma-2.jpg" },
      { nama: "Ayam Bakar Taliwang", harga: 55000, foto: "assets/img/menu-aroma-3.jpg" },
      { nama: "Gado-gado Betawi", harga: 38000, foto: "assets/img/menu-aroma-4.jpg" }
    ]
  },
  {
    id: 2, nama: "Sakana Ramen Bar", kategori: "Japanese", tipe: "Japanese",
    selera: "jepang", label: "Makanan Jepang",
    singkat: "Ramen otentik khas jepang",
    deskripsi: "Sakana Ramen Bar menyajikan kelezatan ramen autentik Jepang dengan kuah kaldu kaya rasa dan mi buatan sendiri. Menghadirkan suasana hangat khas kedai ramen Tokyo yang cocok untuk makan santai bersama teman maupun menikmati waktu sendiri.",
    kota: "Solo", jamBuka: "10.00", jamTutup: "22.00",
    hargaMin: 50000, hargaMax: 100000, jarak: 2.4, rating: 4.5,
    foto: "assets/img/sakana-ramen.jpg", emailOwner: "hello@sakanaramen.id", telepon: "+62 812-3456-7002",
    menu: [
      { nama: "Shoyu Ramen Classic", harga: 58000, foto: "assets/img/menu-sakana-1.jpg" },
      { nama: "Ramen Telur Onsen", harga: 52000, foto: "assets/img/menu-sakana-2.jpg" },
      { nama: "Chicken Katsu Ramen", harga: 65000, foto: "assets/img/menu-sakana-3.jpg" },
      { nama: "Spicy Miso Ramen", harga: 62000, foto: "assets/img/menu-sakana-4.jpg" }
    ]
  },
  {
    id: 3, nama: "Dapur Roti Fajar", kategori: "Bakery & Kafe", tipe: "Cafe",
    selera: "bakery", label: "Bakery & Kafe",
    singkat: "Roti segar setiap pagi dan kopi susu andalan",
    deskripsi: "Dapur Roti Fajar memanggang roti segar setiap pagi dan menyajikannya bersama kopi pilihan di sudut yang hangat dan tenang.",
    kota: "Solo", jamBuka: "07.00", jamTutup: "21.00",
    hargaMin: 40000, hargaMax: 80000, jarak: 3.1, rating: 4.3,
    foto: "assets/img/dapur-roti-fajar.jpg", emailOwner: "hello@dapurrotifajar.id", telepon: "+62 812-3456-7003",
    menu: [
      { nama: "Croissant Mentega", harga: 28000, foto: "" },
      { nama: "Roti Sourdough", harga: 45000, foto: "" },
      { nama: "Kopi Susu Aren", harga: 24000, foto: "" },
      { nama: "Cinnamon Roll", harga: 32000, foto: "" }
    ]
  },
  {
    id: 4, nama: "Ayam Bakar Pak Ndut", kategori: "Indonesian Food", tipe: "Indonesian",
    selera: "indonesia", label: "Makanan Indonesia",
    singkat: "Ayam bakar bumbu kecap dengan sambal korek",
    deskripsi: "Ayam bakar bumbu kecap khas Solo dengan sambal korek yang pedasnya pas.",
    kota: "Surakarta, Jawa Tengah", jamBuka: "10.00", jamTutup: "21.00",
    hargaMin: 25000, hargaMax: 50000, jarak: 4.0, rating: 4.4,
    foto: "", emailOwner: "admin.solo@ayambakar.com", telepon: "+62 812-3456-7004",
    menu: []
  },
  {
    id: 5, nama: "Warung Soto Bu Rini", kategori: "Indonesian Food", tipe: "Indonesian",
    selera: "indonesia", label: "Makanan Indonesia",
    singkat: "Soto ayam kuah bening dan aneka lauk",
    deskripsi: "Soto ayam kuah bening dengan aneka lauk, buka sejak pagi.",
    kota: "Surakarta, Jawa Tengah", jamBuka: "06.00", jamTutup: "15.00",
    hargaMin: 15000, hargaMax: 35000, jarak: 5.2, rating: 4.5,
    foto: "", emailOwner: "owner@sotoburini.id", telepon: "+62 812-3456-7005",
    menu: []
  },
  {
    id: 6, nama: "Sakura Sushi House", kategori: "Japanese", tipe: "Japanese",
    selera: "jepang", label: "Makanan Jepang",
    singkat: "Sushi dan sashimi segar dengan suasana tenang",
    deskripsi: "Sushi dan sashimi segar dengan suasana tenang ala Jepang.",
    kota: "Jakarta Pusat", jamBuka: "11.00", jamTutup: "22.00",
    hargaMin: 100000, hargaMax: 200000, jarak: 6.8, rating: 4.7,
    foto: "", emailOwner: "manager@sakurasushi.co.id", telepon: "+62 812-3456-7006",
    menu: []
  },
  {
    id: 7, nama: "Kopi Senja Corner", kategori: "Cafe", tipe: "Cafe",
    selera: "bakery", label: "Bakery & Kafe",
    singkat: "Kopi single origin dan camilan ringan",
    deskripsi: "Kopi single origin dan camilan ringan di sudut kota.",
    kota: "Surakarta, Jawa Tengah", jamBuka: "09.00", jamTutup: "23.00",
    hargaMin: 20000, hargaMax: 45000, jarak: 2.0, rating: 4.2,
    foto: "", emailOwner: "hello@kopisenja.id", telepon: "+62 812-3456-7007",
    menu: []
  }
];

var PENGGUNA_AWAL = [
  { username: "admin", sandi: "admin123", peran: "admin", nama: "Admin Reservin", hp: "0812-0000-0000", email: "admin@reservin.id" },
  { username: "della", sandi: "password123", peran: "user", nama: "Della Ayu", hp: "0812-3456-7890", email: "della@email.com" },
  { username: "budi", sandi: "password123", peran: "user", nama: "Budi Santoso", hp: "0812-1111-2222", email: "budi.s@mail.com" },
  { username: "sinta", sandi: "password123", peran: "user", nama: "Sinta Maharani", hp: "0813-3333-4444", email: "sinta.m@mail.com" },
  { username: "rizky", sandi: "password123", peran: "user", nama: "Rizky Pratama", hp: "0857-5555-6666", email: "rizky.p@mail.com" },
  { username: "dewi", sandi: "password123", peran: "user", nama: "Dewi Lestari", hp: "0878-7777-8888", email: "dewi.l@mail.com" }
];

/* status: menunggu | dikonfirmasi | selesai | dibatalkan */
var RESERVASI_AWAL = [
  { id: 1, kode: "RSV-0001", restoId: 2, username: "della", sapaan: "Ms", nama: "Della Ayu", hp: "0812-3456-7890", email: "della@email.com", tanggal: "2026-10-17", waktu: "19.00", tamu: 4, catatan: "Meja dekat jendela.", status: "menunggu", alasan: "" },
  { id: 2, kode: "RSV-0002", restoId: 1, username: "della", sapaan: "Ms", nama: "Della Ayu", hp: "0812-3456-7890", email: "della@email.com", tanggal: "2026-10-04", waktu: "12.30", tamu: 2, catatan: "Merayakan ulang tahun.", status: "selesai", alasan: "" },
  { id: 3, kode: "RSV-0003", restoId: 3, username: "della", sapaan: "Ms", nama: "Della Ayu", hp: "0812-3456-7890", email: "della@email.com", tanggal: "2026-09-25", waktu: "18.00", tamu: 6, catatan: "Dibatalkan oleh pengguna.", status: "dibatalkan", alasan: "Jadwal berubah" },
  { id: 4, kode: "RSV-0004", restoId: 4, username: "budi", sapaan: "Mr", nama: "Budi Santoso", hp: "0812-1111-2222", email: "budi.s@mail.com", tanggal: "2026-10-12", waktu: "18.30", tamu: 3, catatan: "", status: "dikonfirmasi", alasan: "" },
  { id: 5, kode: "RSV-0005", restoId: 5, username: "sinta", sapaan: "Ms", nama: "Sinta Maharani", hp: "0813-3333-4444", email: "sinta.m@mail.com", tanggal: "2026-10-13", waktu: "12.00", tamu: 2, catatan: "", status: "menunggu", alasan: "" },
  { id: 6, kode: "RSV-0006", restoId: 6, username: "rizky", sapaan: "Mr", nama: "Rizky Pratama", hp: "0857-5555-6666", email: "rizky.p@mail.com", tanggal: "2026-10-09", waktu: "19.30", tamu: 5, catatan: "", status: "selesai", alasan: "" },
  { id: 7, kode: "RSV-0007", restoId: 7, username: "dewi", sapaan: "Ms", nama: "Dewi Lestari", hp: "0878-7777-8888", email: "dewi.l@mail.com", tanggal: "2026-10-08", waktu: "16.00", tamu: 2, catatan: "", status: "dibatalkan", alasan: "Berhalangan hadir" }
];

/* ---------- pengguna ---------- */
function ambilPengguna() {
  var daftar = bacaData(KUNCI.pengguna, null);
  if (!daftar) { daftar = PENGGUNA_AWAL; simpanData(KUNCI.pengguna, daftar); }
  return daftar;
}
function simpanPengguna(daftar) { simpanData(KUNCI.pengguna, daftar); }
function cariPengguna(username) {
  var daftar = ambilPengguna();
  for (var i = 0; i < daftar.length; i++) {
    if (daftar[i].username.toLowerCase() === String(username).toLowerCase()) return daftar[i];
  }
  return null;
}

/* ---------- sesi login ---------- */
function ambilSesi() { return bacaData(KUNCI.sesi, null); }
function buatSesi(pengguna) { simpanData(KUNCI.sesi, { username: pengguna.username, peran: pengguna.peran }); }
function hapusSesi() { try { localStorage.removeItem(KUNCI.sesi); } catch (e) {} }
function penggunaAktif() {
  var sesi = ambilSesi();
  return sesi ? cariPengguna(sesi.username) : null;
}

/* ---------- restoran ---------- */
function ambilResto() {
  var daftar = bacaData(KUNCI.resto, null);
  if (!daftar) { daftar = RESTO_AWAL; simpanData(KUNCI.resto, daftar); }
  return daftar;
}
function cariResto(id) {
  var daftar = ambilResto();
  for (var i = 0; i < daftar.length; i++) {
    if (daftar[i].id === Number(id)) return daftar[i];
  }
  return null;
}
function tambahResto(resto) {
  var daftar = ambilResto();
  var idBaru = 1;
  for (var i = 0; i < daftar.length; i++) { if (daftar[i].id >= idBaru) idBaru = daftar[i].id + 1; }
  resto.id = idBaru;
  daftar.push(resto);
  simpanData(KUNCI.resto, daftar);
  return resto;
}

/* ---------- reservasi ---------- */
function ambilReservasi() {
  var daftar = bacaData(KUNCI.reservasi, null);
  if (!daftar) { daftar = RESERVASI_AWAL; simpanData(KUNCI.reservasi, daftar); }
  return daftar;
}
function simpanReservasi(daftar) { simpanData(KUNCI.reservasi, daftar); }
function cariReservasi(id) {
  var daftar = ambilReservasi();
  for (var i = 0; i < daftar.length; i++) {
    if (daftar[i].id === Number(id)) return daftar[i];
  }
  return null;
}
function reservasiMilik(username) {
  var hasil = [];
  var daftar = ambilReservasi();
  for (var i = 0; i < daftar.length; i++) {
    if (daftar[i].username === username) hasil.push(daftar[i]);
  }
  // terbaru di atas (urut tanggal menurun)
  hasil.sort(function (a, b) { return a.tanggal < b.tanggal ? 1 : -1; });
  return hasil;
}
function tambahReservasi(data) {
  var daftar = ambilReservasi();
  var idBaru = 1;
  for (var i = 0; i < daftar.length; i++) { if (daftar[i].id >= idBaru) idBaru = daftar[i].id + 1; }
  data.id = idBaru;
  data.kode = "RSV-" + String(idBaru).padStart(4, "0");
  data.status = "menunggu";
  data.alasan = "";
  daftar.push(data);
  simpanReservasi(daftar);
  return data;
}

/* ---------- format tampilan ---------- */
var NAMA_HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
var NAMA_BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function bagianTanggal(iso) {
  var p = iso.split("-");
  return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
}
// "2026-10-17" -> "Sabtu, 17 Okt 2026"
function formatTanggalPanjang(iso) {
  var d = bagianTanggal(iso);
  return NAMA_HARI[d.getDay()] + ", " + d.getDate() + " " + NAMA_BULAN[d.getMonth()] + " " + d.getFullYear();
}
// "2026-10-12" -> "12 Okt 2026"
function formatTanggalPendek(iso) {
  var d = bagianTanggal(iso);
  return String(d.getDate()).padStart(2, "0") + " " + NAMA_BULAN[d.getMonth()] + " " + d.getFullYear();
}
function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}
function formatRentang(min, max) {
  return formatRupiah(min) + " – " + formatRupiah(max);
}
var LABEL_STATUS = {
  menunggu: "Menunggu konfirmasi",
  dikonfirmasi: "Dikonfirmasi",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan"
};
var LABEL_STATUS_PENDEK = {
  menunggu: "Menunggu",
  dikonfirmasi: "Dikonfirmasi",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan"
};

/* ---------- rekomendasi (logika if-else, belum AI) ---------- */
var RENTANG_BUDGET = {
  lt25: { label: "Di bawah Rp 25.000", min: 0, max: 25000 },
  b25_50: { label: "Rp 25.000 – 50.000", min: 25000, max: 50000 },
  b50_100: { label: "Rp 50.000 – 100.000", min: 50000, max: 100000 },
  b100_200: { label: "Rp 100.000 – 200.000", min: 100000, max: 200000 },
  gt200: { label: "Di atas Rp 200.000", min: 200000, max: 99999999 }
};

function hitungRekomendasi(selera, budgetKunci, batas) {
  var rentang = RENTANG_BUDGET[budgetKunci];
  var daftar = ambilResto();
  var hasil = [];
  for (var i = 0; i < daftar.length; i++) {
    var r = daftar[i];
    var skor = 0;

    // 1) selera cocok -> +3 ("terserah" tidak menambah / mengurangi)
    if (selera === r.selera) { skor += 3; }
    else if (selera !== "terserah") { skor -= 1; }

    // 2) rentang harga resto beririsan dengan budget -> +2, kalau tidak -> -2
    if (r.hargaMax >= rentang.min && r.hargaMin <= rentang.max) { skor += 2; }
    else { skor -= 2; }

    // 3) makin dekat makin bagus, rating ikut menambah
    if (r.jarak <= 2) { skor += 1; }
    skor += r.rating / 10;

    hasil.push({ resto: r, skor: skor });
  }
  hasil.sort(function (a, b) { return b.skor - a.skor; });
  var keluar = [];
  for (var j = 0; j < hasil.length && j < batas; j++) { keluar.push(hasil[j].resto); }
  return keluar;
}