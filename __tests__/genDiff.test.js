import { expect, test } from '@jest/globals';
import fs from 'fs';
import gendiff, { getFullPath } from '../src/index.js';

const result = fs.readFileSync(getFullPath('result.txt'), 'utf8');
const plainResult = fs.readFileSync(getFullPath('plainResult.txt'), 'utf8');
const jsonResult = fs.readFileSync(getFullPath('jsonResult.txt'), 'utf8');

test('compare two files should return difference', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(result);
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(result);
  expect(gendiff('file1.yml', 'file2.json')).toEqual(result);
});
test('compare two files should show properties', () => {
  expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(plainResult);
  expect(gendiff('file1.yml', 'file2.yml', 'plain')).toEqual(plainResult);
  expect(gendiff('file1.yml', 'file2.json', 'plain')).toEqual(plainResult);
});
test('compare two files should show properties', () => {
  expect(gendiff('file1.json', 'file2.json', 'json')).toEqual(jsonResult);
  expect(gendiff('file1.yml', 'file2.yml', 'json')).toEqual(jsonResult);
  expect(gendiff('file1.yml', 'file2.json', 'json')).toEqual(jsonResult);
});
