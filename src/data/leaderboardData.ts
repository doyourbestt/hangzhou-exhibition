export interface Leader {
  id: string;
  name: string;
  avatar: string;
  likes: number;
}

export const mockLeaders: Leader[] = [
  {
    id: '1',
    name: '西湖漫游队长',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    likes: 156,
  },
  {
    id: '2',
    name: '艺术散步领队',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    likes: 142,
  },
  {
    id: '3',
    name: '杭州灵感捕手',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    likes: 128,
  },
  {
    id: '4',
    name: '运河观察员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria',
    likes: 115,
  },
  {
    id: '5',
    name: '美术馆引路人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
    likes: 98,
  },
  {
    id: '6',
    name: '湖畔策展同行者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
    likes: 87,
  },
  {
    id: '7',
    name: '城市步履领队',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar',
    likes: 76,
  },
  {
    id: '8',
    name: '展馆灵感导览员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    likes: 65,
  },
  {
    id: '9',
    name: '西湖漫游队长',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    likes: 156,
  },
  {
    id: '10',
    name: '艺术散步领队',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    likes: 142,
  },
];

export const API_ENDPOINTS = {
  GET_LEADERBOARD: '/api/leaderboard',
  POST_LIKE: (id: string) => `/api/leaderboard/${id}/like`,
};
