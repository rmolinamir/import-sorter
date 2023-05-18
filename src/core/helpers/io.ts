import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { Observable, Observer } from 'rxjs';

export function readFile$(
  filePath: string,
  encoding: BufferEncoding = 'utf-8'
): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    fs.readFile(filePath, { encoding }, (error, data) => {
      if (error) {
        observer.error(error);
      } else {
        observer.next(data);
        observer.complete();
      }
    });
  });
}

export function writeFile$(filePath: string, data: string): Observable<void> {
  return Observable.create((observer: Observer<void>) => {
    fs.writeFile(filePath, data, (error) => {
      if (error) {
        observer.error(error);
      } else {
        observer.next(undefined);
        observer.complete();
      }
    });
  });
}

export function getFullPath(srcPath: string, filename: string): string {
  return path.join(srcPath, filename);
}

export function filePaths$(
  startingSourcePath: string,
  pattern: string,
  ignore: string | string[]
): Observable<string[]> {
  return Observable.create(async (observer: Observer<string[]>) => {
    try {
      const matches = await glob(pattern, {
        cwd: startingSourcePath,
        ignore,
        nodir: true
      });

      const fullPaths = matches.map((filePath) =>
        getFullPath(startingSourcePath, filePath)
      );

      observer.next(fullPaths);

      observer.complete();
    } catch (error) {
      observer.error(error);
    }
  });
}
