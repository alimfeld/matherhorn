import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomElement, randomInt } from "../util/randomizer";

const primitiveTriples: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [12, 35, 37],
  [9, 40, 41],
  [28, 45, 53],
  [11, 60, 61],
  [16, 63, 65],
  [33, 56, 65],
  [48, 55, 73],
  [13, 84, 85],
  [36, 77, 85],
  [39, 80, 89],
  [65, 72, 97],
];

interface Params {
  [index: string]: number;
  a: number;
  b: number;
  c: number;
  p: number;
  q: number;
  h: number;
}

export const calculateParams = (triple: [number, number, number]): Params => {
  const [pi, hi, ai] = triple;
  const [p, h, a] = [pi * pi, hi * pi, ai * pi];
  const b = (a * h) / p;
  const q = (h * h) / p;
  const c = (p * p + h * h) / p;
  return {
    a,
    b,
    c,
    p,
    q,
    h,
  };
};

const renderParams = (params: Params, keys: string[]): string => {
  const values = keys.map((key) => `${key}&=${params[key]}`).join(" & ");
  return `
\\begin{align*}
${values}
\\end{align*}
`;
};

const renderDescription = (params: Params, keys: string[]): string => {
  return `
\\includegraphics[height=100px]{/images/right-triangle.svg}
\\\\
${renderParams(params, keys)}
`;
};

const renderSolution = (params: Params, keys: string[]): string => {
  return renderParams(params, keys);
};

const rightTriangle: ProblemGenerator = {
  key: "right-triangle",
  generate: () => {
    const params = calculateParams(randomElement(primitiveTriples));
    let remaining = ["a", "b", "c", "p", "q", "h"];
    const [key1] = remaining.splice(randomInt(0, 6), 1);
    const [key2] = remaining.splice(randomInt(0, 5), 1);
    const keys = [key1, key2];
    return {
      description: renderDescription(params, keys),
      solution: renderSolution(params, remaining),
    };
  },
};

export default rightTriangle;
