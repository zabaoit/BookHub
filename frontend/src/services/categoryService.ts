import api from "../libs/axios";

export interface CategorySummary {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const categoryService = {
  getAllCategories: async (page = 1, limit = 100): Promise<CategorySummary[]> => {
    const response = await api.get("/categories", {
      params: { page, limit },
    });

    return response.data.data || response.data.categories || [];
  },
};

