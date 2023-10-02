import Table from "./Table"
import { apiSlice } from "./apiSlice"

export const {
  useGetListQuery,
  useAddRowMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = apiSlice
export { Table }
