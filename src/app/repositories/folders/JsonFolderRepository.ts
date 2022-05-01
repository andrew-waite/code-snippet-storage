import { Injectable } from "@angular/core";
import { IFolderRepository } from "./IFolderRepository";
import data from '../../assets/testdata/folders.json';
import { pipe } from "rxjs";

@Injectable()
export class JsonFolderRepository implements IFolderRepository {
    getFolders(): Array<string> {
        return data.map((e) => e.name);
    }
}