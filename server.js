const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const bancosFile = 'bancos.csv';
const safrasFile = 'safras.csv';
const codigosFile = 'codigos.csv';

function readCSV(file) {
    if (!fs.existsSync(file)) return [];
    return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
}
function writeCSV(file, arr) {
    fs.writeFileSync(file, arr.join('\n'));
}

app.get('/bancos', (req, res) => res.json(readCSV(bancosFile)));
app.post('/bancos', (req, res) => {
    const bancos = readCSV(bancosFile);
    if (!bancos.includes(req.body.banco)) bancos.push(req.body.banco);
    writeCSV(bancosFile, bancos);
    res.json(bancos);
});

app.get('/safras', (req, res) => res.json(readCSV(safrasFile)));
app.post('/safras', (req, res) => {
    const safras = readCSV(safrasFile);
    if (!safras.includes(req.body.safra)) safras.push(req.body.safra);
    writeCSV(safrasFile, safras);
    res.json(safras);
});

app.get('/codigos', (req, res) => res.json(readCSV(codigosFile)));
app.post('/codigos', (req, res) => {
    const codigos = readCSV(codigosFile);
    if (!codigos.includes(req.body.codigo)) codigos.push(req.body.codigo);
    writeCSV(codigosFile, codigos);
    res.json(codigos);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));