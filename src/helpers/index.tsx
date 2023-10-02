import { ErrorType } from "../features/Table/types";
import { apiSlice } from "../features/Table/apiSlice";

//for tags in RTK Query

export function createTag <T extends unknown>(
  tagName: string,
  res: T,
  error: ErrorType,
) {
  if (error) {
    return [{ type: tagName, id: error.status + "err" }]
  }
  return [{ type: tagName, id: res.id }]
}

export function createTags  <T extends unknown>(
  tagName: string,
  res: T,
  error: ErrorType,
) {
  if (error) {
    return [{ type: tagName, id: error.status + "err" }]
  }
  return res.ids.length > 0
    ? res.ids.map((el) => ({ type: tagName, id: el }))
    : [{ type: tagName, id: 0 }]
}

//wrapper for onQueryStarted


export async function changeRowsInCash   <T>(
  { dispatch, queryFulfilled },
  changeFunc: (draft: T) => T,
): Promise<T> {

  const patchResult = dispatch(
    apiSlice.util.updateQueryData("getList", undefined , changeFunc ),
  )
  try {
    const data = await queryFulfilled
  } catch {
    patchResult.undo()
  }
}

//creating id number

export function createId(parentID: number|null):number{
  if(parentID=== null){
    return getRandom(4,1000)
  }else{
    return +(`${parentID}${getRandom(0, 1000)}`)
  }

  function getRandom(min:number, max:number):number{
    return Math.floor(Math.random()*(max-min)+min)
  }
}