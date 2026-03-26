import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type User = Database['public']['Tables']['users']['Row'];
type Leader = Database['public']['Tables']['leaders']['Row'];
type LikeRecord = Database['public']['Tables']['like_records']['Row'];

const STORAGE_KEY = 'hangzhou_exhibition_user_local';

export const leaderboardService = {
  async getLeaders(): Promise<Leader[]> {
    const { data, error } = await supabase
      .from('leaders')
      .select('*')
      .order('likes', { ascending: false });

    if (error) {
      console.error('Error fetching leaders:', error);
      throw error;
    }

    return data || [];
  },

  async likeLeader(leaderId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    const { data: existing } = await supabase
      .from('like_records')
      .select('*')
      .eq('odler_id', leaderId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      return { success: false, error: '已经支持过了' };
    }

    const { error: insertError } = await supabase
      .from('like_records')
      .insert({
        odler_id: leaderId,
        user_id: userId,
      });

    if (insertError) {
      return { success: false, error: insertError.message };
    }

    const { error: updateError } = await supabase.rpc('increment_likes', {
      leader_id: leaderId,
    });

    if (updateError) {
      const { error: manualUpdateError } = await supabase
        .from('leaders')
        .update({ likes: supabase.rpc('get_likes', { leader_id: leaderId }) })
        .eq('id', leaderId);

      if (manualUpdateError) {
        console.error('Error updating likes:', manualUpdateError);
      }
    }

    return { success: true };
  },

  async checkUserLikedLeader(leaderId: string, userId: string): Promise<boolean> {
    const { data } = await supabase
      .from('like_records')
      .select('id')
      .eq('odler_id', leaderId)
      .eq('user_id', userId)
      .single();

    return !!data;
  },

  async getUserLikeRecords(userId: string): Promise<string[]> {
    const { data } = await supabase
      .from('like_records')
      .select('odler_id')
      .eq('user_id', userId);

    return data?.map(r => r.odler_id) || [];
  },

  async createOrGetUser(inviteCode: string, nickname: string, localUserId?: string): Promise<User> {
    if (localUserId) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('id', localUserId)
        .single();

      if (existingUser) {
        return existingUser;
      }
    }

    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`;
    
    const { data, error } = await supabase
      .from('users')
      .insert({
        invite_code: inviteCode,
        nickname: nickname,
        avatar: avatar,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    return data;
  },

  async getUser(userId: string): Promise<User | null> {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    return data;
  },

  subscribeToLeaderChanges(callback: (leaders: Leader[]) => void) {
    const subscription = supabase
      .channel('leaders_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaders',
        },
        async () => {
          const leaders = await this.getLeaders();
          callback(leaders);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },

  subscribeToLikeChanges(callback: (records: LikeRecord[]) => void) {
    const subscription = supabase
      .channel('likes_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'like_records',
        },
        async () => {
          const { data } = await supabase
            .from('like_records')
            .select('*')
            .order('created_at', { ascending: false });
          callback(data || []);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },
};

export const getLocalUserId = (): string | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data).userId;
    }
  } catch (error) {
    console.error('Error reading local user ID:', error);
  }
  return null;
};

export const saveLocalUserId = (userId: string): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId }));
  } catch (error) {
    console.error('Error saving local user ID:', error);
  }
};

export const clearLocalUserId = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing local user ID:', error);
  }
};
