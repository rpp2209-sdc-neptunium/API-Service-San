const request = require("supertest");

const app = require("..//server/index.js");

describe("Test API", () => {
  test("GET /products", (done) => {
    request(app)
      .get("/products")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        // console.log(res.body)
        res.body.length = 5;
        res.body[0].id = 1;
        res.body[0].name = "Camo Onesie";
        res.body[1].id = 2;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /products/:product_id", (done) => {
    request(app)
      .get("/products/11")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        // console.log(res.body)
        res.body.id = 11;
        res.body.name = 'Air Minis 250';
        res.body.category = 'Basketball Shoes';
        res.body.features.length = 3;
        res.body.features[0].feature = 'Sole';
        res.body.features[0].value = 'Rubber';
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /products/:product_id/styles", (done) => {
    request(app)
      .get("/products/1/styles")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        // console.log(res.body)
        res.body.product_id = '1';
        res.body.results[0].style_id = 1;
        res.body.results[0].name = 'Forest Green & Black';
        res.body.results[0]['default?'] = true;
        res.body.results[0].photos[0].url = 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
        res.body.results[0].skus[1].quantity = 8;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /products/:product_id/related", (done) => {
    request(app)
      .get("/products/1/related")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        // console.log(res.body)
        res.body[0] = 2;
        res.body[1] = 3;
        res.body[2] = 8;
        res.body[3] = 7;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
