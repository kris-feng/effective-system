const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// 获取所有卡片
router.get('/', (req, res) => {
  const { category_id, difficulty } = req.query;
  let query = 'SELECT * FROM cards';
  const params = [];
  
  if (category_id || difficulty) {
    query += ' WHERE';
    if (category_id) {
      query += ' category_id = ?';
      params.push(category_id);
    }
    if (category_id && difficulty) {
      query += ' AND';
    }
    if (difficulty) {
      query += ' difficulty = ?';
      params.push(difficulty);
    }
  }
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 获取单个卡片
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM cards WHERE id = ?', [id], (err, row) => {
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

// 创建卡片
router.post('/', (req, res) => {
  const { category_id, question, options, answer, explanation, difficulty } = req.body;
  db.run(
    'INSERT INTO cards (category_id, question, options, answer, explanation, difficulty) VALUES (?, ?, ?, ?, ?, ?)',
    [category_id, question, options, answer, explanation, difficulty],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, category_id, question, options, answer, explanation, difficulty });
    }
  );
});

// 更新卡片
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { category_id, question, options, answer, explanation, difficulty } = req.body;
  db.run(
    'UPDATE cards SET category_id = ?, question = ?, options = ?, answer = ?, explanation = ?, difficulty = ? WHERE id = ?',
    [category_id, question, options, answer, explanation, difficulty, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: '卡片不存在' });
        return;
      }
      res.json({ id, category_id, question, options, answer, explanation, difficulty });
    }
  );
});

// 删除卡片
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM cards WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: '卡片不存在' });
      return;
    }
    res.json({ message: '卡片删除成功' });
  });
});

// 批量导入卡片
router.post('/batch', (req, res) => {
  const cards = req.body;
  if (!Array.isArray(cards)) {
    res.status(400).json({ error: '请提供卡片数组' });
    return;
  }
  
  let count = 0;
  cards.forEach(card => {
    db.run(
      'INSERT INTO cards (category_id, question, options, answer, explanation, difficulty) VALUES (?, ?, ?, ?, ?, ?)',
      [card.category_id, card.question, card.options, card.answer, card.explanation, card.difficulty],
      (err) => {
        if (err) {
          console.error('导入卡片失败:', err.message);
        } else {
          count++;
        }
      }
    );
  });
  
  res.json({ message: `成功导入 ${count} 张卡片` });
});

module.exports = router;