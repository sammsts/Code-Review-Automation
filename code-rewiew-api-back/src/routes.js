const { Router } = require('express');
const router = Router();

router.get('/teste', (req, res) => {
  return res.json({ ok: true });
});

module.exports = router;