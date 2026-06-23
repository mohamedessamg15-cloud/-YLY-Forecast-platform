'use client';

export default function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(0.5) contrast(1.1) saturate(1.2)',
        }}
      >
        <source src="/intro.mp4?v=1" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(5,0,20,0.5) 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </>
  );
}
