import { PathLike } from "fs";
import { stat } from "fs/promises";

// caches the data provided by a function based upon paths
export const source = async <T>(st: (path: PathLike) => any, paths: PathLike[], fn: () => Promise<T>) => {
  let mtime: Record<string, number> = {};
  for (const path of paths) {
    mtime[path.toString()] = (await st(path)).mtimeMs;
  }
  let cache = await fn();
  return async (): Promise<T> => {
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
    console.log(cache);
    return cache;
  };
};

export default <T>(path: PathLike[], fn: () => Promise<T>) => source<T>(stat, path, fn);