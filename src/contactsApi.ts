import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { ContactType } from './types';

export const contactsApi = createApi({
  reducerPath: 'clarion-app-contacts-contactsApi',
  baseQuery: baseQuery(),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contact'],
    }),
    getContact: builder.query<ContactType, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ['Contact'],
    }),
    createContact: builder.mutation<ContactType, Partial<ContactType>>({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<ContactType, { id: string; contact: Partial<ContactType> }>({
      query: ({ id, contact }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;