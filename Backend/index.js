import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mysql from 'mysql2';

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
const db = mysql.createConnection(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/music', (req, res) => {
    const {name, artist, description} = req.body;
    const sql = 'INSERT INTO music (name,artist,description) VALUES (?,?,?)';
    db.query(sql, [name, artist, description], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('Insert success');
        }
    });
});

app.get('/music', (req, res) => {
    const sql = 'SELECT * FROM music';
    db.query(sql, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
});

app.get('/music/search/:name', (req, res) => {
    const {name} = req.params;
    const sql = 'SELECT * FROM music WHERE name LIKE ?';
    db.query(sql, ['%' + name + '%'], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
});

app.get('/music/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM music WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send(result[0]);
        }
    });
});

app.put('/music/:id', (req, res) => {
    const {id} = req.params;
    const {name, artist, description} = req.body;
    const sql = 'UPDATE music SET name = ?, artist = ?, description = ? WHERE id = ?';
    db.query(sql, [name, artist, description, id], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('Update success');
        }
    });
});

app.delete('/music/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM music WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('Delete success');
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
