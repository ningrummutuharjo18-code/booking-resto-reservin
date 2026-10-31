
/* chat.js - chat rekomendasi (logika if-else, belum AI)
   Alur: bot tanya selera -> budget -> jumlah orang -> bot menampilkan 3 restoran paling cocok.
   Skor dihitung di hitungRekomendasi() pada data.js.            */
var chat = null;
var pilihanSelera = null;
var pilihanBudget = null;
var pilihanOrang = null;
 
var DAFTAR_SELERA = [
  { kunci: "indonesia", label: "Makanan Indonesia" },
  { kunci: "jepang", label: "Makanan Jepang" },
  { kunci: "bakery", label: "Bakery & Kafe" },
  { kunci: "Pilihin yang paling favorit!", label: "Pilihin yang paling favorit!" }
];
 
var DAFTAR_ORANG = [
  { kunci: "1-2", label: "1 - 2 orang", maks: 2 },
  { kunci: "3-4", label: "3 - 4 orang", maks: 4 },
  { kunci: "5-8", label: "5 - 8 orang", maks: 8 },
  { kunci: "8+", label: "Lebih dari 8 orang", maks: 9 }
];
 
/* ---- FOTO RESTORAN (sama seperti di dashboard_user.js) ---- */
var FOTO_RESTO = {
  "sakana ramen bar": "sakana-ramen-bar.jpg",
  "sakura sushi house": "Sakura Sushi House.jpg",
  "aroma nusantara": "aroma-nusantara.jpg",
  "dapur roti fajar": "dapur roti fajar.jpg",
  "warung soto bu rini": "soto enak.jpg",
  "kopi senja corner": "kopi senja corner.jpg",
  "ayam bakar pak ndut": "ayam bakar.jpg"
};
 
function pasangFoto(kotak, nama, cadangan) {
  var src = FOTO_RESTO[String(nama || "").trim().toLowerCase()];
  if (!src) { isiFoto(kotak, cadangan); return; }
  var ikon = kotak.querySelector(".foto_ikon");
  var img = new Image();
  img.className = "foto_img";
  img.alt = "";
  // gaya langsung di sini supaya tidak bergantung pada CSS
  kotak.style.position = "relative";
  kotak.style.overflow = "hidden";
  img.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;";
  img.onload = function () { if (ikon) ikon.style.display = "none"; };
  img.onerror = function () {
    console.warn("Foto tidak ditemukan:", img.src);
    if (img.parentNode) img.parentNode.removeChild(img);
  };
  img.src = encodeURI(src);
  kotak.appendChild(img);
}
 
 
function gulirKeBawah() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
 
function tambahBot(teks) {
  var baris = document.createElement("div");
  baris.className = "pesan_bot";
  baris.innerHTML =
    '<span class="avatar_bot"><span class="ikon">🍴</span></span>' +
    '<div class="isi_pesan"><div class="gelembung_bot">' + esc(teks) + '</div></div>';
  chat.appendChild(baris);
  gulirKeBawah();
  return baris.querySelector(".isi_pesan");
}
 
function tambahUser(teks) {
  var baris = document.createElement("div");
  baris.className = "pesan_user";
  baris.innerHTML = '<div class="gelembung_user">' + esc(teks) + '</div>';
  chat.appendChild(baris);
}
 
function tambahPilihan(daftar, saatDipilih) {
  var wadah = document.createElement("div");
  wadah.className = "pilihan";
  daftar.forEach(function (p) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "btn_pilihan";
    b.textContent = p.label;
    b.addEventListener("click", function () {
      chat.removeChild(wadah);
      tambahUser(p.label);
      saatDipilih(p);
    });
    wadah.appendChild(b);
  });
  chat.appendChild(wadah);
  gulirKeBawah();
}
 
function tanyaSelera() {
  pilihanSelera = null;
  pilihanBudget = null;
  pilihanOrang = null;
  tambahBot("Halo! Kamu lagi pengin makan apa hari ini?");
  tambahPilihan(DAFTAR_SELERA, function (p) {
    pilihanSelera = p.kunci;
    setTimeout(tanyaBudget, 350);
  });
}
 
function tanyaBudget() {
  tambahBot("Oke! Berapa budget kamu per orang?");
  var opsi = [];
  for (var k in RENTANG_BUDGET) opsi.push({ kunci: k, label: RENTANG_BUDGET[k].label });
  tambahPilihan(opsi, function (p) {
    pilihanBudget = p.kunci;
    setTimeout(tanyaJumlahOrang, 350);
  });
}
 
function tanyaJumlahOrang() {
  tambahBot("Untuk berapa orang?");
  tambahPilihan(DAFTAR_ORANG, function (p) {
    pilihanOrang = p;
    setTimeout(tampilkanHasil, 350);
  });
}
 
function kartuHasil(r) {
  var a = document.createElement("article");
  a.className = "kartu_chat";
  a.innerHTML =
    '<div class="foto"><span class="ikon foto_ikon">🖼️</span></div>' +
    '<div class="kartu_chat_info"><div>' +
      '<h3>' + esc(r.nama) + '</h3>' +
      '<div class="rating"><span class="ikon">★</span><b>' + komaDesimal(r.rating) + '</b><span>·  ' + esc(r.label) + '</span></div>' +
      '<p class="harga_jarak">' + formatRentang(r.hargaMin, r.hargaMax) + '  ·  ' + komaDesimal(r.jarak) + ' km</p>' +
    '</div><a class="btn btn_utama" href="restoran.html?id=' + r.id + '">Lihat Restoran</a></div>';
  // pakai pasangFoto (bukan isiFoto) supaya foto asli restoran muncul
  pasangFoto(a.querySelector(".foto"), r.nama, r.foto);
  return a;
}
 
function tampilkanHasil() {
  var isi = tambahBot("Ini rekomendasi restoran yang cocok untuk " + pilihanOrang.label.toLowerCase() + ":");
 
  // ambil banyak dulu, lalu saring sesuai jumlah orang (kalau data restoran punya "kapasitas")
  var semua = hitungRekomendasi(pilihanSelera, pilihanBudget, 100);
  var hasil = semua.filter(function (r) {
    return r.kapasitas === undefined || r.kapasitas >= pilihanOrang.maks;
  });
  if (hasil.length === 0) hasil = semua; // kalau tidak ada yang cocok, tampilkan yang terbaik saja
  hasil = hasil.slice(0, 3);
 
  for (var i = 0; i < hasil.length; i++) isi.appendChild(kartuHasil(hasil[i]));
 
  var ulang = document.createElement("div");
  ulang.className = "baris_ulang";
  ulang.innerHTML = '<button class="btn btn_krem" id="btn_ulang" type="button" style="width:520px;max-width:100%;height:56px">' +
    '<span class="ikon">↻</span> Mulai Chat Baru</button>';
  chat.appendChild(ulang);
  ulang.querySelector("button").addEventListener("click", function () {
    chat.innerHTML = "";
    tanyaSelera();
  });
 
  gulirKeBawah();
}
 
document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("user")) return;
  mulaiHalamanBersama();
  chat = document.getElementById("chat");
  tanyaSelera();
});