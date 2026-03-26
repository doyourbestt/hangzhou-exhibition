# 🚀 快速部署指南

## 5分钟快速上手 Supabase 多人数据同步

### 当前状态
⚠️ **系统目前使用本地演示数据，未连接真实数据库**

要实现多人实时数据共享，请按以下步骤操作：

---

## 📋 第一步：创建 Supabase 项目（约2分钟）

1. 打开 [supabase.com](https://supabase.com)
2. 点击 **"Start your project"** 或 **"New Project"**
3. 填写项目信息：
   - Organization: 选择或创建组织
   - Name: `hangzhou-exhibition` (或其他名称)
   - Database Password: 设置强密码（记住它！）
   - Region: 选择离你最近的区域（如 `Northeast Asia`）
4. 点击 **"Create new project"**
5. ⏱️ 等待约2分钟，项目创建完成

---

## 🔑 第二步：获取凭证（约1分钟）

项目创建完成后：

1. 在左侧菜单点击 **Settings** (⚙️)
2. 点击 **API**
3. 找到 **Project API keys** 部分
4. 复制以下两个值：

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> 💡 **提示**: anon key 是公开的，可以安全地在前端使用

---

## ⚙️ 第三步：配置环境变量（约1分钟）

1. 在项目根目录创建新文件：**`.env`**

2. 粘贴以下内容，替换为你的凭证：

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

**示例：**
```env
VITE_SUPABASE_URL=https://abc123xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYzEyM3h5eiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ1MTkyMD...
```

3. **保存文件**

---

## 🗄️ 第四步：初始化数据库（约2分钟）

### 方法一：使用 SQL Editor（推荐）

1. 在 Supabase Dashboard 左侧菜单点击 **SQL Editor**
2. 点击 **New Query** 按钮
3. 打开文件 `supabase/schema.sql`
4. 复制所有内容
5. 粘贴到 Supabase SQL Editor
6. 点击 **Run** (▶️) 按钮
7. 等待执行完成（会看到绿色 ✓）

### 方法二：使用 Table Editor

如果你更喜欢图形界面：

1. 点击左侧菜单 **Table Editor**
2. 点击 **New table**
3. 创建 `users` 表：
   ```sql
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     invite_code TEXT NOT NULL,
     nickname TEXT NOT NULL,
     avatar TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
4. 创建 `leaders` 表：
   ```sql
   CREATE TABLE leaders (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     name TEXT NOT NULL,
     avatar TEXT NOT NULL,
     likes INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
5. 创建 `like_records` 表：
   ```sql
   CREATE TABLE like_records (
     id BIGSERIAL PRIMARY KEY,
     odler_id UUID NOT NULL REFERENCES leaders(id),
     user_id UUID NOT NULL REFERENCES users(id),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(odler_id, user_id)
   );
   ```
6. 点击 **Insert rows** 添加演示数据

---

## 📊 第五步：插入演示数据

在 SQL Editor 中运行以下命令：

```sql
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
```

---

## 🔌 第六步：启用实时订阅

### 在 Supabase Dashboard 中：

1. 进入 **Database** → **Replication**
2. 在 **Source tables** 部分
3. 找到 `leaders` 表，点击启用 ✓
4. 找到 `like_records` 表，点击启用 ✓

### 或在 SQL Editor 中运行：

```sql
-- 启用实时订阅
ALTER PUBLICATION supabase_realtime ADD TABLE leaders;
ALTER PUBLICATION supabase_realtime ADD TABLE like_records;
```

---

## 🎉 第七步：重启应用

1. 停止当前的开发服务器（Ctrl + C）
2. 重新启动：
```bash
npm run dev
```

3. 打开浏览器访问：`http://localhost:5173/`

4. ✨ **成功标志**：
   - 页面正常加载
   - 显示领队列表（带点赞数）
   - 可以正常登录和点赞

---

## 🧪 测试多人同步

要测试实时同步功能：

### 步骤 1：用户 A 操作
1. 打开浏览器A，访问 `http://localhost:5173/`
2. 登录（填写邀请码和昵称）
3. 点击某个队长的点赞按钮
4. 看到该队长点赞数 +1

### 步骤 2：用户 B 验证
1. 打开浏览器B（可以使用无痕模式）
2. 访问 `http://localhost:5173/`
3. 用不同的昵称登录
4. ✅ **应该看到**：该队长的点赞数已经更新
5. ✅ **应该看到**：用户 A 点赞的队长在"我的支持"中

### 步骤 3：实时更新测试
1. 用户 A 和用户 B 同时在线
2. 用户 A 点赞某个队长
3. ✅ **应该看到**：用户 B 的页面立即自动更新点赞数（无需刷新）

---

## 🐛 常见问题排查

### 问题 1：页面加载失败或白屏

**可能原因**：环境变量未配置或配置错误

**解决方法**：
1. 确认 `.env` 文件存在且内容正确
2. 检查 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY` 是否正确
3. 重启开发服务器

### 问题 2：登录后报错

**可能原因**：数据库表未创建或 RLS 策略未配置

**解决方法**：
1. 确认已在 Supabase SQL Editor 中运行了 `schema.sql`
2. 检查 Tables 列表中是否有 `users`、`leaders`、`like_records` 三张表
3. 确认 RLS 策略已添加

### 问题 3：点赞后数据不更新

**可能原因**：实时订阅未启用

**解决方法**：
1. 进入 **Database** → **Replication**
2. 确认 `leaders` 和 `like_records` 表已启用实时复制
3. 或者运行 SQL 命令启用

### 问题 4：数据未同步

**可能原因**：网络问题或浏览器缓存

**解决方法**：
1. 刷新页面（F5）
2. 检查网络连接
3. 清除浏览器缓存
4. 尝试不同的浏览器

---

## 📚 更多资源

### Supabase 文档
- [官方文档](https://supabase.com/docs)
- [实时订阅指南](https://supabase.com/docs/guides/realtime)
- [数据库指南](https://supabase.com/docs/guides/database)

### 项目文档
- 查看 `src/README.md` 了解完整项目架构
- 查看 `supabase/schema.sql` 查看完整数据库结构
- 查看 `src/services/leaderboardService.ts` 查看 API 实现

---

## 🎯 下一步

恭喜！你的应用现在支持多人实时数据同步了！

### 可以尝试的功能：
1. ✅ 多用户同时点赞
2. ✅ 实时更新点赞数
3. ✅ 排名自动重排
4. ✅ 查看"我的支持"列表

### 可选的增强功能：
1. 🔧 添加用户头像上传
2. 🔧 实现点赞排行榜
3. 🔧 添加活动时间限制
4. 🔧 实现管理员后台
5. 🔧 添加数据统计功能

---

## 💡 小贴士

### 开发环境 vs 生产环境
- **开发环境**：`npm run dev`（使用 Vite 开发服务器）
- **生产环境**：`npm run build`（构建优化后的静态文件）

### 数据库安全
- ✅ 已启用 RLS (Row Level Security)
- ✅ 使用 anon key，不暴露数据库密码
- ⚠️ 如需更高安全性，可添加更多 RLS 策略

### 性能优化
- ✅ 使用 Supabase CDN 加速
- ✅ 启用实时订阅，减少轮询
- ✅ 本地缓存用户信息

---

**遇到问题？别担心！** 
- 查看 README.md 的故障排除部分
- 检查 Supabase Dashboard 的状态
- 确认所有步骤都已执行

祝你使用愉快！🎨✨
