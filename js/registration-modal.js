const setupRegistrationModal = () => {
  const modal = document.createElement('div');
  modal.className = 'registration-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <div class="registration-dialog" role="dialog" aria-modal="true" aria-labelledby="registration-title">
      <button class="registration-close" type="button" aria-label="Tutup">&times;</button>
      <p class="registration-kicker">Mulai bersama SKS</p>
      <h2 id="registration-title">Mau daftar sebagai apa?</h2>
      <p class="registration-description">Pilih peranmu untuk melanjutkan pendaftaran.</p>
      <div class="registration-options">
        <a class="registration-option registration-member" href="https://forms.gle/jSXTgQrveHCkNZb29" target="_blank" rel="noopener noreferrer">
          <strong>Anggota</strong>
          <span>Anggota adalah khusus buat kamu yang ingin mencari dan memanfaatkan fasilitas belajar, seperti memesan tutor privat/kelompok atau mengakses katalog catatan kuliah untuk membantumu belajar secara mandiri.</span>
        </a>
        <a class="registration-option registration-tutor" href="https://forms.gle/GwHnG3YRwSz5e5Ys9" target="_blank" rel="noopener noreferrer">
          <strong>Tutor / Creator</strong>
          <span><b>Tentor =</b> Pengajar privat/kelompok yang<br>membantu mahasiswa belajar dan menguasai materi kuliah.<br><b>Kreator =</b> Pembuat dan penyedia materi<br>digital (seperti catatan perkuliahan rapi) yang bisa diakses mahasiswa lain.</span>
        </a>
      </div>
    </div>`;

  document.body.append(modal);
  const closeButton = modal.querySelector('.registration-close');
  const triggers = document.querySelectorAll('.registration-trigger, a[href="daftar.html"]');

  triggers.forEach((trigger) => {
    trigger.classList.add('registration-trigger');
    trigger.setAttribute('href', '#registration');
  });

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      modal.hidden = false;
      document.body.classList.add('modal-open');
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
};

const setupMobileNavigation = () => {
  const navWrap = document.querySelector('.nav-wrap');
  const mainNav = navWrap?.querySelector('.main-nav');
  if (!navWrap || !mainNav) return;

  let menuButton = navWrap.querySelector('.menu-mark');
  if (!menuButton) {
    menuButton = document.createElement('button');
    menuButton.className = 'menu-mark';
    menuButton.setAttribute('aria-label', 'Buka menu');
    menuButton.innerHTML = '<span></span><span></span><span></span>';
    navWrap.prepend(menuButton);
  }

  const drawer = document.createElement('div');
  drawer.className = 'mobile-drawer';
  drawer.id = 'mobile-navigation';
  const closeButton = document.createElement('button');
  closeButton.className = 'mobile-drawer-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Tutup menu');
  closeButton.innerHTML = '&times;';
  drawer.append(closeButton);
  navWrap.insertBefore(drawer, mainNav);
  const brand = navWrap.querySelector('.brand');
  if (brand) drawer.append(brand);
  drawer.append(mainNav);

  const navActions = navWrap.querySelector('.nav-actions');
  if (navActions) drawer.append(navActions);

  const backdrop = document.createElement('button');
  backdrop.className = 'mobile-drawer-backdrop';
  backdrop.type = 'button';
  backdrop.setAttribute('aria-label', 'Tutup menu');
  document.body.append(backdrop);
  menuButton.setAttribute('aria-controls', drawer.id);
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu');

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu');
    document.body.classList.remove('mobile-menu-open');
  };
  const openDrawer = () => {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Tutup menu');
    document.body.classList.add('mobile-menu-open');
    closeButton.focus();
  };

  menuButton.addEventListener('click', openDrawer);
  closeButton.addEventListener('click', () => {
    closeDrawer();
    menuButton.focus();
  });
  backdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('.drop-toggle').forEach((toggle) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.closest('.drop').classList.toggle('is-open', !isOpen);
    });
  });
  drawer.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
      menuButton.focus();
    }
  });
};

const setupCatalogPreview = () => {
  const trigger = document.querySelector('.preview-button');
  if (!trigger) return;

  const previewSource = trigger.dataset.previewSrc || 'preview-akuntansi-dasar.svg';
  const previewAlt = trigger.dataset.previewAlt || 'Contoh satu halaman rangkuman siklus akuntansi perusahaan jasa';
  const modal = document.createElement('div');
  modal.className = 'catalog-preview-modal';
  modal.hidden = true;
  const dialog = document.createElement('div');
  dialog.className = 'catalog-preview-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', previewAlt);
  const closeButton = document.createElement('button');
  closeButton.className = 'catalog-preview-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Tutup preview');
  closeButton.textContent = '\u00d7';
  const previewImage = document.createElement('img');
  previewImage.src = previewSource;
  previewImage.alt = previewAlt;
  dialog.append(closeButton, previewImage);
  modal.append(dialog);
  document.body.append(modal);

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    trigger.focus();
  };

  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.addEventListener('click', () => {
    modal.hidden = false;
    document.body.classList.add('modal-open');
    closeButton.focus();
  });
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
};

const setupGuideImagePreview = () => {
  const images = [...document.querySelectorAll('.guide-grid img')];
  if (!images.length) return;

  const modal = document.createElement('div');
  modal.className = 'poster-modal guide-image-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Pratinjau gambar prosedur');
  modal.hidden = true;

  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Tutup pratinjau');
  closeButton.textContent = '\u00d7';

  const preview = document.createElement('img');
  modal.append(closeButton, preview);
  document.body.append(modal);

  let activeImage;
  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    activeImage?.focus();
  };
  const openModal = (image) => {
    activeImage = image;
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    closeButton.focus();
  };

  images.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-haspopup', 'dialog');
    image.setAttribute('aria-label', `Perbesar gambar: ${image.alt}`);
    image.addEventListener('click', () => openModal(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(image);
      }
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
};

const setupTutorBackLink = () => {
  const main = document.querySelector('main.tutor-page, main.tutor-detail, main.booking-page');
  if (!main) return;

  const previousPages = {
    'tutor.html': { fallback: 'index.html', allowed: [] },
    'tutor_prodi.html': { fallback: 'tutor.html', allowed: ['tutor.html'] },
    'tutor_vokasi.html': { fallback: 'tutor.html', allowed: ['tutor.html'] },
    'tutor_matkul.html': { fallback: 'tutor_prodi.html', allowed: ['tutor_prodi.html', 'tutor_vokasi.html'] },
    'tutor_matkul_detail.html': { fallback: 'tutor_matkul.html', allowed: ['tutor_matkul.html'] },
    'tutor_deskripsi.html': { fallback: 'tutor_matkul.html', allowed: ['tutor_matkul.html'] },
    'tutor_kedokteran.html': { fallback: 'tutor_prodi.html', allowed: ['tutor_prodi.html'] },
    'tutor_ilmu_politik.html': { fallback: 'tutor_prodi.html', allowed: ['tutor_prodi.html'] },
    'tutor_booking.html': { fallback: 'tutor.html', allowed: [] }
  };
  const currentPage = window.location.pathname.split('/').pop();
  const route = previousPages[currentPage];
  if (!route) return;

  let destination = route.fallback;
  const currentUrl = new URL(window.location.href);
  const programContext = new URLSearchParams();
  ['fakultas', 'prodi'].forEach((key) => {
    const value = currentUrl.searchParams.get(key);
    if (value) programContext.set(key, value);
  });

  if (currentPage === 'tutor_matkul.html') {
    const facultyCode = currentUrl.searchParams.get('fakultas');
    const validFacultyCodes = new Set([
      'fk', 'fkg', 'fh', 'feb', 'ff', 'fkh', 'fisip', 'fst',
      'fkm', 'fps', 'fib', 'fkp', 'fpk', 'ftmm', 'vokasi'
    ]);

    if (facultyCode && validFacultyCodes.has(facultyCode)) {
      destination = `tutor_prodi.html?${new URLSearchParams({ fakultas: facultyCode })}`;
    }
  } else if (currentPage === 'tutor_matkul_detail.html') {
    if (programContext.size) destination = `tutor_matkul.html?${programContext.toString()}`;
  }

  try {
    const referrerUrl = new URL(document.referrer);
    const sameDirectory = currentUrl.protocol === referrerUrl.protocol
      && currentUrl.host === referrerUrl.host
      && currentUrl.pathname.slice(0, currentUrl.pathname.lastIndexOf('/') + 1)
        === referrerUrl.pathname.slice(0, referrerUrl.pathname.lastIndexOf('/') + 1);
    const referrerPage = referrerUrl.pathname.split('/').pop();
    if (sameDirectory && route.allowed.includes(referrerPage)) {
      const query = referrerPage === 'tutor_prodi.html'
        ? referrerUrl.search
        : referrerPage === 'tutor_matkul.html'
          ? referrerUrl.search || (programContext.size ? `?${programContext.toString()}` : '')
          : '';
      destination = `${referrerPage}${query}`;
    }
  } catch {
    // Keep the fallback destination when the page was opened directly.
  }

  const backLink = document.createElement('a');
  backLink.className = 'tutor-back';
  backLink.href = destination;
  backLink.textContent = '← Kembali';
  main.prepend(backLink);
};

const setupBackNavigationLayout = () => {
  document.querySelectorAll('main .catalog-back, main .tutor-back').forEach((backLink) => {
    backLink.closest('main')?.classList.add('has-back-navigation');
  });
};

const initializeSite = () => {
  setupRegistrationModal();
  setupMobileNavigation();
  setupCatalogPreview();
  setupGuideImagePreview();
  setupTutorBackLink();
  setupBackNavigationLayout();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSite);
} else {
  initializeSite();
}
