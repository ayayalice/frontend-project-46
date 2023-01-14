import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFullPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export default getFullPath;
