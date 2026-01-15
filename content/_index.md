---
title: "micahjstudio"
featured_image: "images/compositions.jpeg"
---

<style>
/* Override theme's body width for homepage */
body {
  width: 100% !important;
  max-width: 1000px !important;
}

.container {
  width: 100% !important;
  max-width: 1000px !important;
}

body .flipbook-container {
  max-width: 800px !important;
  width: 100% !important;
  margin: 20px auto !important;
  text-align: center !important;
}
</style>

<div class="flipbook-container">
  <div class="flipbook">
    <div class="page" data-page="1">
      <img src="images/ipad1.jpeg" alt="Page 1" />
    </div>
    <div class="page" data-page="2">
      <img src="images/model5.jpeg" alt="Page 2" />
    </div>
    <div class="page" data-page="3">
      <img src="images/model6.jpeg" alt="Page 3" />
    </div>
    <div class="page" data-page="4">
      <img src="images/buddha1.jpg" alt="Page 4" />
    </div>
    <div class="page" data-page="5">
      <img src="images/3d1.png" alt="Page 5" />
    </div>
    <div class="page" data-page="6">
      <img src="images/model7.jpeg" alt="Page 6" />
    </div>
    <div class="page" data-page="7">
      <img src="images/buddha2.jpg" alt="Page 7" />
    </div>
    <div class="page" data-page="8">
      <img src="images/model2.jpeg" alt="Page 8" />
    </div>
    <div class="page" data-page="9">
      <img src="images/buddha3.jpg" alt="Page 9" />
    </div>
    <div class="page" data-page="10">
      <img src="images/worm.jpeg" alt="Page 10" />
    </div>
    <div class="page" data-page="11">
      <img src="images/ipad5.jpeg" alt="Page 11" />
    </div>
    <div class="page" data-page="12">
      <img src="images/model1.jpeg" alt="Page 12" />
    </div>
  </div>
  <div class="flipbook-controls">
    <button id="prev-page">← Previous</button>
    <span id="page-counter">1 / 12</span>
    <button id="next-page">Next →</button>
  </div>
</div>

<style>
.flipbook-container {
  max-width: 800px !important;
  margin: 20px auto;
  text-align: center;
}

.flipbook {
  position: relative;
  width: 100%;
  height: 600px;
  margin-bottom: 20px;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  position: absolute;
  width: 50%;
  height: 75%;
  transition: all 0.4s ease;
  cursor: pointer;
  border-radius: 0px;
  overflow: hidden;
}

.page img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

/* Current page - center */
.page.current {
  z-index: 10;
  left: 50%;
  transform: translateX(-50%) scale(1);
  opacity: 1;
}

/* Previous page - left side, spread out more */
.page.prev {
  z-index: 5;
  left: 5%;
  transform: translateX(0) scale(0.75);
  opacity: 0.7;
}

/* Next page - right side, spread out more */
.page.next {
  z-index: 5;
  right: 5%;
  transform: translateX(0) scale(0.75);
  opacity: 0.7;
}

/* Hidden pages */
.page.hidden {
  z-index: 1;
  left: 50%;
  transform: translateX(-50%) scale(0.3);
  opacity: 0;
  pointer-events: none;
}

.flipbook-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-family: var(--title-font-family);
  font-size: 0.9rem;
  margin-top: -70px;
}

.flipbook-controls button {
  padding: 10px 20px;
  background: #8B4513;
  color: white;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  font-family: var(--title-font-family);
  transition: background 0.3s;
}

.flipbook-controls button:hover {
  background: #A0522D;
}

