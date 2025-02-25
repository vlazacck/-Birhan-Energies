import apiClient from "./apiClient";

export const fetchOilPrices = async () => {
    try {
        const response = await apiClient.get("/oil-prices"); // Adjust endpoint
        return response.data;
    } catch (error) {
        console.error("Error fetching oil prices:", error);
        return null;
    }
};
