import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { GroupType } from './types';

export const groupsApi = createApi({
  reducerPath: 'clarion-app-contacts-groupsApi',
  baseQuery: baseQuery(),
  tagTypes: ['Group'],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => '/groups',
      providesTags: ['Group'],
    }),
    getGroup: builder.query<GroupType, string>({
      query: (id) => `/groups/${id}`,
      providesTags: ['Group'],
    }),
    createGroup: builder.mutation<GroupType, Partial<GroupType>>({
      query: (group) => ({
        url: '/groups',
        method: 'POST',
        body: group,
      }),
      invalidatesTags: ['Group'],
    }),
    updateGroup: builder.mutation<GroupType, { id: string; group: Partial<GroupType> }>({
      query: ({ id, group }) => ({
        url: `/groups/${id}`,
        method: 'PUT',
        body: group,
      }),
      invalidatesTags: ['Group'],
    }),
    deleteGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Group'],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;