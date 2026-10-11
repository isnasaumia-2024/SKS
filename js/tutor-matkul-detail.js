const params = new URLSearchParams(window.location.search);
const courseName = params.get('matkul')?.trim() || 'Mata Kuliah';
const courseNameLabel = document.querySelector('#course-name');
const tutorList = document.querySelector('#course-tutor-list');
const tutorEmpty = document.querySelector('#course-tutor-empty');
const selectionSection = document.querySelector('#course-selection');
const selectedTutorName = document.querySelector('#selected-tutor-name');
const selectedTutorCohort = document.querySelector('#selected-tutor-cohort');
const selectedTutorGrade = document.querySelector('#selected-tutor-grade');
const selectedTutorAchievement = document.querySelector('#selected-tutor-achievement');
const priceList = document.querySelector('#course-price-list');
const pricingTabs = document.querySelectorAll('[data-course-mode]');
const memberRegistrationForm = 'https://forms.gle/jSXTgQrveHCkNZb29';

const tutorsByCourse = {
  'Tata Naskah Dinas': [
    {
      name: 'Isna Saumia',
      cohort: 'KID - 2024',
      grade: 'A (4.00)',
      achievement: '-'
    },
    {
      name: 'Fitria Susilowati',
      cohort: 'KID - 2024',
      grade: 'A (4.00)',
      achievement: 'Juara 1 National Accounting Olympiad 2023'
    }
  ]
};

const pricesByMode = {
  privat: [
    { place: 'Kampus', audience: 'private', duration: '50 menit (1 sesi)', price: 50000, unit: 'orang' },
    { place: 'Cafe', audience: 'private', duration: '50 menit (1 sesi)', price: 50000, unit: 'orang' },
    { place: 'Online', audience: 'private', duration: '50 menit (1 sesi)', price: 40000, unit: 'orang' }
  ],
  kelompok: [
    { place: 'Kampus/Cafe', audience: 'Max 3', duration: '50 menit (1 sesi)', price: 45000, unit: 'orang' },
    { place: 'Kampus/Cafe', audience: 'Max 5', duration: '50 menit (1 sesi)', price: 40000, unit: 'orang' },
    { place: 'Online', audience: 'Max 5', duration: '50 menit (1 sesi)', price: 30000, unit: 'orang' }
  ]
};

courseNameLabel.textContent = courseName;
document.title = `Tutor Mata Kuliah ${courseName} | SKS`;

const tutors = tutorsByCourse[courseName] || [];
let selectedTutor = null;

const createPricingIcon = (type) => {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('aria-hidden', 'true');
  icon.classList.add('course-price-meta-icon', `course-price-meta-icon-${type}`);

  const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  shape.setAttribute('d', type === 'person'
    ? 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-8 1.65-8 4v2h16v-2c0-2.35-4.7-4-8-4Z'
    : 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm1-13h-2v6l5 3 1-1.7-4-2.3V7Z');
  icon.append(shape);
  return icon;
};

const createPriceMetadata = (iconType, text) => {
  const metadata = document.createElement('div');
  metadata.className = 'course-price-meta';
  metadata.append(createPricingIcon(iconType));
  const label = document.createElement('span');
  label.textContent = text;
  metadata.append(label);
  return metadata;
};

const renderPrices = (mode) => {
  priceList.replaceChildren();

  pricesByMode[mode].forEach((option) => {
    const card = document.createElement('article');
    card.className = 'course-price-card';

    const title = document.createElement('strong');
    title.className = 'course-price-mode';
    title.textContent = option.place;
    card.append(title);

    card.append(createPriceMetadata('person', option.audience));
    card.append(createPriceMetadata('clock', option.duration));

    const price = document.createElement('p');
    price.className = 'course-price-value';
    const amount = document.createElement('span');
    amount.className = 'course-price-amount';
    amount.textContent = `Rp ${option.price.toLocaleString('id-ID')}/`;
    const unit = document.createElement('small');
    unit.className = 'course-price-unit';
    unit.textContent = option.unit;
    price.append(amount, unit);
    card.append(price);

    const bookingLink = document.createElement('a');
    bookingLink.className = 'course-booking-button';
    bookingLink.href = memberRegistrationForm;
    bookingLink.target = '_blank';
    bookingLink.rel = 'noopener noreferrer';
    bookingLink.textContent = 'Booking Tutor';
    card.append(bookingLink);
    priceList.append(card);
  });
};

const selectTutor = (tutor, selectedCard, selectedAction) => {
  selectedTutor = tutor;
  tutorList.querySelectorAll('.course-tutor-card').forEach((card) => {
    const isSelected = card === selectedCard;
    card.classList.toggle('is-selected', isSelected);
    card.querySelector('.course-tutor-action').setAttribute('aria-expanded', String(isSelected));
  });

  selectedTutorName.textContent = tutor.name;
  selectedTutorCohort.textContent = tutor.cohort;
  selectedTutorGrade.textContent = tutor.grade;
  selectedTutorAchievement.textContent = tutor.achievement;
  selectionSection.hidden = false;
  renderPrices(document.querySelector('[data-course-mode].is-active').dataset.courseMode);
  selectedAction.setAttribute('aria-expanded', 'true');
};

if (tutors.length) {
  tutorList.hidden = false;
  tutors.forEach((tutor) => {
    const card = document.createElement('article');
    card.className = 'course-tutor-card';

    const banner = document.createElement('span');
    banner.className = 'course-tutor-banner';
    banner.setAttribute('aria-hidden', 'true');

    const avatar = document.createElement('span');
    avatar.className = 'course-avatar course-tutor-card-avatar';
    avatar.setAttribute('aria-hidden', 'true');

    const name = document.createElement('strong');
    name.textContent = tutor.name;
    const cohort = document.createElement('span');
    cohort.className = 'course-tutor-cohort';
    cohort.textContent = tutor.cohort;

    const grade = document.createElement('span');
    grade.className = 'course-tutor-summary';
    grade.textContent = `☆  Nilai Mata Kuliah ${tutor.grade}`;
    const achievement = document.createElement('span');
    achievement.className = 'course-tutor-summary';
    achievement.textContent = `♧  Prestasi ${tutor.achievement}`;

    const action = document.createElement('button');
    action.className = 'course-tutor-action';
    action.type = 'button';
    action.textContent = 'Biaya Bimbingan';
    action.setAttribute('aria-label', `Tampilkan biaya bimbingan untuk ${tutor.name}`);
    action.setAttribute('aria-controls', 'course-selection');
    action.setAttribute('aria-expanded', 'false');
    action.addEventListener('click', () => selectTutor(tutor, card, action));

    card.append(banner, avatar, name, cohort, grade, achievement, action);
    tutorList.append(card);
  });
} else {
  tutorEmpty.hidden = false;
}

pricingTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const mode = tab.dataset.courseMode;
    pricingTabs.forEach((option) => {
      const isSelected = option === tab;
      option.classList.toggle('is-active', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });
    if (selectedTutor) renderPrices(mode);
  });
});
