-- ============================================
-- Supabase 数据库初始化脚本
-- 艺起逛杭州 - 领队队长点赞榜
-- ============================================

-- 1. 创建 users 表
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_code TEXT NOT NULL,
  nickname TEXT NOT NULL,
  avatar TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建 leaders 表
CREATE TABLE IF NOT EXISTS leaders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建 like_records 表
CREATE TABLE IF NOT EXISTS like_records (
  id BIGSERIAL PRIMARY KEY,
  odler_id UUID NOT NULL REFERENCES leaders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(odler_id, user_id)
);

-- 4. 创建索引
CREATE INDEX IF NOT EXISTS idx_like_records_user_id ON like_records(user_id);
CREATE INDEX IF NOT EXISTS idx_like_records_odler_id ON like_records(odler_id);
CREATE INDEX IF NOT EXISTS idx_leaders_likes ON leaders(likes DESC);

-- 5. 启用实时订阅
ALTER PUBLICATION supabase_realtime ADD TABLE like_records;
ALTER PUBLICATION supabase_realtime ADD TABLE leaders;

-- 6. 创建 RPC 函数：增加点赞数
CREATE OR REPLACE FUNCTION increment_likes(leader_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE leaders SET likes = likes + 1 WHERE id = leader_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. 创建 RPC 函数：获取点赞数
CREATE OR REPLACE FUNCTION get_likes_count(leader_id UUID)
RETURNS INTEGER AS $$
DECLARE
  like_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO like_count FROM like_records WHERE odler_id = leader_id;
  RETURN like_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 初始化演示数据
-- ============================================

-- 插入领队数据
INSERT INTO leaders (name, avatar, likes) VALUES
  ('西湖漫游队长', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', 156),
  ('艺术散步领队', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna', 142),
  ('杭州灵感捕手', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max', 128),
  ('运河观察员', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria', 115),
  ('美术馆引路人', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo', 98),
  ('湖畔策展同行者', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia', 87),
  ('城市步履领队', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar', 76),
  ('展馆灵感导览员', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie', 65),
  ('南山路漫步者', 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', 54),
  ('龙井茶语向导', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', 43);

-- ============================================
-- Row Level Security (RLS) 配置
-- ============================================

-- 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE like_records ENABLE ROW LEVEL SECURITY;

-- users 表策略：所有人可读取，只有本人可更新
CREATE POLICY "Allow public read on users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert on users" ON users FOR INSERT WITH CHECK (true);

-- leaders 表策略：所有人可读取和更新点赞
CREATE POLICY "Allow public read on leaders" ON leaders FOR SELECT USING (true);
CREATE POLICY "Allow public update on leaders" ON leaders FOR UPDATE USING (true);

-- like_records 表策略：所有人可读取和插入
CREATE POLICY "Allow public read on like_records" ON like_records FOR SELECT USING (true);
CREATE POLICY "Allow public insert on like_records" ON like_records FOR INSERT WITH CHECK (true);
