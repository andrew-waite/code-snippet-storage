import { FolderRepository } from "./FolderRepository";

export class JsonFolderRepository implements FolderRepository {
    getFolders(): Array<string> {
        throw new Error("Method not implemented.");
    }
}