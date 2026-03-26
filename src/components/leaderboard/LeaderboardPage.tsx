import { motion } from 'framer-motion';
import { LeaderboardList } from './LeaderboardList';

export const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F5F3EE] to-[#FAF9F6]">
      {/* 顶部标题区 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-5 pt-8 pb-4"
      >
        <div className="text-center mb-5">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-gray-800 mb-1"
          >
            艺起逛杭州
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold text-gray-900"
          >
            领队队长点赞榜
          </motion.p>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-xs text-gray-400 mb-4"
        >
          为你喜欢的领队队长送上一颗小心心
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-1.5 mx-auto px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full shadow-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-500">实时更新中</span>
        </motion.div>
      </motion.div>

      {/* 榜单卡片列表 */}
      <LeaderboardList />

      {/* 底部留白 */}
      <div className="h-8" />
    </div>
  );
};
