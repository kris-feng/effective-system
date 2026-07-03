---
name: product-poster-gen
description: |
  商品海报生成技能 - 基于豆包Seedream 5.0 Lite图像生成模型，将用户上传的产品照片转换为专业电商海报。
  支持纯白底主图、生活场景图、创意氛围图等多种场景类型。
  触发词："商品海报"、"电商图"、"产品图"、"海报生成"、"product poster"、"e-commerce image"
homepage: https://www.volcengine.com
categories: ["image", "ecommerce", "marketing"]
metadata:
  openclaw:
    emoji: "🎨"
    requires:
      bins: ["python3"]
---

# 商品海报生成技能 🎨

基于**豆包Seedream 5.0 Lite**图像生成模型，将普通产品照片一键转换为专业电商海报。

## 核心功能

### 1. 智能产品分析 🔍
- 自动识别产品类型、材质、颜色
- 提取品牌标识和设计细节
- 分析产品核心卖点

### 2. 多场景海报生成 🎬

| 场景类型 | 适用平台 | 特点 |
|----------|----------|------|
| **纯白底主图** | 淘宝/天猫/京东/Amazon | 专业白底，突出产品 |
| **生活场景图** | 小红书/抖音/朋友圈 | 真实场景，增强代入感 |
| **创意氛围图** | 品牌宣传/ campaign | 艺术感强，提升调性 |

### 3. 多尺寸适配 📐

| 比例 | 尺寸 | 适用场景 |
|------|------|----------|
| 1:1 | 1024×1024 | 淘宝主图、Amazon |
| 3:4 | 768×1024 | 小红书、抖音 |
| 4:3 | 1024×768 | 横版展示 |
| 16:9 | 1024×576 | Banner、海报 |

## 使用方法

### 方式1：直接上传图片

发送产品照片，然后说：
- "帮我生成电商海报"
- "做一张白底产品图"
- "生成生活场景图"

### 方式2：命令行调用

```bash
# 生成海报
product-poster --input product.jpg --scene white --ratio 1:1

# 生活场景
product-poster --input product.jpg --scene lifestyle --ratio 3:4

# 创意氛围
product-poster --input product.jpg --scene creative --style luxury
```

### 方式3：Python API

```python
from product_poster import PosterGenerator

gen = PosterGenerator(model="seedream-5.0-lite")

# 生成白底主图
poster = gen.generate(
    image_path="product.jpg",
    scene_type="white_background",
    aspect_ratio="1:1"
)

# 生成生活场景图
poster = gen.generate(
    image_path="product.jpg",
    scene_type="lifestyle",
    scene_desc="放在简约白色桌面，自然光照射",
    aspect_ratio="3:4"
)
```

## 工作流程

### Step 1: 产品识别
分析上传的产品图片，识别：
- 产品类别（手表/手机/化妆品/鞋包等）
- 材质特征（金属/皮革/玻璃/陶瓷等）
- 颜色与设计风格
- 品牌标识和卖点

### Step 2: 场景选择
用户选择海报场景类型：

**选项1 - 纯白底主图**
- 专业电商主图风格
- 纯白无缝背景
- 突出产品细节

**选项2 - 生活场景图**
- 真实使用场景
- 自然光线
- 搭配道具增强氛围

**选项3 - 创意氛围图**
- 品牌调性展示
- 艺术化光影
- 高端杂志风格

### Step 3: 生成海报
调用豆包Seedream 5.0 Lite生成专业海报。

## 场景详解

### 场景A：纯白底主图（White Background）

**适用**：淘宝主图、Amazon listing、产品详情页首图

**特点**：
- 纯白色背景（RGB 255,255,255）
- 产品居中，占据画面85-90%
- 专业摄影级光影
- 零干扰，突出产品

**最佳实践**：
- 手表/珠宝：展示表盘细节、材质反光
- 电子产品：3/4角度展示屏幕/接口
- 鞋包：展示侧面轮廓和材质纹理
- 化妆品：突出包装设计和质感

### 场景B：生活场景图（Lifestyle）

**适用**：小红书种草、朋友圈推广、品牌故事

**特点**：
- 真实使用环境
- 自然光线
- 搭配协调的道具
- 引发购买欲望

**场景示例**：

| 产品类型 | 场景建议 |
|----------|----------|
| 手表 | 咖啡桌+笔记本+晨光 |
| 手机/耳机 | 现代办公桌+暖光台灯 |
| 化妆品 | 大理石台面+鲜花 |
| 运动鞋 | 城市街道/健身房 |
| 包包 | 咖啡馆/旅行场景 |
| 家居用品 | 温馨客厅角落 |

### 场景C：创意氛围图（Creative）

**适用**：品牌campaign、新品发布、高端推广

**风格选项**：

