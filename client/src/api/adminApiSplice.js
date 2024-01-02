import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: bulder => ({
    getusers: bulder.mutation({
      query: Credentials => ({
        url: `/admin/getusers?role=${Credentials}`,
        method: 'get',
      })
    }),
    handleaccess: bulder.mutation({
      query: Credentials => ({
        url: '/admin/handleaccess',
        method: 'put',
        body: { ...Credentials }
      })
    }),
  })

})

export const {
  useHandleaccessMutation,
  useGetusersMutation,
} = userApiSlice