import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { askForURL, writeDoc } from '../src/index.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Teste writeDoc
const testWriteDoc = () => {
  const dir = path.join(__dirname, '../urls');

  // Limpa diretório antes
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true }); 
  }

  writeDoc('http://example.com');

  // Espera criar arquivo
  setTimeout(() => {
    const files = fs.readdirSync(dir);
    if (files.length === 1) {
      console.log('Teste de writeDoc passou!');
    } else {
      console.error('Teste de writeDoc falhou');
    }
  }, 1000);
};

testWriteDoc();
