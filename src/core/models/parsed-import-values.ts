import { ImportElement } from './import-element';

export interface ParsedImportValues {
  importElements: ImportElement[];
  usedTypeReferences: string[];
  firstImportLineNumber: number | null;
}
