import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backend } from '.';

const rawBaseQuery = (baseUrl: string) => fetchBaseQuery({ 
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', 'Bearer ' + backend.token);
      return headers;
  }
});

function baseQuery(): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
    return async (args, api, extraOptions) => {
        let result = await rawBaseQuery((await backend).url + '/api/clarion-app/contacts')(args, api, extraOptions);
        return result;
    };
}

export interface ContactType {

}

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
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
      query: (list) => ({
        url: '/contacts',
        method: 'POST',
        body: list,
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation<ContactType, { id: string; list: Partial<ContactType> }>({
      query: ({ id, list }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: list,
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