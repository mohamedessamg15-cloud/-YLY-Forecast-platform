const fs = require('fs');

const fotmob = require('./fotmob_data.json');
const allMatches = fotmob.props.pageProps.fixtures.allMatches;
const tables = fotmob.props.pageProps.table[0].data.tables;

// Old matches file to extract players from
const oldMatchesTs = fs.readFileSync('lib/data/matches.ts', 'utf8');

// Helper to extract players array string for a team ID
function extractPlayersString(teamId) {
    const regex = new RegExp(`id:\\s*'${teamId}'[\\s\\S]*?players:\\s*(\\[[\\s\\S]*?\\]),\\s*form:`);
    const match = oldMatchesTs.match(regex);
    return match ? match[1] : '[]';
}

const teamsMap = {};
const groupsMap = {}; // A -> ['mex', 'kor', ...]

// Common flags and colors
const fallbackColors = ['#E53E3E', '#3182CE', '#38A169', '#D69E2E', '#805AD5', '#E53E3E', '#319795'];
function getFallbackColor(name) {
    let sum = 0;
    for(let i=0; i<name.length; i++) sum += name.charCodeAt(i);
    return fallbackColors[sum % fallbackColors.length];
}

const flagMapping = {
    'Mexico': { flag: '🇲🇽', code: 'mx' },
    'South Korea': { flag: '🇰🇷', code: 'kr' },
    'Czechia': { flag: '🇨🇿', code: 'cz' },
    'South Africa': { flag: '🇿🇦', code: 'za' },
    'Canada': { flag: '🇨🇦', code: 'ca' },
    'Switzerland': { flag: '🇨🇭', code: 'ch' },
    'Bosnia and Herzegovina': { flag: '🇧🇦', code: 'ba' },
    'Qatar': { flag: '🇶🇦', code: 'qa' },
    'USA': { flag: '🇺🇸', code: 'us' },
    'Brazil': { flag: '🇧🇷', code: 'br' },
    'Germany': { flag: '🇩🇪', code: 'de' },
    'Spain': { flag: '🇪🇸', code: 'es' },
    'Argentina': { flag: '🇦🇷', code: 'ar' },
    'France': { flag: '🇫🇷', code: 'fr' },
    'England': { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'gb-eng' },
    'Japan': { flag: '🇯🇵', code: 'jp' },
    'Morocco': { flag: '🇲🇦', code: 'ma' },
    'Portugal': { flag: '🇵🇹', code: 'pt' },
    'Netherlands': { flag: '🇳🇱', code: 'nl' },
    'Belgium': { flag: '🇧🇪', code: 'be' },
    'Croatia': { flag: '🇭🇷', code: 'hr' },
    'Uruguay': { flag: '🇺🇾', code: 'uy' },
    'Colombia': { flag: '🇨🇴', code: 'co' },
    'Senegal': { flag: '🇸🇳', code: 'sn' },
    'Iran': { flag: '🇮🇷', code: 'ir' },
    'Australia': { flag: '🇦🇺', code: 'au' },
    'Saudi Arabia': { flag: '🇸🇦', code: 'sa' },
    'Egypt': { flag: '🇪🇬', code: 'eg' },
    'Tunisia': { flag: '🇹🇳', code: 'tn' },
    'Algeria': { flag: '🇩🇿', code: 'dz' },
    'Ghana': { flag: '🇬🇭', code: 'gh' },
    'Ivory Coast': { flag: '🇨🇮', code: 'ci' },
    'Ecuador': { flag: '🇪🇨', code: 'ec' },
    'Sweden': { flag: '🇸🇪', code: 'se' },
    'Austria': { flag: '🇦🇹', code: 'at' },
    'Norway': { flag: '🇳🇴', code: 'no' },
    'Scotland': { flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', code: 'gb-sct' },
    'Turkiye': { flag: '🇹🇷', code: 'tr' },
    'Paraguay': { flag: '🇵🇾', code: 'py' },
    'Haiti': { flag: '🇭🇹', code: 'ht' },
    'Curacao': { flag: '🇨🇼', code: 'cw' },
    'Cape Verde': { flag: '🇨🇻', code: 'cv' },
    'New Zealand': { flag: '🇳🇿', code: 'nz' },
    'Iraq': { flag: '🇮🇶', code: 'iq' },
    'Jordan': { flag: '🇯🇴', code: 'jo' },
    'DR Congo': { flag: '🇨🇩', code: 'cd' },
    'Panama': { flag: '🇵🇦', code: 'pa' },
    'Uzbekistan': { flag: '🇺🇿', code: 'uz' }
};

const preSavedIDs = {
  'Mexico': 'mex', 'South Korea': 'kor', 'Czechia': 'cze', 'South Africa': 'rsa',
  'Canada': 'can', 'Switzerland': 'sui', 'Bosnia and Herzegovina': 'bih', 'Qatar': 'qat'
};

function generateTeamId(name) {
    if (preSavedIDs[name]) return preSavedIDs[name];
    return name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 3);
}

