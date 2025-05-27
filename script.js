const slider = document.querySelector('.slider .list');
    const items = document.querySelectorAll('.slider .item');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const dots = document.querySelectorAll('.slider .dots li');
    const captionBox = document.getElementById('caption-box');
    const captionTitle = document.getElementById('caption-title');
    const captionDesc = document.getElementById('caption-desc');

    const captions = [
      { title: "Huda 2025-26 generak election", desc: "Snowy Mountains at Sunset" },
      { title: "Suno Hidaya", desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam inventore dicta quaerat consectetur tenetur sit autem, totam a ducimus, ipsum aliquam, praesentium placeat magnam possimus dolorum. Nesciunt iusto aspernatur explicabo." },
      { title: "Zugspitze Peak", desc: "Zugspitze Mountain Peak" },
      { title: "Peaceful Scene", desc: "Peaceful Countryside" },
      { title: "Alpine View", desc: "Snow-Capped Alps" },
      { title: "Huda 2025-26 generak election", desc: "Snowy Mountains at Sunset" },
      { title: "Suno Hidaya", desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam inventore dicta quaerat consectetur tenetur sit autem, totam a ducimus, ipsum aliquam, praesentium placeat magnam possimus dolorum. Nesciunt iusto aspernatur explicabo." }
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