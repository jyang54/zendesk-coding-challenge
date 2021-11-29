var assert = require("assert");
var supertest = require("supertest");
var chai = require("chai");
var uuid = require("uuid");
var app = require("../server/index");
var expect = chai.expect;
var request = supertest(app);

describe("api", function () {
  it("returns a list of tickets", function (done) {
    request
      .get("/api")
      .expect(200)
      .end(function (err, res) {
        expect(res.data.data).to.have.lengthOf(101);
        done(err);
      });
  });
});
