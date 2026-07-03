const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// 顺序学习 - 获取卡片
router.get('/sequential', (req, res) => {
  const { category_id, start_id = 1 } = req.query;
  let query = 'SELECT * FROM cards';
  const params = [];
  
  if (category_id) {
    query += ' WHERE category_id = ?';
    params.push(category_id);
  }
  
  query += ' ORDER BY id ASC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // 找到从start_id开始的卡片
    const startIndex = rows.findIndex(card => card.id >= start_id);
    const nextCards = startIndex !== -1 ? rows.slice(startIndex, startIndex + 5) : [];
    
    res.json(nextCards);
  });
});

// 随机学习 - 获取卡片
router.get('/random', (req, res) => {
  const { category_id, limit = 5 } = req.query;
  let query = 'SELECT * FROM cards';
  const params = [];
  
  if (category_id) {
    query += ' WHERE category_id = ?';
    params.push(category_id);
  }
  
  query += ' ORDER BY RANDOM() LIMIT ?';
  params.push(limit);
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 艾宾浩斯复习 - 获取需要复习的卡片
router.get('/review', (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    res.status(400).json({ error: '请提供用户ID' });
    return;
  }
  
  // 这里简化实现，实际应该根据艾宾浩斯遗忘曲线算法计算需要复习的卡片
  // 暂时返回最近学习过的卡片
  const query = `
    SELECT c.* FROM cards c
    JOIN study_records sr ON c.id = sr.card_id
    WHERE sr.user_id = ?
    ORDER BY sr.study_time DESC
    LIMIT 10
  `;
  
  db.all(query, [user_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 记录学习结果
router.post('/record', (req, res) => {
  const { user_id, card_id, is_correct } = req.body;
  if (!user_id || !card_id || is_correct === undefined) {
    res.status(400).json({ error: '请提供完整的学习记录' });
    return;
  }
  
  db.run(
    'INSERT INTO study_records (user_id, card_id, is_correct) VALUES (?, ?, ?)',
    [user_id, card_id, is_correct],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, user_id, card_id, is_correct });
    }
  );
});

// 收藏卡片
router.post('/bookmark', (req, res) => {
  const { user_id, card_id } = req.body;
  if (!user_id || !card_id) {
    res.status(400).json({ error: '请提供用户ID和卡片ID' });
    return;
  }
  
  db.run(
    'INSERT OR IGNORE INTO bookmarks (user_id, card_id) VALUES (?, ?)',
    [user_id, card_id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: '卡片收藏成功' });
    }
  );
});

// 取消收藏卡片
router.delete('/bookmark', (req, res) => {
  const { user_id, card_id } = req.body;
  if (!user_id || !card_id) {
    res.status(400).json({ error: '请提供用户ID和卡片ID' });
    return;
  }
  
  db.run(
    'DELETE FROM bookmarks WHERE user_id = ? AND card_id = ?',
    [user_id, card_id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: '取消收藏成功' });
    }
  );
});

// 获取用户收藏的卡片
router.get('/bookmarks', (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    res.status(400).json({ error: '请提供用户ID' });
    return;
  }
  
  const query = `
    SELECT c.* FROM cards c
    JOIN bookmarks b ON c.id = b.card_id
    WHERE b.user_id = ?
  `;
  
  db.all(query, [user_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;