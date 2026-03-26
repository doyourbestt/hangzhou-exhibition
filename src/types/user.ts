export interface User {
  id: string;
  inviteCode: string;
  nickname: string;
  avatar?: string;
  createdAt: number;
}

export interface LikeRecord {
  odlerId: string;
  userId: string;
  createdAt: number;
}

export interface StoredData {
  currentUser: User | null;
  likeRecords: LikeRecord[];
  leaderboard: Leader[];
}

export interface Leader {
  id: string;
  name: string;
  avatar: string;
  likes: number;
}
