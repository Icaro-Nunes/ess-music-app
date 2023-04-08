export function negatePredicate<T>(predicate: (i:T) => boolean): (i: T) => boolean{
    return (
        (inp:T) => !predicate.apply(inp)
    )
}