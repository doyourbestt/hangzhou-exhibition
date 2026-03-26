import { motion } from 'framer-motion';
import { Heart, Eye, Award } from 'lucide-react';

interface LeaderboardCardProps {
  leader: {
    id: string;
    name: string;
    avatar: string;
    likes: number;
  };
  rank: number;
}

export const LeaderboardCard = ({ leader, rank }: LeaderboardCardProps) => {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200';
    if (rank === 2) return 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200';
    if (rank === 3) return 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200';
    return 'bg-white border-gray-100';
  };

  const getRankTextStyle = (rank: number) => {
    if (rank === 1) return 'text-amber-600';
    if (rank === 2) return 'text-slate-500';
    if (rank === 3) return 'text-orange-500';
    return 'text-gray-500';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border p-4 shadow-sm hover:shadow-md transition-shadow ${getRankStyle(rank)}`}
    >
      {/* 卡片头部层：排名徽章 + 支持数 */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRankStyle(rank)} border ${getRankTextStyle(rank)}`}>
          {rank === 1 && <Award className="w-3 h-3" />}
          <span>第{rank}名</span>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span className="text-sm font-medium">{leader.likes}</span>
        </div>
      </div>

      {/* 人物信息层 */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={leader.avatar}
          alt={leader.name}
          className="w-12 h-12 rounded-xl object-cover shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-800 truncate">{leader.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">领队队长</span>
            {rank <= 3 && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${rank === 1 ? 'bg-amber-100 text-amber-600' : rank === 2 ? 'bg-gray-100 text-slate-600' : 'bg-orange-100 text-orange-600'}`}>
                {rank === 1 ? '🥇 金牌' : rank === 2 ? '🥈 银牌' : '🥉 铜牌'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 留言预览层 */}
      <div className="bg-gray-50/80 rounded-xl p-3 mb-3">
        <p className="text-xs text-gray-500 italic">"带你看最美的西湖日落，感受杭州的浪漫与温柔"</p>
      </div>

      {/* 操作按钮层 */}
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>看看 TA</span>
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-rose-200 transition-all"
        >
          <Heart className="w-4 h-4" />
          <span>支持 TA</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
