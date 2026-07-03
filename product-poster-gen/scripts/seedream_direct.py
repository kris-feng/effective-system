#!/usr/bin/env python3
"""
Seedream 5.0 Lite 直接调用 - 生成海报并返回图片
"""

import os
import sys
import json
import base64
import requests
from typing import Dict, Optional

def generate_poster_with_seedream(
    image_path: str,
    scene_type: str = "lifestyle",
    aspect_ratio: str = "3:4",
    api_key: Optional[str] = None
) -> Dict:
    """
    调用豆包Seedream 5.0 Lite生成海报
    
    Args:
        image_path: 产品图片路径
        scene_type: 场景类型 (white_background/lifestyle/creative)
        aspect_ratio: 图片比例 (1:1/3:4/4:3/16:9)
        api_key: Seedream API密钥
    
    Returns:
        {"success": True/False, "image_url": "...", "image_path": "...", "error": "..."}
    """
    
    # 读取参考图片
    with open(image_path, 'rb') as f:
        image_base64 = base64.b64encode(f.read()).decode('utf-8')
    
    # 生成Prompt
    prompt = generate_seedream_prompt(scene_type, aspect_ratio)
    
    # Seedream API配置 - 使用火山引擎API
    api_key = api_key or os.getenv("VOLCENGINE_API_KEY", "9c6861ea-8890-40d4-a2fb-54315b6ec3fc")
    # 火山引擎Seedream API端点
    endpoint = "https://visual.volcengineapi.com/action/GenerateImage"
    
    # 构建请求体 - 火山引擎Seedream API格式
    ratio_map = {
        "1:1": "1:1",
        "3:4": "3:4",
        "4:3": "4:3",
        "16:9": "16:9"
    }

    # 火山引擎API使用JSON格式和特定参数
    payload = {
        "req_key": "seedream",
        "prompt": prompt,
        "seed": -1,
        "scale": 3.0,
        "ratio": ratio_map.get(aspect_ratio, "3:4"),
        "use_replicate": False,
        "image_base64": image_base64,
        "logo_info": {
            "add_logo": False
        }
    }
    
    headers = {
        "Content-Type": "application/json",
        "X-Api-App-Key": api_key  # 火山引擎API使用App Key认证
    }
    
    try:
        print(f"🎨 正在调用Seedream生成海报...")
        print(f"   场景: {scene_type}")
        print(f"   尺寸: {aspect_ratio}")
        
        response = requests.post(endpoint, json=payload, headers=headers, timeout=120)
        
        if response.status_code == 200:
            result = response.json()
            
            # 提取生成的图片 - 尝试多种可能的返回格式
            image_data = None
            
            # 尝试不同的返回格式
            if "data" in result and len(result["data"]) > 0:
                # 标准格式
                image_data = result["data"][0].get("url", "") or result["data"][0].get("b64_json", "")
            elif "images" in result and len(result["images"]) > 0:
                # 替代格式
                image_data = result["images"][0].get("url", "")
            elif "image_url" in result:
                # 直接格式
                image_data = result["image_url"]
            elif "output" in result:
                # 嵌套格式
                image_data = result["output"].get("url", "")
            
            if image_data:
                # 保存图片
                output_path = f"/tmp/poster_{os.path.basename(image_path)}"
                
                if image_data.startswith("data:image") or len(image_data) > 1000:
                    # Base64编码的图片
                    if image_data.startswith("data:image"):
                        img_base64 = image_data.split(",")[1]
                    else:
                        img_base64 = image_data
                    with open(output_path, "wb") as f:
                        f.write(base64.b64decode(img_base64))
                    image_url = "base64_image"
                else:
                    # URL图片，下载保存
                    img_response = requests.get(image_data, timeout=30)
                    with open(output_path, "wb") as f:
                        f.write(img_response.content)
                    image_url = image_data
                
                return {
                    "success": True,
                    "image_path": output_path,
                    "image_url": image_url,
                    "scene_type": scene_type,
                    "aspect_ratio": aspect_ratio
                }
            else:
                return {"success": False, "error": "无法从API响应中提取图片", "raw": result}
        else:
            return {
                "success": False, 
                "error": f"API调用失败: {response.status_code}",
                "details": response.text
            }
            
    except Exception as e:
        return {"success": False, "error": str(e)}


def generate_seedream_prompt(scene_type: str, aspect_ratio: str) -> str:
    """生成Seedream专用Prompt"""
    
    prompts = {
        "white_background": """Create a professional studio product photograph of the product from the reference image. The product is isolated on a pure white seamless background (RGB 255, 255, 255), positioned at a 3/4 angle, centered in the frame, filling 85-90% of the composition. Shot with high-key three-point lighting: large overhead softbox as key light at 45 degrees, fill card opposite side at 2:1 ratio, subtle rim light from behind. Gentle contact shadow beneath product. Preserve original colors, textures, materials with absolute fidelity. Photorealistic rendering. No text, no watermarks, no hands, no props. Clean, professional, e-commerce ready.""",
        
        "lifestyle": """Create a photorealistic lifestyle photograph of the product from the reference image. The product is positioned on a leather-bound journal on a dark walnut wood desk, morning golden hour light streaming through a window from the left. The product is the hero, naturally positioned with complementary props: a sleek fountain pen and a ceramic coffee cup with steam. Shot with 85mm lens at f/2.8, shallow depth of field, product in tack-sharp focus with creamy bokeh background. Natural window light from left at 45 degrees, soft directional shadows. Warm color palette with rich browns and golden tones, 3200K color temperature. No text, no watermarks, naturally integrated scene. Instagram-friendly vertical format.""",
        
        "creative": """Create a dramatic, visually striking commercial photograph of the product from the reference image that conveys luxury and sophistication. The product is elegantly positioned as the focal point on a polished black marble surface. Dark, moody atmosphere with selective lighting. Dramatic chiaroscuro lighting - single focused spotlight from above creating a pool of light on the product against a deep gradient background from dark navy to black. Shot with 85mm lens at f/2.8. Color grade: rich blacks, warm gold accents, deep browns. The mood is luxurious, exclusive, refined. No text overlays, no watermarks. High-end magazine advertisement quality."""
    }
    
    return prompts.get(scene_type, prompts["lifestyle"])


def main():
    """CLI入口"""
    import argparse
    
    parser = argparse.ArgumentParser(description="直接调用Seedream生成海报")
    parser.add_argument("--input", "-i", required=True, help="输入图片路径")
    parser.add_argument("--scene", "-s", default="lifestyle", 
                       choices=["white_background", "lifestyle", "creative"],
                       help="场景类型")
    parser.add_argument("--ratio", "-r", default="3:4",
                       choices=["1:1", "3:4", "4:3", "16:9"],
                       help="图片比例")
    
    args = parser.parse_args()
    
    # 调用生成
    result = generate_poster_with_seedream(
        image_path=args.input,
        scene_type=args.scene,
        aspect_ratio=args.ratio
    )
    
    if result["success"]:
        print(f"\n✅ 海报生成成功!")
        print(f"📁 保存路径: {result['image_path']}")
        print(f"🎨 场景: {result['scene_type']}")
        print(f"📐 尺寸: {result['aspect_ratio']}")
    else:
        print(f"\n❌ 生成失败: {result.get('error', 'Unknown error')}")
        if "details" in result:
            print(f"详情: {result['details']}")
        return 1
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
