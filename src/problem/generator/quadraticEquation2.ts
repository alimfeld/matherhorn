import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { gcd } from "../util/commonDivisor";
import { parse } from "../util/expressionParser";
import { exclude } from "../util/predicates";
import { randomInt } from "../util/randomizer";

type Params = {
  a: number;
  b: number;
  c: number;
  d: number;
  factor: number;
};

export const equationTree = (p: Params) => {
  const a = p.factor * p.a * p.c;
  const b = p.factor * (-p.a * p.d - p.b * p.c);
  const c = p.factor * p.b * p.d;
  return parse(`${a}x^2+${b}x+${c}==0`);
};

export const factorizationTree = (p: Params) => {
  return parse(`${p.factor}(${p.a}x-${p.b})(${p.c}x-${p.d})==0`);
};

const quadraticEquation2: ProblemGenerator = {
  key: "quadratic-equation2",
  generate: () => {
    var a = randomInt(1, 10, exclude(0));
    var b = randomInt(-9, 10, exclude(0));
    var c = randomInt(1, 10, exclude(0));
    var d = randomInt(-9, 10, exclude(0));
    const gcd1 = gcd(a, b);
    const gcd2 = gcd(c, d);
    const factor = gcd1 * gcd2;
    a = a / gcd1;
    b = b / gcd1;
    c = c / gcd2;
    d = d / gcd2;
    const params = { a, b, c, d, factor };

    return {
      description: equationTree(params).toTex(),
      solution: `
        \\begin{aligned}
          ${factorizationTree(params).toTex().replace("=", "&=")} \\\\
          x&=
          \\begin{cases}
            ${parse(`${b}/${a}`).toTex()} \\\\
            ${parse(`${d}/${c}`).toTex()}
          \\end{cases}
        \\end{aligned}
      `,
    };
  },
};

export default quadraticEquation2;
