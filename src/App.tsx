import { useState } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { MySupportsPage } from './components/my-support/MySupportsPage';
import { BottomTab } from './components/navigation/BottomTab';

type TabType = 'leaderboard' | 'my-supports';

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [leaders, setLeaders] = useState<any[]>([]);
  const [userLikedIds, setUserLikedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('leaderboard');

  const handleLogin = (inviteCode: string, nickname: string) => {
    setCurrentUser({
      id: 'user_' + Date.now(),
      inviteCode,
      nickname,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
      createdAt: Date.now(),
    });
  };

  const handleLike = (leaderId: string) => {
    if (!currentUser) return;
    setUserLikedIds(prev => [...prev, leaderId]);
    setLeaders(prev => {
      const updated = prev.map(l => l.id === leaderId ? { ...l, likes: l.likes + 1 } : l);
      return updated.sort((a, b) => b.likes - a.likes);
    });
  };

  const hasLikedLeader = (leaderId: string) => userLikedIds.includes(leaderId);

  const likedLeaders = leaders.filter(l => userLikedIds.includes(l.id));

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {activeTab === 'leaderboard' ? (
        <LeaderboardPage
          leaders={leaders}
          onLike={handleLike}
          hasLikedLeader={hasLikedLeader}
        />
      ) : (
        <MySupportsPage
          likedLeaders={likedLeaders}
          currentUser={currentUser}
          totalSupports={likedLeaders.length}
        />
      )}
      
      <BottomTab
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
}

export default App;
