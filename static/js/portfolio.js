document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio JS loaded');
  const portfolioImages = document.querySelectorAll('.portfolio-item img');
  console.log('Found images:', portfolioImages.length);
  
  portfolioImages.forEach((img, index) => {
    console.log('Setting up image', index, img.src);
    img.addEventListener('click', function(e) {
      console.log('Image clicked:', this.src);
      e.preventDefault();
      e.stopPropagation();
      
      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
        -webkit-user-select: none;
        user-select: none;
      `;
      
      // Create expanded image
      const expandedImg = document.createElement('img');
      expandedImg.src = this.src;
      expandedImg.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        pointer-events: none;
      `;
      
      overlay.appendChild(expandedImg);
      document.body.appendChild(overlay);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Close handlers
      const closeOverlay = function(e) {
        e.preventDefault();
        e.stopPropagation();
        document.body.style.overflow = '';
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      };
      
      overlay.addEventListener('click', closeOverlay);
      overlay.addEventListener('touchend', closeOverlay);
      
      // ESC key support
      const handleKeydown = function(e) {
        if (e.key === 'Escape') {
          closeOverlay(e);
          document.removeEventListener('keydown', handleKeydown);
        }
      };
      document.addEventListener('keydown', handleKeydown);
    });
  });
});
