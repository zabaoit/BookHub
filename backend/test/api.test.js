import request from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

const API_URL = `http://localhost:${process.env.PORT || 8080}`;

describe("BookHub API smoke test", function () {
  this.timeout(10000);

  let accessToken;

  it("should login as admin", async () => {
    const res = await request(API_URL)
      .post("/api/auth/login")
      .send({ email: "admin@gmail.com", password: "Admin@123" });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("accessToken");
    accessToken = res.body.accessToken;
  });

  it("should get book list", async () => {
    const res = await request(API_URL)
      .get("/api/books")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.an("array");
    expect(res.body.data.length).to.be.greaterThan(0);
  });

  it("should get categories", async () => {
    const res = await request(API_URL)
      .get("/api/categories")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.an("array");
    expect(res.body.data.length).to.be.greaterThan(0);
  });

  it("should get authors", async () => {
    const res = await request(API_URL)
      .get("/api/authors")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.an("array");
    expect(res.body.data.length).to.be.greaterThan(0);
  });

  it("should add book to cart", async () => {
    const booksRes = await request(API_URL)
      .get("/api/books")
      .set("Authorization", `Bearer ${accessToken}`);
    const bookId = booksRes.body.data[0]._id;
    
    const res = await request(API_URL)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ bookId, quantity: 2 });
      
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("data");
  });

  it("should create order from cart", async () => {
    const res = await request(API_URL)
      .post("/api/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ 
        shippingAddress: "123 Đường ABC, Quận 1, TP.HCM", 
        buyerName: "Người Mua Test", 
        buyerPhone: "0901234567",
        note: "Test order" 
      });
      
    expect(res.status).to.equal(201);
    expect(res.body.data).to.have.property("_id");
    expect(res.body.data).to.have.property("status");
  });
});

describe("Books pagination normalization", function () {
  this.timeout(10000);

  it("should fallback to page 1 and limit 16 for empty params", async () => {
    const res = await request(API_URL).get("/api/books?page=&limit=");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("page", 1);
    expect(res.body).to.have.property("limit", 16);
    expect(res.body.data).to.be.an("array");
  });

  it("should fallback to defaults for non-numeric params", async () => {
    const res = await request(API_URL).get("/api/books?page=abc&limit=xyz");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("page", 1);
    expect(res.body).to.have.property("limit", 16);
    expect(res.body.data).to.be.an("array");
  });

  it("should cap limit at 50 when requested limit is too large", async () => {
    const res = await request(API_URL).get("/api/books?page=1&limit=999");

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("page", 1);
    expect(res.body).to.have.property("limit", 50);
    expect(res.body.data).to.be.an("array");
  });
});
