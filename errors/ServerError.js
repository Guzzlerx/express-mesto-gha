class ServerError extends Error {
  constructor() {
    super();
    this.statusCode = 500;
  }
}

module.exports = ServerError;
