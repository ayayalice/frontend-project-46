import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import formatData from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const readData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const parseData = (filepath) => parse(readData(filepath), getFormat(filepath));
const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseData(buildAbsolutePath(filepath1));
  const data2 = parseData(buildAbsolutePath(filepath2));
  const tree = buildTree(data1, data2);

  return formatData(tree, formatName);
};

export default genDiff;
