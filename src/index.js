import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import formatData from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const readData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = buildAbsolutePath(filepath1);
  const data2 = buildAbsolutePath(filepath2);
  const parsedData1 = parse(readData(data1), getFormat(data1));
  const parsedData2 = parse(readData(data2), getFormat(data2));
  const tree = buildTree(parsedData1, parsedData2);

  return formatData(tree, formatName);
};

export default genDiff;
