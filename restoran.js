/* restoran.js - detail restoran: info, slider menu, popup syarat */
var restoAktif = null;
var JARAK_GESER = 24;   // sama dengan "gap" di .daftar_menu (restoran.css)
 
/* ---- FOTO MENU ----
   kunci  = nama menu (huruf kecil semua)
   isi    = nama file foto (ganti sesuai file foto kamu)          */
var FOTO_MENU = {
  "shoyu ramen classic": "shoyu ramen classic.jpg",
  "ramen telur onsen": "ramen telur onsen.jpg",
  "chicken katsu ramen": "chicken katsu ramen.jpg",
  "spicy miso ramen": "spicy misoo.jpg"
  // tambah menu lain di sini, contoh:
  // "nama menu": "nama-file.jpg",
};
 
function pasangFotoMenu(kotak, nama, cadangan) {
  var src = FOTO_MENU[String(nama || "").trim().toLowerCase()];
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

var FOTO_RESTO = {
  "sakana ramen bar": "sakana-ramen-bar.jpg",
  "sakura sushi house": "Sakura Sushi House.jpg",
  "aroma nusantara": "aroma-nusantara.jpg",
  "dapur roti fajar": "dapur roti fajar.jpg",
  "warung soto bu rini": "soto enak.jpg",
  "kopi senja corner": "kopi senja corner.jpg",
  "ayam bakar pak ndut": "ayam bakar.jpg"
};
 
function pasangFotoResto(kotak, nama, cadangan) {
  var src = FOTO_RESTO[String(nama || "").trim().toLowerCase()];
  if (!src) { isiFoto(kotak, cadangan); return; }
  var ikon = kotak.querySelector(".foto_ikon");
  var img = new Image();
  img.className = "foto_img";
  img.alt = "";
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
 
function buatKartuMenu(m) {
  var kartu = document.createElement("article");
  kartu.className = "kartu_menu";
  kartu.innerHTML =
    '<div class="foto menu_foto"><span class="ikon foto_ikon">🖼️</span></div>' +
    '<div class="menu_isi"><h3>' + esc(m.nama) + '</h3><p>' + formatRupiah(m.harga) + '</p></div>';
  pasangFotoMenu(kartu.querySelector(".menu_foto"), m.nama, m.foto);
  return kartu;
}
 
/* geser menu ke kiri / kanan sebesar satu kartu */
function geserMenu(arah) {
  var daftar = document.getElementById("daftar_menu");
  var kartu = daftar.querySelector(".kartu_menu");
  var lebar = kartu ? kartu.offsetWidth + JARAK_GESER : 280;
  daftar.scrollBy({ left: arah * lebar, behavior: "smooth" });
}
 
/* panjang & posisi "jempol" di bawah slider mengikuti scroll */
function perbaruiIndikator() {
  var daftar = document.getElementById("daftar_menu");
  var trek = document.querySelector(".trek");
  var jempol = document.getElementById("jempol");
  var total = daftar.scrollWidth;
  var terlihat = daftar.clientWidth;
  var rasio = total > 0 ? Math.min(1, terlihat / total) : 1;
  var lebarJempol = Math.max(40, trek.clientWidth * rasio);
  var sisa = trek.clientWidth - lebarJempol;
  var maksScroll = total - terlihat;
  var posisi = maksScroll > 0 ? (daftar.scrollLeft / maksScroll) * sisa : 0;
  jempol.style.width = lebarJempol + "px";
  jempol.style.left = posisi + "px";
}
 
document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("user")) return;
  mulaiHalamanBersama();
 
  restoAktif = cariResto(ambilParam("id")) || ambilResto()[0];
  var r = restoAktif;
 
  document.title = r.nama + " | Reservin";
  isiTeks("nama_resto", r.nama);
  isiTeks("deskripsi_resto", r.deskripsi);
  isiTeks("jam_resto", r.jamBuka + " – " + r.jamTutup);
  isiTeks("harga_resto", formatRentang(r.hargaMin, r.hargaMax));
  pasangFotoResto(document.getElementById("foto_resto"), r.nama, r.foto);
  isiTeks("sub_syarat", "Mohon baca ketentuan berikut sebelum melanjutkan reservasi di " + r.nama + ".");
 
  // menu
  var daftar = document.getElementById("daftar_menu");
  if (r.menu && r.menu.length) {
    for (var i = 0; i < r.menu.length; i++) daftar.appendChild(buatKartuMenu(r.menu[i]));
  } else {
    daftar.innerHTML = '<p class="menu_kosong">Menu restoran ini belum ditambahkan.</p>';
    document.getElementById("indikator").hidden = true;
  }
 
  document.getElementById("menu_kiri").addEventListener("click", function () { geserMenu(-1); });
  document.getElementById("menu_kanan").addEventListener("click", function () { geserMenu(1); });
  daftar.addEventListener("scroll", perbaruiIndikator);
  window.addEventListener("resize", perbaruiIndikator);
  perbaruiIndikator();
 
  // popup syarat dan ketentuan
  document.getElementById("btn_reservasi").addEventListener("click", function () { bukaPopup("popup_syarat"); });
  document.getElementById("btn_syarat_batal").addEventListener("click", function () { tutupPopup("popup_syarat"); });
  document.getElementById("btn_syarat_lanjut").addEventListener("click", function () {
    window.location.href = "reservasi.html?id=" + r.id;
  });
});
