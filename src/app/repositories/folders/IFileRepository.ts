import { IFile } from "./IFile";

export interface IFileRepository {
    getFiles: () => Array<IFile>;
    saveFile(fileName: string, fileContents: string): Promise<boolean>;
    renameFile(originalFileName: string, newFileName: string): void;
}
