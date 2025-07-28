
    // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  let isDark = true;

  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    isDark = false;
  document.body.classList.add('light-theme');
    }

    themeToggle.addEventListener('click', () => {
    isDark = !isDark;

  if (isDark) {
    document.body.classList.remove('light-theme');
  localStorage.setItem('theme', 'dark');
      } else {
    document.body.classList.add('light-theme');
  localStorage.setItem('theme', 'light');
      }
    });

  // Typewriter effect
  const typewriterText = document.querySelector('.typewriter-text');
  const roles = ['Full Stack Developer', 'Tech Writer', 'Problem Solver', 'Research Enthusiast', 'Open Source Contributor'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
      const currentRole = roles[roleIndex];

  if (isDeleting) {
    typewriterText.textContent = currentRole.substring(0, charIndex - 1);
  charIndex--;
      } else {
    typewriterText.textContent = currentRole.substring(0, charIndex + 1);
  charIndex++;
      }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000;
  isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  typeSpeed = 500;
      }

  setTimeout(typeWriter, typeSpeed);
    }

  // Start typewriter effect
  setTimeout(typeWriter, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
    });

    // Animate stats on scroll
    const animateStats = () => {
      const statNumbers = document.querySelectorAll('.stat-number');
      const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateValue(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
      });

      statNumbers.forEach(stat => observer.observe(stat));
    };

  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
  const progress = Math.min((timestamp - startTimestamp) / duration, 1);
  element.textContent = Math.floor(progress * (end - start) + start);
  if (progress < 1) {
    window.requestAnimationFrame(step);
        }
      };
  window.requestAnimationFrame(step);
    }

    // Animate skill bars on scroll
    const animateSkills = () => {
      const skillBars = document.querySelectorAll('.skill-progress');
      const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
        observer.unobserve(entry.target);
      }
    });
      });

      skillBars.forEach(bar => observer.observe(bar));
    };

  // Load Medium articles
  async function loadMediumArticles() {
      const articlesGrid = document.getElementById('articles-grid');
  const mediumUsername = 'arghyadevs';

  try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`);
  const data = await response.json();

  if (!data.items || !Array.isArray(data.items)) {
          throw new Error('No articles found');
        }

  articlesGrid.classList.remove('loading');
  articlesGrid.innerHTML = '';

        data.items.slice(0, 6).forEach((article, index) => {
          const articleCard = document.createElement('div');
  articleCard.className = 'article-card';
  articleCard.style.animationDelay = `${index * 0.1}s`;

  const publishDate = new Date(article.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
  month: 'long',
  day: 'numeric'
          });

  const excerpt = article.description
  .replace(/<[^>]+>/g, '')
  .substring(0, 150) + '...';

  articleCard.innerHTML = `
  <h3><a href="${article.link}" target="_blank" rel="noopener">${article.title}</a></h3>
  <p class="article-date">${publishDate}</p>
  <p class="article-excerpt">${excerpt}</p>
  `;

  articlesGrid.appendChild(articleCard);
        });

      } catch (error) {
    articlesGrid.classList.remove('loading');
  articlesGrid.innerHTML = `
  <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
    <p style="color: var(--warning); font-size: 1.1rem;">
      ⚠️ Unable to load articles at the moment. Please visit my
      <a href="https://medium.com/@arghyadevs" target="_blank" style="color: var(--primary);">Medium profile</a>
      directly.
    </p>
  </div>
  `;
      }
    }

    // Initialize animations and load content
    document.addEventListener('DOMContentLoaded', () => {
    animateStats();
  animateSkills();
  loadMediumArticles();
    });

    // Add scroll-based animations
    const observeElements = () => {
      const elements = document.querySelectorAll('.text-block, .skill-category, .stat-card');
      
      const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
      }, {threshold: 0.1 });

      elements.forEach(el => {
    el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
      });
    };

  // Initialize scroll animations
  observeElements();

  // Terminal animation
  const terminalLines = document.querySelectorAll('.code-line');
  let lineIndex = 0;

  function showNextLine() {
      if (lineIndex < terminalLines.length) {
    terminalLines[lineIndex].style.opacity = '1';
  terminalLines[lineIndex].style.animation = 'slideInLeft 0.5s ease-out';
  lineIndex++;
  setTimeout(showNextLine, 800);
      }
    }

    // Hide all lines initially
    terminalLines.forEach(line => {
    line.style.opacity = '0';
    });

  // Start terminal animation after a delay
  setTimeout(showNextLine, 2000);
