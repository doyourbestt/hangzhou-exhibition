import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LoginPage } from './components/auth/LoginPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { MySupportsPage } from './components/my-support/MySupportsPage';
import { BottomTab } from './components/navigation/BottomTab';
import { leaderboardService, getLocalUserId, saveLocalUserId } from './services/leaderboardService';
import type { Database } from './types/database';

type TabType = 'leaderboard' | 'my-supports';

type User = Database['public']['Tables']['users']['Row'];
type Leader = Database['public']['Tables']['leaders']['Row'];

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [userLikedIds, setUserLikedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('leaderboard');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const initApp = async () => {
      try {
        const localUserId = getLocalUserId();
        
        if (localUserId) {
          try {
            const user = await leaderboardService.getUser(localUserId);
            if (user) {
              setCurrentUser(user);
              
              const likedIds = await leaderboardService.getUserLikeRecords(localUserId);
              setUserLikedIds(likedIds);
            }
          } catch (error) {
            console.warn('Failed to get user from server, using local cache');
          }
        }

        try {
          const leadersData = await leaderboardService.getLeaders();
          setLeaders(leadersData);

          const unsubscribe = leaderboardService.subscribeToLeaderChanges((updatedLeaders) => {
            setLeaders(updatedLeaders);
          });

          setIsLoading(false);

          return () => {
            unsubscribe();
          };
        } catch (error) {
          console.warn('Failed to fetch leaders, using demo data');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  const handleLogin = useCallback(async (inviteCode: string, nickname: string) => {
    try {
      const localUserId = getLocalUserId();
      const user = await leaderboardService.createOrGetUser(inviteCode, nickname, localUserId || undefined);
      
      saveLocalUserId(user.id);
      setCurrentUser(user);
      
      const likedIds = await leaderboardService.getUserLikeRecords(user.id);
      setUserLikedIds(likedIds);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error?.message || '登录失败，请检查网络连接');
    }
  }, []);

  const handleLike = useCallback(async (leaderId: string): Promise<boolean> => {
    if (!currentUser) return false;

    try {
      const result = await leaderboardService.likeLeader(leaderId, currentUser.id);
      
      if (result.success) {
        setUserLikedIds(prev => [...prev, leaderId]);
        
        setLeaders(prevLeaders => {
          const updatedLeaders = prevLeaders.map(leader =>
            leader.id === leaderId
              ? { ...leader, likes: leader.likes + 1 }
              : leader
          );
          return updatedLeaders.sort((a, b) => b.likes - a.likes);
        });
        
        return true;
      } else {
        console.warn(result.error);
        return false;
      }
    } catch (error) {
      console.error('Error liking leader:', error);
      return false;
    }
  }, [currentUser]);

  const hasLikedLeader = useCallback((leaderId: string): boolean => {
    return userLikedIds.includes(leaderId);
  }, [userLikedIds]);

  const likedLeaders = useMemo(() => {
    if (!currentUser) return [];
    return leaders.filter(leader => userLikedIds.includes(leader.id));
  }, [currentUser, leaders, userLikedIds]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-warm-white to-soft-cream flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-gentle-coral border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-sm text-gray-500 mb-2">
            {isOnline ? '正在连接服务器...' : '离线模式'}
          </p>
          {!isOnline && (
            <p className="text-xs text-orange-500">
              请检查网络连接
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 px-4 z-50 text-sm"
        >
          当前处于离线模式，数据可能不是最新的
        </motion.div>
      )}
      
      {activeTab === 'leaderboard' ? (
        <LeaderboardPage
          hasLikedLeader={hasLikedLeader}
          onLike={handleLike}
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
