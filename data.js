/**
 * =============================================================================
 * 📋 PORTFOLIO CONTENT & CONFIGURATION FILE
 * =============================================================================
 * 
 * Welcome! This is the ONE file where you can edit EVERYTHING on your website.
 * Just change any text inside the quotes "", save this file (Ctrl + S),
 * and refresh your browser!
 * 
 * Works both when double-clicking index.html directly or running on a server.
 * =============================================================================
 */

const portfolioData = {

  // ===========================================================================
  // 1. PERSONAL INFORMATION
  // ===========================================================================
  name: "KAUSHIK BARMAN",

  // Browser tab title & search metadata
  tabTitle: "Kaushik Barman | Portfolio & Resume",
  metaDescription: "Kaushik Barman - Computer Science student Specialised in AI/ML",

  // ===========================================================================
  // 2. PROFILE PHOTO & POLAROID CARD
  // ===========================================================================
  // Your photo file:
  profilePhoto: "assets/Kaushik Image.jpg",
  profileCaption: "profile photo",

  // ===========================================================================
  // 3. HERO & ABOUT SECTION (Main greeting and paragraphs)
  // ===========================================================================
  hero: {
    // Large typewriter heading (the blinking underscore _ is added automatically)
    title: "hi there",

    // Friendly greeting line
    greeting: "Kaushik Barman here, nice to meet you 👋",

    // Main student / engineer biography paragraph
    bio: "I am a Computer Science student passionate about building intelligent systems and scalable infrastructure. Currently focusing on Artificial Intelligence, Machine Learning, cloud virtualization architecture, and modern DevOps practices.",

    // Lab assignment note
    assignmentNote: "This portfolio site is hosted as part of my Cloud Virtualization practical lab assignment."
  },

  // ===========================================================================
  // 4. NAVIGATION BAR (Top menu buttons)
  // ===========================================================================
  navigation: {
    about: "[ABOUT]",
    qualifications: "[QUALIFICATIONS]",
    skillsets: "[SKILLSETS]",
    editMode: "[EDIT MODE]"
  },

  // ===========================================================================
  // 5. QUALIFICATIONS (Academic Record Table)
  // ===========================================================================
  // Add, edit, or remove entries below.
  qualificationsHeader: {
    title: "qualifications",
    badge: "[academic record]"
  },

  qualifications: [
    {
      period: "2024 - 2027",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Assam down town University"
    },
    {
      period: "2022 - 2024",
      degree: "Higher Secondary Education (10+2 Science)",
      institution: "C.V. Raman Academy of Science"
    }
  ],

  // ===========================================================================
  // 6. TECHNICAL SKILLSETS (Pinned Paperclip Cards)
  // ===========================================================================
  // Each card automatically gets a metallic paperclip attached at the top!
  skillsHeader: {
    title: "skillsets",
    badge: "[core technical skills]"
  },

  skills: [
    {
      title: "Web Development",
      description: "Hands-on experience with HTML5, CSS3, JavaScript and responsive website design."
    },
    {
      title: "Programming",
      description: "Working knowledge of C, C++, Python and fundamental data structures and algorithms."
    },
    {
      title: "AI & Technology",
      description: "Exploring artificial intelligence, generative AI, machine learning concepts and APIs."
    }
  ],

  // ===========================================================================
  // 7. FOOTER INFORMATION & LINKS
  // ===========================================================================
  footer: {
    statusText: "● SYSTEM STATUS: ONLINE",
    hostedNote: "HOSTED ASSIGNMENT // CLOUD VIRTUALIZATION"
  }

};
