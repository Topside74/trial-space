const slider = document.querySelector('.slider .list');
    const items = document.querySelectorAll('.slider .item');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const dots = document.querySelectorAll('.slider .dots li');
    const captionBox = document.getElementById('caption-box');
    const captionTitle = document.getElementById('caption-title');
    const captionDesc = document.getElementById('caption-desc');

     const captions = [
      { title: "Huda 2025-26 general election", desc: "HUDA General Election 2025-26 is General Election for forming new comittee for AL Hidaya Islamic Academy's Union 'Huda (Hidaya Union for Devoted Activities.)'" },
      { title: "Suno Hidaya", desc: "Suno Hidaya is a Radio program conducted by SRDB Wing Al Hidaya Islamic Academy." },
      { title: "Sibaq @ Kochi", desc: "Sibaq is a National Arts fest hosted by Darul Huda Islamic University (DHIU) and its affiliated institutions, 'Le Sibaq De Kochi' is an elemination round to the finals of Sibaq hosted in Al-Hidaya Islamic Academy in Kalamassery. Sibaq's a biennial event that showcases artistic, literary, and cultural talents of students from DHIU's central campus, affiliated colleges, and off-campus centers. " },
      { title: "AHIA Kalamassery", desc: "Al Hidaya Islamic Academy (AHIA) is an esteemed Islamic educational institution situated in Kalamassery, Kochi, Kerala. Affiliated with Darul Huda Islamic University Run by Njalakam Muslim Jama'ath, Chemmad, AHIA is dedicated to providing a comprehensive blend of traditional Islamic scholarship and contemporary education, aiming to nurture morally upright and intellectually capable individuals." },
      { title: "Sibaq @ Kochi Inaugural Ceremony", desc: "Sibaq is a National Arts fest hosted by Darul Huda Islamic University (DHIU) and its affiliated institutions, 'Le Sibaq De Kochi' is an elemination round to the finals of Sibaq hosted in Al-Hidaya Islamic Academy in Kalamassery. Sibaq's a biennial event that showcases artistic, literary, and cultural talents of students from DHIU's central campus, affiliated colleges, and off-campus centers. " },
      { title: "Time Shedule", desc: "Welcome to Al-Hidaya Islamic Academy, proudly affiliated with Darul Huda Islamic University and situated in Kalamassery, Kerala. We provide a nurturing environment with a meticulously planned daily schedule that integrates spiritual growth, academic learning, and personal well-being. Our program includes dedicated times for prayers, study periods, and balanced meals. For detailed information or inquiries, please contact our Principal or Vice Principal, or explore our website at www.ahia.in." },
      { title: "Rules and Regulations ", desc: "Welcome to our institution, where we uphold a strong commitment to fostering a disciplined and nurturing environment. This document outlines the essential rules and regulations designed for both our students and their parents. It details expected student conduct, academic guidelines, and attendance policies, ensuring a clear understanding of our operational framework. Furthermore, it provides vital information for parents, encouraging active participation and support in their child's educational journey. We believe these guidelines are crucial for maintaining a respectful and productive community for everyone." }
    ];

    let active = 0;
    let total = items.length;

    function reloadSlider() {
      const width = items[0].clientWidth;
      slider.style.transform = `translateX(-${active * width}px)`;

      // Update dots
      document.querySelector('.dots li.active').classList.remove('active');
      dots[active].classList.add('active');

      // Fade out captions
      captionBox.classList.add('caption-fade');
      setTimeout(() => {
        captionTitle.textContent = captions[active].title;
        captionDesc.textContent = captions[active].desc;
        captionBox.classList.remove('caption-fade');
      }, 400);

      // Reset autoplay
      clearInterval(refreshInterval);
      refreshInterval = setInterval(() => next.click(), 4000);
    }

    next.onclick = () => {
      active = (active + 1) % total;
      reloadSlider();
    };

    prev.onclick = () => {
      active = (active - 1 + total) % total;
      reloadSlider();
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        active = index;
        reloadSlider();
      });
    });

    let refreshInterval = setInterval(() => next.click(), 4000);
    window.addEventListener('resize', reloadSlider);




    const counters = document.querySelectorAll('.counter');
    const section = document.querySelector('.secsix');
    let started = false;

    const startCounting = () => {
      const duration = 2000;
      const frameRate = 60;
      const totalFrames = Math.round((duration / 1000) * frameRate);

      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let frame = 0;

        const updateCounter = () => {
          frame++;
          const progress = frame / totalFrames;
          const current = Math.round(target * progress);
          counter.textContent = current;

          if (frame < totalFrames) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        };

        requestAnimationFrame(updateCounter);
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          startCounting();
          started = true;
        }
      });
    }, {
      threshold: 0.5
    });

    observer.observe(section);