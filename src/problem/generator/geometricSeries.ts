import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomEnum, randomInt } from "../util/randomizer";

interface Params {
  a1: number;
  q: number;
  n: number;
  an: number;
  Sn: number;
}

enum Variant {
  a1_q_n,
  a1_q_an,
  a1_q_Sn,
  a1_n_an,
  a1_n_Sn,
  a1_an_Sn,
  q_n_an,
  q_n_Sn,
  q_an_Sn,
  n_an_Sn,
}

const georenderDescription = (params: Params, variant: Variant): string => {
  const hidden = "\\text{?}";
  switch (variant) {
    case Variant.a1_q_n:
      return `
\\begin{align*}
  a_1&=${params.a1} & q&=${params.q}
\\end{align*}
\\\\
\\begin{align*}
  a_{${params.n}}&=${hidden} & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_q_an:
      return `
\\begin{align*}
  a_1&=${params.a1} & q&=${params.q} & a_n&=${params.an}
\\end{align*}
\\\\
\\begin{align*}
  n&=${hidden}      & S_n&=${hidden}
\\end{align*}
`;
    case Variant.a1_q_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & q&=${params.q} & S_n&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  n&=${hidden}      & a_n&=${hidden}
\\end{align*}
`;
    case Variant.a1_n_an:
      return `
\\begin{align*}
  a_1&=${params.a1} & a_{${params.n}}&=${params.an}
\\end{align*}
\\\\
\\begin{align*}
  q&=${hidden}      & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_n_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & S_{${params.n}}&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  q&=${hidden}      & a_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.a1_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & a_n&=${params.an} & S_n&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  q&=${hidden}      & n&=${hidden}
\\end{align*}
`;
    case Variant.q_n_an:
      return `
\\begin{align*}
  q&=${params.q} & a_{${params.n}}&=${params.an}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden} & S_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.q_n_Sn:
      return `
\\begin{align*}
  q&=${params.q} & S_{${params.n}}&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden} & a_{${params.n}}&=${hidden}
\\end{align*}
`;
    case Variant.q_an_Sn:
      return `
\\begin{align*}
  q&=${params.q} & a_n&=${params.an} &  S_n&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden} & n&=${hidden}
\\end{align*}
`;
    case Variant.n_an_Sn:
      return `
\\begin{align*}
  a_{${params.n}}&=${params.an} & S_{${params.n}}&=${params.Sn}
\\end{align*}
\\\\
\\begin{align*}
  a_1&=${hidden}                & q&=${hidden}
\\end{align*}
`;
  }
};

const georenderSolution = (params: Params, variant: Variant): string => {
  switch (variant) {
    case Variant.a1_q_n:
      return `
\\begin{align*}
  a_{${params.n}}&=${params.an} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_q_an:
      return `
\\begin{align*}
  n&=${params.n} & S_n&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_q_Sn:
      return `
\\begin{align*}
  n&=${params.n} & a_n&=${params.an}
\\end{align*}
`;
    case Variant.a1_n_an:
      return `
\\begin{align*}
  q&=${params.q} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.a1_n_Sn:
      return `
\\begin{align*}
  q&=${params.q} & a_{${params.n}}&=${params.an}
\\end{align*}
`;
    case Variant.a1_an_Sn:
      return `
\\begin{align*}
  q&=${params.q} & n&=${params.n}
\\end{align*}
`;
    case Variant.q_n_an:
      return `
\\begin{align*}
  a_1&=${params.a1} & S_{${params.n}}&=${params.Sn}
\\end{align*}
`;
    case Variant.q_n_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & a_{${params.n}}&=${params.an}
\\end{align*}
`;
    case Variant.q_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & n&=${params.n}
\\end{align*}
`;
    case Variant.n_an_Sn:
      return `
\\begin{align*}
  a_1&=${params.a1} & q&=${params.q}
\\end{align*}
`;
  }
};

export const geocalculateAn = (a1: number, n: number, q: number): number => {
  return a1 * Math.pow(q,n - 1);
};

export const geocalculateSn = (a1: number, n: number, q: number): number => {
  return a1 * (Math.pow(q,n)-1) / (q-1);
};

const geometricSeries: ProblemGenerator = {
  key: "geometric-series",
  generate: () => {
    const a1 = randomInt(-9, 10);
    const q = randomInt(-5, 7, (value) => value !== 0);
    const n = randomInt(5, 25);
    const an = geocalculateAn(a1, n, q);
    const Sn = geocalculateSn(a1, n, q);

    const params = {
      a1,
      q,
      n,
      an,
      Sn,
    };
    const variant = randomEnum(Variant);

    return {
      description: georenderDescription(params, variant),
      solution: georenderSolution(params, variant),
    };
  },
};

export default geometricSeries;