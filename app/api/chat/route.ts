import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not set in environment variables.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    });

    const result = await generateText({
      model: google('gemini-2.5-flash-lite'),
      messages,
      system: `أنت مساعد ذكي خبير في كرة القدم وكأس العالم 2026. 
مهامك هي:
1. الإجابة على أي أسئلة متعلقة بكرة القدم، المنتخبات، التكتيكات، وتاريخ كأس العالم.
2. التحدث دائماً باللغة العربية بأسلوب احترافي وحماسي كأنك محلل رياضي.
3. تقديم نصائح وتوقعات استراتيجية بناءً على المعطيات التي يعطيها لك المستخدم.
4. إجاباتك يجب أن تكون دقيقة ومبنية على بيانات كرة القدم الحقيقية المتاحة لديك.
5. لا تتحدث في مواضيع خارج كرة القدم.`,
    });

    return new Response(JSON.stringify({ text: result.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    let errorMessage = 'فشل في الاتصال بالمساعد الذكي.';
    
    if (error?.message?.includes('Quota exceeded') || error?.message?.includes('429')) {
      errorMessage = 'عذراً، لقد نفذ رصيد المحادثات المجانية الخاص بمفتاح الذكاء الاصطناعي (Gemini). يرجى ترقية خطتك أو المحاولة لاحقاً.';
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
