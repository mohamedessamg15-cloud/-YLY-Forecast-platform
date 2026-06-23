export function getFlagUrl(input: string): string {
  if (!input) return '';
  
  // If input is already a flag code (e.g., 'ar', 'gb-eng')
  if (/^[a-z]{2}$|^gb-[a-z]{3}$/.test(input)) {
    return `https://flagcdn.com/w160/${input}.png`;
  }

  const map: Record<string, string> = {
    'الأرجنتين': 'ar',
    'البرازيل': 'br',
    'إنجلترا': 'gb-eng',
    'إسبانيا': 'es',
    'فرنسا': 'fr',
    'ألمانيا': 'de',
    'البرتغال': 'pt',
    'المغرب': 'ma',
    'Argentina': 'ar',
    'Brazil': 'br',
    'England': 'gb-eng',
    'Spain': 'es',
    'France': 'fr',
    'Germany': 'de',
    'Portugal': 'pt',
    'Morocco': 'ma',
  };

  const code = map[input];
  if (!code) return '';
  return `https://flagcdn.com/w160/${code}.png`;
}
