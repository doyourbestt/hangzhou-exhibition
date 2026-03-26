import { useState, useEffect, useCallback } from 'react';
import type { User, LikeRecord } from '../types/user';

const STORAGE_KEY = 'hangzhou_exhibition_data';

const generateUserId = (): string => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
};

interface StoredData {
  currentUser: User | null;
  likeRecords: LikeRecord[];
}

const getStoredData = (): StoredData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load stored data:', error);
  }
  return { currentUser: null, likeRecords: [] };
};

const saveStoredData = (data: StoredData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [likeRecords, setLikeRecords] = useState<LikeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = getStoredData();
    setCurrentUser(data.currentUser);
    setLikeRecords(data.likeRecords);
    setIsLoading(false);
  }, []);

  const login = useCallback((inviteCode: string, nickname: string, avatar?: string): User => {
    const user: User = {
      id: generateUserId(),
      inviteCode,
      nickname,
      avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
      createdAt: Date.now(),
    };
    
    const newData: StoredData = {
      currentUser: user,
      likeRecords: [],
    };
    
    saveStoredData(newData);
    setCurrentUser(user);
    setLikeRecords([]);
    
    return user;
  }, []);

  const logout = useCallback(() => {
    const newData: StoredData = {
      currentUser: null,
      likeRecords: [],
    };
    
    saveStoredData(newData);
    setCurrentUser(null);
    setLikeRecords([]);
  }, []);

  const addLikeRecord = useCallback((leaderId: string) => {
    if (!currentUser) return false;
    
    const hasLiked = likeRecords.some(
      record => record.odlerId === leaderId && record.userId === currentUser.id
    );
    
    if (hasLiked) return false;
    
    const newRecord: LikeRecord = {
      odlerId: leaderId,
      userId: currentUser.id,
      createdAt: Date.now(),
    };
    
    const newLikeRecords = [...likeRecords, newRecord];
    const newData: StoredData = {
      currentUser,
      likeRecords: newLikeRecords,
    };
    
    saveStoredData(newData);
    setLikeRecords(newLikeRecords);
    
    return true;
  }, [currentUser, likeRecords]);

  const hasLikedLeader = useCallback((leaderId: string): boolean => {
    if (!currentUser) return false;
    
    return likeRecords.some(
      record => record.odlerId === leaderId && record.userId === currentUser.id
    );
  }, [currentUser, likeRecords]);

  const getMyLikedLeaders = useCallback((): string[] => {
    if (!currentUser) return [];
    
    return likeRecords
      .filter(record => record.userId === currentUser.id)
      .map(record => record.odlerId);
  }, [currentUser, likeRecords]);

  return {
    currentUser,
    isLoading,
    isLoggedIn: !!currentUser,
    login,
    logout,
    addLikeRecord,
    hasLikedLeader,
    getMyLikedLeaders,
  };
};
