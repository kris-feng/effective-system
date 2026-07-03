#!/usr/bin/env python3
"""
商品海报生成器 - 基于豆包Seedream 5.0 Lite
"""

import os
import sys
import json
import argparse
from typing import Dict, List, Optional
from datetime import datetime

class ProductAnalyzer:
    """产品图片分析器"""
    
    PRODUCT_TYPES = {
        "watch": "手表/腕表",
        "jewelry": "珠宝/首饰",
        "electronics": "电子产品",
        "cosmetics": "化妆品/护肤品",
        "shoes": "鞋类",
        "bag": "箱包",
        "clothing": "服装",
        "food": "食品/饮料",
        "home": "家居用品",
        "other": "其他"
    }
    
    MATERIALS = {
        "metal": "金属",
        "leather": "皮革",
        "glass": "玻璃",
        "ceramic": "陶瓷",
        "plastic": "塑料",
        "fabric": "织物",
        "wood": "木质",
        "stone": "石材"
    }
    
    def analyze(self, image_path: str) -> Dict:
        """分析产品图片"""
        # 实际实现应调用CV模型或Vision API
        # 这里使用模拟数据展示结构
        return {
            "product_type": "watch",
            "product_name": "机械腕表",
            "materials": ["metal", "leather"],
            "colors": ["silver", "black"],
            "features": ["round dial", "automatic movement", "sapphire crystal"],
            "brand_markings": None,
            "size_estimate": "40mm",
            "condition": "new"
        }


