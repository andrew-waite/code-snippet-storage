import { Injectable } from "@angular/core";
import { IFolderRepository } from "./IFolderRepository";
import { v4 as uuidv4 } from 'uuid';
import data from 'src/assets/testdata/folders.json';

@Injectable()
export class JsonFolderRepository implements IFolderRepository {
    getFolders(): Array<{name: string, id: string, contenteditable: boolean}> {
        return data.map((e) => ({id: uuidv4(), name: e.name, contenteditable: false}));
    }
}
