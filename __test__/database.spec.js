var db = require('../database/index.js');

describe("Test DB read queries time", () => {
  test("products list", () => {
    const start = performance.now();
    return db.list()
    .then(() => {
      const end = performance.now();
      console.log('products list time: ', (end - start));
      expect(end - start).toBeLessThanOrEqual(50);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  test("product information", () => {
    const start = performance.now();
    return db.information(11)
    .then(() => {
      const end = performance.now();
      console.log('product information time: ', (end - start));
      expect(end - start).toBeLessThanOrEqual(50);
    })
    .catch((err) => {
      console.log(err);
    });

  });

  test("product styles", () => {
    const start = performance.now();
    return db.styles(11)
    .then(() => {
      const end = performance.now();
      console.log('product styles time: ', (end - start));
      expect(end - start).toBeLessThanOrEqual(50);
    })
    .catch((err) => {
      console.log(err);
    });

  });

  test("product related", () => {
    const start = performance.now();
    return db.related(11)
    .then(() => {
      const end = performance.now();
      console.log('product related time: ', (end - start));
      expect(end - start).toBeLessThanOrEqual(50);
    })
    .catch((err) => {
      console.log(err);
    });

  });
});