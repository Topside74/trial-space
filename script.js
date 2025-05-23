const slider = document.querySelector('.slider .list');
    const items = document.querySelectorAll('.slider .item');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const dots = document.querySelectorAll('.slider .dots li');
    const captionBox = document.getElementById('caption-box');
    const captionTitle = document.getElementById('caption-title');
    const captionDesc = document.getElementById('caption-desc');

    const captions = [
      { title: "Snowy Mountains", desc: "Snowy Mountains at Sunset" },
      { title: "Green Valley", desc: "Green Valley Landscape" },
      { title: "Zugspitze Peak", desc: "Zugspitze Mountain Peak" },
      { title: "Peaceful Scene", desc: "Peaceful Countryside" },
      { title: "Alpine View", desc: "Snow-Capped Alps" }
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