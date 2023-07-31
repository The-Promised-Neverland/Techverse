import { IMG_UPLOAD_USER, USERS_URL } from "../Endpoints";
import { apiSlice } from "./apiSlice";
import { setUserInfo } from "./userStore";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInfo(data));
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
          dispatch(setUserInfo(data));
        } catch (error) {
          console.error("Failed to set userInfo", error);
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
    uploadUserImage: builder.mutation({
      query: ({userID, image}) => ({
        url: `${IMG_UPLOAD_USER}`,
        method: "POST",
        body: {userID, image},
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useUploadUserImageMutation
} = usersApiSlice;
