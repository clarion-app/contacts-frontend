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

export interface GroupType {

}

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: baseQuery(),
  tagTypes: ['Group'],
  endpoints: (builder) => ({
    getgroups: builder.query({
      query: () => '/groups',
      providesTags: ['Group'],
    }),
    getgroup: builder.query<GroupType, string>({
      query: (id) => `/groups/${id}`,
      providesTags: ['Group'],
    }),
    creategroup: builder.mutation<GroupType, Partial<GroupType>>({
      query: (group) => ({
        url: '/groups',
        method: 'POST',
        body: group,
      }),
      invalidatesTags: ['Group'],
    }),
    updategroup: builder.mutation<GroupType, { id: string; group: Partial<GroupType> }>({
      query: ({ id, group }) => ({
        url: `/groups/${id}`,
        method: 'PUT',
        body: group,
      }),
      invalidatesTags: ['Group'],
    }),
    deletegroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Group'],
    }),
  }),
});

export const {
  useGetgroupsQuery,
  useGetgroupQuery,
  useCreategroupMutation,
  useUpdategroupMutation,
  useDeletegroupMutation,
} = groupsApi;