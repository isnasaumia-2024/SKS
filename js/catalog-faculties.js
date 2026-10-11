const catalogFacultyCodes = {
  Kedokteran: 'fk',
  'Ekonomi & Bisnis': 'feb',
  Hukum: 'fh',
  Farmasi: 'ff',
  'Ilmu Sosial & Ilmu Politik': 'fisip',
  'Sains & Teknologi': 'fst',
  'Kedokteran Hewan': 'fkh',
  'Kedokteran Gigi': 'fkg',
  'Kesehatan Masyarakat': 'fkm',
  'Perikanan & Kelautan': 'fpk',
  Keperawatan: 'fkp',
  'Teknologi Maju & Multidisiplin': 'ftmm',
  Vokasi: 'vokasi',
  Psikologi: 'fps',
  'Ilmu Budaya': 'fib'
};

document.querySelectorAll('.faculty-chip-grid a').forEach((link) => {
  const facultyName = link.querySelector('span')?.textContent.replace(/\s+/g, ' ').trim();
  const facultyCode = link.dataset.faculty || catalogFacultyCodes[facultyName];
  if (facultyCode) link.href = `katalog_prodi.html?fakultas=${facultyCode}`;
});

document.querySelectorAll('[data-catalog-return]').forEach((link) => {
  link.addEventListener('click', () => {
    sessionStorage.setItem('sks-catalog-return-url', window.location.href);
  });
});
