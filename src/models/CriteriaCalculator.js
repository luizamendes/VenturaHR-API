class CriteriaCalculator {
  constructor(criteriaList, type) {
    this.criteriaList = criteriaList;
    this.type = type;
    this.result = 0;
  }

  _calculateWeights() {
    return this.criteriaList.reduce((acc, curr) => acc + curr.weight, 0);
  }

  calculateResult() {
    const weights = this._calculateWeights();
    const results = this.criteriaList.reduce((acc, curr) => {
      if (this.type === "application") {
        return acc + +curr.applicantAnswer * curr.weight;
      } else {
        return acc + +curr.profile * curr.weight;
      }
    }, 0);

    this.result = +(results / weights).toFixed(2);
  }
}

module.exports = CriteriaCalculator;
