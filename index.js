import inquirer from 'inquirer';
import * as qr from "qr-image";
import fs from "fs";

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

    fs.writeFile(`input_URL${count}.txt`, content, (error) => {
        if (error) throw console.log("Ocorreu um erro");
        else console.log("Deu certo!");
        count++;
        console.log(count);
      }); 
  } 