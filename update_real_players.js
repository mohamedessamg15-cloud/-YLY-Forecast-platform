const fs = require('fs');

const TEAMS = {
  'mex': [
    { name: 'G. Ochoa', search: 'Guillermo Ochoa', pos: 'GK' },
    { name: 'E. Álvarez', search: 'Edson Álvarez', pos: 'MID' },
    { name: 'H. Lozano', search: 'Hirving Lozano', pos: 'FWD' },
    { name: 'R. Jiménez', search: 'Raúl Jiménez', pos: 'FWD' },
    { name: 'S. Giménez', search: 'Santiago Giménez', pos: 'FWD' },
    { name: 'J. Gallardo', search: 'Jesús Gallardo', pos: 'DEF' },
    { name: 'C. Montes', search: 'César Montes', pos: 'DEF' },
    { name: 'J. Sánchez', search: 'Jorge Sánchez (footballer, born 1997)', pos: 'DEF' },
    { name: 'L. Chávez', search: 'Luis Chávez', pos: 'MID' },
    { name: 'U. Antuna', search: 'Uriel Antuna', pos: 'MID' },
    { name: 'O. Pineda', search: 'Orbelín Pineda', pos: 'MID' }
  ],
  'kor': [
    { name: 'Son H. M.', search: 'Son Heung-min', pos: 'FWD' },
    { name: 'Kim M. J.', search: 'Kim Min-jae', pos: 'DEF' },
    { name: 'Lee K. I.', search: 'Lee Kang-in', pos: 'MID' },
    { name: 'Hwang H. C.', search: 'Hwang Hee-chan', pos: 'FWD' },
    { name: 'Hwang I. B.', search: 'Hwang In-beom', pos: 'MID' },
    { name: 'Cho G. S.', search: 'Cho Gue-sung', pos: 'FWD' },
    { name: 'Lee J. S.', search: 'Lee Jae-sung', pos: 'MID' },
    { name: 'Jung W. Y.', search: 'Jung Woo-young', pos: 'MID' },
    { name: 'Kim S. G.', search: 'Kim Seung-gyu', pos: 'GK' },
    { name: 'Kim Y. G.', search: 'Kim Young-gwon', pos: 'DEF' },
    { name: 'Seol Y. W.', search: 'Seol Young-woo', pos: 'DEF' }
  ],
  'cze': [
    { name: 'P. Schick', search: 'Patrik Schick', pos: 'FWD' },
    { name: 'T. Souček', search: 'Tomáš Souček', pos: 'MID' },
    { name: 'V. Coufal', search: 'Vladimír Coufal', pos: 'DEF' },
    { name: 'A. Barák', search: 'Antonín Barák', pos: 'MID' },
    { name: 'J. Staněk', search: 'Jindřich Staněk', pos: 'GK' },
    { name: 'A. Hložek', search: 'Adam Hložek', pos: 'FWD' },
    { name: 'T. Holeš', search: 'Tomáš Holeš', pos: 'DEF' },
    { name: 'L. Krejčí', search: 'Ladislav Krejčí (footballer, born 1999)', pos: 'DEF' },
    { name: 'D. Dědek', search: 'David Dědek', pos: 'DEF' },
    { name: 'M. Sadílek', search: 'Michal Sadílek', pos: 'MID' },
    { name: 'D. Jurásek', search: 'David Jurásek', pos: 'DEF' }
  ],
  'rsa': [
    { name: 'P. Tau', search: 'Percy Tau', pos: 'FWD' },
    { name: 'R. Williams', search: 'Ronwen Williams', pos: 'GK' },
    { name: 'T. Zwane', search: 'Themba Zwane', pos: 'MID' },
    { name: 'L. Foster', search: 'Lyle Foster', pos: 'FWD' },
    { name: 'K. Mudau', search: 'Khuliso Mudau', pos: 'DEF' },
    { name: 'T. Mokoena', search: 'Teboho Mokoena', pos: 'MID' },
    { name: 'M. Mvala', search: 'Mothobi Mvala', pos: 'DEF' },
    { name: 'S. Xulu', search: 'Siyanda Xulu', pos: 'DEF' },
    { name: 'A. Modiba', search: 'Aubrey Modiba', pos: 'DEF' },
    { name: 'S. Sithole', search: 'Sphephelo Sithole', pos: 'MID' },
    { name: 'M. Mayambela', search: 'Mihlali Mayambela', pos: 'FWD' }
  ],
  'can': [
    { name: 'A. Davies', search: 'Alphonso Davies', pos: 'DEF' },
    { name: 'J. David', search: 'Jonathan David', pos: 'FWD' },
    { name: 'S. Eustáquio', search: 'Stephen Eustáquio', pos: 'MID' },
    { name: 'T. Buchanan', search: 'Tajon Buchanan', pos: 'MID' },
    { name: 'A. Johnston', search: 'Alistair Johnston', pos: 'DEF' },
    { name: 'K. Miller', search: 'Kamal Miller', pos: 'DEF' },
    { name: 'M. Borjan', search: 'Milan Borjan', pos: 'GK' },
    { name: 'C. Larin', search: 'Cyle Larin', pos: 'FWD' },
    { name: 'I. Koné', search: 'Ismaël Koné', pos: 'MID' },
    { name: 'R. Laryea', search: 'Richie Laryea', pos: 'DEF' },
    { name: 'S. Vitória', search: 'Steven Vitória', pos: 'DEF' }
  ],
  'sui': [
    { name: 'G. Xhaka', search: 'Granit Xhaka', pos: 'MID' },
    { name: 'Y. Sommer', search: 'Yann Sommer', pos: 'GK' },
    { name: 'M. Akanji', search: 'Manuel Akanji', pos: 'DEF' },
    { name: 'X. Shaqiri', search: 'Xherdan Shaqiri', pos: 'MID' },
    { name: 'B. Embolo', search: 'Breel Embolo', pos: 'FWD' },
    { name: 'D. Zakaria', search: 'Denis Zakaria', pos: 'MID' },
    { name: 'F. Schär', search: 'Fabian Schär', pos: 'DEF' },
    { name: 'R. Rodriguez', search: 'Ricardo Rodriguez (footballer)', pos: 'DEF' },
    { name: 'N. Elvedi', search: 'Nico Elvedi', pos: 'DEF' },
    { name: 'R. Freuler', search: 'Remo Freuler', pos: 'MID' },
    { name: 'R. Vargas', search: 'Ruben Vargas', pos: 'FWD' }
  ],
  'bih': [
    { name: 'E. Džeko', search: 'Edin Džeko', pos: 'FWD' },
    { name: 'M. Pjanić', search: 'Miralem Pjanić', pos: 'MID' },
    { name: 'S. Kolašinac', search: 'Sead Kolašinac', pos: 'DEF' },
    { name: 'R. Krunić', search: 'Rade Krunić', pos: 'MID' },
    { name: 'A. Ahmedhodžić', search: 'Anel Ahmedhodžić', pos: 'DEF' },
    { name: 'A. Dedić', search: 'Amar Dedić', pos: 'DEF' },
    { name: 'I. Šehić', search: 'Ibrahim Šehić', pos: 'GK' },
    { name: 'E. Demirović', search: 'Ermedin Demirović', pos: 'FWD' },
    { name: 'A. Hadžiahmetović', search: 'Amir Hadžiahmetović', pos: 'MID' },
    { name: 'D. Hadžikadunić', search: 'Dennis Hadžikadunić', pos: 'DEF' },
    { name: 'M. Stevanović', search: 'Miroslav Stevanović', pos: 'MID' }
  ],
  'qat': [
    { name: 'A. Afif', search: 'Akram Afif', pos: 'FWD' },
    { name: 'A. Ali', search: 'Almoez Ali', pos: 'FWD' },
    { name: 'H. Al-Haydos', search: 'Hassan Al-Haydos', pos: 'MID' },
    { name: 'S. Al-Sheeb', search: 'Saad Al-Sheeb', pos: 'GK' },
    { name: 'A. Hatem', search: 'Abdulaziz Hatem', pos: 'MID' },
    { name: 'B. Khoukhi', search: 'Boualem Khoukhi', pos: 'DEF' },
    { name: 'P. Miguel', search: 'Ró-Ró', pos: 'DEF' }, // Ró-Ró is Pedro Miguel
    { name: 'B. Al-Rawi', search: 'Bassam Al-Rawi', pos: 'DEF' },
    { name: 'A. Hassan', search: 'Abdelkarim Hassan', pos: 'DEF' },
    { name: 'K. Boudiaf', search: 'Karim Boudiaf', pos: 'MID' },
    { name: 'M. Muntari', search: 'Mohammed Muntari', pos: 'FWD' }
  ]
};

