export class LazyCollection<T> {

    constructor(
        private readonly creater: ((index: number) => T),
        public readonly length: number
    ) {}

    private ValueContainer: (T)[] = [];

    public Get(index: number): T {
        if (index < 0 || index >= this.length) { return undefined; }
        if (this.ValueContainer[index] == null) {
            try { this.ValueContainer[index] = this.creater(index); } catch {}
        }
        return this.ValueContainer[index];
    }

    [Symbol.iterator](): IterableIterator<T> {
        let index = 0;
        const length = this.length;
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