class PromptEngineer:
    """Prompt工程师"""
    
    MATERIALS = {
        "metal": "metal",
        "leather": "leather",
        "glass": "glass",
        "ceramic": "ceramic",
        "plastic": "plastic",
        "fabric": "fabric",
        "wood": "wood",
        "stone": "stone"
    }
    
    SCENE_TEMPLATES = {
        "white_background": {
            "name": "纯白底主图",
            "template": """Using the reference product image as the source, create a professional studio product photograph of {product_desc}.

The product is isolated on a pure white seamless background (RGB 255, 255, 255), positioned at a {angle} angle, centered in the frame, filling approximately 85-90% of the composition.

Shot with professional lighting: {lighting_setup}. The lighting produces a gentle, natural contact shadow directly beneath the product for grounding, with no harsh shadows or distracting reflections.

The product's original colors, textures, materials, and all distinguishing design details from the reference image are preserved with absolute fidelity. Every surface is rendered with photorealistic accuracy.

No text, no watermarks, no logos overlays, no props, no human hands. Clean, professional, e-commerce ready.

Aspect ratio: {aspect_ratio}, high resolution.""",
            "lighting_presets": {
                "hard": "High-key three-point lighting with a large overhead softbox as key light at 45 degrees, a fill card on the opposite side reducing shadows to a 2:1 ratio, and a subtle rim light from behind to define edges",
                "soft": "Diffused light tent setup with even, wrap-around illumination from large softboxes on both sides, eliminating harsh shadows while preserving texture detail",
                "glossy": "Dual strip softbox setup flanking the product to create elegant edge highlights, with a white bounce card underneath for clean fill, carefully controlling specular highlights",
                "matte": "Soft overhead diffused lighting with a slight directional key from the upper left at 30 degrees, creating subtle dimensional shadows that reveal surface texture"
            }
        },
        "lifestyle": {
            "name": "生活场景图",
            "template": """Using the reference product image as the source, create a photorealistic lifestyle photograph featuring {product_desc} in a {scene_setting}.

The product is the clear hero of the image, positioned {placement} with complementary props that enhance but never compete with the product. The scene tells a story of {lifestyle_narrative}.

Shot with professional composition: {camera_setup}. {lighting_description}.

The color palette is {color_mood}, with {color_temperature} color temperature. The product's authentic appearance from the reference — colors, materials, design details — is preserved perfectly within this new context.

No text, no watermarks, no artificial-looking placement. The product should feel naturally integrated into the scene, as if photographed in situ by a professional lifestyle photographer.

Aspect ratio: {aspect_ratio}, high resolution.""",
            "scene_suggestions": {
                "watch": "On a leather-bound journal on a dark wood desk, morning light streaming through a window",
                "electronics": "Clean minimalist desk setup, warm task lighting, modern workspace",
                "cosmetics": "Marble vanity surface with soft morning light, fresh flowers nearby",
                "shoes": "Urban sidewalk or park path, golden hour lighting",
                "bag": "Coffee shop table or travel-inspired flat lay",
                "food": "Rustic wooden table, natural window light, complementary ingredients scattered artfully",
                "home": "Styled living room vignette with plants and natural textures"
            }
        },
        "creative": {
            "name": "创意氛围图",
            "template": """Using the reference product image as the source, create a dramatic, visually striking commercial photograph of {product_desc} that conveys {brand_mood}.

The product is {composition_description}. The environment is {environment_description}, creating an immersive atmosphere that elevates the product to aspirational status.

Cinematic lighting: {dramatic_lighting}. The interplay of light and shadow creates depth, mystery, and visual intrigue while keeping the product fully visible and recognizable.

Shot with professional camera work: {camera_work}. Color grade: {color_grade}. The overall mood is {mood_keywords}.

The product from the reference image is rendered with complete accuracy — every design detail, material finish, and color is faithfully preserved, even within this stylized context.

No text overlays, no watermarks. The image should feel like a high-end magazine advertisement or a luxury brand campaign visual.

Aspect ratio: {aspect_ratio}, high resolution.""",
            "mood_presets": {
                "luxury": {
                    "description": "Dark, moody atmosphere with selective lighting. Deep blacks, gold/warm accent tones",
                    "lighting": "Dramatic chiaroscuro lighting — a single focused spotlight from above creating a pool of light on the product against a dark gradient background",
                    "color": "Rich blacks, warm golds, deep browns"
                },
                "tech": {
                    "description": "Clean, futuristic environment with cool blue-white ambient glow",
                    "lighting": "Geometric edge lighting with cool blue-white tones, reflective dark surface",
                    "color": "Cool blues, teals, silvers"
                },
                "natural": {
                    "description": "Earthy, warm atmosphere surrounded by natural elements",
                    "lighting": "Soft golden light filtering through as if in a forest clearing",
                    "color": "Warm greens, ambers, earth tones"
                },
                "minimal": {
                    "description": "Ultra-clean composition with bold negative space",
                    "lighting": "Hard, graphic shadows from sharp directional light",
                    "color": "Monochrome with single accent color"
                },
                "playful": {
                    "description": "Vibrant, saturated colors with dynamic composition",
                    "lighting": "High-key lighting with punchy contrast",
                    "color": "Bright, saturated, energetic colors"
                }
            }
        }
    }
    
    def generate_prompt(self, 
                       product_info: Dict,
                       scene_type: str,
                       aspect_ratio: str = "1:1",
                       **kwargs) -> str:
        """生成Seedream Prompt"""
        
        if scene_type not in self.SCENE_TEMPLATES:
            raise ValueError(f"Unknown scene type: {scene_type}")
        
        template = self.SCENE_TEMPLATES[scene_type]["template"]
        
        # 构建产品描述
        product_desc = self._build_product_description(product_info)
        
        # 根据场景类型填充参数
        if scene_type == "white_background":
            params = self._get_white_bg_params(product_info, aspect_ratio, kwargs)
        elif scene_type == "lifestyle":
            params = self._get_lifestyle_params(product_info, aspect_ratio, kwargs)
        else:  # creative
            params = self._get_creative_params(product_info, aspect_ratio, kwargs)
        
        params["product_desc"] = product_desc
        params["aspect_ratio"] = aspect_ratio
        
        return template.format(**params)
    
    def _build_product_description(self, product_info: Dict) -> str:
        """构建产品描述"""
        parts = []
        
        # 产品类型
        product_type = product_info.get("product_type", "product")
        type_names = {
            "watch": "wristwatch",
            "jewelry": "jewelry piece",
            "electronics": "electronic device",
            "cosmetics": "cosmetic product",
            "shoes": "pair of shoes",
            "bag": "bag",
            "clothing": "clothing item",
            "food": "food product",
            "home": "home product"
        }
        type_desc = type_names.get(product_type, "product")
        
        # 材质
        materials = product_info.get("materials", [])
        material_desc = ""
        if materials:
            material_names = [self.MATERIALS.get(m, m) for m in materials]
            material_desc = f" with {', '.join(material_names)} materials"
        
        # 颜色
        colors = product_info.get("colors", [])
        color_desc = ""
        if colors:
            color_desc = f" in {', '.join(colors)} color"
        
        # 特征
        features = product_info.get("features", [])
        feature_desc = ""
        if features:
            feature_desc = f", featuring {', '.join(features)}"
        
        return f"a {type_desc}{material_desc}{color_desc}{feature_desc}"
    
    def _get_white_bg_params(self, product_info: Dict, aspect_ratio: str, kwargs: Dict) -> Dict:
        """获取白底图参数"""
        product_type = product_info.get("product_type", "default")
        
        # 角度预设
        angle_presets = {
            "watch": "straight-on front face or 3/4 angle showing the dial",
            "jewelry": "straight-on showing the piece detail",
            "electronics": "3/4 angle showing the main interface",
            "cosmetics": "straight-on or slight 15-degree angle",
            "shoes": "3/4 angle showing both the side profile and toe",
            "bag": "3/4 angle showing the shape and details",
            "default": "slightly elevated 3/4 view"
        }
        
        # 光影预设
        lighting_presets = {
            "watch": self.SCENE_TEMPLATES["white_background"]["lighting_presets"]["hard"],
            "jewelry": self.SCENE_TEMPLATES["white_background"]["lighting_presets"]["hard"],
            "electronics": self.SCENE_TEMPLATES["white_background"]["lighting_presets"]["hard"],
            "cosmetics": self.SCENE_TEMPLATES["white_background"]["lighting_presets"]["glossy"],
            "shoes": self.SCENE_TEMPLATES["white_background"]["lighting_presets"]["soft"],
            "bag": self.SCENE_TEMPLATES["white_background"]["lighting_presets"]["soft"],
            "default": self.SCENE_TEMPLATES["white_background"]["lighting_presets"]["soft"]
        }
        
        return {
            "angle": angle_presets.get(product_type, angle_presets["default"]),
            "lighting_setup": lighting_presets.get(product_type, lighting_presets["default"])
        }
    
    def _get_lifestyle_params(self, product_info: Dict, aspect_ratio: str, kwargs: Dict) -> Dict:
        """获取生活场景参数"""
        product_type = product_info.get("product_type", "default")
        
        scene_suggestions = self.SCENE_TEMPLATES["lifestyle"]["scene_suggestions"]
        
        return {
            "scene_setting": kwargs.get("scene_setting", scene_suggestions.get(product_type, "a clean, modern setting")),
            "placement": kwargs.get("placement", "naturally within the scene"),
            "lifestyle_narrative": kwargs.get("narrative", "everyday elegance and quality"),
            "camera_setup": kwargs.get("camera", "85mm lens at f/2.8 creating a shallow depth of field — the product is in tack-sharp focus while the background falls into a pleasing, creamy bokeh"),
            "lighting_description": kwargs.get("lighting", "Natural window light streaming from the left side, creating soft directional shadows"),
            "color_mood": kwargs.get("color_mood", "warm and inviting"),
            "color_temperature": kwargs.get("color_temp", "3200K warm")
        }
    
    def _get_creative_params(self, product_info: Dict, aspect_ratio: str, kwargs: Dict) -> Dict:
        """获取创意氛围参数"""
        mood = kwargs.get("mood", "luxury")
        mood_presets = self.SCENE_TEMPLATES["creative"]["mood_presets"]
        
        if mood not in mood_presets:
            mood = "luxury"
        
        preset = mood_presets[mood]
        
        return {
            "brand_mood": kwargs.get("brand_mood", f"premium quality and {mood} aesthetic"),
            "composition_description": kwargs.get("composition", "elegantly positioned as the focal point"),
            "environment_description": kwargs.get("environment", preset["description"]),
            "dramatic_lighting": kwargs.get("dramatic_lighting", preset["lighting"]),
            "camera_work": kwargs.get("camera_work", "85mm lens at f/2.8 with professional composition"),
            "color_grade": kwargs.get("color_grade", preset["color"]),
            "mood_keywords": kwargs.get("mood_keywords", f"{mood}, aspirational, premium")
        }


