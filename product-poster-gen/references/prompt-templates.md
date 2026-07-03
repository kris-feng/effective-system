# Prompt模板参考文档

Seedream 5.0 Lite 商品海报生成Prompt模板

## 尺寸规格

| 比例 | 分辨率 | 适用平台 |
|------|--------|----------|
| 1:1 | 1024×1024 | 淘宝/天猫/Amazon主图 |
| 3:4 | 768×1024 | 小红书/抖音/竖版展示 |
| 4:3 | 1024×768 | 横版详情页 |
| 16:9 | 1024×576 | Banner/横幅海报 |

---

## 场景模板

### 1. 纯白底主图 (White Background)

**适用**：电商主图、产品详情页首图

**核心要素**：
- 纯白背景 (RGB 255,255,255)
- 产品居中，占据画面85-90%
- 专业摄影级光影
- 无干扰元素

**基础模板**：
```
Using the reference product image as the source, create a professional studio product photograph of {产品描述}.

The product is isolated on a pure white seamless background (RGB 255, 255, 255), positioned at a {角度} angle, centered in the frame, filling approximately 85-90% of the composition.

Shot with professional lighting: {光影设置}. The lighting produces a gentle, natural contact shadow directly beneath the product for grounding, with no harsh shadows or distracting reflections.

The product's original colors, textures, materials, and all distinguishing design details from the reference image are preserved with absolute fidelity.

No text, no watermarks, no logos overlays, no props, no human hands. Clean, professional, e-commerce ready.

Aspect ratio: {比例}, high resolution.
```

**光影预设**：

| 产品类型 | 光影方案 |
|----------|----------|
| 金属/反光 (手表、珠宝、电子) | 三点布光，45度主光，2:1光比，边缘轮廓光 |
| 软质/织物 (服装、包袋) | 柔光箱环绕，均匀包裹光，消除硬阴影 |
| 光泽/透明 (瓶子、玻璃、化妆品) | 条形柔光箱两侧，控制高光，白色反光板补光 |
| 哑光/有机 (食品、木质、陶瓷) | 顶部柔光，30度方向光，强调纹理 |

**角度预设**：

| 产品类型 | 推荐角度 |
|----------|----------|
| 手表/珠宝 | 正面或3/4角度展示表盘 |
| 电子产品 | 3/4角度展示屏幕/接口 |
| 鞋类 | 3/4角度展示侧面和鞋头 |
| 化妆品 | 正面或15度微倾 |
| 服装 | 俯拍平铺或30度斜角 |

---

### 2. 生活场景图 (Lifestyle)

**适用**：小红书种草、社交媒体、品牌故事

**核心要素**：
- 真实使用环境
- 自然光线
- 搭配协调的道具
- 引发购买欲望

**基础模板**：
```
Using the reference product image as the source, create a photorealistic lifestyle photograph featuring {产品描述} in a {场景描述}.

The product is the clear hero of the image, positioned {摆放位置} with complementary props that enhance but never compete with the product.

Shot with professional composition: {相机设置}. {光影描述}.

The color palette is {色调}, with {色温} color temperature. The product's authentic appearance from the reference is preserved perfectly within this new context.

No text, no watermarks, no artificial-looking placement. The product should feel naturally integrated into the scene.

Aspect ratio: {比例}, high resolution.
```

**场景建议**：

| 产品类型 | 场景描述 |
|----------|----------|
| 手表 | 皮质笔记本+深色木桌+晨光 |
| 电子产品 | 简约办公桌+暖光台灯+现代工作空间 |
| 化妆品 | 大理石台面+晨光+鲜花点缀 |
| 运动鞋 | 城市街道/公园小径+黄金时刻光线 |
| 包包 | 咖啡馆桌面/旅行主题平铺 |
| 食品 | 质朴木桌+窗边自然光+食材点缀 |
| 家居 | 温馨客厅角落+绿植+自然纹理 |

**光影建议**：
- 主光：自然窗光（指定方向：左/右/后）
- 风格："Warm, natural daylight streaming from the left side"
- 备选："Soft ambient interior lighting with warm color temperature (3200K)"

---

### 3. 创意氛围图 (Creative)

**适用**：品牌campaign、新品发布、高端推广

**核心要素**：
- 强烈视觉冲击力
- 艺术化光影
- 品牌调性展示
- 杂志广告质感

