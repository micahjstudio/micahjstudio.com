+++
date = '2025-12-09T13:49:17-04:55'
draft = false
title = 'resume'
tags = ['blog']
weight = 2
+++

----------

<!-- Custom PDF Viewer -->
<div class="pdf-container">
  <div class="pdf-mobile-notice">
    <p><strong>On mobile?</strong> <a href="/pdfs/resume.pdf" target="_blank">Open PDF in new tab</a> for better viewing.</p>
  </div>
  
  <div class="pdf-toolbar">
    <div class="pdf-controls-left">
      <span id="page-info">Loading...</span>
    </div>
    <div class="pdf-controls-right">
      <a href="/pdfs/resume.pdf" download="resume.pdf" class="pdf-btn download-btn">↓ Download</a>
      <button id="fullscreen-btn" class="pdf-btn">⛶</button>
    </div>
  </div>
  
  <div class="pdf-viewer" id="pdf-viewer">
    <!-- Pages will be dynamically added here -->
  </div>
</div>

<style>
.pdf-container {
  margin: 20px 0;
  border: 1px solid #ddd;
  overflow: hidden;
}

.pdf-mobile-notice {
  background: #f5f5f5;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  display: none;
}

.pdf-mobile-notice a {
  color: #ec42ff !important;
  text-decoration: underline !important;
}

.pdf-toolbar {
  background: #464646;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pdf-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 5px 10px;
  text-decoration: none;
  font-size: 12px;
  margin-left: 5px;
}

.pdf-btn:hover {
  background: #5a6268;
}

.pdf-viewer {
  background: #f5f5f5;
  padding: 20px;
  text-align: center;
  overflow-y: auto;
  max-height: 600px;
}

.pdf-page {
  margin-bottom: 20px;
}

.pdf-page:last-child {
  margin-bottom: 0;
}

.pdf-canvas {
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border-radius: 0px;
  max-width: 100%;
  height: auto;
  display: block;
}

/* Fullscreen styles */
.pdf-container:fullscreen {
  background: #f5f5f5;
}

.pdf-container:fullscreen .pdf-viewer {
  max-height: calc(100vh - 60px);
  height: calc(100vh - 60px);
}

.pdf-container:-webkit-full-screen {
  background: #f5f5f5;
}

.pdf-container:-webkit-full-screen .pdf-viewer {
  max-height: calc(100vh - 60px);
  height: calc(100vh - 60px);
}

/* Show mobile notice on small screens */
@media (max-width: 768px) {
  .pdf-mobile-notice {
    display: block !important;
  }
  
  .pdf-viewer {
    height: 400px !important;
  }
}

@media (max-width: 480px) {
  .pdf-viewer {
    height: 300px !important;
  }
  
  .pdf-mobile-notice p {
    font-size: 0.9rem;
    margin: 5px 0;
  }
}
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
// PDF.js setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null;
let scale = 0.8;
let currentPage = 1;
const viewer = document.getElementById('pdf-viewer');

// Load PDF
pdfjsLib.getDocument('/pdfs/resume.pdf').promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page-info').textContent = `Page 1 of ${pdfDoc.numPages}`;
  renderAllPages();
});

function renderAllPages() {
  viewer.innerHTML = '';
  
  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const pageContainer = document.createElement('div');
    pageContainer.className = 'pdf-page';
    pageContainer.id = `page-${pageNum}`;
    
    const canvas = document.createElement('canvas');
    canvas.className = 'pdf-canvas';
    pageContainer.appendChild(canvas);
    viewer.appendChild(pageContainer);
    
    renderPage(pageNum, canvas);
  }
}

function renderPage(pageNum, canvas) {
  pdfDoc.getPage(pageNum).then(function(page) {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    const currentScale = isFullscreen ? 1.2 : scale;
    const viewport = page.getViewport({scale: currentScale});
    const ctx = canvas.getContext('2d');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    
    page.render(renderContext);
  });
}

// Update current page indicator on scroll
viewer.addEventListener('scroll', function() {
  const pages = document.querySelectorAll('.pdf-page');
  const viewerRect = viewer.getBoundingClientRect();
  const viewerCenter = viewerRect.top + viewerRect.height / 2;
  
  pages.forEach((page, index) => {
    const pageRect = page.getBoundingClientRect();
    if (pageRect.top <= viewerCenter && pageRect.bottom >= viewerCenter) {
      currentPage = index + 1;
      document.getElementById('page-info').textContent = `Page ${currentPage} of ${pdfDoc.numPages}`;
    }
  });
});

// Fullscreen functionality
document.getElementById('fullscreen-btn').addEventListener('click', function() {
  const container = document.querySelector('.pdf-container');
  
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else {
    // Enter fullscreen
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  }
  
  // Re-render pages with appropriate scale
  setTimeout(() => renderAllPages(), 100);
});
</script>
