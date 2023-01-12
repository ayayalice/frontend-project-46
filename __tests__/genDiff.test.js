import { expect, test } from '@jest/globals';
import fs from 'fs';
import { getFullPath, gendiff } from '../src/index.js';

const result = fs.readFileSync(getFullPath('result.txt'), 'utf8');

test('compare two files shoold return difference', () => {
  expect(gendiff('file1.json', 'file2.json')).toMatch('{');
  expect(gendiff('file1.json', 'file2.json')).toMatch('- follow: false');
  expect(gendiff('file1.json', 'file2.json')).toMatch('host: hexlet.io');
  expect(gendiff('file1.json', 'file2.json')).toMatch('- proxy: 123.234.53.22');
  expect(gendiff('file1.json', 'file2.json')).toMatch('- timeout: 50');
  expect(gendiff('file1.json', 'file2.json')).toMatch('+ timeout: 20');
  expect(gendiff('file1.json', 'file2.json')).toMatch('+ verbose: true');
  expect(gendiff('file1.json', 'file2.json')).toMatch('}');
});
