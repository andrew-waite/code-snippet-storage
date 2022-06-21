export interface IFileRepository {
    getFiles: () => Array<{id: string, name: string, contenteditable: boolean}>;
}
