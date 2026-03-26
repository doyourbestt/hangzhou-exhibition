@import "tailwindcss";

@theme {
  --color-warm-white: #FAF9F6;
  --color-soft-cream: #F5F3EE;
  --color-gentle-coral: #E07A5F;
  --color-warm-terracotta: #D4715E;
  --color-top1-gold: #E8D5A3;
  --color-top2-silver: #C8C8C8;
  --color-top3-bronze: #D4A574;

  --shadow-soft-card: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-hover-card: 0 4px 12px rgba(0, 0, 0, 0.06);

  --animate-heart-beat: heartBeat 0.3s ease-in-out;
  --animate-number-pop: numberPop 0.3s ease-out;

  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
  }

  @keyframes numberPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
}
