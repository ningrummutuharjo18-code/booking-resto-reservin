/* reservasi.js - form reservasi */
var restoForm = null;

function tambahOpsi(select, nilai, teks) {
  var o = document.createElement("option");
  o.value = nilai;
  o.textContent = teks;
  select.appendChild(o);
}

function isiPilihan() {
  var sapaan = ["Mr", "Mrs", "Ms", "Dr", "Lainnya"];
  var s = document.getElementById("sapaan");
  for (var i = 0; i < sapaan.length; i++) tambahOpsi(s, sapaan[i], sapaan[i]);

  // tanggal: hari ini sampai 14 hari ke depan
  var t = document.getElementById("tanggal");
  var hari = new Date();
  for (var j = 0; j < 15; j++) {
    var d = new Date(hari.getFullYear(), hari.getMonth(), hari.getDate() + j);
    var iso = isoDariTanggal(d);
    tambahOpsi(t, iso, formatTanggalPanjang(iso) + (j === 0 ? " (hari ini)" : ""));
  }

  // jumlah tamu 1 - 12
  var tm = document.getElementById("tamu");
  for (var k = 1; k <= 12; k++) tambahOpsi(tm, k, k + " tamu");

  isiWaktu();
}

/* jam pilihan tiap 30 menit, dari jam buka sampai 1 jam sebelum tutup */
function isiWaktu() {
  var w = document.getElementById("waktu");
  var buka = Number(restoForm.jamBuka.split(".")[0]);
  var tutup = Number(restoForm.jamTutup.split(".")[0]);
  for (var jam = buka; jam < tutup; jam++) {
    var hh = String(jam).padStart(2, "0");
    tambahOpsi(w, hh + ".00", hh + ".00 WIB");
    if (jam + 1 < tutup) tambahOpsi(w, hh + ".30", hh + ".30 WIB");
  }
}

function validasi() {
  var ok = true;
  var wajib = ["sapaan", "tanggal", "waktu", "tamu"];
  for (var i = 0; i < wajib.length; i++) {
    var v = document.getElementById(wajib[i]).value;
    if (!v) { setError(wajib[i], "Wajib dipilih."); ok = false; } else setError(wajib[i], "");
  }

  var nama = document.getElementById("nama").value.trim();
  if (nama.length < 3) { setError("nama", "Isi nama lengkap (minimal 3 huruf)."); ok = false; } else setError("nama", "");

  var hp = document.getElementById("hp").value.trim();
  var digit = hp.replace(/\D/g, "");
  if (!/^[0-9+\-\s]+$/.test(hp) || digit.length < 9 || digit.length > 15) {
    setError("hp", "Nomor telepon belum benar (9–15 angka)."); ok = false;
  } else setError("hp", "");

  var email = document.getElementById("email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Format email belum benar."); ok = false; } else setError("email", "");

  if (!document.getElementById("setuju").checked) { setError("setuju", "Centang persetujuan syarat dan ketentuan dulu."); ok = false; } else setError("setuju", "");
  return ok;
}

document.addEventListener("DOMContentLoaded", function () {
  var pengguna = wajibLogin("user");
  if (!pengguna) return;
  mulaiHalamanBersama();

  restoForm = cariResto(ambilParam("id"));
  if (!restoForm) { window.location.replace("dashboard_user.html"); return; }

  isiTeks("sub_form", "Isi data berikut untuk mengatur reservasimu di " + restoForm.nama + ".");
  document.getElementById("btn_batal").href = "restoran.html?id=" + restoForm.id;
  isiPilihan();

  // isi otomatis dari akun
  document.getElementById("nama").value = pengguna.nama || "";
  document.getElementById("hp").value = pengguna.hp || "";
  document.getElementById("email").value = pengguna.email || "";

  document.getElementById("form_reservasi").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validasi()) {
      var salah = document.querySelector(".salah, .pesan_error:not(:empty)");
      if (salah && salah.scrollIntoView) salah.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    var baru = tambahReservasi({
      restoId: restoForm.id,
      username: pengguna.username,
      sapaan: document.getElementById("sapaan").value,
      nama: document.getElementById("nama").value.trim(),
      hp: document.getElementById("hp").value.trim(),
      email: document.getElementById("email").value.trim(),
      tanggal: document.getElementById("tanggal").value,
      waktu: document.getElementById("waktu").value,
      tamu: Number(document.getElementById("tamu").value),
      catatan: document.getElementById("catatan").value.trim()
    });
    window.location.href = "detail_reservasi_user.html?id=" + baru.id + "&baru=1";
  });
});