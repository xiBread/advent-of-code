export function rotate<T>(array: T[], steps = 1): T[] {
	const rotated = [...array];
	const length = rotated.length;

	rotated.push(...rotated.splice(0, ((-steps % length) + length) % length));
	return rotated;
}
