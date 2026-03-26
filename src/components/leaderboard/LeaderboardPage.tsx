import { HeaderSection } from './HeaderSection';
import { LeaderboardList } from './LeaderboardList';
import { FooterNote } from './FooterNote';

interface LeaderboardPageProps {
  leaders: any[];
  onLike: (leaderId: string) => void;
  hasLikedLeader: (leaderId: string) => boolean;
}

export const LeaderboardPage = ({ leaders, onLike, hasLikedLeader }: LeaderboardPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white to-soft-cream pb-20">
      <div className="max-w-md mx-auto">
        <HeaderSection />
        
        <div className="hide-scrollbar">
          <LeaderboardList 
            leaders={leaders}
            onLike={onLike}
            hasLikedLeader={hasLikedLeader}
          />
        </div>
        
        <FooterNote />
      </div>
    </div>
  );
};
