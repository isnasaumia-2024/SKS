const coursesByProgram = {};
const addCourses = (programs, courses) => {
  programs.forEach((program) => {
    coursesByProgram[program] = courses;
  });
};

const dataAndLibrary = ['Data dan Pustaka'];
const healthAndMedicine = [
  ...dataAndLibrary,
  'Etika dan Hukum Kesehatan',
  'Komunikasi Kesehatan dan Layanan Dasar Kesehatan'
];

addCourses([
  'Kedokteran',
  'Kebidanan',
  'Kedokteran Gigi',
  'Farmasi',
  'Kedokteran Hewan',
  'Kesehatan Masyarakat',
  'Gizi',
  'Psikologi',
  'Keperawatan',
  'D3 Keperawatan'
], healthAndMedicine);

addCourses(['Ilmu Hukum'], dataAndLibrary);

addCourses([
  'Manajemen',
  'Ekonomi Islam',
  'Ilmu Ekonomi',
  'Akuntansi'
], [...dataAndLibrary, 'Akuntansi Keuangan Dasar']);

addCourses([
  'Ilmu Komunikasi',
  'Ilmu Informasi & Perpustakaan',
  'Administrasi Publik',
  'Antropologi',
  'Sosiologi',
  'Ilmu Politik',
  'Hubungan Internasional'
], [...dataAndLibrary, 'Teknik Penulisan Ilmiah']);

addCourses([
  'Sistem Informasi',
  'Matematika',
  'Fisika',
  'Kimia',
  'Teknik Lingkungan',
  'Biologi',
  'Teknik Biomedis',
  'Statistika'
], [...dataAndLibrary, 'Biologi Dasar', 'Kimia Dasar', 'Kalkulus']);

addCourses([
  'Bahasa & Sastra Indonesia',
  'Bahasa & Sastra Inggris',
  'Ilmu Sejarah',
  'Studi Kejepangan'
], [
  ...dataAndLibrary,
  'Pengantar Ilmu Budaya',
  'Bahasa Inggris',
  'Pengantar Penelitian dan Teori Kebudayaan',
  'Pengantar Filsafat'
]);

addCourses([
  'Akuakultur',
  'Teknologi Hasil Perikanan',
  'Teknik Robotika & Kecerdasan Buatan',
  'Teknologi Sains Data',
  'Teknik Industri',
  'Teknik Elektro',
  'Rekayasa Nanoteknologi',
  'D3 Bahasa Inggris',
  'D3 Perpajakan',
  'D4 Akuntansi Bisnis Digital',
  'D4 Manajemen Komunikasi Pemasaran',
  'D4 Manajemen Perhotelan',
  'D4 Destinasi Pariwisata',
  'D4 Manajemen Perkantoran Digital',
  'D4 Perbankan dan Keuangan Digital',
  'D4 Teknologi Kesehatan Gigi',
  'D4 Pengobat Tradisional',
  'D4 Fisioterapi',
  'D4 Teknologi Radiologi Pencitraan',
  'D4 Teknologi Laboratorium Medis',
  'D4 Keselamatan dan Kesehatan Kerja',
  'D4 Teknologi Veteriner',
  'D4 Teknik Informatika',
  'D4 Teknologi Rekayasa Instrumentasi dan Kontrol',
  'D4 Kearsipan dan Informasi Digital'
], dataAndLibrary);

addCourses([
  'D4 Teknologi Kesehatan Gigi',
  'D4 Pengobat Tradisional',
  'D4 Fisioterapi',
  'D4 Teknologi Radiologi Pencitraan',
  'D4 Teknologi Laboratorium Medis',
  'D4 Keselamatan dan Kesehatan Kerja'
], healthAndMedicine);

addCourses(['D4 Kearsipan dan Informasi Digital'], [
  ...dataAndLibrary,
  'Manajemen Kearsipan',
  'Manajemen Aset Digital',
  'Manajemen Lembaga Informasi',
  'Pengelolaan Arsip Dinamis',
  'Pengelolaan Arsip Vital',
  'Arsip Digital',
  'Bahasa Inggris Profesi',
  'Tata Naskah Dinas',
  'Pemberkasan Arsip',
  'Manajemen Risiko Lembaga Informasi',
  'Klasifikasi Arsip',
  'Sistem Informasi Kearsipan Digital',
  'Akuisisi Arsip',
  'Layanan Arsip dan Informasi',
  'Pengelolaan Arsip Statis',
  'Penilaian dan Penyusutan Arsip',
  'Arsitektur Sistem Informasi Kearsipan',
  'Keamanan Sistem Informasi Kearsipan',
  'Audit Kearsipan',
  'Preservasi Arsip',
  'Manajemen Inovasi',
  'Database Sistem Informasi Kearsipan',
  'Klasifikasi keamanan dan akses arsip',
  'Kajian Arsip dan Informasi Digital',
  'Memori Organisasi',
  'Metode Penelitian'
]);

window.sksProgramCourses = coursesByProgram;
