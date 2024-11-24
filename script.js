// Add animation classes when sections come into view
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionPosition = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionPosition < windowHeight - 100) {
      section.classList.add('animate');
    } else {
      section.classList.remove('animate');
    }
  });
});
