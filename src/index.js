import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const mknode = (key, value, type, meta = {}) => ({
  key,
  value,
  type,
  meta,
});

const buildAST = (objects) => {
  const [obj1, obj2] = objects;
  const key1 = _.keys(obj1);
  const key2 = _.keys(obj2);
  const keys = _.union(key1, key2);
  const sortedKeys = _.sortBy(keys);
  const nodes = sortedKeys.map((key) => {
    const [value1, value2] = [obj1[key], obj2[key]];
    if (!_.has(obj1, key)) return mknode(key, value2, 'added');
    if (!_.has(obj2, key)) return mknode(key, value1, 'removed');
    if (value1 !== value2) return mknode(key, value2, 'updated', { oldValue: value1 });
    return mknode(key, value1, 'unchanged');
  });
  return nodes;
};

const symbols = {
  removed: '-',
  added: '+',
  unchanged: ' ',
};

const render = (ast) => {
  const gendiff = ast.map((el) => {
    const {
      type, key, value, meta,
    } = el;

    if (el.type === 'updated') {
      return `  - ${key}: ${meta.oldValue}\n  + ${key}: ${value}`;
    }
    return `  ${symbols[type]} ${key}: ${value}`;
  });
  return `{\n${gendiff.join('\n')}\n}`;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const getFullPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export const gendiff = (filepath1, filepath2) => {
  const paths = [filepath1, filepath2];
  const data = paths.map((filepath) => {
    const fullPaht = getFullPath(filepath);
    const content = fs.readFileSync(fullPaht, 'utf-8');
    return JSON.parse(content);
  });
  const tree = buildAST(data);
  return render(tree);
};
