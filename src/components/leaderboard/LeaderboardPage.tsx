import { useMemo } from 'react';
import type { Database } from '../../types/database';
import { HeaderSection } from './HeaderSection';
import { LeaderboardList } from './LeaderboardList';
import { FooterNote } from './FooterNote';

type Leader = Database['public']['Tables']['leaders']['Row'];

interface LeaderboardPageProps {
  hasLikedLeader: (leaderId: string) => boolean;
  onLike: (leaderId: string) => Promise<boolean>;
}

export const LeaderboardPage = ({ hasLikedLeader, onLike }: LeaderboardPageProps) => {
  const hasLikedMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    return map;
  }, []);

  const handleLike = async (id: string) => {
    await onLike(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white to-soft-cream pb-20">
      <div className="max-w-md mx-auto">
        <HeaderSection />
        
        <div className="hide-scrollbar">
          <LeaderboardList 
            onLike={handleLike}
            hasLikedMap={hasLikedMap}
          />
        </div>
        
        <FooterNote />
      </div>
    </div>
  );
};
