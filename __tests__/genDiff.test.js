import { expect, test } from '@jest/globals';
import fs from 'fs';
import gendiff, { getFullPath } from '../src/index.js';

const result = fs.readFileSync(getFullPath('result.txt'), 'utf8');
const plainResult = fs.readFileSync(getFullPath('plainResult.txt'), 'utf8');
const jsonResult = fs.readFileSync(getFullPath('jsonResult.txt'), 'utf8');

test('genDiff', () => {
  expect(gendiff('file1.json', 'file2.yml')).toEqual(result);
  expect(gendiff('file1.json', 'file2.yml', 'plain')).toEqual(plainResult);
  expect(gendiff('file1.json', 'file2.yml', 'json')).toEqual(jsonResult);
});
