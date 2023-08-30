document.addEventListener('DOMContentLoaded', function() {
  let currentPopup = null; // To track the currently displayed popup

  // Inject the CSS
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    .popup { 
      display: none; 
      position: absolute; 
      border: 1px solid #ccc; 
      background: #fff; 
      padding: 10px; 
      overflow: auto;
      z-index: 100; 
    }
  `;
  document.head.appendChild(style);

  // Find all internal links with class 'internal-link'
  const internalLinks = document.querySelectorAll('a.internal-link');

  internalLinks.forEach((link) => {
    const popup = document.createElement('div');
    popup.className = 'popup';
    document.body.appendChild(popup);

    link.addEventListener('mouseover', async function(e) {
      if (currentPopup) {
        currentPopup.style.display = 'none'; // Hide the existing popup
      }
      currentPopup = popup; // Update the current popup

      const rect = link.getBoundingClientRect();
      popup.style.left = `${rect.right}px`;
      popup.style.top = `${rect.top}px`;

      const pageWidth = window.innerWidth;
      const pageHeight = window.innerHeight;

      popup.style.width = `${Math.min(pageWidth * 0.3, 600)}px`;
      popup.style.height = `${Math.min(pageHeight * 0.3, 400)}px`;

      try {
        const response = await fetch(link.getAttribute('href'));
        if (!response.ok) {
          popup.innerHTML = 'Failed to fetch data';
          return;
        }

        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Omit the frontmatter
        const frontMatter = doc.querySelector('.frontmatter-container');
        if (frontMatter) frontMatter.remove();

        const centralContent = doc.querySelector('.markdown-preview-sizer');
        if (centralContent) {
          popup.innerHTML = centralContent.innerHTML;
        } else {
          popup.innerHTML = 'Central content not found';
        }

      } catch (err) {
        popup.innerHTML = 'Error occurred: ' + err.message;
      }

      popup.style.display = 'block';
    });

    link.addEventListener('mouseout', function() {
      if (currentPopup === popup) {
        popup.style.display = 'none';
      }
    });
  });
});
