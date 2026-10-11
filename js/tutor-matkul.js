const params = new URLSearchParams(window.location.search);
const selectedProgram = params.get('prodi') || '';
const title = document.querySelector('#course-title');
const courseGrid = document.querySelector('#course-grid');
const searchInput = document.querySelector('#course-search');
const emptyMessage = document.querySelector('#course-empty');
const courses = window.sksProgramCourses[selectedProgram] || [];

title.textContent = selectedProgram || 'Program Studi';
document.title = `${selectedProgram || 'Program Studi'} | SKS`;

const courseCards = courses.map((course, index) => {
  const card = document.createElement('a');
  const detailParams = new URLSearchParams({
    matkul: course,
    prodi: selectedProgram,
    fakultas: params.get('fakultas') || ''
  });

  card.className = `course-card ${['course-yellow', 'course-green', 'course-deep'][index % 3]}`;
  card.href = `tutor_matkul_detail.html?${detailParams.toString()}`;
  card.dataset.course = course.toLocaleLowerCase('id');
  const label = document.createElement('strong');
  label.textContent = course;
  card.append(label);

  const action = document.createElement('span');
  action.textContent = 'Pilih Bimbingan';
  card.append(action);
  return card;
});

courseGrid.replaceChildren(...courseCards);
emptyMessage.textContent = courses.length
  ? 'Mata kuliah tidak ditemukan.'
  : 'Daftar mata kuliah untuk program studi ini belum tersedia.';
emptyMessage.hidden = courses.length > 0;

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase('id');
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const matches = card.dataset.course.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  emptyMessage.hidden = visibleCount > 0;
});
