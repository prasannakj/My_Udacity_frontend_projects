import {ProductStore} from "../products";

const store = new ProductStore();

describe("Product Model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });

    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("create method should create a product", async () => {
        const result = await store.create({name: "Product", price: "19.00", category: "Shoes"});
        expect(result).toEqual(jasmine.objectContaining({name: "Product", price: "19.00", category: "Shoes"}));

        await store.delete(result.id);
    });

    it("delete method delete a product", async () => {
        const product = await store.create({name: "Product", price: "19.00", category: "Shoes"});
        const result = await store.delete(product.id);

        expect(result).toEqual("Product successfully deleted");
    });
});