async function getWikiImage(searchName, shortName) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&pithumbsize=250`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
      return pages[pageId].thumbnail.source;
    }
  } catch(e) {
    console.log("Failed to fetch wiki image for", searchName);
  }
  // Fallback to UI-Avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(shortName)}&background=random&color=fff&size=250`;
}

async function run() {
  console.log("Starting Wikipedia/Avatar update...");
  let matchesContent = fs.readFileSync('lib/data/matches.ts', 'utf8');

  for (const [teamCode, players] of Object.entries(TEAMS)) {
    console.log(`Processing team ${teamCode}...`);
    let newPlayersStr = [];
    
    for (let i = 0; i < players.length; i++) {
        const p = players[i];
        const imageUrl = await getWikiImage(p.search, p.name);
        newPlayersStr.push(`        { id: '${teamCode}-p${i+1}', name: '${p.name}', shortName: '${p.name}', position: '${p.pos}', avatarUrl: '${imageUrl}' }`);
    }

    const fullReplacement = `      players: [\n${newPlayersStr.join(',\n')}\n      ]`;

    // Replace all occurrences of this team's players
    // Wait, the regex `id:\s*'mex',[\s\S]*?players:\s*\[[\s\S]*?\],[\s\S]*?form:` is robust, but there are multiple matches involving the same team.
    // Let's do a global replace for each team object directly.
    const regex = new RegExp(`(id:\\s*'${teamCode}'[\\s\\S]*?players:\\s*\\[)[\\s\\S]*?(\\])`, 'g');
    matchesContent = matchesContent.replace(regex, (match, p1, p2) => {
        return p1 + '\n' + newPlayersStr.join(',\n') + '\n      ' + p2;
    });
  }

  fs.writeFileSync('lib/data/matches.ts', matchesContent);
  console.log("Done updating matches.ts with real images!");
}

run();
