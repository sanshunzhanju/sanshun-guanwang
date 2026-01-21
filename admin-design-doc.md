# 后台管理系统设计文档

## 1. 系统架构与技术栈

### 1.1 整体架构
```
┌─────────────────────────────────────────────────────────┐
│                   前端应用 (Admin Dashboard)            │
├─────────────────────────────────────────────────────────┤
│  - React 18 + TypeScript                                │
│  - Next.js 14 (App Router)                              │
│  - Tailwind CSS                                         │
│  - Shadcn/ui (UI组件库)                                 │
│  - TanStack React Query (数据获取)                      │
│  - React Hook Form (表单处理)                           │
│  - Zod (数据验证)                                       │
│  - TinyMCE/CKEditor (富文本编辑器)                      │
│  - Framer Motion (动画效果)                              │
└───────────┬─────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway                           │
├─────────────────────────────────────────────────────────┤
│  - Next.js API Routes                                   │
│  - JWT 认证中间件                                       │
│  - CORS 配置                                            │
│  - 请求限流                                             │
└───────────┬─────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                   后端服务                               │
├─────────────────────────────────────────────────────────┤
│  - Next.js Server Components                            │
│  - Prisma ORM                                           │
│  - PostgreSQL 数据库                                    │
│  - Redis 缓存                                           │
│  - AWS S3/MinIO (媒体存储)                              │
│  - Sharp (图片处理)                                     │
└───────────┬─────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                   数据库层                               │
├─────────────────────────────────────────────────────────┤
│  - PostgreSQL 主数据库                                  │
│  - Redis 缓存数据库                                     │
│  - MinIO/S3 对象存储                                    │
└─────────────────────────────────────────────────────────┘
```

### 1.2 核心技术栈

| 分类 | 技术/框架 | 版本 | 用途 |
|------|-----------|------|------|
| 前端框架 | React | 18.2.0 | 用户界面开发 |
| 前端构建 | Next.js | 14.0.0 | 服务端渲染、路由管理 |
| 类型系统 | TypeScript | 5.2.0 | 类型安全 |
| 样式方案 | Tailwind CSS | 3.3.0 | 样式开发 |
| UI组件 | Shadcn/ui | latest | UI组件库 |
| 状态管理 | React Query | 5.0.0 | 服务端状态管理 |
| 表单处理 | React Hook Form | 7.48.0 | 表单验证和处理 |
| 数据验证 | Zod | 3.22.0 | 数据模式验证 |
| 富文本编辑器 | TinyMCE | 7.0.0 | 内容编辑 |
| 数据库 | PostgreSQL | 15.0 | 关系型数据库 |
| ORM | Prisma | 5.0.0 | 数据库访问 |
| 缓存 | Redis | 7.0 | 缓存管理 |
| 媒体存储 | MinIO | 2023.0 | 对象存储 |
| 图片处理 | Sharp | 0.32.0 | 图片处理 |
| 认证 | JWT | latest | 用户认证 |

## 2. 数据库模型设计

### 2.1 用户与权限模型

#### 用户表 (users)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 用户ID |
| username | varchar(50) | unique, not null | 用户名 |
| email | varchar(100) | unique, not null | 邮箱 |
| password_hash | varchar(255) | not null | 密码哈希 |
| nickname | varchar(50) | | 昵称 |
| avatar | varchar(255) | | 头像URL |
| role_id | uuid | foreign key | 角色ID |
| status | boolean | not null, default true | 状态 |
| last_login_at | timestamp | | 最后登录时间 |
| created_at | timestamp | not null, default now() | 创建时间 |
| updated_at | timestamp | not null, default now() | 更新时间 |

#### 角色表 (roles)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 角色ID |
| name | varchar(50) | unique, not null | 角色名称 |
| description | text | | 角色描述 |
| created_at | timestamp | not null, default now() | 创建时间 |
| updated_at | timestamp | not null, default now() | 更新时间 |

#### 权限表 (permissions)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 权限ID |
| name | varchar(50) | unique, not null | 权限名称 |
| code | varchar(50) | unique, not null | 权限编码 |
| description | text | | 权限描述 |
| created_at | timestamp | not null, default now() | 创建时间 |

