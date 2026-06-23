export default function NotFound() {
  return (
    <div className="min-h-screen wc26-bg flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">⚽</div>
        <h2 className="font-display font-black text-3xl neon-gradient-text mb-2">المباراة غير موجودة</h2>
        <p className="text-white/40 mb-6">هذه المباراة غير موجودة في قاعدة البيانات.</p>
        <a href="/" className="btn-cta inline-block">← العودة للمباريات</a>
      </div>
    </div>
  );
}
