const request = require("supertest");
const app = require("../server");

describe("📦 CART API TESTING", () => {

    test("Add to cart should return success: true", async () => {
        const response = await request(app)
            .post("/cart/add")
            .send({
                id: "testproduct",
                name: "Test Product",
                price: 100,
                image: "/test.jpg"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });

});

describe("🛒 HOME PAGE ROUTE TEST", () => {

    test("GET / should return status 200", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });

});
