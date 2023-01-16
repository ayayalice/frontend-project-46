import { expect, test } from '@jest/globals';
import fs from 'fs';
import gendiff from '../src/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFixture = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8').trim();
const result = readFixture('result.txt');
const plainResult = readFixture('plainResult.txt');
const jsonResult = readFixture('jsonResult.txt');

test('genDiff', () => {
  expect(gendiff('file1.json', 'file2.yml')).toEqual(result);
  expect(gendiff('file1.json', 'file2.yml', 'plain')).toEqual(plainResult);
  expect(gendiff('file1.json', 'file2.yml', 'json')).toEqual(jsonResult);
});
