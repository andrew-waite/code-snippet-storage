import { Injectable } from "@angular/core";
import { IFileRepository } from "./IFileRepository";
import { v4 as uuidv4 } from 'uuid';
import data from 'src/assets/testdata/files.json';

@Injectable()
export class JsonFileRepository implements IFileRepository {
    public getFiles(): Array<{name: string, id: string, contenteditable: boolean}> {
        return data.map((e) => ({id: uuidv4(), name: e.name, contenteditable: false}));
    }
}
