


export type Ops<T> = {
    [field in keyof T]: { value: any; op: "=" | "<" | ">" | "<=" | ">="; };
};
