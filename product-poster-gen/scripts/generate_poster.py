#!/usr/bin/env python3
"""
商品海报生成脚本 - 基于豆包Seedream 5.0 Lite
"""
import os
import sys
import base64
import requests
import json

API_KEY = os.getenv("ARK_API_KEY", "9c6861ea-8890-40d4-a2fb-54315b6ec3fc")
BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks"

def encode_image_to_base64(image_path: str) -> str:
    """读取本地图片并转换为 Base64 Data URI"""
    if not os.path.exists(image_path):
        print(f"Error: Image file not found at {image_path}")
        sys.exit(1)
    
    ext = os.path.splitext(image_path)[1].lower()
    mime_type = "image/png" if ext == ".png" else "image/jpeg"
    
    with open(image_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')
    
    return f"data:{mime_type};base64,{encoded}"

def generate_poster(image_path: str, scene_type: str, ratio: str, output_path: str):
    """生成商品海报"""
    
    # 场景提示词
    prompts = {
        "white": "Create a professional studio product photograph on pure white seamless background (RGB 255,255,255). The product is centered, occupying 85-90% of the frame. Soft three-point studio lighting with gentle shadows. Razor-sharp focus. Clean, minimal, e-commerce style.",
        
        "lifestyle": "Create a lifestyle product photograph in a modern, clean environment. Natural soft lighting from a window. The product is elegantly placed on a minimalist surface with subtle, coordinated props nearby. Warm, inviting aesthetic. Instagram-friendly composition. Professional photography quality.",
        
        "creative": "Create an artistic product photograph with dramatic lighting and creative composition. Moody atmosphere with elegant shadows. High-end magazine editorial style. Premium luxury feel. Cinematic color grading."
    }
    
    # 尺寸比例
    ratios = {
        "1:1": "1:1",
        "3:4": "3:4", 
        "4:3": "4:3",
        "16:9": "16:9"
    }
    
    prompt = prompts.get(scene_type, prompts["lifestyle"])
    aspect_ratio = ratios.get(ratio, "1:1")
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    payload = {
        "model": "doubao-seedream-4-5-251128",
        "content": [
            {"type": "image_url", "image_url": {"url": encode_image_to_base64(image_path)}},
            {"type": "text", "text": prompt}
        ],
        "ratio": aspect_ratio,
        "watermark": False
    }
    
    print(f"🎨 正在生成海报...")
    print(f"   场景: {scene_type}")
    print(f"   比例: {aspect_ratio}")
    
    # 提交任务
    response = requests.post(BASE_URL, headers=headers, json=payload)
    response.raise_for_status()
    task_data = response.json()
    task_id = task_data.get("id") or task_data.get("data", {}).get("id")
    
    print(f"✅ 任务提交成功: {task_id}")
    print(f"⏳ 正在渲染 (约1-2分钟)...")
    
    # 轮询等待
    while True:
        res = requests.get(f"{BASE_URL}/{task_id}", headers=headers)
        res.raise_for_status()
        status_data = res.json()
        
        status = status_data.get("status") or status_data.get("data", {}).get("status")
        
        if status == "succeeded":
            # 提取图片URL
            image_url = None
            try:
                if "content" in status_data and isinstance(status_data["content"], dict):
                    image_url = status_data["content"].get("image_url")
                elif "result" in status_data and isinstance(status_data["result"], dict):
                    image_url = status_data["result"].get("image_url")
                elif "data" in status_data and isinstance(status_data["data"], dict):
                    if "result" in status_data["data"]:
                        image_url = status_data["data"]["result"].get("image_url")
            except:
                pass
            
            if image_url:
                print(f"\n⬇️  下载海报...")
                import urllib.request
                urllib.request.urlretrieve(image_url, output_path)
                print(f"✅ 海报已保存: {output_path}")
                return output_path
            else:
                print(f"⚠️  无法提取图片URL")
                return None
        
        elif status in ["failed", "error"]:
            print(f"\n❌ 任务失败: {status_data}")
            return None
        
        print(f"\r🔄 状态: {status} | 等待中...", end="", flush=True)
        import time
        time.sleep(5)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 generate_poster.py <image_path> <scene_type> <ratio>")
        print("  scene_type: white | lifestyle | creative")
        print("  ratio: 1:1 | 3:4 | 4:3 | 16:9")
        sys.exit(1)
    
    image_path = sys.argv[1]
    scene_type = sys.argv[2]
    ratio = sys.argv[3]
    
    output_path = f"/workspace/projects/media/poster_{scene_type}_{ratio.replace(':', '_')}.jpg"
    
    result = generate_poster(image_path, scene_type, ratio, output_path)
    
    if result:
        print(f"\n🎉 海报生成成功!")
        print(json.dumps({"success": True, "path": result}, ensure_ascii=False))
    else:
        print(f"\n❌ 海报生成失败")
        sys.exit(1)
