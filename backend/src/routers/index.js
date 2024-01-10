const express = require('express');
const router = express.Router();
const path = require('path');
const schedule = require(path.join(__dirname, '..', 'db', 'schedule.js'));

router.get('^/$ | /index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'index.html'));
});

router.post('/schedule-form-submit', async (req, res) => {
  try {
      const data = {time: req.body.userTime, days: req.body.userDays, hint: req.body.hint};
      await schedule(data, res); // Pass res to schedule for routing
  } catch (err) {
      console.error(err);
      res.status(500).send('Error saving schedule');
  }
});

module.exports = router;