// 1. Process 12 Groups (Grp. A to Grp. L)
// We have 13 tables, usually 1-12 are A-L.
const groupTables = tables.filter(t => t.leagueName.startsWith('Grp. '));
groupTables.forEach(t => {
    const groupName = t.leagueName.replace('Grp. ', ''); // A, B, C...
    groupsMap[groupName] = [];
    t.table.all.forEach(row => {
        const teamName = row.name;
        const id = generateTeamId(teamName);
        groupsMap[groupName].push(id);
        
        let flag = '🌍';
        let flagCode = 'xx';
        if (flagMapping[teamName]) {
            flag = flagMapping[teamName].flag;
            flagCode = flagMapping[teamName].code;
        }

        teamsMap[id] = {
            id,
            name: teamName,
            shortName: id.toUpperCase(),
            flag,
            flagCode,
            primaryColor: getFallbackColor(teamName),
            ranking: Math.floor(Math.random() * 50) + 1,
            group: groupName,
            playersString: extractPlayersString(id)
        };
    });
});

// 2. Process Matches
const matchesData = [];
allMatches.forEach((m, idx) => {
    const homeId = generateTeamId(m.home.name);
    const awayId = generateTeamId(m.away.name);
    
    // Some matches might be knockouts with "Winner of X". 
    // We'll skip matches where we don't have the team in our 48 teams map yet.
    if (!teamsMap[homeId] || !teamsMap[awayId]) return;

    let status = 'Upcoming';
    if (m.status.finished) status = 'Finished';
    else if (m.status.started) status = 'Live';

    let hScore = m.home.score ?? undefined;
    let aScore = m.away.score ?? undefined;

    // Only include matches where both teams are in the same group (Group Stage matches)
    if (teamsMap[homeId].group !== teamsMap[awayId].group) {
        return; // Skip fictional knockout matches
    }

    matchesData.push({
        id: `match-${idx}`,
        date: m.status.utcTime,
        stadium: 'World Cup Stadium',
        city: 'Host City',
        country: 'Host',
        group: teamsMap[homeId].group,
        round: 'دور المجموعات',
        teamAId: homeId,
        teamBId: awayId,
        status,
        homeScore: hScore,
        awayScore: aScore
    });
});

// 3. Generate TypeScript Code
let tsCode = `import type { Match, Team, Player } from './types';\n\n`;

tsCode += `export const GROUPS: Record<string, string[]> = {\n`;
for (const [g, teams] of Object.entries(groupsMap)) {
    tsCode += `  '${g}': [${teams.map(t => `'${t}'`).join(', ')}],\n`;
}
tsCode += `};\n\n`;

tsCode += `export const TEAMS_MAP: Record<string, Team> = {\n`;
for (const [id, t] of Object.entries(teamsMap)) {
    tsCode += `  '${id}': {
    id: '${t.id}',
    name: '${t.name.replace(/'/g, "\\'")}',
    shortName: '${t.shortName}',
    flag: '${t.flag}',
    flagCode: '${t.flagCode}',
    primaryColor: '${t.primaryColor}',
    secondaryColor: '#ffffff',
    ranking: ${t.ranking},
    group: '${t.group}',
    coach: 'Manager',
    worldCupAppearances: 0,
    worldCupWins: 0,
    form: [{ result: 'W' }, { result: 'D' }, { result: 'W' }],
    players: ${t.playersString}
  },\n`;
}
tsCode += `};\n\n`;

tsCode += `export const TEAMS: Team[] = Object.values(TEAMS_MAP);\n\n`;

tsCode += `export const MATCHES: Match[] = [\n`;
matchesData.forEach(m => {
    tsCode += `  {
    id: '${m.id}',
    date: '${m.date}',
    stadium: '${m.stadium}',
    city: '${m.city}',
    country: '${m.country}',
    group: '${m.group}',
    round: '${m.round}',
    status: '${m.status}',\n`;
    if (m.homeScore !== undefined) tsCode += `    homeScore: ${m.homeScore},\n`;
    if (m.awayScore !== undefined) tsCode += `    awayScore: ${m.awayScore},\n`;
    tsCode += `    teamA: TEAMS_MAP['${m.teamAId}'],
    teamB: TEAMS_MAP['${m.teamBId}'],
    h2hRecords: [],
    funStats: []
  },\n`;
});
tsCode += `];\n`;

fs.writeFileSync('lib/data/matches.ts', tsCode);
console.log('Successfully generated complete World Cup data!');
