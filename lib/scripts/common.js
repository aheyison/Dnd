// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {

  // Inject CSS
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.popup { display: none; position: absolute; border: 1px solid #ccc; background: #fff; padding: 10px; z-index: 10; } .hover-link:hover + .popup { display: block; }';
  document.head.appendChild(style);

  // Create and inject the HTML
  var link = document.createElement('a');
  link.href = '#';
  link.className = 'hover-link';
  link.id = 'myLink';
  link.innerText = 'Hover over me!';
  
  var popup = document.createElement('div');
  popup.className = 'popup';
  popup.id = 'myPopup';
  popup.innerText = 'This is the content of the popup window.';
  
  document.body.appendChild(link);
  document.body.appendChild(popup);

  // Attach the hover event
  link.addEventListener('mouseover', function(e) {
    const rect = link.getBoundingClientRect();
    popup.style.left = rect.right + 'px';
    popup.style.top = rect.top + 'px';
  });
});
