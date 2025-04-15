import express from 'express'
import { initializeDB, dbAll, dbRun } from './util/database.js';
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json())

app.get('/ora', async (req, res) => {
    const rows = await dbAll('SELECT * FROM orak')
    res.json(rows)
})

app.put('/ora/:id', async (req, res) => {
    const {elso, masodik, harmadik, negyedik, otodik, hatodik, hetedik, nyolcadik} = req.body
    await dbRun(
        `UPDATE orak SET elso=?, masodik=?, harmadik=?, negyedik=?, otodik=?, hatodik=?, hetedik=?, nyolcadik=? WHERE id=?`,
        [elso, masodik, harmadik, negyedik, otodik, hatodik, hetedik, nyolcadik, req.params.id]
    )
    res.sendStatus(200)
})

async function startServer(){
    await initializeDB();
    app.listen(3000, () => {
        console.log("Server runs on port 3000")
    });
}

startServer();