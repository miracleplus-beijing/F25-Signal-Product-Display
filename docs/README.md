# 奇绩信号 - 静态网站

## 项目简介

奇绩信号静态网站，用于展示研究体系和产品矩阵。

## 文件结构

```
frontend/
├── index.html              # 主页
├── research.html           # 研究体系页
├── products.html           # 产品体系页
├── css/
│   ├── main.css           # 全局样式
│   ├── index.css          # 首页样式
│   ├── research.css       # 研究页样式
│   └── products.css       # 产品页样式
├── js/
│   └── main.js            # 交互脚本
└── assets/
    └── images/
        └── logo.png       # 奇绩Logo
```

## 本地预览

### 方法一：直接打开（推荐用于快速预览）
双击 `frontend/index.html` 文件，在浏览器中打开。

### 方法二：使用本地服务器（推荐）

**使用 Python：**
```bash
cd frontend
python -m http.server 8000
# 访问 http://localhost:8000
```

**使用 Node.js：**
```bash
cd frontend
npx http-server -p 8000
# 访问 http://localhost:8000
```

**使用 VS Code Live Server：**
1. 安装 Live Server 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## GitHub Pages 部署

### 方案一：独立仓库部署（推荐）

1. **创建新仓库：**
   - 仓库名：`miracleplus-signal.github.io`
   - 公开仓库

2. **上传文件：**
   ```bash
   # 将 frontend 文件夹内容复制到新仓库根目录
   cd miracleplus-signal.github.io
   cp -r ../F25-Signal-Display/frontend/* .
   git add .
   git commit -m "初始化奇绩信号网站"
   git push
   ```

3. **访问网站：**
   - 网址：`https://miracleplus-signal.github.io`

### 方案二：当前仓库 docs 文件夹部署

1. **复制文件到 docs：**
   ```bash
   # 如果还没有 docs 文件夹
   mkdir docs
   cp -r frontend/* docs/
   ```

2. **GitHub 仓库设置：**
   - 进入仓库 Settings > Pages
   - Source 选择：Deploy from a branch
   - Branch 选择：main/master → /docs
   - 保存

3. **访问网站：**
   - 网址：`https://[username].github.io/F25-Signal-Display`

### 方案三：使用 frontend 文件夹部署

1. **GitHub 仓库设置：**
   - 进入仓库 Settings > Pages
   - Source 选择：Deploy from a branch
   - Branch 选择：main/master → /frontend
   - 保存

2. **访问网站：**
   - 网址：`https://[username].github.io/F25-Signal-Display`

## 设计规范

本项目严格遵循 `CLAUDE.md` 中的设计规范：

- **信息减法：** 杜绝冗余，精炼表达
- **视觉聚焦：** 信息优先，突出核心
- **模块化：** 清晰的信息归类和间距
- **规则化：** 统一对齐，边界规整
- **极简风格：** 白底、奇绩蓝点缀、最多三种颜色

### 颜色方案
- 主背景：`#FFFFFF`
- 主文字：`#1A1A1A`
- 次要文字：`#555555`
- 奇绩蓝：`#0052FF`
- 边框：`#E0E0E0`

### 字体
- 中文：PingFang SC
- 英文：Helvetica Neue, Arial
- 无衬线字体

## 功能特性

### 首页 (index.html)
- 垂直居中布局
- Logo + 核心 Slogan
- 双卡片导航（研究体系、产品体系）
- 资源展示

### 研究体系页 (research.html)
- 高保真复现架构图
- 研究方向展示
- 赋能方向详解
- 响应式布局

### 产品体系页 (products.html)
- 网格布局产品矩阵
- "即将开放"状态提示
- 卡片悬停效果
- 占位链接管理

## 交互功能

- ✅ 平滑页面导航
- ✅ "即将开放"产品点击提示
- ✅ 响应式移动端适配
- ✅ 卡片悬停动画
- ✅ 页面加载动画

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- 移动端浏览器
- 微信内置浏览器

## 更新内容

### 如何添加新产品

编辑 `products.html`，在 `products-grid` 中添加新卡片：

```html
<div class="product-card" data-status="coming-soon">
    <div class="product-content">
        <h3 class="product-title">新产品名称</h3>
        <p class="product-description">产品描述</p>
        <div class="product-action">
            <span class="product-link">查看详情 →</span>
        </div>
    </div>
    <div class="product-status">即将开放</div>
</div>
```

### 如何添加实际链接

将 `data-status="coming-soon"` 改为实际链接：

```html
<a href="实际链接地址" class="product-card" target="_blank">
    <!-- 卡片内容 -->
</a>
```

### 如何更新研究内容

编辑 `research.html`，在对应的 section 中添加或修改内容。

## 性能优化

- ✅ 无外部依赖，加载速度快
- ✅ CSS 动画使用 transform，性能优良
- ✅ 图片已压缩优化
- ✅ 代码结构清晰，易于维护

## 待办事项

- [ ] 添加 favicon
- [ ] 接入实际产品链接
- [ ] 添加 SEO meta 标签优化
- [ ] 添加 Google Analytics（可选）
- [ ] 支持自定义域名

## 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub Issues
- 奇绩创坛官方渠道

---

**最后更新：** 2025-11-14
**版本：** v1.0.0
