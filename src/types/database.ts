export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          invite_code: string;
          nickname: string;
          avatar: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          invite_code: string;
          nickname: string;
          avatar: string;
          created_at?: string;
        };
        Update: {
          invite_code?: string;
          nickname?: string;
          avatar?: string;
        };
      };
      leaders: {
        Row: {
          id: string;
          name: string;
          avatar: string;
          likes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          avatar: string;
          likes?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          avatar?: string;
          likes?: number;
        };
      };
      like_records: {
        Row: {
          id: number;
          odler_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          odler_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          created_at?: string;
        };
      };
    };
  };
}
