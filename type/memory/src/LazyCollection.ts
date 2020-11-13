export class LazyCollection<T> implements Iterable<T> {

    constructor(
        private readonly creater: ((index: number) => T),
        length: number
    ) {
        this.Length = length;
    }

    private ValueContainer: (T)[] = [];

    public readonly Length: number;

    public Get(index: number): T {
        if (index < 0 || index >= this.Length) { return undefined; }
        if (this.ValueContainer[index] == null) {
            this.ValueContainer[index] = this.creater(index);
        }
        return this.ValueContainer[index];
    }

    [Symbol.iterator](): IterableIterator<T> {
        let index = 0;
        const length = this.Length;
        const container = this;
        return {
            [Symbol.iterator](): IterableIterator<T> {
                return this;
            },
            next(): IteratorResult<T> {
                return {done: index >= length, value: container.Get(index++)};
            },
            return(): IteratorResult<T> {
                return {done: true, value: undefined};
            },
            throw(e: Error): IteratorResult<T> {
                return {done: true, value: undefined};
            }
        };
    }
}
