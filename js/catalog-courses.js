const params = new URLSearchParams(window.location.search);
const facultyCode = params.get('fakultas') || '';
const selectedProgram = params.get('prodi') || '';
const faculty = window.sksFaculties[facultyCode];
const courses = window.sksProgramCourses[selectedProgram] || [];
const title = document.querySelector('#catalog-program-title');
const backLink = document.querySelector('#catalog-back');
const courseList = document.querySelector('#catalog-course-list');
const featuredNotes = document.querySelector('#catalog-featured-notes');
const searchInput = document.querySelector('#catalog-course-search');
const emptyMessage = document.querySelector('#catalog-course-empty');

title.textContent = selectedProgram ? `Katalog Note ${selectedProgram}` : 'Katalog Note Program Studi';
document.title = `${title.textContent} | SKS`;
backLink.href = facultyCode && faculty ? `katalog_prodi.html?fakultas=${encodeURIComponent(facultyCode)}` : 'katalog.html';
backLink.textContent = faculty ? `← Kembali ke ${faculty.name}` : '← Kembali ke katalog';

const courseCounts = new Map();
Object.values(window.sksProgramCourses).forEach((programCourses) => {
  new Set(programCourses).forEach((course) => {
    courseCounts.set(course, (courseCounts.get(course) || 0) + 1);
  });
});

const cards = courses.map((course, index) => {
  const card = document.createElement('a');
  const sharedCourse = courseCounts.get(course) > 1;
  const detailParams = new URLSearchParams({ matkul: course });

  if (!sharedCourse && course.toLocaleLowerCase('id') !== 'tata naskah dinas') {
    detailParams.set('prodi', selectedProgram);
    if (facultyCode) detailParams.set('fakultas', facultyCode);
  }

  card.className = `note-card ${index % 2 ? 'note-green' : 'note-yellow'}`;
  card.href = `katalog_deskripsi.html?${detailParams.toString()}`;
  card.dataset.course = course.toLocaleLowerCase('id');
  card.dataset.catalogReturn = '';
  card.setAttribute('aria-label', `Lihat Katalog Note ${course}`);

  const artwork = document.createElement('span');
  artwork.className = 'note-art';
  artwork.setAttribute('aria-hidden', 'true');
  const name = document.createElement('strong');
  name.textContent = course;
  const action = document.createElement('small');
  action.textContent = 'Lihat Katalog Note';

  card.append(artwork, name, action);
  card.addEventListener('click', () => {
    sessionStorage.setItem('sks-catalog-return-url', window.location.href);
  });
  return card;
});

if (selectedProgram === 'D4 Kearsipan dan Informasi Digital') {
  const featuredCards = [
    {
      course: 'Tata Naskah Dinas',
      source: 'Sumber : Isna Saumia - 2024',
      image: 'Review%20TND.jpeg',
      className: 'note-yellow note-review-card'
    },
    {
      course: 'Akuntansi Pengantar',
      source: 'Sumber : ........',
      className: 'note-green'
    },
    {
      course: 'Analisis Bisnis',
      source: 'Sumber : ........',
      className: 'note-yellow'
    }
  ];

  const featuredCourseNames = new Set(
    featuredCards.map(({ course }) => course.toLocaleLowerCase('id'))
  );
  featuredNotes.hidden = false;
  const grid = document.createElement('div');
  grid.className = 'note-grid note-grid-three';

  featuredCards.forEach(({ course, source, image, className, programScoped }) => {
    const card = document.createElement('a');
    card.className = `note-card ${className}`;
    card.dataset.course = course.toLocaleLowerCase('id');
    const detailParams = new URLSearchParams({ matkul: course });
    card.href = `katalog_deskripsi.html?${detailParams.toString()}`;
    card.setAttribute('aria-label', `Lihat Katalog Note ${course}, ${source}`);

    const artwork = document.createElement('span');
    artwork.className = 'note-art';
    if (image) {
      const preview = document.createElement('img');
      preview.src = image;
      preview.alt = `Catatan ${course} oleh Isna Saumia`;
      artwork.append(preview);
    } else {
      artwork.setAttribute('aria-hidden', 'true');
    }
    const name = document.createElement('strong');
    name.textContent = course.toLocaleUpperCase('id');
    const sourceLabel = document.createElement('small');
    sourceLabel.textContent = source;

    card.append(artwork, name, sourceLabel);
    card.addEventListener('click', () => {
      sessionStorage.setItem('sks-catalog-return-url', window.location.href);
    });
    grid.append(card);
  });

  featuredNotes.append(grid);
  for (let index = cards.length - 1; index >= 0; index -= 1) {
    if (featuredCourseNames.has(cards[index].dataset.course)) cards.splice(index, 1);
  }
}

courseList.replaceChildren(...cards);
const searchableCards = [...cards, ...featuredNotes.querySelectorAll('.note-card')];
emptyMessage.hidden = searchableCards.length > 0;
emptyMessage.textContent = courses.length
  ? 'Mata kuliah tidak ditemukan.'
  : 'Daftar mata kuliah untuk program studi ini belum tersedia.';

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase('id');
  let visibleCount = 0;

  searchableCards.forEach((card) => {
    const matches = card.dataset.course.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  emptyMessage.hidden = visibleCount > 0;
  if (!visibleCount && courses.length) emptyMessage.textContent = 'Mata kuliah tidak ditemukan.';
});
