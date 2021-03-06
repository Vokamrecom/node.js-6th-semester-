const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const Sequelize = require('sequelize');

const db = require('./context')(Sequelize)

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/tasks', async (req, res, ) => {
    res.json(await db.Task.findAll());
});

app.post('/tasks', async (req, res, ) => {
    let response = { error: null };

    if (Math.random() < 0.5) {
        response.error = 'adding error';
        response.taskId = req.body.task.id;
    } else {
        const task = { ...req.body.task, text: req.body.task.text.toString() };
        response.result = await db.Task.create(task);
    }
    setTimeout(() => res.json(response), Math.random() * (2500 - 100) + 100);
});

app.put('/tasks/:id', async (req, res) => {
    const { text } = req.body;

    res.json(await db.Task.update({ text }, { where: { id: req.params.id }, limit: 1 }));
});

app.delete('/tasks/:id', async (req, res) => {
    res.json(await db.Task.destroy({ where: { id: req.params.id } }));
});

app.post('/toggle-all', async (req, res) => {
    const { areAllCompleted } = req.body;
    res.json(await db.Task.update({ completed: areAllCompleted }, { where: {} }));
});

app.post('/toggle-item', async (req, res) => {
    const { id } = req.body;
    const item = await db.Task.findById(+id);
    if (item)
        res.json(await item.update({ completed: !item.completed }));
    else
        res.json({ success: false });

});

app.post('/clear', async (req, res) => {
    res.json(await db.Task.destroy({ where: { completed: true } }));
});

app.use((req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

(async function () {
    await db.sequelize.sync({ force: true });
    await db.Task.create({ text: 'Sleep', id: 111, completed: false });
    await db.Task.create({ text: 'Eat', id: 222, completed: false });
    await db.Task.create({ text: 'Code', id: 333, completed: false });

    app.listen(3000, () => console.log(`Server running on 3000...`));
})();
