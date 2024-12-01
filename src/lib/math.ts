export function divmod(a: number, b: number): [quotient: number, remainder: number] {
	return [Math.floor(a / b), a % b];
}
