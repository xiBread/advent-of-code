export function divmod(a: number, b: number): [quotient: number, remainder: number] {
	return [Math.floor(a / b), a % b];
}

export function manhattan(array: number[]): number {
	return array.reduce((acc, val) => acc + Math.abs(val), 0);
}
