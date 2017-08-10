var config = {
  port: process.env.PORT || 3000,
  test_port: 3001,
  mongoURI: {
    development: process.env.MONGOLAB_URI || "mongodb://localhost/fareat",
    test: "mongodb://localhost/fareat_test"
  }
}

module.exports = config
