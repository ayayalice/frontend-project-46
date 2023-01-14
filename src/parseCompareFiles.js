import fs from 'fs';
import buildAST from './buildAST.js';
import render from './render.js';
import getFullPath from './getPath.js';

const parseCompareFiles = (filepath1, filepath2) => {
  const paths = [filepath1, filepath2];
  const data = paths.map((filepath) => {
    const fullPaht = getFullPath(filepath);
    const content = fs.readFileSync(fullPaht, 'utf-8');
    return JSON.parse(content);
  });
  const tree = buildAST(data);
  return render(tree);
};

export default parseCompareFiles;
