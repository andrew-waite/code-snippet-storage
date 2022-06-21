import { IFile } from "./IFile";

export interface IFileRepository {
    getFiles: () => Array<IFile>;
}
