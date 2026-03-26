import { motion } from 'framer-motion';
import type { Leader } from '../../types/user';
import { LikeButton } from './LikeButton';
import { TopRankBadge } from './TopRankBadge';

interface LeaderboardCardProps {
  leader: Leader;
  rank: number;
  onLike: (id: string) => void;
  hasLiked: boolean;
}

export const LeaderboardCard = ({ leader, rank, onLike, hasLiked }: LeaderboardCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 },
        y: { duration: 0.3 },
      }}
      className="relative bg-white rounded-2xl shadow-soft-card hover:shadow-hover-card transition-shadow duration-300 p-4 mx-4 mb-3"
    >
      <TopRankBadge rank={rank} />
      
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm flex-shrink-0 ml-6"
        >
          <img
            src={leader.avatar}
            alt={leader.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-800 truncate">
            {leader.name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            领队队长
          </p>
        </div>

        <LikeButton
          onLike={() => onLike(leader.id)}
          likes={leader.likes}
          hasLiked={hasLiked}
        />
      </div>
    </motion.div>
  );
};
