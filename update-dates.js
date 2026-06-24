const fs = require('fs');
let data = fs.readFileSync('lib/data/matches.ts', 'utf8');
const days = [25, 25, 25, 26, 26, 26, 27, 27];
let idx = 0;
data = data.replace(/date: '2026-06-\d{2}T16:00:00.000Z',/g, () => {
  return `date: '2026-06-${days[idx++]}T16:00:00.000Z',`;
});
fs.writeFileSync('lib/data/matches.ts', data);
console.log('Dates updated successfully.');
