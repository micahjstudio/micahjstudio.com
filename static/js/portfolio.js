document.addEventListener('DOMContentLoaded', function() {
  const portfolioImages = document.querySelectorAll('.portfolio-item img');
  
  portfolioImages.forEach(img => {
    img.addEventListener('click', function() {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
      `;
      
      // Create expanded image
      const expandedImg = document.createElement('img');
      expandedImg.src = this.src;
      expandedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      `;
      
      overlay.appendChild(expandedImg);
      document.body.appendChild(overlay);
      
      // Close on click
      overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
      });
    });
  });
});