#### 角色权限关联表 (role_permissions)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| role_id | uuid | foreign key | 角色ID |
| permission_id | uuid | foreign key | 权限ID |
| primary key (role_id, permission_id) | | | 复合主键 |

### 2.2 核心业务模型

#### 模块表 (modules)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 模块ID |
| name | varchar(100) | unique, not null | 模块名称 |
| code | varchar(50) | unique, not null | 模块编码 |
| description | text | | 模块描述 |
| icon | varchar(50) | | 模块图标 |
| parent_id | uuid | foreign key | 父模块ID |
| order | integer | not null, default 0 | 排序 |
| status | boolean | not null, default true | 状态 |
| created_at | timestamp | not null, default now() | 创建时间 |
| updated_at | timestamp | not null, default now() | 更新时间 |

#### 内容表 (contents)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 内容ID |
| title | varchar(255) | not null | 标题 |
| slug | varchar(255) | unique, not null | URL别名 |
| content | text | | 内容 |
| summary | text | | 摘要 |
| module_id | uuid | foreign key | 所属模块 |
| status | varchar(20) | not null, default 'draft' | 状态 (draft/published/archived) |
| view_count | integer | not null, default 0 | 浏览量 |
| created_by | uuid | foreign key | 创建者 |
| updated_by | uuid | foreign key | 更新者 |
| published_at | timestamp | | 发布时间 |
| created_at | timestamp | not null, default now() | 创建时间 |
| updated_at | timestamp | not null, default now() | 更新时间 |

#### 内容版本表 (content_versions)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 版本ID |
| content_id | uuid | foreign key | 关联内容ID |
| title | varchar(255) | not null | 标题 |
| content | text | | 内容 |
| summary | text | | 摘要 |
| version | integer | not null | 版本号 |
| created_by | uuid | foreign key | 创建者 |
| created_at | timestamp | not null, default now() | 创建时间 |

#### 媒体表 (media)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 媒体ID |
| name | varchar(255) | not null | 文件名 |
| original_name | varchar(255) | not null | 原始文件名 |
| path | varchar(255) | not null | 存储路径 |
| url | varchar(255) | not null | 访问URL |
| size | bigint | not null | 文件大小 |
| mime_type | varchar(100) | not null | MIME类型 |
| width | integer | | 图片宽度 |
| height | integer | | 图片高度 |
| category | varchar(50) | | 分类 |
| tags | text[] | | 标签 |
| created_by | uuid | foreign key | 上传者 |
| created_at | timestamp | not null, default now() | 创建时间 |
| updated_at | timestamp | not null, default now() | 更新时间 |

#### 产品分类表 (product_categories)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 分类ID |
| name | varchar(100) | not null | 分类名称 |
| slug | varchar(100) | unique, not null | URL别名 |
| parent_id | uuid | foreign key | 父分类ID |
| order | integer | not null, default 0 | 排序 |
| status | boolean | not null, default true | 状态 |
| created_at | timestamp | not null, default now() | 创建时间 |
| updated_at | timestamp | not null, default now() | 更新时间 |

#### 产品表 (products)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 产品ID |
| sku | varchar(50) | unique, not null | SKU |
| name | varchar(255) | not null | 产品名称 |
| slug | varchar(255) | unique, not null | URL别名 |
| description | text | | 产品描述 |
| category_id | uuid | foreign key | 分类ID |
| price | decimal(10,2) | not null | 价格 |
| original_price | decimal(10,2) | | 原价 |
| stock | integer | not null, default 0 | 库存 |
| status | varchar(20) | not null, default 'draft' | 状态 (draft/published/archived) |
| is_hot | boolean | not null, default false | 是否热门 |
| views | integer | not null, default 0 | 浏览量 |
| created_by | uuid | foreign key | 创建者 |
| updated_by | uuid | foreign key | 更新者 |
| published_at | timestamp | | 发布时间 |
| created_at | timestamp | not null, default now() | 创建时间 |
| updated_at | timestamp | not null, default now() | 更新时间 |

