import inquirer from 'inquirer';
import * as qr from "qr-image";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

//Veriáveis
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let count = 0;

function askForURL() {
  inquirer
    .prompt([{ message: "Digite uma URL (ou 'sair' para finalizar): ", name: "URL" }])
    .then((answers) => {
      const userURL = answers.URL;

      if (userURL.toLowerCase() === 'sair') {
        console.log("Finalizando...");
        return;
      }

      const pngDir = path.join(__dirname, './qrcodes');

      if (!fs.existsSync(pngDir)) {
        fs.mkdirSync(pngDir, { recursive: true });
      }

      const pngPath = path.join(pngDir, `QR_Code${count}.png`);

      const qr_png = qr.image(userURL, { type: "png" });
      qr_png.pipe(fs.createWriteStream(pngPath));

      writeDoc(userURL);
      console.log(`Arquivo PNG criado para a URL: ${userURL}\n`);

      // Continuar pedindo URLs até o usuário digitar 'sair'
      askForURL();
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Ocorreu um erro");
      } else {
        console.log(error);
      }
    });
}

function writeDoc(content) {
  const dir = path.join(__dirname, './urls');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `input_URL${count}.txt`);

  fs.writeFile(filePath, content, (error) => {
    if (error) {
      console.log("Ocorreu um erro ao salvar o arquivo.");
    } else {
      count++; //Incrementar o contador após criar o arquivo
    }
  });
}

//Iniciar o processo de perguntar URLs
askForURL();
