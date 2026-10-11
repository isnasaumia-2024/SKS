const faculties = window.sksFaculties;
const facultyCode = new URLSearchParams(window.location.search).get('fakultas') || 'feb';
const faculty = faculties[facultyCode] || faculties.feb;
const pageTitle = document.querySelector('#catalog-faculty-title');
const groupsContainer = document.querySelector('#catalog-program-groups');
const emptyMessage = document.querySelector('#catalog-program-empty');
const searchInput = document.querySelector('#catalog-program-search');
const programCards = [];
const cardColors = ['study-yellow', 'study-green'];

pageTitle.textContent = faculty.name;
document.title = `${faculty.name} | Katalog Note SKS`;

const createProgramCard = (program, index) => {
  const card = document.createElement('article');
  card.className = `study-card ${cardColors[index % cardColors.length]} catalog-program-card`;
  card.dataset.program = program.toLocaleLowerCase('id');

  const icon = document.createElement('div');
  icon.className = 'study-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = ['▣', '◈', '▤', '♙'][index % 4];

  const content = document.createElement('div');
  const heading = document.createElement('h2');
  heading.textContent = program;
  const description = document.createElement('p');
  description.textContent = 'Cari catatan kuliah untuk program studi ini.';
  const link = document.createElement('a');
  const params = new URLSearchParams({ fakultas: facultyCode, prodi: program });
  link.href = `katalog_matkul.html?${params.toString()}`;
  link.textContent = 'Pilih Katalog Note';

  content.append(heading, description, link);
  card.append(icon, content);
  programCards.push(card);
  return card;
};

const createProgramGrid = (programs) => {
  const grid = document.createElement('section');
  grid.className = 'study-grid catalog-study-grid';
  programs.forEach((program) => grid.append(createProgramCard(program, programCards.length)));
  return grid;
};

if (faculty.departments?.length) {
  faculty.departments.forEach((department) => {
    const section = document.createElement('section');
    section.className = 'catalog-program-department';
    const heading = document.createElement('h2');
    heading.textContent = department.name;
    section.append(heading, createProgramGrid(department.programs));
    groupsContainer.append(section);
  });
} else if (faculty.programs.length) {
  groupsContainer.append(createProgramGrid(faculty.programs));
}

emptyMessage.hidden = faculty.programs.length > 0;
if (!faculty.programs.length) {
  emptyMessage.textContent = 'Data program studi untuk fakultas ini belum tersedia.';
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase('id');
  let visibleCount = 0;

  programCards.forEach((card) => {
    const matches = card.dataset.program.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  if (faculty.programs.length) {
    emptyMessage.hidden = visibleCount > 0;
    emptyMessage.textContent = visibleCount ? '' : 'Program studi tidak ditemukan.';
  }
});