class PosterGenerator:
    """海报生成器"""
    
    def __init__(self, model: str = "seedream-5.0-lite"):
        self.model = model
        self.analyzer = ProductAnalyzer()
        self.prompt_engineer = PromptEngineer()
        self.api_key = os.getenv("SEEDREAM_API_KEY")
        self.api_endpoint = os.getenv("SEEDREAM_ENDPOINT", "https://api.volcengine.com/seedream")
    
    def generate(self,
                image_path: str,
                scene_type: str = "white_background",
                aspect_ratio: str = "1:1",
                **kwargs) -> Dict:
        """生成海报"""
        
        # 1. 分析产品
        print(f"🔍 分析产品图片: {image_path}")
        product_info = self.analyzer.analyze(image_path)
        
        # 2. 生成Prompt
        print(f"📝 生成{self.prompt_engineer.SCENE_TEMPLATES[scene_type]['name']}Prompt...")
        prompt = self.prompt_engineer.generate_prompt(
            product_info=product_info,
            scene_type=scene_type,
            aspect_ratio=aspect_ratio,
            **kwargs
        )
        
        # 3. 调用Seedream API（模拟）
        print(f"🎨 调用Seedream 5.0 Lite生成海报...")
        # result = self._call_seedream_api(image_path, prompt, aspect_ratio)
        
        # 返回结果
        return {
            "success": True,
            "product_info": product_info,
            "scene_type": scene_type,
            "aspect_ratio": aspect_ratio,
            "prompt": prompt,
            "generated_at": datetime.now().isoformat(),
            "image_url": None,  # 实际应为生成的图片URL
            "tips": self._generate_tips(scene_type)
        }
    
    def _generate_tips(self, scene_type: str) -> List[str]:
        """生成优化建议"""
        tips = {
            "white_background": [
                "如需更强调金属质感，可添加'dramatic side lighting'",
                "如需展示佩戴效果，可生成lifestyle场景"
            ],
            "lifestyle": [
                "如想更换场景，可指定'coffee shop'或'office desk'等",
                "可调整光线为'morning light'或'golden hour'"
            ],
            "creative": [
                "可尝试不同的mood风格：luxury/tech/natural/minimal/playful",
                "可调整color grade为warmer或cooler"
            ]
        }
        return tips.get(scene_type, [])
    
    def format_result(self, result: Dict) -> str:
        """格式化输出结果"""
        info = result["product_info"]
        
        lines = [
            f"🎨 商品海报生成完成",
            f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            f"📦 产品：{info.get('product_name', 'Unknown')} ({info.get('product_type', '')})",
            f"🎬 场景：{self.prompt_engineer.SCENE_TEMPLATES[result['scene_type']]['name']}",
            f"📐 尺寸：{result['aspect_ratio']}",
            f"",
            f"💡 产品卖点分析：",
        ]
        
        for feature in info.get("features", []):
            lines.append(f"  • {feature}")
        
        lines.extend([
            f"",
            f"📋 Prompt预览：",
            f"```",
            f"{result['prompt'][:200]}...",
            f"```"
        ])
        
        if result.get("tips"):
            lines.extend([
                f"",
                f"💡 优化建议："
            ])
            for tip in result["tips"]:
                lines.append(f"  • {tip}")
        
        return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="商品海报生成工具")
    parser.add_argument("--input", "-i", required=True, help="输入产品图片路径")
    parser.add_argument("--scene", "-s", default="white_background",
                       choices=["white_background", "lifestyle", "creative"],
                       help="场景类型")
    parser.add_argument("--ratio", "-r", default="1:1",
                       choices=["1:1", "3:4", "4:3", "16:9"],
                       help="图片比例")
    parser.add_argument("--mood", "-m", default="luxury",
                       choices=["luxury", "tech", "natural", "minimal", "playful"],
                       help="创意氛围风格(仅creative场景)")
    
    args = parser.parse_args()
    
    # 初始化生成器
    generator = PosterGenerator()
    
    # 生成海报
    kwargs = {}
    if args.scene == "creative":
        kwargs["mood"] = args.mood
    
    result = generator.generate(
        image_path=args.input,
        scene_type=args.scene,
        aspect_ratio=args.ratio,
        **kwargs
    )
    
    # 输出结果
    print(generator.format_result(result))
    
    # 输出完整Prompt
    print("\n" + "="*50)
    print("完整Prompt（可复制到Seedream使用）：")
    print("="*50)
    print(result["prompt"])


if __name__ == "__main__":
    main()
