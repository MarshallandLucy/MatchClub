# MatchClub（重建版）

这个仓库已精简为一个**独立新建项目**，代码仅保留在 `rebuild/` 目录下。

## 项目目标
- 问卷匹配推荐社团
- 查看社团详情
- 一键提交意向
- 查看已投递记录

## 当前目录
```text
.github/workflows/deploy-pages.yml   # GitHub Pages 自动部署
rebuild/                              # 新建项目（唯一业务代码目录）
README.md
.gitignore
```

## 本地运行
```bash
cd rebuild
npm install
npm run dev
```

## 构建
```bash
cd rebuild
npm run build
npm run preview
```

## GitHub Pages
工作流会自动构建 `rebuild/` 并发布 `rebuild/dist`，并注入：
- `VITE_BASE_PATH=/MatchClub/`

确保仓库 Settings → Pages 的 Source 选择 **GitHub Actions**。
