export class Lazy<T> {

    constructor(creater: (() => T)) {
        this.creater = creater;
    }

    private creater: () => T;

    private value: T;

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
