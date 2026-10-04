/**
 * Juejeet Malakar Portfolio - Technical Blueprint Engine
 * Loads user data from data.js, supports inline visual editing,
 * photo uploading, dynamic table/card additions, and data.js export.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let isEditMode = false;
  const STORAGE_KEY = 'portfolio_blueprint_profile_data';

  // Base fallback data (matches Kaushik Barman profile)
  const defaultFallback = {
    name: 'KAUSHIK BARMAN',
    profilePhoto: 'assets/Kaushik Image.jpg',
    profileCaption: 'profile photo',
    hero: {
      title: 'hi there',
      introLine: 'Kaushik Barman here, nice to meet you 👋',
      bio: 'I am a Computer Science student passionate about building intelligent systems and scalable infrastructure. Currently focusing on Artificial Intelligence, Machine Learning, cloud virtualization architecture, and modern DevOps practices.',
      labNote: 'This portfolio site is hosted as part of my Cloud Virtualization practical lab assignment.'
    },
    navigation: {
      about: '[ABOUT]',
      qualifications: '[QUALIFICATIONS]',
      skillsets: '[SKILLSETS]'
    },
    qualifications: [
      {
        period: '2024 - 2027',
        degree: 'Bachelor of Technology in Computer Science & Engineering',
        institution: 'Assam down town University'
      },
      {
        period: '2022 - 2024',
        degree: 'Higher Secondary Education (10+2 Science)',
        institution: 'C.V. Raman Academy of Science'
      }
    ],
    skills: [
      {
        title: 'Web Development',
        description: 'Hands-on experience with HTML5, CSS3, JavaScript and responsive website design.'
      },
      {
        title: 'Programming',
        description: 'Working knowledge of C, C++, Python and fundamental data structures and algorithms.'
      },
      {
        title: 'AI & Technology',
        description: 'Exploring artificial intelligence, generative AI, machine learning concepts and APIs.'
      }
    ],
    footer: {
      systemStatus: '● SYSTEM STATUS: ONLINE',
      assignmentNote: 'HOSTED ASSIGNMENT // CLOUD VIRTUALIZATION'
    }
  };

  // Resolve active data: prefer window.portfolioData from data.js
  const sourceData = (typeof window.portfolioData !== 'undefined' && window.portfolioData) ? window.portfolioData : defaultFallback;

  // DOM Elements
  const body = document.body;
  const btnToggleEdit = document.getElementById('btn-toggle-edit');
  const btnSaveChanges = document.getElementById('btn-save-changes');
  const btnResetDefault = document.getElementById('btn-reset-default');
  const btnExitEdit = document.getElementById('btn-exit-edit');
  const btnAddQual = document.getElementById('btn-add-qualification');
  const btnAddSkill = document.getElementById('btn-add-skill');
  const btnPrintCv = document.getElementById('btn-print-cv');
  const btnExportJson = document.getElementById('btn-export-json');

  const photoOverlay = document.getElementById('photo-overlay');
  const photoUploadInput = document.getElementById('photo-upload-input');
  const profileImg = document.getElementById('profile-img');

  const qualTbody = document.getElementById('qualifications-tbody');
  const skillsGrid = document.getElementById('skills-grid');

  // Load and apply data from data.js
  loadProfileData();

  // Attach Event Listeners
  if (btnToggleEdit) {
    btnToggleEdit.addEventListener('click', () => toggleEditMode());
  }

  if (btnSaveChanges) {
    btnSaveChanges.addEventListener('click', () => {
      saveProfileData();
      toggleEditMode(false);
      showToast('Changes saved! You can also download updated data.js', 'success');
    });
  }

  if (btnResetDefault) {
    btnResetDefault.addEventListener('click', () => {
      if (confirm('Reset content to match data.js?')) {
        localStorage.removeItem(STORAGE_KEY);
        applyDataToDOM(sourceData);
        showToast('Restored content from data.js.', 'info');
      }
    });
  }

  if (btnExitEdit) {
    btnExitEdit.addEventListener('click', () => {
      toggleEditMode(false);
    });
  }

  // Photo Upload Handler
  if (photoOverlay && photoUploadInput) {
    photoOverlay.addEventListener('click', () => {
      if (isEditMode) {
        photoUploadInput.click();
      }
    });

    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          profileImg.src = event.target.result;
          showToast('Photo updated! Click Save or export data.js to keep it.', 'info');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Add Qualification Row
  if (btnAddQual) {
    btnAddQual.addEventListener('click', () => {
      const row = createQualificationRow('YYYY - YYYY', 'New Degree or Certificate', 'University / Institution');
      qualTbody.appendChild(row);
      makeElementsEditable(isEditMode);
      row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Add Skill Card
  if (btnAddSkill) {
    btnAddSkill.addEventListener('click', () => {
      const card = createSkillCard('New Skill Category', 'Description of technical competencies and tools.');
      skillsGrid.appendChild(card);
      makeElementsEditable(isEditMode);
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Dynamic Row/Card Removal Delegation
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove-row')) {
      const row = e.target.closest('tr');
      if (row) row.remove();
    } else if (e.target.classList.contains('btn-remove-card')) {
      const card = e.target.closest('.skill-paper-card');
      if (card) card.remove();
    }
  });

  // Print CV / PDF
  if (btnPrintCv) {
    btnPrintCv.addEventListener('click', () => {
      if (isEditMode) toggleEditMode(false);
      window.print();
    });
  }

  // Export data as downloadable data.js file
  if (btnExportJson) {
    btnExportJson.addEventListener('click', () => {
      exportAsDataJsFile();
    });
  }

  // Smooth scroll for nav links & highlight
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // Intersection Observer for active nav state
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(l => {
            if (l.getAttribute('href') === `#${id}`) {
              l.classList.add('active');
            } else {
              l.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(sec => observer.observe(sec));
  }

  // Core Functions
  function toggleEditMode(forceState) {
    isEditMode = typeof forceState === 'boolean' ? forceState : !isEditMode;

    if (isEditMode) {
      body.classList.add('edit-mode-active');
      btnToggleEdit.innerHTML = `<span class="edit-icon">👁️</span> <span class="edit-text">[VIEW MODE]</span>`;
      makeElementsEditable(true);
      showToast('Edit Mode Enabled: Click text or photo to edit', 'info');
    } else {
      body.classList.remove('edit-mode-active');
      btnToggleEdit.innerHTML = `<span class="edit-icon">✏️</span> <span class="edit-text">[EDIT MODE]</span>`;
      makeElementsEditable(false);
    }
  }

  function makeElementsEditable(editable) {
    const editables = document.querySelectorAll('[data-editable]');
    editables.forEach(el => {
      el.contentEditable = editable ? 'true' : 'false';
      if (editable) {
        el.setAttribute('spellcheck', 'false');
      } else {
        el.removeAttribute('spellcheck');
      }
    });
  }

  function createQualificationRow(period, degree, institution) {
    const tr = document.createElement('tr');
    tr.className = 'qual-row';
    tr.innerHTML = `
      <td class="qual-col-date" data-editable="true">${escapeHTML(period)}</td>
      <td class="qual-col-degree" data-editable="true">${escapeHTML(degree)}</td>
      <td class="qual-col-institution" data-editable="true">${escapeHTML(institution)}</td>
      <td class="qual-col-action"><button class="btn-remove-row" title="Delete row">×</button></td>
    `;
    return tr;
  }

  function createSkillCard(title, desc) {
    const article = document.createElement('article');
    article.className = 'skill-paper-card';
    const clipId = 'clipGrad_' + Math.random().toString(36).substr(2, 9);
    article.innerHTML = `
      <div class="paperclip-graphic" aria-hidden="true">
        <svg width="20" height="42" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4C8.686 4 6 6.686 6 10V36C6 40.418 9.582 44 14 44C18.418 44 22 40.418 22 36V12C22 8.686 19.314 6 16 6C12.686 6 10 8.686 10 12V34C10 35.105 10.895 36 12 36C13.105 36 14 35.105 14 34V13" 
                stroke="url(#${clipId})" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="${clipId}" x1="6" y1="4" x2="22" y2="44" gradientUnits="userSpaceOnUse">
              <stop stop-color="#4a5568"/>
              <stop offset="0.3" stop-color="#cbd5e1"/>
              <stop offset="0.7" stop-color="#64748b"/>
              <stop offset="1" stop-color="#334155"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <button class="btn-remove-card" title="Delete card">×</button>
      <h3 class="skill-title" data-editable="true">${escapeHTML(title)}</h3>
      <p class="skill-desc" data-editable="true">${escapeHTML(desc)}</p>
    `;
    return article;
  }

  function extractDataFromDOM() {
    const data = {
      name: document.querySelector('[data-editable="brandName"]')?.innerText.trim() || sourceData.name,
      profilePhoto: profileImg.src,
      profileCaption: document.querySelector('[data-editable="polaroidCaption"]')?.innerText.trim() || sourceData.profileCaption,
      hero: {
        title: document.querySelector('[data-editable="heroTitle"]')?.innerText.trim() || sourceData.hero.title,
        introLine: document.querySelector('[data-editable="greetingLine"]')?.innerText.trim() || sourceData.hero.introLine,
        bio: document.querySelector('[data-editable="bioText"]')?.innerText.trim() || sourceData.hero.bio,
        labNote: document.querySelector('[data-editable="labNote"]')?.innerText.trim() || sourceData.hero.labNote
      },
      navigation: {
        about: '[ABOUT]',
        qualifications: '[QUALIFICATIONS]',
        skillsets: '[SKILLSETS]'
      },
      qualifications: [],
      skills: [],
      footer: {
        systemStatus: document.querySelector('.footer-status')?.innerText.trim() || '● SYSTEM STATUS: ONLINE',
        assignmentNote: document.querySelector('.footer-copy')?.innerText.trim() || 'HOSTED ASSIGNMENT // CLOUD VIRTUALIZATION'
      }
    };

    const rows = qualTbody.querySelectorAll('tr.qual-row');
    rows.forEach(r => {
      const period = r.querySelector('.qual-col-date')?.innerText.trim() || '';
      const degree = r.querySelector('.qual-col-degree')?.innerText.trim() || '';
      const institution = r.querySelector('.qual-col-institution')?.innerText.trim() || '';
      data.qualifications.push({ period, degree, institution });
    });

    const cards = skillsGrid.querySelectorAll('.skill-paper-card');
    cards.forEach(c => {
      const title = c.querySelector('.skill-title')?.innerText.trim() || '';
      const description = c.querySelector('.skill-desc')?.innerText.trim() || '';
      data.skills.push({ title, description });
    });

    return data;
  }

  function saveProfileData() {
    const data = extractDataFromDOM();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('Storage limit reached or error:', err);
    }
  }

  function loadProfileData() {
    // data.js is the master source of truth
    applyDataToDOM(sourceData);
  }

  function applyDataToDOM(data) {
    if (!data) return;

    // Brand Name & Title
    const brandName = data.name || data.brandName;
    if (brandName) {
      const el = document.querySelector('[data-editable="brandName"]');
      if (el) el.innerText = brandName;
    }
    if (data.tabTitle) {
      document.title = data.tabTitle;
    } else if (brandName) {
      document.title = `${brandName} | Portfolio & Resume`;
    }

    // Profile Photo & Caption
    if (data.profilePhoto) {
      profileImg.src = data.profilePhoto;
      profileImg.onerror = () => {
        // Fallbacks for path variations
        if (!profileImg.src.includes('assets/')) {
          profileImg.src = 'assets/' + data.profilePhoto;
        } else {
          profileImg.src = 'assets/Kaushik Image.jpg';
        }
      };
    }
    const caption = data.profileCaption || data.polaroidCaption;
    if (caption) {
      const el = document.querySelector('[data-editable="polaroidCaption"]');
      if (el) el.innerText = caption;
    }

    // Hero Section
    const heroTitle = data.hero?.title || data.heroTitle;
    if (heroTitle) {
      const el = document.querySelector('[data-editable="heroTitle"]');
      if (el) el.innerText = heroTitle;
    }

    const greetingLine = data.hero?.greeting || data.hero?.introLine || data.greetingLine;
    if (greetingLine) {
      const el = document.querySelector('[data-editable="greetingLine"]');
      if (el) el.innerText = greetingLine;
    }

    const bio = data.hero?.bio || data.bioText;
    if (bio) {
      const el = document.querySelector('[data-editable="bioText"]');
      if (el) el.innerText = bio;
    }

    const labNote = data.hero?.assignmentNote || data.hero?.labNote || data.labNote;
    if (labNote) {
      const el = document.querySelector('[data-editable="labNote"]');
      if (el) el.innerText = labNote;
    }

    // Qualifications Headers
    const qualTitle = data.qualificationsHeader?.title || data.qualHeading;
    if (qualTitle) {
      const el = document.querySelector('[data-editable="qualHeading"]');
      if (el) el.innerText = qualTitle;
    }
    const qualBadge = data.qualificationsHeader?.badge || data.qualBadge;
    if (qualBadge) {
      const el = document.querySelector('[data-editable="qualBadge"]');
      if (el) el.innerText = qualBadge;
    }

    // Qualifications Table
    const quals = data.qualifications;
    if (Array.isArray(quals) && quals.length > 0) {
      qualTbody.innerHTML = '';
      quals.forEach(q => {
        const period = q.period || q.date || '';
        const degree = q.degree || '';
        const institution = q.institution || '';
        qualTbody.appendChild(createQualificationRow(period, degree, institution));
      });
    }

    // Skills Headers
    const skillsTitle = data.skillsHeader?.title || data.skillsHeading;
    if (skillsTitle) {
      const el = document.querySelector('[data-editable="skillsHeading"]');
      if (el) el.innerText = skillsTitle;
    }
    const skillsBadge = data.skillsHeader?.badge || data.skillsBadge;
    if (skillsBadge) {
      const el = document.querySelector('[data-editable="skillsBadge"]');
      if (el) el.innerText = skillsBadge;
    }

    // Skillsets Grid
    const skills = data.skills;
    if (Array.isArray(skills) && skills.length > 0) {
      skillsGrid.innerHTML = '';
      skills.forEach(s => {
        const title = s.title || '';
        const desc = s.description || s.desc || '';
        skillsGrid.appendChild(createSkillCard(title, desc));
      });
    }

    // Footer
    const statusText = data.footer?.statusText || data.footer?.systemStatus;
    if (statusText) {
      const el = document.querySelector('.footer-status');
      if (el) el.innerText = statusText;
    }
    const hostedNote = data.footer?.hostedNote || data.footer?.assignmentNote;
    if (hostedNote) {
      const el = document.querySelector('.footer-copy');
      if (el) el.innerText = hostedNote;
    }
  }

  function exportAsDataJsFile() {
    const current = extractDataFromDOM();
    const content = `/**
 * =============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * =============================================================================
 * Edit this file to update your portfolio details!
 * =============================================================================
 */

const portfolioData = ${JSON.stringify(current, null, 2)};
`;

    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded data.js! Replace your local data.js file.', 'info');
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
