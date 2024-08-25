import { createApi } from '@reduxjs/toolkit/query/react';
import { PhoneType } from './types';
import baseQuery from './baseQuery';

export const phoneApi = createApi({
  reducerPath: 'phoneApi',
  baseQuery: baseQuery(),
  tagTypes: ['Phone'],
  endpoints: (builder) => ({
    getPhones: builder.query<PhoneType[], string>({
      query: (contact_id: string) => 'phones/' + contact_id,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Phone' as const, id })), { type: 'Phone', id: 'LIST' }]
          : [{ type: 'Phone', id: 'LIST' }],
    }),
    addPhone: builder.mutation<PhoneType, Partial<PhoneType>>({
      query: (newPhone) => ({
        url: 'phones',
        method: 'POST',
        body: newPhone,
      }),
      invalidatesTags: [{ type: 'Phone', id: 'LIST' }],
    }),
    updatePhone: builder.mutation<PhoneType, { id: string; updatedPhone: Partial<PhoneType> }>({
      query: ({ id, updatedPhone }) => ({
        url: `phones/${id}`,
        method: 'PUT',
        body: updatedPhone,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Phone', id }],
    }),
    deletePhone: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `phones/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Phone', id }],
    }),
  }),
});

export const {
  useGetPhonesQuery,
  useAddPhoneMutation,
  useUpdatePhoneMutation,
  useDeletePhoneMutation,
} = phoneApi;

export default phoneApi;
