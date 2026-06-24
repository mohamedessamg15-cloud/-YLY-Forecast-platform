import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch Arabic news about football / world cup
    const query = encodeURIComponent('كأس العالم 2026 كرة القدم');
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=ar&gl=EG&ceid=EG:ar`;
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // Simple regex parser for RSS items
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>([\s\S]*?)<\/title>/;
    const linkRegex = /<link>([\s\S]*?)<\/link>/;
    const dateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;
    const sourceRegex = /<source[^>]*>([\s\S]*?)<\/source>/;
    
    const items: any[] = [];
    let match;
    
    // Pixabay fallback images
    const fallbackImages = [
      'https://cdn.pixabay.com/photo/2016/11/29/02/05/audience-1866738_1280.jpg',
      'https://cdn.pixabay.com/photo/2015/01/26/22/40/child-613199_1280.jpg'
    ];

    while ((match = itemRegex.exec(xmlText)) !== null) {
      if (items.length >= 8) break; // Limit to 8 news items
      
      const itemContent = match[1];
      
      const titleMatch = itemContent.match(titleRegex);
      const linkMatch = itemContent.match(linkRegex);
      const dateMatch = itemContent.match(dateRegex);
      const sourceMatch = itemContent.match(sourceRegex);
      
      if (titleMatch) {
        // Google News titles usually have the source at the end like "Title - Source"
        let fullTitle = titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim();
        let sourceName = sourceMatch ? sourceMatch[1] : 'جوجل للأخبار';
        
        let title = fullTitle;
        if (fullTitle.includes(' - ')) {
           const parts = fullTitle.split(' - ');
           sourceName = parts.pop() || sourceName;
           title = parts.join(' - ');
        }
        
        const dateStr = dateMatch ? dateMatch[1] : new Date().toISOString();
        const dateObj = new Date(dateStr);
        
        // Calculate relative time (e.g. "منذ 3 ساعات")
        const now = new Date();
        const diffMs = now.getTime() - dateObj.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        let relativeTime = 'منذ وقت قصير';
        if (diffHrs > 0 && diffHrs < 24) relativeTime = `منذ ${diffHrs} ساعات`;
        else if (diffHrs >= 24) relativeTime = `منذ ${Math.floor(diffHrs/24)} أيام`;

        // Pick random fallback image based on index
        const imgIndex = items.length % fallbackImages.length;
        
        items.push({
          id: items.length + 1,
          title: title,
          summary: `اقرأ التفاصيل الكاملة عبر المصدر الأصلي: ${sourceName}. تم جلب هذا الخبر عبر نظام اتحاد شباب يدير شباب للمنصة لضمان بقائك على اطلاع دائم بأحدث مستجدات كأس العالم وكرة القدم.`,
          fullText: `هذا الخبر هو تغطية حية ومباشرة لمستجدات كرة القدم. لمزيد من التفاصيل الدقيقة يرجى زيارة الرابط الأصلي للخبر من مصدره (${sourceName}). نحن في منصة YLY نضمن لك أحدث الأخبار لحظة بلحظة.`,
          tag: 'مباشر',
          time: relativeTime,
          source: sourceName,
          link: linkMatch ? linkMatch[1] : '#',
          image: fallbackImages[imgIndex]
        });
      }
    }

    return NextResponse.json({ success: true, articles: items });
  } catch (error) {
    console.error('RSS Fetch Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch news' }, { status: 500 });
  }
}
