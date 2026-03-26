import { AnimatePresence, motion } from 'framer-motion';
import { mockLeaders } from '../../data/leaderboardData';
import { LeaderboardCard } from './LeaderboardCard';

interface LeaderboardListProps {
  leaders: any[];
  onLike: (leaderId: string) => void;
  hasLikedLeader: (leaderId: string) => boolean;
}

export const LeaderboardList = ({ leaders, onLike, hasLikedLeader }: LeaderboardListProps) => {
  const displayLeaders = leaders.length > 0 ? leaders : mockLeaders;
  const sortedLeaders = [...displayLeaders].sort((a, b) => b.likes - a.likes);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="px-2 py-4"
    >
      <AnimatePresence mode="popLayout">
        {sortedLeaders.map((leader, index) => (
          <LeaderboardCard
            key={leader.id}
            leader={leader}
            rank={index + 1}
            hasLiked={hasLikedLeader(leader.id)}
            onLike={() => onLike(leader.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
