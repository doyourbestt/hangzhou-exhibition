import { useState } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { MySupportsPage } from './components/my-support/MySupportsPage';
import { BottomTab } from './components/navigation/BottomTab';

type TabType = 'leaderboard' | 'my-supports';

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
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

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {activeTab === 'leaderboard' ? (
        <LeaderboardPage />
      ) : (
        <MySupportsPage currentUser={currentUser} />
      )}
      
      <BottomTab
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
}

export default App;
