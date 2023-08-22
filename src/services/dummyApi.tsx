import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
interface DuumyType {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
}

export const dummyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64e49099c555638029136ec8.mockapi.io/dummy/",
  }),
  endpoints: (build) => ({
    getDummyList: build.query<DuumyType[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const dataListresults = await fetchWithBQ("parent_list/");
        if (dataListresults.error) {
          return { error: dataListresults.error as FetchBaseQueryError };
        }
        const dataList = dataListresults.data as DuumyType[];
        const itemIds = dataList.map((item: DuumyType) => item.id);
        const itemUrls = itemIds.map(
          (id) =>
            `https://64e49099c555638029136ec8.mockapi.io/dummy/items/${id}`
        );
        const itemData = await batchFetch(itemUrls);
        return { data: itemData };
      },
    }),
  }),
});

export const { useGetDummyListQuery } = dummyApi;

async function batchFetch(urls: string[]) {
  const requests = urls.map((url) => fetch(url));
  const responses = await Promise.all(requests);
  const data = await Promise.all(responses.map((response) => response.json()));
  return data;
}
