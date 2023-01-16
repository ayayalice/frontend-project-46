import { expect, test } from '@jest/globals';
import fs from 'fs';
import gendiff from '../src/index.js';
import { getFullPath } from '../src/index.js';

const result = fs.readFileSync(getFullPath('result.txt'), 'utf8');

test('compare two files shoold return difference', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(result);
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(result);
  expect(gendiff('file1.yml', 'file2.json')).toEqual(result);
});
