// Uso: node tools/sincronizar-base.cjs (não é necessário para jogar).
const fs=require('node:fs'),path=require('node:path');
const E=require('../bank-engine.js');const folder=path.join(__dirname,'..','content');
const data=E.validate(JSON.parse(fs.readFileSync(path.join(folder,'banco-desafios.json'),'utf8')));
const raw=JSON.stringify(data,null,2)+'\n';
fs.writeFileSync(path.join(folder,'banco-desafios.js'),'// Cópia gerada do JSON para abertura local sem pedidos fetch.\nwindow.BANK_EMBEDDED = JSON.parse('+JSON.stringify(raw)+');\n');
console.log('Base validada e cópia local sincronizada.');
