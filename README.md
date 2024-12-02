# Advent of Code: TypeScript

Starting this repo from fresh because my previous solutions\* involved a lot of dirty tricks and unreadable code. So my goals for this are:

- No magic (i.e. abusing JS quirks)
- Readable
- Performant (as far as JS goes)

\*Will upload previous years throughout/after 2024

## Running

Requires Node.js `>=20.6.0` as I'm taking advantage of [loader hooks](https://nodejs.org/docs/latest/api/module.html#customization-hooks) to import input files. To solve a problem, run:

```sh
pnpm solve <year> [day] [--skip <days>]
```

E.g.

- `pnpm solve 2015 1` will run [src/2015/01.ts](./src/2015/01.ts)
- `pnpm solve 2019` will run `01.ts`-`25.ts` in [src/2019](./src/2019)
  - The `--skip` flag can be used to specify solutions to ignore when solving a full year (ignored if used with `day`)
  - `pnpm solve 2016 --skip 5,14` will run `01.ts`-`25.ts` but not `05.ts` or `14.ts` in [src/2016](./src/2016/)

An empty [`input/`](./input/) directory is available if you decide to clone this repo and use it yourself. The structure should be as follows:

```txt
input/
├── 2015/
│   ├── 01.txt
│   ├── 02.txt
│   ├── 03.txt
│   └── ...
├── 2016/
│   ├── 01.txt
│   └── ...
└── ...
```

> [!IMPORTANT]
> Ensure that each text file **does not** end with a newline.
