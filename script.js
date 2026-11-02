(function () {
  var LABEL = {
    menunggu: '⏳ Menunggu',
    dikonfirmasi: '✓ Dikonfirmasi',
    selesai: '☑ Selesai',
    dibatalkan: '✕ Dibatalkan'
  };

  var rows = document.querySelectorAll('.table .row:not(.row--head)');

  function statusOf(row) {
    var m = row.className.match(/\bst-(\w+)/);
    return m ? m[1] : '';
  }

  function updateCounts() {
    var total = { semua: rows.length, menunggu: 0, dikonfirmasi: 0, selesai: 0, dibatalkan: 0 };
    rows.forEach(function (r) { total[statusOf(r)]++; });

    ['semua', 'menunggu', 'dikonfirmasi', 'selesai', 'dibatalkan'].forEach(function (k) {
      var chip = document.querySelector('label[for="f-' + k + '"] .tab__count');
      if (chip) chip.textContent = total[k];
    });

    var badge = document.querySelector('.nav__badge');
    if (badge) {
      badge.textContent = total.menunggu;
      badge.style.display = total.menunggu ? '' : 'none';
    }
  }

  function setStatus(row, status) {
    row.className = row.className.replace(/\bst-\w+/, 'st-' + status);

    var pill = row.querySelector('.pill');
    pill.className = 'pill pill--' + status;
    pill.textContent = LABEL[status];

    var box = row.querySelector('.actions');
    box.innerHTML = (status === 'dikonfirmasi')
      ? '<button class="act act--done" data-aksi="selesai">Tandai Selesai</button>'
      : '';

    updateCounts();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-aksi]');
    if (!btn) return;
    var row = btn.closest('.row');
    var aksi = btn.getAttribute('data-aksi');

    if (aksi === 'konfirmasi') setStatus(row, 'dikonfirmasi');
    if (aksi === 'selesai') setStatus(row, 'selesai');
    if (aksi === 'tolak') {
      if (confirm('Tolak reservasi ini?')) setStatus(row, 'dibatalkan');
    }
  });

  updateCounts();
})();
