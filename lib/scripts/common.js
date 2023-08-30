// Dynamically inject CSS
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `.popup { display: none; position: absolute; border: 1px solid #ccc; background: #fff; padding: 10px; z-index: 10; }
.hover-link:hover + .popup { display: block; }`;
document.head.appendChild(style);

// Dynamically inject HTML
var link = document.createElement('a');
link.setAttribute('href', '#');
link.setAttribute('class', 'hover-link');
link.setAttribute('id', 'myLink');
link.innerHTML = 'Hover over me!';
document.body.appendChild(link);

var popup = document.createElement('div');
popup.setAttribute('class', 'popup');
popup.setAttribute('id', 'myPopup');
popup.innerHTML = 'This is the content of the popup window.';
document.body.appendChild(popup);

// JavaScript for popup positioning
document.addEventListener('DOMContentLoaded', function() {
  link.addEventListener('mouseover', function(e) {
    const rect = link.getBoundingClientRect();
    popup.style.left = rect.right + 'px';
    popup.style.top = rect.top + 'px';
  });
});
