import { PathLike } from "fs";
import { stat } from "fs/promises";

export const source = async (st: (path: PathLike) => any, paths: PathLike[], fn: () => Promise<void>) => {
  let mtime: Record<string, number> = {};
  for (const path of paths) {
    mtime[path.toString()] = (await st(path)).mtimeMs;
  }
  let cache = await fn();
  return async () => {
    let isSame = true;
    for (const path of paths) {
      const { mtimeMs } = await st(path);
      if (mtimeMs !== mtime[path.toString()]) {
        mtime[path.toString()] = mtimeMs;
        isSame = false;
      }
    }
    if (isSame === false) {
      cache = await fn();
    }
    return cache;
  };
};

export default (path: PathLike[], fn: () => Promise<void>) => source(stat, path, fn);