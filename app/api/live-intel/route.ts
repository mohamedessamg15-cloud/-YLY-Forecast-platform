import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { match } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ news: [] });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    const prompt = `أنت خبير بيانات كرة القدم الحي. 
قم بتوليد 3 مستجدات أو أحدث التطورات التكتيكية لمباراة: ${match}.
يجب أن تتضمن الإصابات المتوقعة، وحالة الفريقين، وأي أخبار حديثة ممكنة بناءً على الواقع.
اكتبها في شكل قائمة JSON تحتوي على مصفوفة "news" من نوع Strings.
يجب أن تكون الجمل قصيرة ومفيدة ومكتوبة بالعربية حصراً، ولا تضف أي نص آخر سوى كود JSON.`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Live Intel Error:', error);
    return NextResponse.json({ news: [] });
  }
}
