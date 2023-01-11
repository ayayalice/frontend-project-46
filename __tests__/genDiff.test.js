import { getFullPath, gendiff } from '../src/index.js';
import fs from 'fs';
import {expect, test} from '@jest/globals';

const result = fs.readFileSync(getFullPath('result.txt'), 'utf8');

test ('genDiff', () => {
    expect(gendiff('file1.json', 'file2.json')).toBe(result)
});