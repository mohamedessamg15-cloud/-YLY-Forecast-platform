import Parser from 'rss-parser';

export const revalidate = 3600; // revalidate every hour

async function fetchNews() {
  const parser = new Parser();
  try {
    // Fetch Google News RSS for "كأس العالم 2026" in Arabic
    const feed = await parser.parseURL('https://news.google.com/rss/search?q=كأس+العالم+2026&hl=ar&gl=EG&ceid=EG:ar');
    return feed.items.slice(0, 4); // get top 4 news items
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return [];
  }
}

export default async function LiveNews() {
  const newsItems = await fetchNews();

  if (!newsItems || newsItems.length === 0) {
    return null; // hide section if no news
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.1)' }} />
        <span className="text-xs font-display font-semibold text-white/30 tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          أحدث الأخبار
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(57,255,20,0.1)' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {newsItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-4 group hover:border-neon-green/30 transition-all duration-300 block"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-white/90 leading-relaxed mb-2 group-hover:text-neon-green transition-colors line-clamp-3">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                <span className="text-[10px] text-white/40">{item.pubDate ? new Date(item.pubDate).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }) : ''}</span>
                <span className="text-[10px] text-wc-cyan group-hover:text-wc-green transition-colors">اقرأ المزيد ←</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
