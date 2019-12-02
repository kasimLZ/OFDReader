export class Lazy<T> {

    constructor(private readonly creater: (() => T)) {}

    private value: T = null;

    private isValueCreated = false;

    public get IsValueCreated(): boolean { return this.isValueCreated; }

    public get Value(): T {
        if (this.isValueCreated) {
            try {
                this.value = this.creater();
                this.isValueCreated = true;
            }  catch { }
        }
        return this.value;
    }
}
