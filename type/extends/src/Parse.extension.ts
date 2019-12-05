function parseBoolean(obj: number | string): boolean {
    if (typeof obj === 'string') {
        return obj.toLowerCase() === 'true';
    } else {
        return obj !== 0;
    }
}
