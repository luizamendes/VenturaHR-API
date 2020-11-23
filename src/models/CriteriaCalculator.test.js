const CriteriaCalculator = require("./CriteriaCalculator");

const criteriaList = [
  {
    id: "_sifaskxap",
    name: "UML",
    description:
      "O candidato deverá conhecer os principais diagramas da UML: casos de uso, classes e seqüência.",
    profile: 4,
    weight: 5,
    applicantAnswer: 5,
  },
  {
    id: "_0ldti7b7q",
    name: "Inglês",
    description: "Conversação e leitura de documentos técnicos.",
    profile: 4,
    weight: 3,
    applicantAnswer: 3,
  },
  {
    id: "_0ldti7b7q",
    name: "Análise de Pontos de Função",
    description: "Desejável conhecimentos de dimensionamento de sistemas.",
    profile: 1,
    weight: 1,
    applicantAnswer: 1,
  },
  {
    id: "_0ldti7b7q",
    name: "Experiência Profissional",
    description:
      "2 anos de experiência em levantamento de requisitos e análise",
    profile: 4,
    weight: 2,
    applicantAnswer: 5,
  },
];

test("should calculate PMD correctly", () => {
  const result = new CriteriaCalculator(criteriaList);
  result.calculateResult();

  expect(result.result).toBe(3.73);
});

test("should calculate candidate score correctly", () => {
  const result = new CriteriaCalculator(criteriaList, "application");
  result.calculateResult();

  expect(result.result).toBe(4.09);
});
