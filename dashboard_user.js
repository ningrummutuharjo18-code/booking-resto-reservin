var semuaTampil = false;

var FOTO_RESTO = {
  "sakana ramen bar": "sakana-ramen-bar.jpg",
  "sakura sushi house": "Sakura Sushi House.jpg",  
  "aroma nusantara": "aroma-nusantara.jpg",
  "dapur roti fajar": "dapur roti fajar.jpg",
  "warung soto bu rini": "soto enak.jpg",  
  "kopi senja corner": "kopi senja corner.jpg",
  "ayam bakar pak ndut": "ayam bakar.jpg",
};



function pasangFoto(kotak, nama, cadangan) {
  var src = FOTO_RESTO[String(nama || "").trim().toLowerCase()];
  if (!src) { isiFoto(kotak, cadangan); return; }
  var ikon = kotak.querySelector(".foto_ikon");
  var img = new Image();
  img.className = "foto_img";
  img.alt = "";
  img.onload = function () { if (ikon) ikon.style.display = "none"; };
  img.onerror = function () { if (img.parentNode) img.parentNode.removeChild(img); };
  img.src = encodeURI (src);
  kotak.appendChild(img);
}

function buatKartuResto(r) {
  var kartu = document.createElement("article");
  kartu.className = "kartu_resto";
  kartu.innerHTML =
    '<div class="foto kartu_foto"><span class="ikon foto_ikon">🖼️</span></div>' +
    '<div class="kartu_isi">' +
      '<span class="chip krem">' + esc(r.kategori) + '</span>' +
      '<h3>' + esc(r.nama) + '</h3>' +
      '<p>' + esc(r.singkat) + '<br>' + esc(r.kota) + '<br>Buka ' + esc(r.jamBuka) + ' - ' + esc(r.jamTutup) + '</p>' +
      '<a class="btn btn_garis btn_kecil" href="restoran.html?id=' + r.id + '">Lihat Restoran</a>' +
    '</div>';
  pasangFoto(kartu.querySelector(".kartu_foto"), r.nama, r.foto);
  return kartu;
}

function tampilkanDaftar() {
  var wadah = document.getElementById("daftar_resto");
  var judul = document.getElementById("judul_daftar");
  var kosong = document.getElementById("pesan_kosong");
  var kata = document.getElementById("input_cari").value.trim().toLowerCase();
  var btnSemua = document.getElementById("btn_lihat_semua");

  var daftar = ambilResto().slice();
  var hasil = [];

  if (kata) {
    for (var i = 0; i < daftar.length; i++) {
      var r = daftar[i];
      var gabung = (r.nama + " " + r.kategori + " " + r.kota + " " + r.singkat).toLowerCase();
      if (gabung.indexOf(kata) !== -1) hasil.push(r);
    }
    judul.textContent = "Hasil Pencarian";
  } else if (semuaTampil) {
    hasil = daftar;
    judul.textContent = "Semua Restoran";
  } else {

    daftar.sort(function (a, b) { return b.rating - a.rating; });
    hasil = daftar.slice(0, 2);
    judul.textContent = "Rekomendasi untuk Kamu";
  }

  btnSemua.textContent = semuaTampil ? "Tampilkan Rekomendasi Saja" : "Lihat Semua";
  btnSemua.hidden = !!kata;   
  wadah.innerHTML = "";
  for (var j = 0; j < hasil.length; j++) wadah.appendChild(buatKartuResto(hasil[j]));
  kosong.hidden = hasil.length > 0;
}

function gulirKeDaftar() {
  var target = document.getElementById("judul_daftar");
  if (!target) return;
  requestAnimationFrame(function () {
    var y = target.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (!wajibLogin("user")) return;
  mulaiHalamanBersama();

  var inputCari = document.getElementById("input_cari");
  var btnSemua = document.getElementById("btn_lihat_semua");
  var btnCari = document.getElementById("btn_cari");
  var timerCari;

  inputCari.addEventListener("input", function () {
    tampilkanDaftar();
    clearTimeout(timerCari);
    if (inputCari.value.trim()) timerCari = setTimeout(gulirKeDaftar, 400);
  });

  inputCari.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      clearTimeout(timerCari);
      tampilkanDaftar();
      gulirKeDaftar();
      inputCari.blur();
    }
  });

  if (btnCari) {
    btnCari.addEventListener("click", function () {
      clearTimeout(timerCari);
      tampilkanDaftar();
      gulirKeDaftar();
    });
  }

  btnSemua.addEventListener("click", function () {
    semuaTampil = !semuaTampil;
    tampilkanDaftar();
    gulirKeDaftar();
  });

  tampilkanDaftar();
});