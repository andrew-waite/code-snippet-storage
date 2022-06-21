import { Injectable } from "@angular/core";
import { IFileRepository } from "./IFileRepository";
import { v4 as uuidv4 } from 'uuid';
import data from 'src/assets/testdata/files.json';
import { IFile } from "./IFile";

@Injectable()
export class JsonFileRepository implements IFileRepository {
    public getFiles(): Array<IFile> {
        return data.map<IFile>((e: any) => ({id: uuidv4(), contentEditable: false, ...e}));
    }
}
