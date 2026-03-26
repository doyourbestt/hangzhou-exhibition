import { AnimatePresence, motion } from 'framer-motion';
import type { Database } from '../../types/database';
import { LeaderboardCard } from './LeaderboardCard';
import { mockLeaders } from '../../data/leaderboardData';

type Leader = Database['public']['Tables']['leaders']['Row'];

interface LeaderboardListProps {
  onLike: (id: string) => Promise<boolean>;
  hasLikedMap: Record<string, boolean>;
}

export const LeaderboardList = ({ onLike, hasLikedMap }: LeaderboardListProps) => {
  const leaders = mockLeaders.sort((a, b) => b.likes - a.likes);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="px-2 py-4"
    >
      <AnimatePresence mode="popLayout">
        {leaders.map((leader, index) => (
          <LeaderboardCard
            key={leader.id}
            leader={leader}
            rank={index + 1}
            onLike={() => onLike(leader.id)}
            hasLiked={hasLikedMap[leader.id] || false}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
