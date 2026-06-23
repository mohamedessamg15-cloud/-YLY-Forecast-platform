import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { matchData } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY غير مضاف في ملف .env.local' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const prompt = `
أنت محلل كرة قدم خبير ومتخصص في كأس العالم. حلّل هذه المباراة وقدّم تحليلاً احترافياً واثقاً باللغة العربية الفصحى.

**المباراة:** ${matchData.teamA} ضد ${matchData.teamB}
**المجموعة:** ${matchData.group}
**الاستاد:** ${matchData.stadium}، ${matchData.city}

**ترتيب FIFA:**
- ${matchData.teamA}: المركز ${matchData.rankA}
- ${matchData.teamB}: المركز ${matchData.rankB}

**ألقاب كأس العالم:**
- ${matchData.teamA}: ${matchData.winsA} لقب
- ${matchData.teamB}: ${matchData.winsB} لقب

**المواجهات التاريخية في كأس العالم:**
- فوز ${matchData.teamA}: ${matchData.h2hWinsA} مرة
- تعادل: ${matchData.h2hDraws} مرة
- فوز ${matchData.teamB}: ${matchData.h2hWinsB} مرة

**الفورم الأخيرة (آخر 5 مباريات):**
- ${matchData.teamA}: ${matchData.formA}
- ${matchData.teamB}: ${matchData.formB}

اكتب الرد بالتنسيق التالي بالضبط (بدون أي تنسيق markdown أو نجوم):

ملخص_التحليل: [جملتان أو ثلاث تلخّص أبرز جوانب هذا اللقاء وسياقه التاريخي]

التوقع_المدعوم_بالبيانات: [${matchData.teamA}] [رقم] - [رقم] [${matchData.teamB}]

أبرز_لاعب_للمتابعة: [اسم اللاعب] ([الفريق]) - [سبب واحد مختصر]

الرؤية_التكتيكية: [جملة واحدة عن الجانب التكتيكي الأهم]

نسبة_الفوز: ${matchData.teamA} [رقم]% | تعادل [رقم]% | ${matchData.teamB} [رقم]%
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Parse the structured response
    const lines = text.split('\n').filter((l: string) => l.trim());
    const parsed: Record<string, string> = {};

    for (const line of lines) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > -1) {
        const key = line.substring(0, colonIdx).trim();
        const value = line.substring(colonIdx + 1).trim();
        parsed[key] = value;
      }
    }

    return NextResponse.json({
      analysis: parsed['ملخص_التحليل'] || '',
      prediction: parsed['التوقع_المدعوم_بالبيانات'] || '',
      keyPlayer: parsed['أبرز_لاعب_للمتابعة'] || '',
      tactical: parsed['الرؤية_التكتيكية'] || '',
      probabilities: parsed['نسبة_الفوز'] || '',
      raw: text,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'خطأ غير معروف';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
