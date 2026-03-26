import { AnimatePresence } from 'framer-motion';
import { mockLeaders } from '../../data/leaderboardData';
import { LeaderboardCard } from './LeaderboardCard';

export const LeaderboardList = () => {
  const leaders = [...mockLeaders].sort((a, b) => b.likes - a.likes);

  return (
    <div className="px-4 py-3 space-y-3">
      <AnimatePresence mode="popLayout">
        {leaders.map((leader, index) => (
          <LeaderboardCard
            key={leader.id}
            leader={leader}
            rank={index + 1}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
