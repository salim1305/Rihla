// UX preview images sélectionnées (externe pour CSP)
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('photosInput');
  const preview = document.getElementById('photosPreview');
  if (!input || !preview) return;
  input.addEventListener('change', function() {
    preview.innerHTML = '';
    const files = Array.from(input.files);
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'preview-thumb';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
});