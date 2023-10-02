import {createResType, ErrorType, Normalized, RowType, updateResType } from "./types";
import { createEntityAdapter } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { changeRowsInCash, createTag, createTags } from "../../helpers";


export const baseRow ={
  id: 123581321,
  equipmentCosts: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  overheads: 0,
  parentId: null,
  rowName: "",
  salary: 0,
  supportCosts: 0
} as RowType


const eID = 62716
const baseURl = `http://185.244.172.108:8081/v1/outlay-rows/entity/`

const apiAdapter = createEntityAdapter()
const initialState = apiAdapter.getInitialState()

//методы реализованы так, что при выполнении crud запросы на сервер за обновленными get данными не выполняются,
// изменения происходят в существующем кеше.
// тк в процессе выяснилось, что сервер ничего не сохраняет, методы в коде не используются
// если бы был полноценный сервер: поскольку id дается нами для работы c onQueryStarted, а c сервера возвращается другой id,
// то при пришлось вводить localID , в которой храниться id для onQueryStarted.  В поле id хранится id c сервера, он же исп-ся при запросах

//вопрос с нормализацией данных - тк не совсем поняла children как приходят. Возможно в будущем пришлось бы делать рекурсивный обход

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: retry(fetchBaseQuery({ baseUrl: baseURl }), {
    maxRetries: 2,
  }),
  tagTypes: ["row"],
  endpoints: (builder) => ({
    getList: builder.query<Normalized<RowType>, string>({
      query: () => `${eID}/row/list`,
      providesTags: (result: Normalized<RowType>, error: ErrorType) =>
        createTags<Normalized<RowType>>("row", result, error),
      transformResponse: (res) =>
        res.length
          ? apiAdapter.setAll(initialState, res)
          : {
              ids: [],
              entities: {},
            },
    }),
    addRow: builder.mutation<RowType, RowType>({
      query: (row= baseRow ) => ({
        url: `create`,
        method: "POST",
        body: row ,
      }),
      providesTags: (result: createResType, error: ErrorType) => createTag('row', result , error),
      async onQueryStarted(  row= baseRow, { dispatch, queryFulfilled }) {
        changeRowsInCash<Normalized<RowType>>(
          { dispatch, queryFulfilled },
          (draft) => {
            draft.ids.push(row.id)
            draft.entities[row.id] = row
          },
        )
      },
    }),
    updateRow: builder.mutation<updateResType, updateResType>({
      query: (row) => ({
        url: `${eID}/row/${row.id}/update`,
        method: "POST",
        body: row ,
      }),
      providesTags: (result: updateResType, error: ErrorType) => createTag('row', result.current , error),
      async onQueryStarted(row, { dispatch, queryFulfilled }) {
        changeRowsInCash<Normalized<RowType>>(
          { dispatch, queryFulfilled },
          (draft) => {
            draft.entities[row.localID] = row
          },
        )
      },
    }),
    deleteRow: builder.mutation<string, number>({
      query: (param:{id:number, localID:number}) => ({
        url: `${eID}/row/${param.id}/delete/`,
        method: "DELETE",
      }),
      async onQueryStarted(param:{id:number, localID:number}, { dispatch, queryFulfilled }) {
        await changeRowsInCash<Normalized<RowType>>(
          { dispatch, queryFulfilled },
          (draft) => {
            const index = draft.ids.indexOf(param.localID)
            if (index > -1) {
              draft.ids.splice(index, 1)
              delete draft.entities[param.localID]
            }
          },
        )
      },
    })
  }),
})
