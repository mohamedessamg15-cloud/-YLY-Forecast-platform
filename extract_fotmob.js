const fs = require('fs');
const content = fs.readFileSync('C:/Users/ZOFA/.gemini/antigravity/brain/22b9fcd5-72a6-4318-b8b5-d170305c5700/.system_generated/steps/452/content.md', 'utf8');
const match = content.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
if (match) {
  const data = JSON.parse(match[1]);
  fs.writeFileSync('fotmob_data.json', JSON.stringify(data, null, 2));
  console.log('Parsed successfully');
} else {
  console.log('NEXT_DATA not found');
}
