const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// 评价卡片
router.post('/rate', (req, res) => {
  const { card_id, rating } = req.body;
  if (!card_id || !rating || rating < 1 || rating > 5) {
    res.status(400).json({ error: '请提供有效的卡片ID和评分（1-5）' });
    return;
  }
  
  db.run(
    'UPDATE cards SET rating = ? WHERE id = ?',
    [rating, card_id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: '卡片不存在' });
        return;
      }
      res.json({ message: '评价成功' });
    }
  );
});

// 调整卡片难度
router.post('/difficulty', (req, res) => {
  const { card_id, difficulty } = req.body;
  if (!card_id || !difficulty || difficulty < 1 || difficulty > 5) {
    res.status(400).json({ error: '请提供有效的卡片ID和难度级别（1-5）' });
    return;
  }
  
  db.run(
    'UPDATE cards SET difficulty = ? WHERE id = ?',
    [difficulty, card_id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: '卡片不存在' });
        return;
      }
      res.json({ message: '难度调整成功' });
    }
  );
});

// 获取卡片评价和难度信息
router.get('/:card_id', (req, res) => {
  const { card_id } = req.params;
  db.get('SELECT rating, difficulty FROM cards WHERE id = ?', [card_id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: '卡片不存在' });
      return;
    }
    res.json(row);
  });
});

module.exports = router;