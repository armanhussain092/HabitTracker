const express = require('express');
const router = express.Router();
const Habit = require('../models/habit');

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.render('index', { days, habits });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/habits', async (req, res) => {
  try {
    const newHabit = new Habit({
      name: req.body.name,
      description: req.body.description, 
      days: {
        Monday: 'incomplete',
        Tuesday: 'incomplete',
        Wednesday: 'incomplete',
        Thursday: 'incomplete',
        Friday: 'incomplete',
        Saturday: 'incomplete',
        Sunday: 'incomplete',
      },
    });
    await newHabit.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/habits/delete/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/habits/toggle/:id/:day', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    habit.days[req.params.day] = habit.days[req.params.day] === 'completed' ? 'incomplete' : 'completed';
    await habit.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
