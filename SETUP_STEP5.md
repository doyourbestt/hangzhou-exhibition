# 🔧 第五步：初始化数据库（详细图文教程）

## 操作步骤

### 1. 打开 Supabase Dashboard

访问你的 Supabase 项目页面：
👉 **https://supabase.com/dashboard**

你应该能看到你的项目 `hcwylnwfnuezfyqotmle`

---

### 2. 进入 SQL Editor

在左侧菜单中找到 **SQL Editor**（图标是一个代码窗口）

```
左侧菜单结构：
├── Project Settings
├── Authentication
├── Database              ← 点击这个
│   ├── Tables
│   ├── SQL Editor       ← ⭐ 点击这里
│   └── Replication
├── API
└── Storage
```

---

### 3. 创建新查询

点击 **New Query** 按钮（右上角，蓝色按钮）

---

### 4. 粘贴 SQL 脚本

现在你需要把 `supabase/schema.sql` 文件的内容粘贴进去

**方法一：手动复制粘贴**

打开文件 `d:\MyProject\个人IP\web_project\exhibition\supabase\schema.sql`

复制全部内容，粘贴到 Supabase 的 SQL Editor 中

---

### 5. 执行 SQL

点击 **Run** 按钮（▶️）或按快捷键 `Ctrl + Enter`

---

### 6. 等待执行完成

⏱️ 执行过程大约需要 **10-30 秒**

看到 ✅ **Success** 绿色提示即为成功！

---

## 📋 需要执行的具体内容

你的 SQL Editor 中应该包含以下 SQL 语句：

### 第一部分：创建表

```sql
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
```

### 第二部分：创建索引

```sql
-- 4. 创建索引
CREATE INDEX IF NOT EXISTS idx_like_records_user_id ON like_records(user_id);
CREATE INDEX IF NOT EXISTS idx_like_records_odler_id ON like_records(odler_id);
CREATE INDEX IF NOT EXISTS idx_leaders_likes ON leaders(likes DESC);
```

### 第三部分：启用实时订阅

```sql
-- 5. 启用实时订阅
ALTER PUBLICATION supabase_realtime ADD TABLE like_records;
ALTER PUBLICATION supabase_realtime ADD TABLE leaders;
```

### 第四部分：创建存储过程

```sql
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
```

### 第五部分：插入演示数据

```sql
-- 8. 插入领队数据
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
```

### 第六部分：配置安全策略

```sql
-- 9. 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE like_records ENABLE ROW LEVEL SECURITY;

-- 10. users 表策略
CREATE POLICY "Allow public read on users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert on users" ON users FOR INSERT WITH CHECK (true);

-- 11. leaders 表策略
CREATE POLICY "Allow public read on leaders" ON leaders FOR SELECT USING (true);
CREATE POLICY "Allow public update on leaders" ON leaders FOR UPDATE USING (true);

-- 12. like_records 表策略
CREATE POLICY "Allow public read on like_records" ON like_records FOR SELECT USING (true);
CREATE POLICY "Allow public insert on like_records" ON like_records FOR INSERT WITH CHECK (true);
```

---

## ✅ 验证是否成功

### 方法一：查看 Tables

1. 左侧菜单点击 **Database** → **Tables**
2. 你应该能看到以下 3 张表：
   - ✅ `users`
   - ✅ `leaders`
   - ✅ `like_records`

### 方法二：查看 leaders 数据

1. 点击 **leaders** 表
2. 点击 **Insert rows** 查看
3. 你应该能看到 10 条领队数据

### 方法三：在 SQL Editor 中查询

```sql
-- 查询所有领队
SELECT * FROM leaders ORDER BY likes DESC;
```

运行后应该看到 10 条数据，按点赞数从高到低排列。

---

## 🔄 重启应用

执行完 SQL 后，重启开发服务器：

1. 停止当前服务器（终端按 `Ctrl + C`）
2. 重新启动：
```bash
npm run dev
```
3. 打开浏览器访问：`http://localhost:5173/`

---

## 🧪 测试功能

### 测试 1：查看榜单
- ✅ 应该看到 10 位领队
- ✅ 点赞数应该显示

### 测试 2：用户登录
- ✅ 填写邀请码和昵称
- ✅ 登录成功

### 测试 3：点赞功能
- ✅ 点击心形图标
- ✅ 点赞数 +1
- ✅ 按钮变为绿色"已支持"

---

## 🎉 恭喜完成！

如果所有测试都通过，恭喜你！

现在你的应用已经连接到了 Supabase 数据库，所有数据都会实时同步给所有用户。

---

## 🆘 如果遇到问题

### 问题：SQL 执行报错

**可能原因**：表已存在

**解决方法**：把 `CREATE TABLE IF NOT EXISTS` 开头的语句单独运行，或者删除已存在的表后重新创建

### 问题：找不到 SQL Editor

**可能原因**：界面语言不同

**解决方法**：在左侧菜单找到类似代码窗口的图标，通常在 Database 部分下方

### 问题：权限不足

**可能原因**：不是项目所有者

**解决方法**：需要项目所有者或管理员来执行这些操作

---

**准备好开始了吗？** 
打开 https://supabase.com/dashboard 并进入 SQL Editor 吧！🚀