.flipbook-controls button:disabled {
  background: #D2B48C !iCpo!tint;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .flipbook-container {
    max-width: 600px;
  }
  
  .flipbook {
    height: 400px;
  }
  
  .flipbook-controls {
    font-size: 0.8rem;
  }
  
  .flipbook-controls button {
    padding: 8px 16px;
  }
  
  .page {
    width: 65%;
    height: 80%;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const pages = document.querySelectorAll('.page');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const counter = document.getElementById('page-counter');
  
  let currentPage = 0;
  
  function updateDisplay() {
    pages.forEach((page, index) => {
      page.classList.remove('current', 'prev', 'next', 'hidden');
      
      if (index === currentPage) {
        page.classList.add('current');
      } else if (index === currentPage - 1) {
        page.classList.add('prev');
      } else if (index === currentPage + 1) {
        page.classList.add('next');
      } else {
        page.classList.add('hidden');
      }
    });
    
    counter.textContent = `${currentPage + 1} / ${pages.length}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === pages.length - 1;
  }
  
  nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      updateDisplay();
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateDisplay();
    }
  });
  
  // Click handlers for navigation
  pages.forEach((page, index) => {
    page.addEventListener('click', () => {
      if (index === currentPage - 1) {
        currentPage--;
        updateDisplay();
      } else if (index === currentPage + 1) {
        currentPage++;
        updateDisplay();
      } else if (index === currentPage) {
        // Click current image for fullscreen
        const img = page.querySelector('img');
        openFullscreen(img.src);
      }
    });
  });
  
  // Fullscreen function
  function openFullscreen(imageSrc) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
      max-width: 95vw;
      max-height: 95vh;
      object-fit: contain;
      border-radius: 0px;
      box-shadow: 0 0 50px rgba(0,0,0,0.8);
    `;
    
    // Left arrow button
    const leftArrow = document.createElement('button');
    leftArrow.innerHTML = '←';
    leftArrow.style.cssText = `
      position: absolute;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0,0,0,0.3);
      color: white;
      border: 2px solid rgba(255,255,255,0.3);
      font-size: 2rem;
      padding: 15px 20px;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.3s;
    `;
    
    // Right arrow button
    const rightArrow = document.createElement('button');
    rightArrow.innerHTML = '→';
    rightArrow.style.cssText = `
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0,0,0,0.3);
      color: white;
      border: 2px solid rgba(255,255,255,0.3);
      font-size: 2rem;
      padding: 15px 20px;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.3s;
    `;
    
    // Update arrow visibility
    function updateArrows() {
      leftArrow.style.display = currentPage > 0 ? 'block' : 'none';
      rightArrow.style.display = currentPage < pages.length - 1 ? 'block' : 'none';
    }
    
    // Arrow click handlers
    leftArrow.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentPage > 0) {
        currentPage--;
        updateDisplay();
        img.src = pages[currentPage].querySelector('img').src;
        updateArrows();
      }
    });
    
    rightArrow.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentPage < pages.length - 1) {
        currentPage++;
        updateDisplay();
        img.src = pages[currentPage].querySelector('img').src;
        updateArrows();
      }
    });
    
    // Hover effects
    leftArrow.addEventListener('mouseenter', () => {
      leftArrow.style.background = 'rgba(255,255,255,0.2)';
      leftArrow.style.color = 'white';
    });
    leftArrow.addEventListener('mouseleave', () => {
      leftArrow.style.background = 'rgba(0,0,0,0.3)';
      leftArrow.style.color = 'white';
    });

    rightArrow.addEventListener('mouseenter', () => {
      rightArrow.style.background = 'rgba(255,255,255,0.2)';
      rightArrow.style.color = 'white';
    });
    rightArrow.addEventListener('mouseleave', () => {
      rightArrow.style.background = 'rgba(0,0,0,0.3)';
      rightArrow.style.color = 'white';
    });

    // Remove focus after click to prevent highlight
    leftArrow.addEventListener('click', (e) => {
      e.stopPropagation();
      leftArrow.blur();
      // ... rest of click handler
    });

    rightArrow.addEventListener('click', (e) => {
      e.stopPropagation();
      rightArrow.blur();
      // ... rest of click handler
    });
    
    overlay.appendChild(img);
    overlay.appendChild(leftArrow);
    overlay.appendChild(rightArrow);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    updateArrows();
    
    // Close on overlay click (but not on arrows or image)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeFullscreen();
      }
    });
    
    // Close function
    const closeFullscreen = () => {
      document.body.style.overflow = '';
      document.body.removeChild(overlay);
      document.removeEventListener('keydown', handleKeydown);
    };
    
    // Keyboard navigation
    const handleKeydown = function(e) {
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
        currentPage++;
        updateDisplay();
        img.src = pages[currentPage].querySelector('img').src;
        updateArrows();
      } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        currentPage--;
        updateDisplay();
        img.src = pages[currentPage].querySelector('img').src;
        updateArrows();
      }
    };
    document.addEventListener('keydown', handleKeydown);
  }
  
  updateDisplay();
});
</script>
