class User {
  constructor(args) {
    const { id, name, email, address, phone, password } = args;

    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.password = password;
  }

  searchJobs() {}
}

module.exports = User;
