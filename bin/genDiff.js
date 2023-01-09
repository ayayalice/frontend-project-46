#!/usr/bin/env node
import { Command } from 'commander';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const mknode = (key, value, type, meta = {}) => ({
  key,
  value,
  type,
  meta,
});

const buildAST = (objects) => {
  const [obj1, obj2] = objects;
  const keys = _.union(_.keys(obj1), _.keys(obj2));
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

const getFixturesPath = (filename) => path.resolve('__fixtures__', filename);

const gendiff = (filepath1, filepath2) => {
  const paths = [filepath1, filepath2];
  const data = paths.map((filepath) => {
    const fullPaht = getFixturesPath(filepath);
    const content = fs.readFileSync(fullPaht, 'utf-8');
    return JSON.parse(content);
  });
  const tree = buildAST(data);
  return render(tree);
};

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format', '<type>  output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });
program.parse();
