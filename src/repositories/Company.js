class CompanyRepository {
  save(company) {
    // save company
    console.log("saving company", company);
  }
}

module.exports = new CompanyRepository();
