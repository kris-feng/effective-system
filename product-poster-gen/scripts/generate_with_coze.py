#!/usr/bin/env python3
"""
商品海报生成器 - 使用coze-coding-dev-sdk直接生成
"""

import subprocess
import sys
import os

def generate_poster(prompt: str, size: str = "2K") -> str:
    """
    使用coze-image-gen技能生成海报
    """
    skill_path = "/workspace/projects/workspace/skills/coze-image-gen"
    
    # 调用gen.ts脚本生成图片
    cmd = [
        "npx", "ts-node", f"{skill_path}/scripts/gen.ts",
        "--prompt", prompt,
        "--size", size
    ]
    
    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=180,
            cwd=skill_path
        )
        
        # 解析输出获取图片URL
        output = result.stdout
        for line in output.split('\n'):
            if line.strip().startswith('http'):
                return line.strip()
        
        return None
    except Exception as e:
        print(f"生成失败: {e}")
        return None


def generate_product_poster(product_type: str, scene: str = "lifestyle") -> str:
    """
    生成商品海报
    
    Args:
        product_type: 产品类型 (watch/phone/cosmetics/shoes/bag)
        scene: 场景 (white_background/lifestyle/creative)
    """
    
    prompts = {
        "watch": {
            "white_background": "Professional studio product photography of an elegant automatic mechanical wristwatch with silver stainless steel case and black leather strap, round dial with sapphire crystal, isolated on pure white seamless background, high-key three-point lighting, soft shadows, 85mm lens f/8, photorealistic, 8K quality, e-commerce ready",
            
            "lifestyle": "Studio Ghibli style lifestyle photograph of a classic mechanical wristwatch on a vintage leather journal on dark walnut desk, morning golden hour light streaming from left, black fountain pen and coffee cup nearby, warm cozy atmosphere, soft watercolor texture, warm color palette, dreamy whimsical mood, 3:4 aspect ratio, anime art style",
            
            "creative": "Dramatic luxury product photography of a premium mechanical wristwatch, dark moody atmosphere, single spotlight from above creating pool of light, rich blacks and gold accents, cinematic lighting, on polished black marble surface, chiaroscuro style, high-end magazine quality, sophisticated and exclusive"
        },
        "phone": {
            "white_background": "Professional studio product photography of a flagship smartphone with titanium frame and ceramic back, large AMOLED display, isolated on pure white seamless background, 3/4 angle showing camera module, high-key lighting, soft reflections, clean and modern, 8K quality",
            
            "lifestyle": "Lifestyle photograph of a premium smartphone on a minimalist white marble desk, modern workspace setting, soft natural window light, leather notebook and metal pen nearby, clean aesthetic, warm 4500K color temperature, shallow depth of field, professional product photography",
            
            "creative": "Futuristic tech product visualization of a flagship smartphone, floating in geometric light environment, cool blue-white ambient glow, reflective dark surface, subtle neon edge lighting, cyberpunk aesthetic, teal and silver color palette, high-tech atmosphere, dramatic composition"
        }
    }
    
    # 获取对应产品的Prompt
    product_prompts = prompts.get(product_type, prompts["watch"])
    selected_prompt = product_prompts.get(scene, product_prompts["lifestyle"])
    
    print(f"🎨 正在生成 {product_type} 的 {scene} 场景海报...")
    print(f"   Prompt: {selected_prompt[:100]}...")
    
    # 生成图片
    image_url = generate_poster(selected_prompt)
    
    return image_url


if __name__ == "__main__":
    # 示例：生成手表海报
    print("="*60)
    print("商品海报生成器")
    print("="*60)
    
    # 生成不同场景
    scenes = ["white_background", "lifestyle", "creative"]
    
    for scene in scenes:
        print(f"\n生成 {scene} 场景...")
        url = generate_product_poster("watch", scene)
        if url:
            print(f"✅ 生成成功: {url}")
        else:
            print("❌ 生成失败")
