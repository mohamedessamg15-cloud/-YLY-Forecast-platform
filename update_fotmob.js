const fs = require('fs');
const Fotmob = require('fotmob').default;
const fotmob = new Fotmob();

const TEAM_MAP = {
  'mex': 'Mexico',
  'kor': 'South Korea',
  'cze': 'Czechia',
  'rsa': 'South Africa',
  'can': 'Canada',
  'sui': 'Switzerland',
  'bih': 'Bosnia-Herzegovina', // or Bosnia and Herzegovina
  'qat': 'Qatar'
};

async function getTeamSquad(teamName) {
  try {
    // Search for team
    const searchRes = await fotmob.getSearchData({ term: teamName });
    const teams = searchRes.teams || searchRes.squads || [];
    if (teams.length === 0) {
        console.log('No team found for', teamName);
        return null;
    }
    const teamId = teams[0].id;
    console.log(`Found team ${teamName} with ID ${teamId}`);

    // Get team details
    const teamDetails = await fotmob.getTeam(teamId, 'en');
    
    // Extract squad
    // teamDetails.squad usually has multiple arrays like 'attackers', 'midfielders', 'defenders', 'keepers'
    let players = [];
    if (teamDetails.squad && teamDetails.squad.length > 0) {
      teamDetails.squad.forEach(category => {
        category.forEach(player => {
            players.push({
                name: player.name,
                id: player.id,
                position: category.title // e.g. Keepers, Defenders
            });
        });
      });
    }

    if (players.length === 0) {
        console.log('No squad found for', teamName);
        return null;
    }

    return players;
  } catch (err) {
    console.error(`Error fetching squad for ${teamName}:`, err);
    return null;
  }
}

async function run() {
  console.log("Starting Fotmob data update...");
  let matchesContent = fs.readFileSync('lib/data/matches.ts', 'utf8');

  for (const [teamCode, teamName] of Object.entries(TEAM_MAP)) {
      console.log(`Fetching squad for ${teamName}...`);
      const squad = await getTeamSquad(teamName);
      if (!squad) continue;

      // Take 11 players
      const top11 = squad.slice(0, 11);
      
      const newPlayersStr = top11.map((p, idx) => {
        const positionMap = {
            'Keepers': 'GK',
            'Defenders': 'DEF',
            'Midfielders': 'MID',
            'Attackers': 'FWD'
        };
        const pos = positionMap[p.position] || 'SUB';
        // Add a fallback avatar just in case fotmob image is broken, but use fotmob URL
        const avatarUrl = `https://images.fotmob.com/image_resources/playerimages/${p.id}.png`;
        return `        { id: '${teamCode}-p${idx+1}', name: '${p.name}', shortName: '${p.name.split(' ').pop()}', position: '${pos}', avatarUrl: '${avatarUrl}' }`;
      }).join(',\n');

      const fullReplacement = `      players: [\n${newPlayersStr}\n      ]`;

      // Replace in matches.ts (assuming formatting matches exactly)
      // Since a team can appear in multiple matches, we'll replace the block dynamically.
      // But we need to replace the `players: [...]` array only for `id: 'mex'` or similar.
      // A more robust regex:
      const regex = new RegExp(`id:\\s*'${teamCode}',[\\s\\S]*?players:\\s*\\[[\\s\\S]*?\\],[\\s\\S]*?form:`, 'g');
      
      matchesContent = matchesContent.replace(regex, (match) => {
          return match.replace(/players:\s*\[[\s\S]*?\]/, fullReplacement);
      });
      console.log(`Updated ${teamName} in matches.ts`);
  }

  fs.writeFileSync('lib/data/matches.ts', matchesContent);
  console.log("Done updating matches.ts!");
}

run();
