import { expect, test } from '@jest/globals';
import fs from 'fs';
import parseCompareFiles from '../src/parseCompareFiles.js';
import getFullPath from '../src/getPath.js';

const result = fs.readFileSync(getFullPath('result.txt'), 'utf8');

test('compare two files shoold return difference', () => {
  expect(parseCompareFiles('file1.json', 'file2.json')).toEqual(result);
  expect(parseCompareFiles('file1.yml', 'file2.yml')).toEqual(result);
});
