export interface DataItem {
    id: number;
    name: string | undefined;
}

export const SortCompareFn: (a: DataItem, b: DataItem) => number = (a, b) =>
    (a.name || '').localeCompare(b.name || '');