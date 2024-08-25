import { createApi } from '@reduxjs/toolkit/query/react';
import { EmailType } from './types';
import baseQuery from './baseQuery';

export const emailApi = createApi({
  reducerPath: 'clarion-app-contacts-emailApi',
  baseQuery: baseQuery(),
  tagTypes: ['Email'],
  endpoints: (builder) => ({
    getEmails: builder.query<EmailType[], string>({
      query: (contact_id: string) => 'emails/' + contact_id,
      providesTags: ['Email'],
    }),
    addEmail: builder.mutation<EmailType, Partial<EmailType>>({
      query: (newEmail) => ({
        url: 'emails',
        method: 'POST',
        body: newEmail,
      }),
      invalidatesTags: ['Email'],
    }),
    updateEmail: builder.mutation<EmailType, { id: string; updatedEmail: Partial<EmailType> }>({
      query: ({ id, updatedEmail }) => ({
        url: `emails/${id}`,
        method: 'PUT',
        body: updatedEmail,
      }),
      invalidatesTags: ['Email'],
    }),
    deleteEmail: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `emails/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Email'],
    }),
  }),
});

export const {
  useGetEmailsQuery,
  useAddEmailMutation,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
} = emailApi;

export default emailApi;