const fs = require('fs');

const data = require('./fotmob_data.json');
const allMatches = data.props.pageProps.fixtures.allMatches;

const TEAM_MAP = {
  'mex': 'Mexico',
  'kor': 'South Korea',
  'cze': 'Czechia',
  'rsa': 'South Africa',
  'can': 'Canada',
  'sui': 'Switzerland',
  'bih': 'Bosnia and Herzegovina',
  'qat': 'Qatar'
};

let matchesTs = fs.readFileSync('lib/data/matches.ts', 'utf8');

// Match IDs in matches.ts: 'mex-kor', 'cze-rsa', 'can-sui', 'bih-qat'
const matchups = [
  { id: 'mex-kor', a: 'mex', b: 'kor' },
  { id: 'cze-rsa', a: 'cze', b: 'rsa' },
  { id: 'can-sui', a: 'can', b: 'sui' },
  { id: 'bih-qat', a: 'bih', b: 'qat' }
];

for (const match of matchups) {
  const nameA = TEAM_MAP[match.a];
  const nameB = TEAM_MAP[match.b];

  const fotmobMatch = allMatches.find(m => 
    (m.home.name === nameA && m.away.name === nameB) || 
    (m.home.name === nameB && m.away.name === nameA)
  );

  if (fotmobMatch) {
    let homeScore = undefined;
    let awayScore = undefined;
    
    if (fotmobMatch.status.scoreStr) {
      const parts = fotmobMatch.status.scoreStr.split(' - ');
      if (parts.length === 2) {
        if (fotmobMatch.home.name === nameA) {
          homeScore = parseInt(parts[0], 10);
          awayScore = parseInt(parts[1], 10);
        } else {
          homeScore = parseInt(parts[1], 10);
          awayScore = parseInt(parts[0], 10);
        }
      }
    }

    let status = 'Upcoming';
    if (fotmobMatch.status.finished) {
      status = 'Finished';
    } else if (fotmobMatch.status.started) {
      status = 'Live';
    }

    const date = fotmobMatch.status.utcTime; // ISO string

    console.log(`Updating ${match.id}: ${status} at ${date} [${homeScore} - ${awayScore}]`);

    // Replace date: '...'
    const dateRegex = new RegExp(`(id:\\s*'${match.id}',[\\s\\S]*?date:\\s*')[^']+(')`);
    matchesTs = matchesTs.replace(dateRegex, `$1${date}$2`);

    // Replace status: '...'
    // Note: status might not exist if it wasn't present, but it's defined in the interface.
    // In current matches.ts, it's not present for some? Wait, looking at `matches.ts` head, I didn't see `status` in `mex-kor`.
    // Let me check if `status` is already in the object. If not, I'll insert it after `date`.
    if (matchesTs.includes(`status: `) && new RegExp(`id:\\s*'${match.id}',[\\s\\S]*?status:\\s*'[^']+'`).test(matchesTs)) {
        const statusRegex = new RegExp(`(id:\\s*'${match.id}',[\\s\\S]*?status:\\s*')[^']+(')`);
        matchesTs = matchesTs.replace(statusRegex, `$1${status}$2`);
    } else {
        const dateInsertRegex = new RegExp(`(id:\\s*'${match.id}',[\\s\\S]*?date:\\s*'[^']+',)`);
        matchesTs = matchesTs.replace(dateInsertRegex, `$1\n    status: '${status}',`);
    }

    // Replace or insert homeScore and awayScore
    // Let's just remove existing homeScore/awayScore and re-insert them if they exist
    const removeScoreRegex = new RegExp(`(id:\\s*'${match.id}',[\\s\\S]*?date:\\s*'[^']+',\\s*status:\\s*'[^']+',\\s*)(homeScore:\\s*\\d+,\\s*)?(awayScore:\\s*\\d+,\\s*)?`);
    
    matchesTs = matchesTs.replace(removeScoreRegex, (fullMatch, prefix) => {
        let replacement = prefix;
        if (homeScore !== undefined && !isNaN(homeScore)) {
            replacement += `homeScore: ${homeScore},\n    `;
        }
        if (awayScore !== undefined && !isNaN(awayScore)) {
            replacement += `awayScore: ${awayScore},\n    `;
        }
        return replacement;
    });

  } else {
    console.log(`Match ${match.id} not found in Fotmob data`);
  }
}

fs.writeFileSync('lib/data/matches.ts', matchesTs);
console.log('Update complete!');
