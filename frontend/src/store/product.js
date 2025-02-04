import { create } from "zustand";


//We must wrap the returning into parenthesis to return an object ({})
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product Created" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
      const res = await fetch(`/api/products/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    
    set((state) => ({
      products: state.products.filter((product) => product.id !== id) 
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (id, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
  
      const text = await res.text(); // Get raw response before parsing JSON
      console.log("Server Response:", text); // Debugging
  
      const data = JSON.parse(text); // Convert text to JSON
  
      if (!data.success) return { success: false, message: data.message };
  
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...data.data, id } : product
        ),
      }));
  
      return { success: true, message: data.message, updatedProduct: data.data };
    } catch (error) {
      console.error("Update error:", error);
      return { success: false, message: "Failed to update product." };
    }
  },
  
  
  
}));

