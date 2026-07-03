const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// 引入数据库
const db = require('./utils/db');
const { importData } = require('./utils/importData');

// 引入路由
const cardsRouter = require('./routes/cards');
const studyRouter = require('./routes/study');
const feedbackRouter = require('./routes/feedback');
const statsRouter = require('./routes/stats');

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.get('/', (req, res) => {
  res.send('信息系统项目管理师背题卡后端服务');
});

// 导入数据路由
app.get('/import-data', (req, res) => {
  try {
    importData();
    res.send('数据导入成功');
  } catch (error) {
    res.status(500).send('数据导入失败');
  }
});

// 卡片管理路由
app.use('/api/cards', cardsRouter);

// 学习模式路由
app.use('/api/study', studyRouter);

// 评价反馈和难度调整路由
app.use('/api/feedback', feedbackRouter);

// 进度追踪和统计路由
app.use('/api/stats', statsRouter);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});