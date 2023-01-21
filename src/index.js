import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import formatData from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const readData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsedData1 = parse(readData(buildAbsolutePath(filepath1)), getFormat(buildAbsolutePath(filepath1)));
  const parsedData2 = parse(readData(buildAbsolutePath(filepath2)), getFormat(buildAbsolutePath(filepath2)));
  const tree = buildTree(parsedData1, parsedData2);

  return formatData(tree, formatName);
};

export default genDiff;
