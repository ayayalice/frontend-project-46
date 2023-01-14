import _ from 'lodash';

const mknode = (key, value, type, meta = {}) => ({
  key,
  value,
  type,
  meta,
});

const buildAST = (objects) => {
  const [obj1, obj2] = objects;
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const nodes = sortedKeys.map((key) => {
    const key1 = obj1[key];
    const key2 = obj2[key];
    const [value1, value2] = [key1, key2];
    if (!_.has(obj1, key)) return mknode(key, value2, 'added');
    if (!_.has(obj2, key)) return mknode(key, value1, 'removed');
    if (value1 !== value2) return mknode(key, value2, 'updated', { oldValue: value1 });
    return mknode(key, value1, 'unchanged');
  });
  return nodes;
};

export default buildAST;
