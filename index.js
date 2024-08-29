import inquirer from 'inquirer';
import * as qr from "qr-image";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

// Emula o __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


inquirer
  .prompt([{message: "Digite uma URL: ", name: "URL"}])
  .then((answers) => {
    const userURL = answers.URL;
    const qr_png = qr.image(userURL, {type: "png"});
    qr_png.pipe(fs.createWriteStream(`${userURL}.png`));
    const png_string = qr.imageSync(userURL, { type: 'png' });

    writeDoc(userURL);
    console.log("Ref"+count);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Ocorreu um erro");
    } else {
      console.log(error);
    }
  });

  var count = 0; //contador para nomear os arquivos txt 
  function writeDoc(content){

     const dir = path.join(__dirname, './urls'); 
     const filePath = path.join(dir, `input_URL${count}.txt`);

     if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true });
     }
 

    fs.writeFile(filePath, content, (error) => {
        if (error) throw console.log("Ocorreu um erro");
        else console.log("Deu certo!");
        count++;
        console.log(count);
      }); 
  } 