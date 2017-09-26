import fs from 'fs';
import utils from './utils';
import {_promisify as promisify} from './promisify';

const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

export default class Importer {
  importSync(dir) {
    const filesName = fs.readdirSync(dir);
    const filesData = filesName.map(file => fs.readFileSync(`${dir}/${file}`, { encoding: 'utf8' }));
    const jsonFilesData = filesData.map(fileData => utils.csvToJson(fileData));

    return jsonFilesData;
  }

  async import(dir) {
    const filesName = await readdirAsync(dir);
    const filesData = await Promise.all(filesName.map(file => readFileAsync(`${dir}/${file}`, { encoding: 'utf8' })));
    const jsonFilesData = filesData.map(fileData => utils.csvToJson(fileData));

    return jsonFilesData;
  }
}
