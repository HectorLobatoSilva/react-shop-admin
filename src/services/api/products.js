import { makeFetch } from "@hooks/useFetch";
import endPoints from "@services/api";

export const addProduct = async (body = {}) => {
    try {
        const response = await makeFetch(endPoints.products.addProduct, "POST", body);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Cant add new product");
    }
};

export const deleteProduct = async (id = "") => {
    try {
        const response = await makeFetch(endPoints.products.deleteProducts(id), "DELETE");
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Cant delete product");
    }
};

export const updateProduct = async (id = "", body = {}) => {
    try {
        const response = await makeFetch(endPoints.products.putProducts(id), "PUT", body);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Cant update product");
    }
};
