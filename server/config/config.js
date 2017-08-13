require('dotenv').config()
var config = {
  port: process.env.PORT || 3000,
  test_port: 3001,
  mongoURI: {
    // development: "mongodb://localhost/fareat",
    development: "mongodb://erwinwahyura:"+process.env.PASSWORD+"@fareat-shard-00-00-b3zko.mongodb.net:27017,fareat-shard-00-01-b3zko.mongodb.net:27017,fareat-shard-00-02-b3zko.mongodb.net:27017/"+process.env.DATABASE+"?ssl=true&replicaSet=Fareat-shard-0&authSource=admin",
    test: "mongodb://localhost/fareat_test"
  }
}

module.exports = config