#### 产品属性表 (product_attributes)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 属性ID |
| product_id | uuid | foreign key | 产品ID |
| name | varchar(100) | not null | 属性名称 |
| value | varchar(255) | not null | 属性值 |
| order | integer | not null, default 0 | 排序 |

#### 产品图片表 (product_images)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 图片ID |
| product_id | uuid | foreign key | 产品ID |
| media_id | uuid | foreign key | 媒体ID |
| is_main | boolean | not null, default false | 是否主图 |
| order | integer | not null, default 0 | 排序 |

### 2.3 系统日志模型

#### 操作日志表 (operation_logs)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 日志ID |
| user_id | uuid | foreign key | 操作用户ID |
| username | varchar(50) | not null | 用户名 |
| action | varchar(100) | not null | 操作类型 |
| module | varchar(50) | not null | 操作模块 |
| resource_id | varchar(100) | | 资源ID |
| ip_address | varchar(50) | not null | IP地址 |
| user_agent | text | | 浏览器信息 |
| details | jsonb | | 操作详情 |
| created_at | timestamp | not null, default now() | 创建时间 |

#### 数据备份表 (backups)
| 字段名 | 类型 | 约束 | 描述 |
|--------|------|------|------|
| id | uuid | primary key | 备份ID |
| name | varchar(255) | not null | 备份名称 |
| type | varchar(20) | not null | 备份类型 (full/incremental) |
| size | bigint | not null | 备份大小 |
| status | varchar(20) | not null | 状态 (pending/completed/failed) |
| file_path | varchar(255) | | 备份文件路径 |
| created_by | uuid | foreign key | 创建者 |
| created_at | timestamp | not null, default now() | 创建时间 |
| completed_at | timestamp | | 完成时间 |

## 3. API 接口设计

