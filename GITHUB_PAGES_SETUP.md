# 🚀 GitHub Pages 部署配置

## 问题诊断

错误提示：`Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream".`

这是因为 GitHub Pages 没有正确配置dist文件夹。

---

## ✅ 已完成的修复

1. ✅ 配置了 Vite 的 `base: '/hangzhou-exhibition/'`
2. ✅ 构建成功（dist 文件夹已生成）
3. ✅ 代码已推送到 GitHub

---

## 📋 GitHub Pages 配置步骤

### 第一步：修改 GitHub Pages Source

1. 打开：**https://github.com/doyourbestt/hangzhou-exhibition/settings/pages**

2. 在 **Build and deployment** 部分：
   - **Source**: 选择 **GitHub Actions**

3. 点击 **Save**

---

### 第二步：创建 GitHub Actions 配置

GitHub 会自动检测并运行构建。

或者，你也可以手动配置：

1. 在仓库根目录创建文件夹：`.github/workflows/`

2. 创建文件：`.github/workflows/deploy.yml`

3. 复制以下内容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          destination_dir: ./
```

---

### 第三步：等待部署

1. 访问 **Actions** 标签页查看部署状态
2. 等待 "Deploy to GitHub Pages" workflow 完成
3. 约 2-3 分钟后，网站将上线

---

## 🌐 网站地址

部署完成后，访问：
**https://doyourbestt.github.io/hangzhou-exhibition/**

---

## ⚠️ 重要提醒

现在 GitHub Pages Source 设置为 **GitHub Actions**，所以：

- 每次推送代码到 main 分支，GitHub Actions 会自动构建
- 构建产物（dist文件夹）会自动部署
- 不需要手动构建或管理 dist 文件夹

---

## 🔍 验证部署

1. 访问 **Actions** 标签页
2. 查看是否有 "Deploy to GitHub Pages" workflow
3. 点击最新的 workflow，查看是否成功
4. 成功后，网站应该可以在 **https://doyourbestt.github.io/hangzhou-exhibition/** 访问

---

## ❓ 常见问题

### 问题 1：Actions 没有自动运行

**解决方法**：
1. 检查代码是否推送到 main 分支
2. 检查 .github/workflows/deploy.yml 文件是否存在
3. 点击 "Run workflow" 手动触发

### 问题 2：构建失败

**解决方法**：
1. 查看 Actions 日志中的错误信息
2. 修复代码后重新推送

### 问题 3：网站仍然是 404

**解决方法**：
1. 确认 GitHub Pages 设置为 **GitHub Actions**
2. 确认 Actions workflow 已成功完成
3. 等待 2-3 分钟让 GitHub 缓存更新

---

**准备好部署了吗？开始吧！🚀**
