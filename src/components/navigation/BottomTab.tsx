import { motion } from 'framer-motion';
import { Heart, User } from 'lucide-react';

interface BottomTabProps {
  activeTab: 'leaderboard' | 'my-supports';
  onTabChange: (tab: 'leaderboard' | 'my-supports') => void;
}

export const BottomTab = ({ activeTab, onTabChange }: BottomTabProps) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center justify-around py-2.5">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange('leaderboard')}
          className={`flex flex-col items-center gap-1 px-8 py-2 rounded-xl transition-colors relative ${
            activeTab === 'leaderboard' ? 'text-rose-500' : 'text-gray-400'
          }`}
        >
          <motion.div
            animate={activeTab === 'leaderboard' ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-6 h-6 ${
                activeTab === 'leaderboard' ? 'fill-rose-500' : ''
              }`}
            />
          </motion.div>
          <span className="text-xs font-medium">点赞榜</span>
          {activeTab === 'leaderboard' && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute -bottom-1 w-8 h-0.5 bg-rose-500 rounded-full"
            />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange('my-supports')}
          className={`flex flex-col items-center gap-1 px-8 py-2 rounded-xl transition-colors relative ${
            activeTab === 'my-supports' ? 'text-rose-500' : 'text-gray-400'
          }`}
        >
          <motion.div
            animate={activeTab === 'my-supports' ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <User className="w-6 h-6" />
          </motion.div>
          <span className="text-xs font-medium">我的支持</span>
          {activeTab === 'my-supports' && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute -bottom-1 w-8 h-0.5 bg-rose-500 rounded-full"
            />
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
};