### 3.1 认证与权限
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/me` - 获取当前用户信息
- `GET /api/auth/permissions` - 获取当前用户权限

### 3.2 模块管理
- `GET /api/modules` - 获取模块列表
- `POST /api/modules` - 创建模块
- `GET /api/modules/:id` - 获取模块详情
- `PUT /api/modules/:id` - 更新模块
- `DELETE /api/modules/:id` - 删除模块
- `PATCH /api/modules/:id/status` - 更新模块状态

### 3.3 内容管理
- `GET /api/contents` - 获取内容列表
- `POST /api/contents` - 创建内容
- `GET /api/contents/:id` - 获取内容详情
- `PUT /api/contents/:id` - 更新内容
- `DELETE /api/contents/:id` - 删除内容
- `PATCH /api/contents/:id/status` - 更新内容状态
- `GET /api/contents/:id/versions` - 获取内容版本列表
- `GET /api/contents/:id/versions/:versionId` - 获取指定版本内容
- `POST /api/contents/:id/restore/:versionId` - 恢复指定版本

### 3.4 媒体管理
- `GET /api/media` - 获取媒体列表
- `POST /api/media/upload` - 上传媒体文件
- `POST /api/media/batch-upload` - 批量上传媒体文件
- `GET /api/media/:id` - 获取媒体详情
- `PUT /api/media/:id` - 更新媒体信息
- `DELETE /api/media/:id` - 删除媒体
- `DELETE /api/media/batch-delete` - 批量删除媒体
- `POST /api/media/:id/process` - 处理媒体 (裁剪/压缩等)

### 3.5 产品管理
- `GET /api/products` - 获取产品列表
- `POST /api/products` - 创建产品
- `GET /api/products/:id` - 获取产品详情
- `PUT /api/products/:id` - 更新产品
- `DELETE /api/products/:id` - 删除产品
- `PATCH /api/products/:id/status` - 更新产品状态
- `PATCH /api/products/:id/hot` - 更新产品热门状态
- `GET /api/product-categories` - 获取产品分类列表
- `POST /api/product-categories` - 创建产品分类
- `PUT /api/product-categories/:id` - 更新产品分类
- `DELETE /api/product-categories/:id` - 删除产品分类

### 3.6 用户与权限管理
- `GET /api/users` - 获取用户列表
- `POST /api/users` - 创建用户
- `GET /api/users/:id` - 获取用户详情
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户
- `PATCH /api/users/:id/status` - 更新用户状态
- `GET /api/roles` - 获取角色列表
- `POST /api/roles` - 创建角色
- `GET /api/roles/:id` - 获取角色详情
- `PUT /api/roles/:id` - 更新角色
- `DELETE /api/roles/:id` - 删除角色
- `GET /api/permissions` - 获取权限列表

### 3.7 系统管理
- `GET /api/operation-logs` - 获取操作日志列表
- `GET /api/backups` - 获取备份列表
- `POST /api/backups` - 创建备份
- `GET /api/backups/:id` - 获取备份详情
- `DELETE /api/backups/:id` - 删除备份
- `POST /api/backups/:id/restore` - 恢复备份

## 4. 前端页面结构

### 4.1 布局结构
```
┌─────────────────────────────────────────────────────────┐
│                   顶部导航栏                              │
├───────────┬─────────────────────────────────────────────┤
│ 侧边菜单  │                   主内容区                    │
│           ├─────────────────────────────────────────────┤
│           │                 面包屑导航                   │
│           ├─────────────────────────────────────────────┤
│           │                   工具栏                     │
│           ├─────────────────────────────────────────────┤
│           │                   内容区                     │
│           ├─────────────────────────────────────────────┤
│           │                   分页栏                     │
└───────────┴─────────────────────────────────────────────┘
```

### 4.2 核心页面设计

#### 4.2.1 登录页面
- 用户名/密码登录
- 忘记密码功能
- 登录状态保持
- 验证码支持

#### 4.2.2 仪表盘页面
- 系统概览统计
- 最近操作日志
- 内容发布状态统计
- 产品库存预警
- 媒体存储使用情况

#### 4.2.3 模块管理页面
- 模块树状结构展示
- 拖拽排序功能
- 模块状态切换
- 批量操作支持

#### 4.2.4 内容管理页面
- 内容列表展示
- 搜索/筛选功能
- 批量发布/下架
- 内容版本管理
- 富文本编辑器集成
- 实时预览功能

#### 4.2.5 媒体管理页面
- 媒体网格/列表视图切换
- 批量上传/删除
- 图片裁剪/压缩工具
- 媒体库分类管理
- 媒体搜索功能

#### 4.2.6 产品管理页面
- 产品列表展示
- 产品分类筛选
- 产品状态管理
- 产品属性配置
- 产品图片上传与排序
- 库存预警设置

#### 4.2.7 用户权限管理页面
- 用户列表与编辑
- 角色创建与权限分配
- 权限树状结构展示
- 批量用户操作

#### 4.2.8 系统日志页面
- 操作日志列表
- 日志搜索/筛选
- 日志导出功能

#### 4.2.9 数据备份页面
- 备份列表展示
- 手动/自动备份设置
- 备份恢复功能
- 备份清理策略

## 5. 核心功能实现

### 5.1 权限管理实现
- 基于角色的权限控制 (RBAC)
- 页面级权限控制
- 按钮级权限控制
- API 接口权限验证
- 权限继承机制

### 5.2 富文本编辑实现
- 集成 TinyMCE/CKEditor
- 自定义工具栏配置
- 图片上传与编辑
- 视频嵌入支持
- 代码高亮
- 响应式设计

### 5.3 媒体处理实现
- 支持多种图片格式上传
- 自动生成缩略图
- 图片裁剪、压缩、格式转换
- 批量上传与处理
- 媒体文件预览
- 媒体URL生成与管理

### 5.4 产品管理实现
- 产品分类树状结构
- 产品属性动态配置
- 产品图片轮播设置
- 产品库存预警
- 产品搜索与筛选

### 5.5 操作日志实现
- 自动记录用户操作
- 支持多种操作类型
- 操作详情JSON存储
- 日志查询与导出
- 日志清理策略

### 5.6 数据备份实现
- 支持全量/增量备份
- 自动备份任务调度
- 备份恢复功能
- 备份状态监控
- 备份文件管理

## 6. 系统安全性设计

### 6.1 认证与授权
- JWT 认证机制
- 密码哈希存储 (bcrypt)
- 登录失败次数限制
- 会话超时管理
- API 接口权限验证

### 6.2 数据安全
- 数据加密存储
- 敏感数据脱敏
- 数据备份与恢复
- 防 SQL 注入
- 防 XSS 攻击

### 6.3 系统安全
- 请求限流
- CORS 配置
- HTTPS 支持
- 定期安全更新
- 操作日志审计

### 6.4 访问控制
- IP 白名单/黑名单
- 登录IP异常检测
- 多因素认证支持

## 7. 性能优化设计

### 7.1 前端优化
- 代码分割与懒加载
- 图片懒加载
- 状态管理优化
- 组件缓存
- API 请求缓存

### 7.2 后端优化
- 数据库索引优化
- 查询性能优化
- 缓存机制
- 异步处理
- API 限流

### 7.3 数据库优化
- 合理的表结构设计
- 索引优化
- 分表分库策略
- 定期数据清理

## 8. 部署与运维

### 8.1 部署架构
```
┌─────────────────────────────────────────────────────────┐
│                   Nginx 反向代理                        │
├─────────────────────────────────────────────────────────┤
│  - SSL 终止                                             │
│  - 请求限流                                             │
│  - 静态资源缓存                                         │
└───────────┬─────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                   Docker 容器化部署                     │
├─────────────────────────────────────────────────────────┤
│  - Next.js 应用容器                                     │
│  - PostgreSQL 容器                                      │
│  - Redis 容器                                           │
│  - MinIO 容器                                           │
└───────────┬─────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                   CI/CD 流水线                           │
├─────────────────────────────────────────────────────────┤
│  - GitHub Actions/GitLab CI                              │
│  - 自动构建与测试                                       │
│  - 自动部署                                             │
│  - 监控与告警                                           │
└─────────────────────────────────────────────────────────┘
```

### 8.2 监控与告警
- 应用性能监控 (APM)
- 服务器监控
- 数据库监控
- 日志监控与分析
- 异常告警机制

### 8.3 扩容与容灾
- 水平扩容支持
- 高可用设计
- 数据备份策略
- 灾备恢复方案

## 9. 开发计划与里程碑

### 9.1 阶段一：基础架构搭建 (2-3 周)
- 项目初始化
- 技术栈配置
- 数据库设计与初始化
- 认证授权系统实现
- 基础UI框架搭建

### 9.2 阶段二：核心功能开发 (4-6 周)
- 模块管理功能
- 内容管理功能
- 媒体管理功能
- 产品管理功能
- 用户权限管理

### 9.3 阶段三：系统功能开发 (2-3 周)
- 操作日志功能
- 数据备份功能
- 仪表盘功能
- 系统设置

### 9.4 阶段四：测试与优化 (2-3 周)
- 功能测试
- 性能测试
- 安全测试
- 代码优化
- 文档完善

### 9.5 阶段五：部署与上线 (1-2 周)
- 生产环境部署
- 监控配置
- 运维文档
- 用户培训

## 10. 系统扩展性设计

### 10.1 插件系统
- 支持第三方插件扩展
- 插件安装与管理
- 插件API设计

### 10.2 API 开放平台
- RESTful API 设计
- API 文档自动生成
- API 密钥管理

### 10.3 多语言支持
- 界面多语言
- 内容多语言
- 动态语言切换

### 10.4 主题定制
- 支持明暗主题
- 自定义主题颜色
- 主题配置导出/导入

## 11. 总结

本后台管理系统设计采用了现代化的技术栈和架构设计，具备完整的功能模块和良好的扩展性。系统采用前后端分离架构，使用 Next.js 14 作为全栈框架，结合 PostgreSQL 数据库和 Redis 缓存，实现了高性能、高可用性的后台管理系统。

系统核心功能包括模块管理、内容编辑、媒体管理、产品管理等，同时具备用户权限管理、操作日志记录和数据备份功能，保障系统的安全性和可维护性。

通过响应式设计，系统在不同设备上都能提供良好的操作体验，满足现代化后台管理系统的需求。