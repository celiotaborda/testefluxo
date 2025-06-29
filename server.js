const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  'https://seunits.com',
  'https://celiotaborda.github.io'
];

app.use(cors({
  origin: function(origin, callback) {
    // Permite requisições sem origin (ex: ferramentas locais) ou dos domínios permitidos
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
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

app.get('/api/bancos', (req, res) => res.json(readCSV(bancosFile)));
app.post('/api/bancos', (req, res) => {
    const bancos = readCSV(bancosFile);
    if (!bancos.includes(req.body.banco)) bancos.push(req.body.banco);
    writeCSV(bancosFile, bancos);
    res.json(bancos);
});

app.get('/api/safras', (req, res) => res.json(readCSV(safrasFile)));
app.post('/api/safras', (req, res) => {
    const safras = readCSV(safrasFile);
    if (!safras.includes(req.body.safra)) safras.push(req.body.safra);
    writeCSV(safrasFile, safras);
    res.json(safras);
});

app.get('/api/codigos', (req, res) => res.json(readCSV(codigosFile)));
app.post('/api/codigos', (req, res) => {
    const codigos = readCSV(codigosFile);
    if (!codigos.includes(req.body.codigo)) codigos.push(req.body.codigo);
    writeCSV(codigosFile, codigos);
    res.json(codigos);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));