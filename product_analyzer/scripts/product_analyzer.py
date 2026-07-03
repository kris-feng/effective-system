#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
抖音商品分析工具 - 搜索商品信息并生成金句文案
"""

import sys
import json
import re

def analyze_product(product_name: str, search_results: list) -> dict:
    """
    分析商品信息并生成金句
    """
    
    # 从搜索结果中提取关键信息
    all_text = " ".join(search_results)
    
    # 提炼卖点
    selling_points = extract_selling_points(all_text, product_name)
    
    # 生成金句
    oral_sentences = generate_oral_sentences(product_name, selling_points)
    scenario_sentences = generate_scenario_sentences(product_name, selling_points)
    professional_sentences = generate_professional_sentences(product_name, selling_points)
    
    return {
        "product_name": product_name,
        "selling_points": selling_points,
        "sentences": {
            "oral": oral_sentences,
            "scenario": scenario_sentences,
            "professional": professional_sentences
        }
    }


def extract_selling_points(text: str, product_name: str) -> list:
    """从文本中提取卖点"""
    
    selling_points = []
    
    # 提取快充信息
    fast_charge = re.search(r'(\d+)W[\s]*(?:有线|无线|快充|秒充|闪充)?', text)
    if fast_charge:
        selling_points.append(f"{fast_charge.group(1)}W极速快充")
    
    # 提取处理器信息
    processor = re.search(r'骁龙[\s]*(\d+(?:\s*至尊版|\s*Gen\s*\d+)?)', text, re.IGNORECASE)
    if processor:
        selling_points.append(f"骁龙{processor.group(1)}处理器")
    elif 'A17' in text or 'A18' in text:
        chip = re.search(r'A(17|18)\s*(?:Pro)?', text)
        if chip:
            selling_points.append(f"A{chip.group(1)}仿生芯片")
    
    # 提取像素信息
    camera = re.search(r'(\d+)(?:万|MP|mp)?(?:像素|摄像)', text)
    if camera:
        selling_points.append(f"{camera.group(1)}万像素超清影像")
    
    # 提取屏幕刷新率
    refresh = re.search(r'(\d+)Hz(?:\s*高刷)?', text)
    if refresh:
        selling_points.append(f"{refresh.group(1)}Hz高刷屏幕")
    
    # 提取电池容量
    battery = re.search(r'(\d+)mAh', text, re.IGNORECASE)
    if battery:
        selling_points.append(f"{battery.group(1)}mAh大电池")
    
    # 提取屏幕分辨率
    resolution = re.search(r'([12]\.?\d?[Kk])(?:\s*(?:屏|分辨率|显示))', text)
    if resolution:
        selling_points.append(f"{resolution.group(1).upper()}超清屏幕")
    
    # 如果没有提取到足够卖点，使用默认值
    default_points = [
        "性能强劲，流畅不卡顿",
        "颜值在线，手感一流", 
        "续航给力，告别焦虑",
        "拍照出色，记录美好",
        "品质可靠，用得放心"
    ]
    
    while len(selling_points) < 5:
        selling_points.append(default_points[len(selling_points)])
    
    return selling_points[:5]


def generate_oral_sentences(product_name: str, selling_points: list) -> list:
    """生成口语化金句"""
    
    templates = [
        "家人们！这{}，{}，简直绝绝子！",
        "用了{}才知道，原来{}这么爽！",
        "姐妹们！{}真的太香了，{}！",
        "救命！这{}，{}，闭眼入不踩雷！",
        "被{}拿捏住了！{}，真香警告！"
    ]
    
    emojis = ["📸", "⚡", "🔥", "💯", "👍", "✨", "😍", "🎉"]
    
    sentences = []
    for i, point in enumerate(selling_points[:5]):
        template = templates[i % len(templates)]
        emoji = emojis[i % len(emojis)]
        
        sentence = template.format(product_name, point) + emoji
        sentences.append(sentence)
    
    return sentences


def generate_scenario_sentences(product_name: str, selling_points: list) -> list:
    """生成场景化金句"""
    
    scenarios = [
        "早上匆忙出门，{}，{}，全天安心不掉线！",
        "周末和朋友出去玩，{}，{}，朋友圈直接刷屏！",
        "熬夜加班赶项目，{}，{}，效率翻倍不卡顿！",
        "周末宅家追热剧，{}，{}，沉浸体验爽翻天！",
        "旅行途中拍风景，{}，{}，每张都是大片感！"
    ]
    
    benefits = [
        "电量满满安全感",
        "随手一拍就出片",
        "丝滑流畅无压力",
        "视觉享受超震撼",
        "持久续航不焦虑"
    ]
    
    sentences = []
    for i, point in enumerate(selling_points[:5]):
        scenario = scenarios[i % len(scenarios)]
        benefit = benefits[i % len(benefits)]
        
        sentence = scenario.format(f"掏出{product_name}", point, benefit)
        sentences.append(sentence)
    
    return sentences


def generate_professional_sentences(product_name: str, selling_points: list) -> list:
    """生成专业化金句"""
    
    templates = [
        "{}，{}，实测性能表现远超同级竞品。",
        "搭载{}，{}，跑分数据行业领先。",
        "配备{}，{}，专业级表现无压力。",
        "采用{}技术，{}，综合体验全面升级。",
        "内置{}，{}，实测数据表现优异。"
    ]
    
    data_descs = [
        "安兔兔跑分突破200万",
        "续航测试连续使用12小时",
        "DXOMARK影像评分140+",
        "色域覆盖100% DCI-P3",
        "充电效率提升40%"
    ]
    
    sentences = []
    for i, point in enumerate(selling_points[:5]):
        template = templates[i % len(templates)]
        data = data_descs[i % len(data_descs)]
        
        sentence = template.format(product_name, point, data)
        sentences.append(sentence)
    
    return sentences


def main():
    """主函数"""
    if len(sys.argv) < 2:
        print("Usage: python3 product_analyzer.py <商品名称>")
        print("Example: python3 product_analyzer.py '小米17 Pro'")
        sys.exit(1)
    
    product_name = sys.argv[1]
    
    # 示例数据（实际使用时应从搜索API获取）
    sample_results = [
        f"{product_name}评测：骁龙8至尊版处理器，性能强劲",
        f"{product_name}卖点：徕卡影像，一英寸大底",
        f"{product_name}特点：120W快充，5000mAh大电池",
        f"{product_name}配置：2K屏幕，120Hz刷新率"
    ]
    
    result = analyze_product(product_name, sample_results)
    
    # 输出JSON格式结果
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
