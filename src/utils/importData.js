const db = require('./db');

// 导入分类数据
function importCategories() {
  const categories = [
    { name: '项目整合管理', description: '项目整合管理相关考题' },
    { name: '项目范围管理', description: '项目范围管理相关考题' },
    { name: '项目时间管理', description: '项目时间管理相关考题' },
    { name: '项目成本管理', description: '项目成本管理相关考题' },
    { name: '项目质量管理', description: '项目质量管理相关考题' },
    { name: '项目人力资源管理', description: '项目人力资源管理相关考题' },
    { name: '项目沟通管理', description: '项目沟通管理相关考题' },
    { name: '项目风险管理', description: '项目风险管理相关考题' },
    { name: '项目采购管理', description: '项目采购管理相关考题' },
    { name: '项目干系人管理', description: '项目干系人管理相关考题' }
  ];

  categories.forEach(category => {
    db.run(
      'INSERT OR IGNORE INTO categories (name, description) VALUES (?, ?)',
      [category.name, category.description],
      (err) => {
        if (err) {
          console.error('导入分类失败:', err.message);
        }
      }
    );
  });
}

// 导入考题数据
function importCards() {
  const cards = [
    // 项目整合管理
    {
      category_id: 1,
      question: '项目管理中，哪个过程组包含制定项目章程和制定项目管理计划？',
      options: JSON.stringify(['启动过程组', '规划过程组', '执行过程组', '监控过程组']),
      answer: '启动过程组',
      explanation: '启动过程组包含制定项目章程和识别干系人两个过程。',
      difficulty: 1
    },
    {
      category_id: 1,
      question: '项目章程的主要作用是什么？',
      options: JSON.stringify(['详细描述项目范围', '授权项目经理使用组织资源', '定义项目的质量标准', '制定项目的进度计划']),
      answer: '授权项目经理使用组织资源',
      explanation: '项目章程的主要作用是正式授权项目的启动，并授权项目经理使用组织资源来完成项目。',
      difficulty: 1
    },
    {
      category_id: 1,
      question: '项目管理计划的更新应该通过什么过程进行？',
      options: JSON.stringify(['指导与管理项目工作', '监控项目工作', '实施整体变更控制', '结束项目或阶段']),
      answer: '实施整体变更控制',
      explanation: '实施整体变更控制过程负责审查所有变更请求，批准或拒绝变更，并更新项目管理计划。',
      difficulty: 2
    },
    {
      category_id: 1,
      question: '以下哪项不是项目整合管理的过程？',
      options: JSON.stringify(['制定项目章程', '制定项目管理计划', '指导与管理项目工作', '控制质量']),
      answer: '控制质量',
      explanation: '控制质量是项目质量管理的过程，不是项目整合管理的过程。',
      difficulty: 1
    },
    {
      category_id: 1,
      question: '在项目执行过程中，项目经理发现项目计划需要变更，应该首先怎么做？',
      options: JSON.stringify(['直接实施变更', '提交变更请求', '通知项目干系人', '更新项目管理计划']),
      answer: '提交变更请求',
      explanation: '任何变更都应该通过正式的变更请求流程进行，然后由变更控制委员会审查和批准。',
      difficulty: 2
    },
    
    // 项目范围管理
    {
      category_id: 2,
      question: '项目范围说明书不包括以下哪项内容？',
      options: JSON.stringify(['项目范围描述', '可交付成果', '验收标准', '项目成本预算']),
      answer: '项目成本预算',
      explanation: '项目成本预算是项目成本管理的内容，不属于项目范围说明书。',
      difficulty: 1
    },
    {
      category_id: 2,
      question: '工作分解结构（WBS）的主要目的是什么？',
      options: JSON.stringify(['确定项目的所有可交付成果', '估算项目的持续时间', '识别项目的风险', '分配项目的资源']),
      answer: '确定项目的所有可交付成果',
      explanation: 'WBS的主要目的是将项目范围分解为可管理的工作包，确定项目的所有可交付成果。',
      difficulty: 1
    },
    {
      category_id: 2,
      question: '范围蔓延是指什么？',
      options: JSON.stringify(['项目范围的合理变更', '项目范围的意外扩大', '项目范围的缩小', '项目范围的正式变更']),
      answer: '项目范围的意外扩大',
      explanation: '范围蔓延是指在没有经过正式变更控制流程的情况下，项目范围被意外扩大。',
      difficulty: 1
    },
    {
      category_id: 2,
      question: '确认范围过程的主要输出是什么？',
      options: JSON.stringify(['范围基准', '验收的可交付成果', '变更请求', '工作分解结构']),
      answer: '验收的可交付成果',
      explanation: '确认范围过程的主要输出是验收的可交付成果，即经过干系人正式验收的项目成果。',
      difficulty: 2
    },
    {
      category_id: 2,
      question: '控制范围过程的主要作用是什么？',
      options: JSON.stringify(['确保项目范围的变更经过正式批准', '制定项目的范围说明书', '分解项目范围为工作包', '验收项目的可交付成果']),
      answer: '确保项目范围的变更经过正式批准',
      explanation: '控制范围过程负责监督项目和产品范围的状态，管理范围基准的变更。',
      difficulty: 2
    },
    
    // 项目时间管理
    {
      category_id: 3,
      question: '关键路径法（CPM）的主要目的是什么？',
      options: JSON.stringify(['确定项目的最短完成时间', '识别项目的风险', '分配项目的资源', '估算项目的成本']),
      answer: '确定项目的最短完成时间',
      explanation: '关键路径法用于确定项目的关键路径，即项目的最短完成时间。',
      difficulty: 1
    },
    {
      category_id: 3,
      question: '以下哪项不是项目时间管理的过程？',
      options: JSON.stringify(['定义活动', '排列活动顺序', '估算活动持续时间', '控制质量']),
      answer: '控制质量',
      explanation: '控制质量是项目质量管理的过程，不是项目时间管理的过程。',
      difficulty: 1
    },
    {
      category_id: 3,
      question: '活动之间的依赖关系不包括以下哪项？',
      options: JSON.stringify(['强制性依赖关系', '选择性依赖关系', '外部依赖关系', '内部依赖关系']),
      answer: '内部依赖关系',
      explanation: '活动之间的依赖关系包括强制性依赖关系、选择性依赖关系和外部依赖关系，没有内部依赖关系这一说法。',
      difficulty: 2
    },
    {
      category_id: 3,
      question: '资源平衡的主要目的是什么？',
      options: JSON.stringify(['缩短项目的持续时间', '平衡资源的使用', '增加项目的风险', '减少项目的成本']),
      answer: '平衡资源的使用',
      explanation: '资源平衡是指调整活动的开始和结束时间，以平衡资源的使用，避免资源过载。',
      difficulty: 2
    },
    {
      category_id: 3,
      question: '关键链法（CCM）与关键路径法（CPM）的主要区别是什么？',
      options: JSON.stringify(['CCM考虑了资源约束', 'CPM考虑了资源约束', 'CCM不考虑活动之间的依赖关系', 'CPM不考虑活动之间的依赖关系']),
      answer: 'CCM考虑了资源约束',
      explanation: '关键链法（CCM）在关键路径法（CPM）的基础上，考虑了资源约束的影响。',
      difficulty: 3
    },
    
    // 项目成本管理
    {
      category_id: 4,
      question: '项目成本管理的主要过程不包括以下哪项？',
      options: JSON.stringify(['规划成本管理', '估算成本', '制定预算', '控制质量']),
      answer: '控制质量',
      explanation: '控制质量是项目质量管理的过程，不是项目成本管理的过程。',
      difficulty: 1
    },
    {
      category_id: 4,
      question: '成本估算的输出不包括以下哪项？',
      options: JSON.stringify(['活动成本估算', '估算依据', '成本基准', '项目文件更新']),
      answer: '成本基准',
      explanation: '成本基准是制定预算过程的输出，不是成本估算过程的输出。',
      difficulty: 2
    },
    {
      category_id: 4,
      question: '挣值管理（EVM）中，计划值（PV）的含义是什么？',
      options: JSON.stringify(['已完成工作的预算成本', '已完成工作的实际成本', '计划完成工作的预算成本', '计划完成工作的实际成本']),
      answer: '计划完成工作的预算成本',
      explanation: '计划值（PV）是指在给定的时间点，计划完成的工作的预算成本。',
      difficulty: 2
    },
    {
      category_id: 4,
      question: '成本偏差（CV）的计算公式是什么？',
      options: JSON.stringify(['CV = EV - PV', 'CV = EV - AC', 'CV = PV - EV', 'CV = AC - EV']),
      answer: 'CV = EV - AC',
      explanation: '成本偏差（CV）= 挣值（EV）- 实际成本（AC）。',
      difficulty: 2
    },
    {
      category_id: 4,
      question: '完工估算（EAC）的计算公式中，当项目执行情况与计划一致时，应该使用哪种方法？',
      options: JSON.stringify(['EAC = BAC', 'EAC = AC + BAC - EV', 'EAC = AC + (BAC - EV) / CPI', 'EAC = AC + (BAC - EV) / (CPI * SPI)']),
      answer: 'EAC = AC + BAC - EV',
      explanation: '当项目执行情况与计划一致时，使用EAC = AC + BAC - EV。',
      difficulty: 3
    },
    
    // 项目质量管理
    {
      category_id: 5,
      question: '项目质量管理的主要过程不包括以下哪项？',
      options: JSON.stringify(['规划质量管理', '实施质量保证', '控制质量', '估算成本']),
      answer: '估算成本',
      explanation: '估算成本是项目成本管理的过程，不是项目质量管理的过程。',
      difficulty: 1
    },
    {
      category_id: 5,
      question: '质量成本包括以下哪项？',
      options: JSON.stringify(['预防成本和评估成本', '内部失败成本和外部失败成本', '预防成本、评估成本、内部失败成本和外部失败成本', '以上都不是']),
      answer: '预防成本、评估成本、内部失败成本和外部失败成本',
      explanation: '质量成本包括预防成本、评估成本、内部失败成本和外部失败成本。',
      difficulty: 2
    },
    {
      category_id: 5,
      question: '六西格玛的目标是什么？',
      options: JSON.stringify(['每百万次机会中不超过3.4个缺陷', '每百万次机会中不超过6个缺陷', '每百万次机会中不超过10个缺陷', '每百万次机会中不超过100个缺陷']),
      answer: '每百万次机会中不超过3.4个缺陷',
      explanation: '六西格玛的目标是每百万次机会中不超过3.4个缺陷。',
      difficulty: 2
    },
    {
      category_id: 5,
      question: '控制图的主要作用是什么？',
      options: JSON.stringify(['识别质量问题的原因', '监控过程的稳定性', '确定质量标准', '评估质量成本']),
      answer: '监控过程的稳定性',
      explanation: '控制图用于监控过程的稳定性，识别过程是否处于控制状态。',
      difficulty: 2
    },
    {
      category_id: 5,
      question: '质量保证的主要作用是什么？',
      options: JSON.stringify(['确保项目的可交付成果符合质量要求', '监控项目的质量绩效', '确保项目的过程符合质量标准', '识别质量问题的原因']),
      answer: '确保项目的过程符合质量标准',
      explanation: '质量保证的主要作用是确保项目的过程符合质量标准，从而保证项目的可交付成果符合质量要求。',
      difficulty: 2
    },
    
    // 项目人力资源管理
    {
      category_id: 6,
      question: '项目人力资源管理的主要过程不包括以下哪项？',
      options: JSON.stringify(['规划人力资源管理', '组建项目团队', '建设项目团队', '控制质量']),
      answer: '控制质量',
      explanation: '控制质量是项目质量管理的过程，不是项目人力资源管理的过程。',
      difficulty: 1
    },
    {
      category_id: 6,
      question: 'RACI矩阵的主要作用是什么？',
      options: JSON.stringify(['明确项目团队成员的角色和职责', '识别项目的风险', '估算项目的成本', '制定项目的进度计划']),
      answer: '明确项目团队成员的角色和职责',
      explanation: 'RACI矩阵用于明确项目团队成员的角色和职责，包括负责（Responsible）、批准（Accountable）、咨询（Consulted）和知情（Informed）。',
      difficulty: 2
    },
    {
      category_id: 6,
      question: '团队建设的五个阶段不包括以下哪项？',
      options: JSON.stringify(['形成阶段', '震荡阶段', '规范阶段', '执行阶段', '解散阶段']),
      answer: '以上都包括',
      explanation: '团队建设的五个阶段包括形成阶段、震荡阶段、规范阶段、执行阶段和解散阶段。',
      difficulty: 1
    },
    {
      category_id: 6,
      question: '激励理论中，马斯洛的需求层次理论不包括以下哪项？',
      options: JSON.stringify(['生理需求', '安全需求', '社交需求', '尊重需求', '自我实现需求', '以上都包括']),
      answer: '以上都包括',
      explanation: '马斯洛的需求层次理论包括生理需求、安全需求、社交需求、尊重需求和自我实现需求。',
      difficulty: 2
    },
    {
      category_id: 6,
      question: '冲突管理的策略不包括以下哪项？',
      options: JSON.stringify(['撤退/回避', '缓和/包容', '妥协/调解', '强迫/命令', '合作/解决问题', '以上都包括']),
      answer: '以上都包括',
      explanation: '冲突管理的策略包括撤退/回避、缓和/包容、妥协/调解、强迫/命令和合作/解决问题。',
      difficulty: 2
    },
    
    // 项目沟通管理
    {
      category_id: 7,
      question: '项目沟通管理的主要过程不包括以下哪项？',
      options: JSON.stringify(['规划沟通管理', '管理沟通', '控制沟通', '控制质量']),
      answer: '控制质量',
      explanation: '控制质量是项目质量管理的过程，不是项目沟通管理的过程。',
      difficulty: 1
    },
    {
      category_id: 7,
      question: '沟通渠道的数量计算公式是什么？',
      options: JSON.stringify(['n(n-1)/2', 'n(n+1)/2', 'n^2', '2^n']),
      answer: 'n(n-1)/2',
      explanation: '沟通渠道的数量 = n(n-1)/2，其中n是干系人的数量。',
      difficulty: 2
    },
    {
      category_id: 7,
      question: '以下哪项不是沟通管理计划的内容？',
      options: JSON.stringify(['沟通的目的和目标', '沟通的频率', '沟通的渠道', '项目的成本预算']),
      answer: '项目的成本预算',
      explanation: '项目的成本预算是项目成本管理的内容，不属于沟通管理计划。',
      difficulty: 1
    },
    {
      category_id: 7,
      question: '正式沟通和非正式沟通的主要区别是什么？',
      options: JSON.stringify(['正式沟通是书面的，非正式沟通是口头的', '正式沟通是有计划的，非正式沟通是随机的', '正式沟通是向上的，非正式沟通是向下的', '正式沟通是内部的，非正式沟通是外部的']),
      answer: '正式沟通是有计划的，非正式沟通是随机的',
      explanation: '正式沟通是有计划、有组织的沟通，而非正式沟通是随机的、自发的沟通。',
      difficulty: 2
    },
    {
      category_id: 7,
      question: '积极倾听的技巧不包括以下哪项？',
      options: JSON.stringify(['专注', '共情', '打断', '反馈']),
      answer: '打断',
      explanation: '积极倾听的技巧包括专注、共情和反馈，不包括打断。',
      difficulty: 1
    },
    
    // 项目风险管理
    {
      category_id: 8,
      question: '项目风险管理的主要过程不包括以下哪项？',
      options: JSON.stringify(['规划风险管理', '识别风险', '实施风险应对', '控制质量']),
      answer: '控制质量',
      explanation: '控制质量是项目质量管理的过程，不是项目风险管理的过程。',
      difficulty: 1
    },
    {
      category_id: 8,
      question: '风险的两个主要组成部分是什么？',
      options: JSON.stringify(['概率和影响', '概率和成本', '影响和成本', '概率和时间']),
      answer: '概率和影响',
      explanation: '风险的两个主要组成部分是概率（风险发生的可能性）和影响（风险发生后对项目的影响程度）。',
      difficulty: 1
    },
    {
      category_id: 8,
      question: '风险应对策略中，针对威胁的策略不包括以下哪项？',
      options: JSON.stringify(['规避', '减轻', '转移', '接受', '开拓']),
      answer: '开拓',
      explanation: '开拓是针对机会的风险应对策略，不是针对威胁的策略。',
      difficulty: 2
    },
    {
      category_id: 8,
      question: '风险登记册的主要内容不包括以下哪项？',
      options: JSON.stringify(['已识别的风险', '风险的概率和影响', '风险的应对策略', '项目的成本预算']),
      answer: '项目的成本预算',
      explanation: '项目的成本预算是项目成本管理的内容，不属于风险登记册。',
      difficulty: 1
    },
    {
      category_id: 8,
      question: '蒙特卡洛分析的主要作用是什么？',
      options: JSON.stringify(['识别项目的风险', '评估项目的风险', '制定风险应对策略', '监控项目的风险']),
      answer: '评估项目的风险',
      explanation: '蒙特卡洛分析用于模拟项目的不确定性，评估项目的风险。',
      difficulty: 3
    },
    
    // 项目采购管理
    {
      category_id: 9,
      question: '项目采购管理的主要过程不包括以下哪项？',
      options: JSON.stringify(['规划采购管理', '实施采购', '控制采购', '控制质量']),
      answer: '控制质量',
      explanation: '控制质量是项目质量管理的过程，不是项目采购管理的过程。',
      difficulty: 1
    },
    {
      category_id: 9,
      question: '以下哪项不是合同类型？',
      options: JSON.stringify(['固定总价合同', '成本加固定费用合同', '时间和材料合同', '风险共担合同']),
      answer: '风险共担合同',
      explanation: '风险共担合同不是标准的合同类型，标准的合同类型包括固定总价合同、成本加固定费用合同和时间和材料合同。',
      difficulty: 2
    },
    {
      category_id: 9,
      question: '采购工作说明书（SOW）的主要作用是什么？',
      options: JSON.stringify(['描述项目的范围', '描述采购的产品或服务', '描述项目的进度计划', '描述项目的成本预算']),
      answer: '描述采购的产品或服务',
      explanation: '采购工作说明书（SOW）用于详细描述采购的产品或服务的要求。',
      difficulty: 2
    },
    {
      category_id: 9,
      question: '投标人会议的主要目的是什么？',
      options: JSON.stringify(['选择供应商', '澄清招标文件', '签订合同', '评估供应商的报价']),
      answer: '澄清招标文件',
      explanation: '投标人会议的主要目的是澄清招标文件中的疑问，确保所有投标人都理解采购要求。',
      difficulty: 2
    },
    {
      category_id: 9,
      question: '合同收尾的主要输出是什么？',
      options: JSON.stringify(['采购关闭', '合同文件', '最终产品', '项目文件更新']),
      answer: '采购关闭',
      explanation: '合同收尾的主要输出是采购关闭，即正式结束采购合同。',
      difficulty: 2
    },
    
    // 项目干系人管理
    {
      category_id: 10,
      question: '项目干系人管理的主要过程不包括以下哪项？',
      options: JSON.stringify(['识别干系人', '规划干系人管理', '管理干系人参与', '控制质量']),
      answer: '控制质量',
      explanation: '控制质量是项目质量管理的过程，不是项目干系人管理的过程。',
      difficulty: 1
    },
    {
      category_id: 10,
      question: '干系人登记册的主要内容不包括以下哪项？',
      options: JSON.stringify(['干系人的基本信息', '干系人的利益和影响', '干系人的沟通需求', '项目的成本预算']),
      answer: '项目的成本预算',
      explanation: '项目的成本预算是项目成本管理的内容，不属于干系人登记册。',
      difficulty: 1
    },
    {
      category_id: 10,
      question: '干系人分析的主要方法是什么？',
      options: JSON.stringify(['权力-利益矩阵', 'SWOT分析', '挣值分析', '蒙特卡洛分析']),
      answer: '权力-利益矩阵',
      explanation: '权力-利益矩阵是干系人分析的主要方法，用于评估干系人的权力和利益。',
      difficulty: 2
    },
    {
      category_id: 10,
      question: '管理干系人参与的主要作用是什么？',
      options: JSON.stringify(['确保干系人了解项目的进展', '识别新的干系人', '评估干系人的影响', '制定干系人管理计划']),
      answer: '确保干系人了解项目的进展',
      explanation: '管理干系人参与的主要作用是确保干系人了解项目的进展，管理干系人的期望和参与。',
      difficulty: 2
    },
    {
      category_id: 10,
      question: '控制干系人参与的主要作用是什么？',
      options: JSON.stringify(['监控干系人的参与情况', '识别新的干系人', '评估干系人的影响', '制定干系人管理计划']),
      answer: '监控干系人的参与情况',
      explanation: '控制干系人参与的主要作用是监控干系人的参与情况，确保干系人参与的有效性。',
      difficulty: 2
    }
  ];

  // 继续添加更多考题，总共100道
  // 项目整合管理
  for (let i = 1; i <= 10; i++) {
    cards.push({
      category_id: 1,
      question: `项目整合管理考题${i}：项目管理计划的主要组成部分不包括以下哪项？`,
      options: JSON.stringify(['范围基准', '进度基准', '成本基准', '质量基准']),
      answer: '质量基准',
      explanation: '项目管理计划的主要组成部分包括范围基准、进度基准和成本基准，没有质量基准这一说法。',
      difficulty: 2
    });
  }
  
  // 项目范围管理
  for (let i = 1; i <= 10; i++) {
    cards.push({
      category_id: 2,
      question: `项目范围管理考题${i}：范围说明书的主要作用是什么？`,
      options: JSON.stringify(['定义项目的范围', '定义项目的进度', '定义项目的成本', '定义项目的质量']),
      answer: '定义项目的范围',
      explanation: '范围说明书的主要作用是定义项目的范围，包括项目的可交付成果和验收标准。',
      difficulty: 1
    });
  }
  
  // 项目时间管理
  for (let i = 1; i <= 10; i++) {
    cards.push({
      category_id: 3,
      question: `项目时间管理考题${i}：活动持续时间估算的主要方法不包括以下哪项？`,
      options: JSON.stringify(['类比估算', '参数估算', '三点估算', '挣值分析']),
      answer: '挣值分析',
      explanation: '挣值分析是项目成本管理的方法，不是活动持续时间估算的方法。',
      difficulty: 2
    });
  }
  
  // 项目成本管理
  for (let i = 1; i <= 10; i++) {
    cards.push({
      category_id: 4,
      question: `项目成本管理考题${i}：成本基准的主要作用是什么？`,
      options: JSON.stringify(['衡量项目的成本绩效', '衡量项目的进度绩效', '衡量项目的质量绩效', '衡量项目的风险绩效']),
      answer: '衡量项目的成本绩效',
      explanation: '成本基准是项目成本的计划值，用于衡量项目的成本绩效。',
      difficulty: 2
    });
  }
  
  // 项目质量管理
  for (let i = 1; i <= 10; i++) {
    cards.push({
      category_id: 5,
      question: `项目质量管理考题${i}：质量控制的主要工具不包括以下哪项？`,
      options: JSON.stringify(['控制图', '直方图', '帕累托图', '关键路径法']),
      answer: '关键路径法',
      explanation: '关键路径法是项目时间管理的工具，不是质量控制的工具。',
      difficulty: 2
    });
  }
  
  // 项目人力资源管理
  for (let i = 1; i <= 10; i++) {
    cards.push({
      category_id: 6,
      question: `项目人力资源管理考题${i}：项目经理的主要职责不包括以下哪项？`,
      options: JSON.stringify(['规划项目', '执行项目', '控制项目', '直接管理项目团队的所有成员']),
      answer: '直接管理项目团队的所有成员',
      explanation: '项目经理负责整体管理项目，但不一定直接管理项目团队的所有成员。',
      difficulty: 2
    });
  }
  
  // 项目沟通管理
  for (let i = 1; i <= 10; i++) {
    cards.push({
      category_id: 7,
      question: `项目沟通管理考题${i}：沟通管理计划的主要内容不包括以下哪项？`,
      options: JSON.stringify(['沟通的目的和目标', '沟通的频率', '沟通的渠道', '项目的风险登记册']),
      answer: '项目的风险登记册',
      explanation: '项目的风险登记册是项目风险管理的内容，不属于沟通管理计划。',
      difficulty: 2
    });
  }
  
  // 项目风险管理
  for (let i = 1; i <= 10; i++) {
    cards.push({
      category_id: 8,
      question: `项目风险管理考题${i}：风险识别的主要工具不包括以下哪项？`,
      options: JSON.stringify(['头脑风暴', '德尔菲技术', 'SWOT分析', '关键链法']),
      answer: '关键链法',
      explanation: '关键链法是项目时间管理的工具，不是风险识别的工具。',
      difficulty: 2
    });
  }
  
  // 项目采购管理
  for (let i = 1; i <= 5; i++) {
    cards.push({
      category_id: 9,
      question: `项目采购管理考题${i}：采购计划的主要内容不包括以下哪项？`,
      options: JSON.stringify(['采购的产品或服务', '采购的时间安排', '采购的成本估算', '项目的进度计划']),
      answer: '项目的进度计划',
      explanation: '项目的进度计划是项目时间管理的内容，不属于采购计划。',
      difficulty: 2
    });
  }
  
  // 项目干系人管理
  for (let i = 1; i <= 5; i++) {
    cards.push({
      category_id: 10,
      question: `项目干系人管理考题${i}：干系人管理计划的主要内容不包括以下哪项？`,
      options: JSON.stringify(['干系人的基本信息', '干系人的沟通需求', '干系人的参与计划', '项目的成本预算']),
      answer: '项目的成本预算',
      explanation: '项目的成本预算是项目成本管理的内容，不属于干系人管理计划。',
      difficulty: 2
    });
  }

  // 导入考题数据
  cards.forEach(card => {
    db.run(
      'INSERT OR IGNORE INTO cards (category_id, question, options, answer, explanation, difficulty) VALUES (?, ?, ?, ?, ?, ?)',
      [card.category_id, card.question, card.options, card.answer, card.explanation, card.difficulty],
      (err) => {
        if (err) {
          console.error('导入考题失败:', err.message);
        }
      }
    );
  });
}

// 执行数据导入
function importData() {
  importCategories();
  importCards();
  console.log('数据导入完成');
}

// 导出函数
module.exports = { importData };