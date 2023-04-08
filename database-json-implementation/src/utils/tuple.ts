export function compareTuples<TA, TB>(x: [TA, TB], y: [TA, TB]): boolean{
    return x[0] == y[0] &&
           x[1] == y[1]
}