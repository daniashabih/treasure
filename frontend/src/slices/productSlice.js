import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import { toast } from 'react-toastify';

export const listProducts = createAsyncThunk(
  'product/listProducts',
  async ({ keyword, pageNumber }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products?keyword=${keyword}&pageNumber=${pageNumber}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const listProductDetails = createAsyncThunk(
  'product/listProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/products', {});
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/products/${product._id}`, product);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createProductReview = createAsyncThunk(
  'product/createProductReview',
  async ({ productId, review }, { rejectWithValue }) => {
    try {
      await api.post(`/products/${productId}/reviews`, review);
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const listTopProducts = createAsyncThunk(
  'product/listTopProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products/top');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  products: [],
  product: { reviews: [] },
  topProducts: [],
  loading: false,
  error: null,
  success: false,
  pages: 1,
  page: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = { reviews: [] };
    },
    resetProductSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((x) => x._id !== action.payload);
        toast.success('Product deleted');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.success = true;
        toast.success('Product created');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex((x) => x._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.product = action.payload;
        state.success = true;
        toast.success('Product updated');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(createProductReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        toast.success('Review added');
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(listTopProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload;
      })
      .addCase(listTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProduct, resetProductSuccess } = productSlice.actions;
export default productSlice.reducer;
