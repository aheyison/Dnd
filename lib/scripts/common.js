// Flag variables
let isMouseInPopup = false;
let isMouseInLink = false;

// Create popup element and append it to the body
const popup = document.createElement('div');
popup.classList.add('popup');
document.body.appendChild(popup);

// Inject the CSS
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
  .popup { 
    display: none; 
    position: absolute; 
    border: 1px solid #ccc; 
    background: #fffcf0; 
    padding: 10px; 
    max-width: 600px;
    max-height: 400px;
    overflow: auto;
    z-index: 100; 
  }
`;
document.head.appendChild(style);

popup.addEventListener('mouseenter', function() {
  isMouseInPopup = true;
});

popup.addEventListener('mouseleave', function() {
  isMouseInPopup = false;
  popup.style.display = 'none';
});

// Mouse enters the hyperlink
document.addEventListener('mouseover', function(event) {
  if (event.target.matches('.internal-link')) {
    isMouseInLink = true;
    const href = event.target.getAttribute('href');
    fetch(href)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('.markdown-preview-section');
        if (content) {
          const frontmatter = content.querySelector('.frontmatter-container');
          if (frontmatter) {
            frontmatter.remove();
          }
          popup.innerHTML = content.innerHTML;
        } else {
          popup.innerHTML = 'Content not available';
        }
        popup.style.left = `${event.pageX + 20}px`;
        popup.style.top = `${event.pageY}px`;
        popup.style.display = 'block';
      });
  }
});

// Mouse leaves the hyperlink
document.addEventListener('mouseout', function(event) {
  if (event.target.matches('.internal-link')) {
    isMouseInLink = false;
    setTimeout(function() {
      if (!isMouseInPopup) {
        popup.style.display = 'none';
      }
    }, 300); 
  }
});
