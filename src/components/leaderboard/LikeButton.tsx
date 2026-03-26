import { motion } from 'framer-motion';
import { Heart, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface LikeButtonProps {
  onLike: () => void;
  likes: number;
  hasLiked: boolean;
}

export const LikeButton = ({ onLike, likes, hasLiked }: LikeButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCount, setShowCount] = useState(false);

  const handleClick = () => {
    if (hasLiked) return;
    
    onLike();
    setIsAnimating(true);
    setShowCount(true);
    
    setTimeout(() => setIsAnimating(false), 300);
    setTimeout(() => setShowCount(false), 600);
  };

  if (hasLiked) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
        </div>
        <span className="text-xs font-medium text-emerald-600">
          已支持
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 flex items-center justify-center hover:shadow-md transition-shadow duration-200 active:scale-95"
      >
        <motion.div
          animate={isAnimating ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Heart
            className={`w-5 h-5 ${
              isAnimating ? 'fill-rose-500 text-rose-500' : 'text-rose-400'
            }`}
          />
        </motion.div>
      </motion.button>
      
      <motion.span
        key={likes}
        initial={showCount ? { scale: 1.2, opacity: 0 } : false}
        animate={showCount ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.2 }}
        className="text-xs font-medium text-gray-600 tabular-nums"
      >
        {likes}
      </motion.span>
    </div>
  );
};
