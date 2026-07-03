const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// 获取用户学习统计
router.get('/user/:user_id', (req, res) => {
  const { user_id } = req.params;
  
  // 总学习次数
  db.get('SELECT COUNT(*) as total_studies FROM study_records WHERE user_id = ?', [user_id], (err, totalResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // 正确次数
    db.get('SELECT COUNT(*) as correct_studies FROM study_records WHERE user_id = ? AND is_correct = 1', [user_id], (err, correctResult) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // 总卡片数
      db.get('SELECT COUNT(*) as total_cards FROM cards', (err, cardsResult) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        
        // 已学习卡片数
        db.get('SELECT COUNT(DISTINCT card_id) as studied_cards FROM study_records WHERE user_id = ?', [user_id], (err, studiedResult) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          
          const totalStudies = totalResult.total_studies || 0;
          const correctStudies = correctResult.correct_studies || 0;
          const totalCards = cardsResult.total_cards || 0;
          const studiedCards = studiedResult.studied_cards || 0;
          
          const accuracy = totalStudies > 0 ? (correctStudies / totalStudies * 100).toFixed(2) : 0;
          const completionRate = totalCards > 0 ? (studiedCards / totalCards * 100).toFixed(2) : 0;
          
          res.json({
            total_studies,
            correct_studies,
            accuracy: parseFloat(accuracy),
            total_cards,
            studied_cards,
            completion_rate: parseFloat(completionRate)
          });
        });
      });
    });
  });
});

// 获取学习日历数据
router.get('/calendar/:user_id', (req, res) => {
  const { user_id } = req.params;
  
  const query = `
    SELECT 
      DATE(study_time) as date,
      COUNT(*) as study_count,
      SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_count
    FROM study_records
    WHERE user_id = ?
    GROUP BY DATE(study_time)
    ORDER BY date
  `;
  
  db.all(query, [user_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 获取错题本
router.get('/wrong/:user_id', (req, res) => {
  const { user_id } = req.params;
  
  const query = `
    SELECT c.*, sr.study_time
    FROM cards c
    JOIN study_records sr ON c.id = sr.card_id
    WHERE sr.user_id = ? AND sr.is_correct = 0
    ORDER BY sr.study_time DESC
    LIMIT 50
  `;
  
  db.all(query, [user_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 获取分类学习统计
router.get('/category/:user_id', (req, res) => {
  const { user_id } = req.params;
  
  const query = `
    SELECT 
      cat.name as category_name,
      COUNT(*) as study_count,
      SUM(CASE WHEN sr.is_correct = 1 THEN 1 ELSE 0 END) as correct_count
    FROM study_records sr
    JOIN cards c ON sr.card_id = c.id
    JOIN categories cat ON c.category_id = cat.id
    WHERE sr.user_id = ?
    GROUP BY cat.id
    ORDER BY study_count DESC
  `;
  
  db.all(query, [user_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // 计算每个分类的正确率
    const result = rows.map(row => ({
      ...row,
      accuracy: row.study_count > 0 ? (row.correct_count / row.study_count * 100).toFixed(2) : 0
    }));
    
    res.json(result);
  });
});

module.exports = router;