const fs = require('fs');

function generateIcon(size) {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
    <rect width='${size}' height='${size}' rx='${size*0.2}' fill='#0f172a'/>
    <rect x='${size*0.15}' y='${size*0.15}' width='${size*0.7}' height='${size*0.7}' rx='${size*0.1}' fill='#10b981' opacity='0.2' stroke='#10b981' stroke-width='${size*0.02}'/>
    <text x='50%' y='55%' text-anchor='middle' dominant-baseline='middle' fill='#10b981' font-family='Arial,sans-serif' font-weight='bold' font-size='${size*0.35}'>TW</text>
  </svg>`;
}

fs.writeFileSync('public/icons/icon-192x192.svg', generateIcon(192));
fs.writeFileSync('public/icons/icon-512x512.svg', generateIcon(512));
console.log('Icons created');