**基础模板**：
```
Using the reference product image as the source, create a dramatic, visually striking commercial photograph of {产品描述} that conveys {品牌调性}.

The product is {构图描述}. The environment is {环境描述}, creating an immersive atmosphere that elevates the product to aspirational status.

Cinematic lighting: {光影效果}. The interplay of light and shadow creates depth, mystery, and visual intrigue while keeping the product fully visible.

Shot with professional camera work: {相机参数}. Color grade: {调色}. The overall mood is {氛围关键词}.

The product from the reference image is rendered with complete accuracy — every design detail, material finish, and color is faithfully preserved.

No text overlays, no watermarks. The image should feel like a high-end magazine advertisement.

Aspect ratio: {比例}, high resolution.
```

**风格预设**：

#### 奢华风 (Luxury)
- **氛围**：暗调、选择性照明、深黑背景、金/暖色调点缀
- **光影**：戏剧性明暗对比，单束聚光灯从上方投射，产品在光束中
- **色彩**：丰富黑色、温暖金色、深棕色
- **适用**：珠宝、奢侈品、高端腕表

#### 科技风 (Tech)
- **氛围**：干净、未来感、冷蓝白环境光
- **光影**：几何边缘光，反光深色表面，微妙霓虹光
- **色彩**：冷蓝色、青色、银色
- **适用**：数码产品、科技配件

#### 自然风 (Natural)
- **氛围**：温暖、自然元素环绕（石头、苔藓、木头、水滴）
- **光影**：森林中透过的柔和金光
- **色彩**：温暖绿色、琥珀色、大地色系
- **适用**：有机食品、天然护肤

#### 极简风 (Minimal)
- **氛围**：超干净构图、大胆留白
- **光影**：锐利方向光产生的图形阴影
- **色彩**：单色配单一强调色
- **适用**：设计师品牌、现代家居

#### 活力风 (Playful)
- **氛围**：鲜艳饱和色彩、动态构图
- **光影**：高调光线、强烈对比
- **色彩**：明亮、饱和、活力四射
- **适用**：潮牌、年轻品牌、儿童产品

---

## 产品描述模板

### 描述结构

1. **是什么**：产品类别
2. **材质/工艺**：材料、表面处理
3. **颜色**：主色、配色
4. **尺寸感**：帮助AI理解比例
5. **关键特征**：设计细节、功能特点

### 示例

**差**："a watch"

**好**：
```
A classic round-dial automatic mechanical wristwatch with a 40mm brushed stainless steel case, 
deep navy blue sunburst dial featuring applied silver hour markers and dauphine hands, 
paired with a hand-stitched saddle brown leather strap
```

**翻译参考**：
```
一款经典圆形表盘自动机械腕表，40mm拉丝精钢表壳，
深蓝色太阳纹表盘，配以立体银色时标和柳叶指针，
搭配手工缝制马鞍棕色皮带
```

---

## 迭代优化建议

Seedream支持多轮对话优化，首次生成后可尝试：

### 光影调整
- "Make the key light more dramatic with deeper shadows on the left side"
- "让主光更有戏剧性，左侧阴影更深"

### 背景调整
- "Change the background to a slightly warm off-white"
- "背景换成稍暖的米白色"

### 角度调整
- "Rotate the product 15 degrees to show more of the side profile"
- "产品旋转15度，更多展示侧面"

### 细节增强
- "Increase the visibility of the texture on the leather strap"
- "增强皮带纹理的可见度"

### 色调调整
- "Make the metal tones cooler and more silver, less warm"
- "金属色调更冷更银白，减少暖色"

---

## 注意事项

1. **提示词语言**：Seedream对英文提示词理解最佳，即使生成中文电商图也建议使用英文Prompt

2. **参考图重要性**：上传的参考图质量直接影响生成效果，建议使用：
   - 清晰无模糊
   - 产品完整可见
   - 避免过度曝光/欠曝
   - 无文字/水印干扰

3. **负面提示**：明确指定不希望出现的内容：
   - "No text, no watermarks, no hands"
   - "No artificial-looking placement"
   - "No distracting elements"

4. **分辨率**：Seedream 5.0 Lite默认输出1024×1024，足够电商使用

---

**版本**: v1.0 | **更新**: 2026-04-12
