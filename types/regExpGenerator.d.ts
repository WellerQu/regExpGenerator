export interface Sample {
    name: string;
    value: string;
    startIndex: number;
}
declare enum Level {
    fuzzy = "fuzzy",
    normal = "normal",
    exact = "exact"
}
export interface Options {
    level?: keyof typeof Level;
    separator?: string;
}
export interface Result {
    expr: string;
    matches: Record<string, number>;
}
export declare function generate(raw: string, samples: Sample[], options?: Options): Result;
export {};
