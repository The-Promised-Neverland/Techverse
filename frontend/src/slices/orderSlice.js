import { apiSlice } from "./apiSlice";
import {
  ORDERS_URL,
  CREATE_STRIPE_SESSION,
  RETRIEVE_STRIPE_SESSION,
} from "../Endpoints";
// /api/orders

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    StripeCheckoutSession: builder.mutation({
      query: ({ orderItems, URL, orderID }) => ({
        url: CREATE_STRIPE_SESSION,
        method: "POST",
        body: { orderItems, URL, orderID },
      }),
    }),
    retrieveStripeCheckoutSession: builder.mutation({
      query: ({ sessionID }) => ({
        url: `${RETRIEVE_STRIPE_SESSION}/${sessionID}`,
        method: "POST",
      }),
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myOrders`,
        keepUnusedDataFor: 5,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetUserOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useStripeCheckoutSessionMutation,
  useRetrieveStripeCheckoutSessionMutation,
} = ordersApiSlice;
