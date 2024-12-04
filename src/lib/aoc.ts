export * from "./ocr";

export function register(fn: () => unknown, title: string, answer: unknown = []): void {
	Object.assign(fn, { title, answer });
}