| 风格 | 特点 | 适用品牌 |
|------|------|----------|
| **奢华风** | 暗调背景、聚光灯、金色点缀 | 珠宝/奢侈品 |
| **科技风** | 冷光、几何线条、反光表面 | 数码/科技 |
| **自然风** | 暖光、木质/植物元素 | 有机食品/护肤 |
| **极简风** | 纯色背景、大胆留白 | 设计师品牌 |
| **活力风** | 鲜艳色彩、动态构图 | 潮牌/年轻品牌 |

## Prompt工程

### 提示词结构

```
Using the reference product image, create a professional e-commerce product photograph of [产品描述].

[场景描述]
[构图描述]
[光影描述]
[风格描述]

Technical specs:
- Aspect ratio: [比例]
- Resolution: 1024×1024
- No text, no watermark, no hands
```

### 示例Prompt

**白底主图 - 手表**
```
Create a professional studio product photograph of a round mechanical wristwatch 
with silver stainless steel case and black leather strap. The watch is isolated 
on a pure white seamless background (RGB 255,255,255), positioned at a slight 
3/4 angle showing the dial clearly. Soft three-point lighting with gentle shadows. 
Razor-sharp focus on the watch face. No text, no watermarks. 1:1 aspect ratio.
```

**生活场景 - 化妆品**
```
Create a lifestyle photograph of a premium skincare serum bottle on a white 
marble vanity surface. Soft morning window light from the left. Fresh white 
flowers and a small ceramic dish nearby. Warm, clean aesthetic. The product 
is in sharp focus with gentle background blur. No text or watermarks. 3:4 
aspect ratio, Instagram-friendly.
```

## 输出示例

### 生成结果展示

```
🎨 商品海报生成完成
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 产品：机械腕表（银色钢带）
🎬 场景：纯白底主图
📐 尺寸：1:1 (1024×1024)
✨ 风格：专业电商摄影

💡 产品卖点分析：
  • 经典圆形表盘设计
  • 316L精钢表壳
  • 蓝宝石镜面
  • 机械机芯透底

🖼️ 生成图片：[图片链接]

📋 优化建议：
  • 如需更强调金属质感，可添加"dramatic lighting"参数
  • 如需展示佩戴效果，可生成 lifestyle 场景
```

## 技术配置

### 模型配置

```yaml
# config.yaml
model:
  name: "seedream-5.0-lite"
  provider: "doubao"
  endpoint: "https://api.volcengine.com/seedream"
  
generation:
  default_resolution: "1024x1024"
  default_aspect_ratio: "1:1"
  quality: "high"
  
scenes:
  white_background:
    temperature: "neutral"
    lighting: "studio_three_point"
  lifestyle:
    temperature: "warm"
    lighting: "natural_window"
  creative:
    temperature: "variable"
    lighting: "dramatic"
```

### 环境变量

```bash
export SEEDREAM_API_KEY="your-api-key"
export SEEDREAM_ENDPOINT="https://api.volcengine.com/seedream"
```

## 最佳实践

### 1. 图片质量要求
- ✅ 上传清晰的产品照片
- ✅ 避免过度曝光或欠曝
- ✅ 尽量展示产品完整形态
- ❌ 避免带文字/水印的原图

### 2. 场景选择建议

| 产品阶段 | 推荐场景 |
|----------|----------|
| 新品上架 | 纯白底主图 + 生活场景 |
| 促销活动 | 创意氛围图 |
| 社交媒体 | 生活场景图 |
| 品牌升级 | 创意氛围图 |

### 3. 迭代优化

Seedream支持多轮优化：
1. **首次生成**：获得基础海报
2. **光影调整**："让光线更柔和一些"
3. **角度微调**："稍微旋转展示侧面"
4. **背景更换**："换成浅灰色背景"

## 依赖项

- Python 3.9+
- requests >= 2.28.0
- pillow >= 9.0.0
- volcengine-sdk-python

## 安装

```bash
# 安装依赖
pip install -r requirements.txt

# 配置API密钥
export SEEDREAM_API_KEY="your-key"

# 运行
python3 scripts/generate_poster.py --input product.jpg
```

## 注意事项

1. **版权合规**：确保产品图片拥有使用权限
2. **品牌一致性**：生成风格需符合品牌调性
3. **平台规范**：不同电商平台对主图有不同要求
4. **隐私保护**：避免上传含敏感信息的产品图

## 更新日志

### v1.0.0 (2026-04-12)
- ✅ 集成豆包Seedream 5.0 Lite
- ✅ 支持3种场景类型
- ✅ 支持4种尺寸比例
- ✅ 智能产品分析
- ✅ 专业Prompt工程

## 参考

基于Ecom Shot最佳实践适配豆包Seedream模型

---

**标签**: #商品海报 #电商设计 #AI绘图 #Seedream
