export interface IFolderRepository {
    getFolders: () => Array<{id: string, name: string, contenteditable: boolean}>;
}
