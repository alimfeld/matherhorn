import { ProblemGenerator } from "../ProblemGeneratorSpi";
import { randomInt } from "../util/randomizer";
import { calculategcd } from "../util/commonDivisor";
import { SortByAlpha } from "@mui/icons-material";


interface Params {
  //[index: number]: [number,number,number,number];
  [index: number]: any[];
/*  sol: [number,number,number,number];
  frac1: [number,number,number,number];
  frac2: [number,number,number,number];
  frac3: [number,number,number,number];
  frac4: [number,number,number,number];
  pol: [number,number,number,number];*/
}


export const renderEquation = (params: Params) => {

  const b1 = params[1][1];
  const c1 = params[1][2];
  const d1 = params[1][3];
  const b2 = params[2][1];
  const c2 = params[2][2];
  const d2 = params[2][3];

  return `\\frac{${b1}}{${c1}x+${d1}}+\\frac{${b2}}{${c2}x+${d2}}=0`
  .replaceAll("+-", "-")
  .replaceAll("{-1x", "{-x")
  .replaceAll("{1x", "{x");
};

export const renderSolution = (params: Params,level:number) => {
  const sol1 = params[0][0];
  const sol2 = params[0][1];
  const frac1 = params[1];
  const frac2 = params[2];

  switch(level) {

    case 1:
      const b1 = frac1[1];
      const c1 = frac1[2];
      const d1 = frac1[3];
      const b2 = frac2[1];
      const c2 = frac2[2];
      const d2 = frac2[3];

    if (c1*d2===c2*d1){
      if (b1*d2===-1*b2*d1){
        return `
        \\begin{aligned}
        \\mathbb{L}&=\\mathbb{R} \ \\{${-d1/c1}\\} \\\\
        \\end{aligned}   
        `
      } else {
        return `
        \\begin{aligned}
        \\mathbb{L}&=\\{\\} \\\\
        \\end{aligned}   
        `
      }


    } else{
      return `
      \\begin{aligned}
      \\mathbb{L}&=\\{${sol1}\\} \\\\
      \\end{aligned}   
      `
    }



    case 2:
    return `
    \\begin{aligned}
    x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\end{cases}
    \\end{aligned}   
    `
    default:
      return `
      \\begin{aligned}
      x&=\\begin{cases} ${sol1} \\\\ ${sol2} \\end{cases}
      \\end{aligned}   
      `
  }
};

const fractionalEquation: ProblemGenerator = {
  key: "fractional-equation",
  generate: () => {
    var level = randomInt(1,6);
    level = 1;
    // Erste Stufe

           
    var c1 = randomInt(-9, 10, (value) => value !== 0);
    var d1 = randomInt(-9, 10, (value) => value !== 0);
    var c2 = randomInt(-9, 10, (value) => value !== 0);
    var d2 = randomInt(-9, 10, (value) => ![0, d1].includes(value));
    c1=1;d1=1;c2=2;d2=2;


    var sol1 = randomInt(-9, 10, (value) => ![-d2/c2, -d1/c1].includes(value));

    var factor12 = randomInt(-9, 10, (value) => value !== 0);
    var below1 = (c1 * sol1) + d1;
    var below2 = (c2 * sol1) + d2;

    var b1 = -1*(below1*factor12)/calculategcd([below1,below2]);
    var b2 = (below2*factor12)/calculategcd([below1,below2]);  


    var sol = [sol1,0,0,0];
    var frac1 = [0,b1,c1,d1];
    var frac2 = [0,b2,c2,d2];
    var frac3 = [0,0,0,0];
    var frac4 = [0,0,0,0];
    var pol = [0,0,0,0];

    let params:Params = [sol,frac1,frac2,frac3,frac4,pol];

    return {
      description: renderEquation(params),
      solution: renderSolution(params,level),
      };
  },
};

export default fractionalEquation;
