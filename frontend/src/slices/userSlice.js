import { USERS_URL } from "../Endpoints";
import { apiSlice } from "./apiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
          console.error("Failed to set userInfo", error);
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
          console.error("Failed to set userInfo", error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          await AsyncStorage.removeItem("userInfo");
        } catch (error) {
          console.error("Failed to erase userInfo", error);
        }
      },
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
} = usersApiSlice;
