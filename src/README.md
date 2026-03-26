# 艺起逛杭州 - 领队队长点赞榜

## 🎉 功能特性

### 已实现功能

#### 1. **轻登录系统**
- ✅ 填写活动邀请码/参展码
- ✅ 填写群昵称
- ✅ 自动生成用户头像
- ✅ 验证规则：邀请码至少4字符，昵称至少2字符

#### 2. **点赞系统**
- ✅ 每个用户对每个队长只能点赞一次
- ✅ 点赞后按钮变为"已支持"状态（绿色✓）
- ✅ 点赞后不可取消
- ✅ 数据持久化存储到 Supabase

#### 3. **实时数据同步**
- ✅ 所有用户共享同一份数据
- ✅ 实时更新点赞数和排名
- ✅ 多人同时在线，互不影响
- ✅ 使用 Supabase Realtime 实时订阅

#### 4. **我的支持页面**
- ✅ 展示当前用户头像和昵称
- ✅ 显示已支持队长数量
- ✅ 列出所有已支持的领队
- ✅ 空状态引导提示

#### 5. **离线状态处理**
- ✅ 实时检测网络状态
- ✅ 离线时显示提示横幅
- ✅ 本地缓存用户ID

---

## 🚀 Supabase 部署指南

### 第一步：创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 注册/登录账号
3. 点击 "New Project" 创建新项目
4. 等待项目创建完成（约2分钟）

### 第二步：获取项目凭证

1. 进入项目 Dashboard
2. 点击左侧菜单 **Settings** → **API**
3. 复制以下信息：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGciOiJIUzI1NiIs...`

### 第三步：配置环境变量

1. 在项目根目录创建 `.env` 文件：
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. 或者复制 `.env.example` 为 `.env` 并填入凭证

### 第四步：初始化数据库

1. 进入 Supabase Dashboard
2. 点击左侧菜单 **SQL Editor**
3. 点击 **New Query**
4. 复制 `supabase/schema.sql` 文件中的所有内容
5. 粘贴到 SQL Editor 并点击 **Run**
6. 等待执行完成

### 第五步：启用实时订阅

在 Supabase Dashboard 中：

1. 进入 **Database** → **Replication**
2. 找到 `leaders` 和 `like_records` 表
3. 启用这两张表的实时复制

或者在 SQL Editor 中运行：
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE leaders;
ALTER PUBLICATION supabase_realtime ADD TABLE like_records;
```

### 第六步：验证部署

1. 重启开发服务器：
```bash
npm run dev
```

2. 打开浏览器访问：`http://localhost:5173/`

3. 测试流程：
   - 用户A登录 → 支持某队长
   - 用户B登录 → 看到队长点赞数+1
   - 用户A刷新页面 → "我的支持"中显示已支持的队长

---

## 📱 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

---

## 🏗️ 项目架构

```
src/
├── components/
│   ├── auth/
│   │   └── LoginPage.tsx          # 轻登录页面
│   ├── leaderboard/
│   │   ├── HeaderSection.tsx       # 顶部活动信息
│   │   ├── LeaderboardList.tsx     # 榜单列表
│   │   ├── LeaderboardCard.tsx     # 单个卡片
│   │   ├── LikeButton.tsx          # 点赞按钮
│   │   └── TopRankBadge.tsx        # 前三名徽章
│   ├── my-support/
│   │   └── MySupportsPage.tsx      # 我的支持页面
│   └── navigation/
│       └── BottomTab.tsx           # 底部导航栏
├── lib/
│   └── supabase.ts                 # Supabase 客户端配置
├── services/
│   └── leaderboardService.ts       # 数据服务层
├── types/
│   ├── database.ts                  # 数据库类型定义
│   └── user.ts                     # 用户类型定义
├── data/
│   └── leaderboardData.ts          # 演示数据
└── App.tsx                         # 主应用组件

supabase/
└── schema.sql                      # 数据库初始化脚本
```

---

## 🔧 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Tailwind CSS v4** - 样式系统
- **Framer Motion** - 动画库
- **Lucide React** - 图标库
- **Supabase** - 后端即服务（实时数据库）

---

## 🌟 核心特性

### 实时数据同步
- 使用 Supabase Realtime 实现毫秒级数据更新
- 当任何用户点赞时，所有在线用户立即看到变化
- 自动处理网络不稳定情况

### 数据一致性
- 每个用户对每个队长只能点赞一次
- 使用数据库唯一约束防止重复点赞
- 乐观更新 + 错误回滚机制

### 性能优化
- 本地缓存用户ID，减少网络请求
- 点赞操作乐观更新，无需等待服务器响应
- 按点赞数排序，减少客户端计算

---

## 📝 后续扩展建议

1. **用户管理增强**
   - 添加用户头像上传功能
   - 实现用户个人主页
   - 添加用户之间的互动

2. **榜单功能增强**
   - 添加时间筛选（今日/本周/本月）
   - 实现榜单数据导出
   - 添加榜单分享功能

3. **活动管理**
   - 管理员后台
   - 实时活动数据统计
   - 活动消息推送

4. **社交功能**
   - 用户留言/评论
   - 分享到社交平台
   - 邀请好友参与

---

## ⚠️ 注意事项

- 确保 Supabase 项目的 **RLS (Row Level Security)** 已正确配置
- 生产环境建议使用自定义域名
- 监控 Supabase 的使用量，避免超出免费额度
- 定期备份数据库

---

## 📞 技术支持

如遇到问题，请检查：
1. Supabase 项目是否正常运行
2. 环境变量是否正确配置
3. 数据库表是否已创建
4. RLS 策略是否正确设置

---

**祝你使用愉快！🎨**
