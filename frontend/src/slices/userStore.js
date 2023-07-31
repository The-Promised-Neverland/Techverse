import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await AsyncStorage.removeItem("userInfo");
    return null;
  } catch (error) {
    throw error;
  }
});

const userStore = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = {...state.userInfo, ...action.payload};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userInfo = null;
      return;
    });
  },
});

export const { setUserInfo } = userStore.actions;
export default userStore.reducer;
