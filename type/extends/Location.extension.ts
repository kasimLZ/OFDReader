interface Location {
    Filters(): { [key: string]: string };
    Filter(key: string): string;
}

Location.prototype.Filters = function() {
    const filters: { [key: string]: string } = {};
    (this.search as string).substring(1).split('&').forEach(f => {
        const kv = f.split('=');
        if (kv.length > 1) {
            filters[kv[0]] = kv[1];
        }
    });
    return filters;
};

Location.prototype.Filter = function(key: string): string {
    return (this.Filters() as  { [key: string]: string }) [key];
};
