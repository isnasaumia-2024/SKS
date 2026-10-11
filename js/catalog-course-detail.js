const params = new URLSearchParams(window.location.search);
const courseName = params.get('matkul')?.trim() || 'Mata Kuliah';
const title = document.querySelector('#catalog-course-title');
const context = document.querySelector('#catalog-course-context');
const backLink = document.querySelector('#catalog-course-back');
const description = document.querySelector('#catalog-course-description');
const courseImage = document.querySelector('#catalog-course-image');
const placeholderImage = document.querySelector('#catalog-course-placeholder');
const pricingSection = document.querySelector('#catalog-course-pricing');
const divider = document.querySelector('#catalog-course-divider');
const program = params.get('prodi');
const faculty = params.get('fakultas');

const normalizedCourseName = courseName.toLocaleLowerCase('id');
const isTataNaskahDinas = normalizedCourseName === 'tata naskah dinas';

if (isTataNaskahDinas) {
  const canonicalParams = new URLSearchParams({ matkul: 'Tata Naskah Dinas' });
  window.history.replaceState(null, '', `${window.location.pathname}?${canonicalParams.toString()}`);
  sessionStorage.removeItem('sks-catalog-return-url');
  document.querySelector('main').classList.add('catalog-tnd-detail');
  title.textContent = 'Rangkuman TATA NASKAH DINAS';
  document.title = 'Rangkuman TATA NASKAH DINAS | Katalog Note SKS';
  context.textContent = 'KID 2024 • Dibuat oleh Isna Saumia';
  description.textContent = 'Rangkuman pengantar Tata Naskah Dinas, Tujuan dan Manfaat, hingga Jenis Naskah Dinas.';
  courseImage.hidden = false;
  placeholderImage.hidden = true;
  pricingSection.hidden = false;
  divider.hidden = false;
  backLink.href = 'katalog.html';
  backLink.textContent = '← Kembali ke katalog';
} else {
  title.textContent = `Katalog Note ${courseName}`;
  document.title = `${title.textContent} | SKS`;
  context.textContent = '';
  description.textContent = 'Catatan untuk mata kuliah ini belum tersedia.';
  courseImage.hidden = true;
  placeholderImage.hidden = false;
  pricingSection.hidden = true;
  divider.hidden = true;

  let returnUrl = null;
  if (!program) {
    const savedReturnUrl = sessionStorage.getItem('sks-catalog-return-url');
    if (savedReturnUrl) {
      try {
        returnUrl = new URL(savedReturnUrl);
      } catch (error) {
        console.error('Tidak dapat membaca halaman katalog sebelumnya.', error);
      } finally {
        sessionStorage.removeItem('sks-catalog-return-url');
      }
    }
  }

  if (program) {
    context.textContent = `Program Studi: ${program}`;
    const backParams = new URLSearchParams({ prodi: program });
    if (faculty) backParams.set('fakultas', faculty);
    backLink.href = `katalog_matkul.html?${backParams.toString()}`;
    backLink.textContent = '← Kembali ke daftar mata kuliah';
  } else {
    const previousPage = returnUrl?.pathname.split('/').pop();
    if (previousPage === 'katalog_matkul.html'
      && returnUrl.searchParams.has('prodi')
      && returnUrl.searchParams.has('fakultas')) {
      context.textContent = `Program Studi: ${returnUrl.searchParams.get('prodi')}`;
      backLink.href = `katalog_matkul.html${returnUrl.search}`;
      backLink.textContent = '← Kembali ke daftar mata kuliah';
    } else if (previousPage === 'katalog.html') {
      context.textContent = 'Rekomendasi Katalog Note';
      backLink.href = 'katalog.html#recommendation';
      backLink.textContent = '← Kembali ke rekomendasi katalog';
    } else {
      context.textContent = 'Mata kuliah ini tersedia untuk beberapa program studi.';
    }
  }
}
