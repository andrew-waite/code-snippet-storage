import { Injectable } from "@angular/core";
import { IFolderRepository } from "./IFolderRepository";
import data from 'src/assets/testdata/folders.json';

@Injectable()
export class JsonFolderRepository implements IFolderRepository {
    getFolders(): Array<string> {
        return data.map((e) => e.name);
    }
}