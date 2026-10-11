const facultyCode = new URLSearchParams(window.location.search).get('fakultas') || 'feb';
const faculties = window.sksFaculties;
const faculty = faculties[facultyCode] || faculties.feb;
const title = document.querySelector('#faculty-title');
const programGrid = document.querySelector('#program-grid');
const emptyMessage = document.querySelector('#program-empty');
const searchInput = document.querySelector('#program-search');
const colors = ['study-yellow', 'study-green'];

document.title = `${faculty.name} | Program Bimbingan SKS`;
title.textContent = faculty.name;

const programCards = faculty.programs.map((program, index) => {
  const card = document.createElement('article');
  card.className = `study-card ${colors[index % colors.length]}`;
  card.dataset.program = program.toLocaleLowerCase('id');

  const icon = document.createElement('div');
  icon.className = 'study-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = ['▣', '◈', '▤', '♙'][index % 4];

  const content = document.createElement('div');
  const heading = document.createElement('h2');
  heading.textContent = program;
  const description = document.createElement('p');
  description.textContent = 'Program studi tersedia untuk bimbingan.';
  const link = document.createElement('a');
  const coursePageParams = new URLSearchParams({ prodi: program, fakultas: facultyCode });
  link.href = `tutor_matkul.html?${coursePageParams.toString()}`;
  link.textContent = 'Pilih Mata Kuliah';

  content.append(heading, description, link);
  card.append(icon, content);
  return card;
});

programGrid.replaceChildren(...programCards);
emptyMessage.hidden = faculty.programs.length > 0;

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase('id');
  let visibleCount = 0;

  programCards.forEach((card) => {
    const matches = card.dataset.program.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  emptyMessage.hidden = faculty.programs.length > 0 && visibleCount > 0;
  if (faculty.programs.length > 0) {
    emptyMessage.textContent = visibleCount ? '' : 'Program studi tidak ditemukan.';
  }
});
