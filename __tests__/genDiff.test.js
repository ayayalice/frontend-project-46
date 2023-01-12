import { expect, test } from '@jest/globals';
import fs from 'fs';
import { getFullPath, gendiff } from '../src/index.js';

const result = fs.readFileSync(getFullPath('result.txt'), 'utf8');

test('genDiff', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(result);
});
