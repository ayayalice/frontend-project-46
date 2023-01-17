import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFixture = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8').trim();

const expectedResult1 = readFixture('result.txt');
const expectedResult2 = readFixture('plainResult.txt');
const expectedResult3 = readFixture('jsonResult.txt');

test('JSON', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2)).toEqual(expectedResult1);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedResult1);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedResult2);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedResult3);
});

test('YML', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');

  expect(genDiff(filepath1, filepath2)).toEqual(expectedResult1);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedResult1);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedResult2);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedResult3);
});
