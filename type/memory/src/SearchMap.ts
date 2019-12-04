export class SearchMap<T> {
    private container: { [key: string]: T } = {};

    public Query(key: string): T {
        return this.container[key];
    }

    public Add(key: string, entity: T) {
        this.container[key] = entity;
    }

    public Remove(key: string) {

    }

    public get Key(): string[] { return Object.keys(this.container); }

}
