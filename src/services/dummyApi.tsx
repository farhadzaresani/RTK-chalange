import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ParentList {
  createdAt: string;
  id: string;
}

interface ChildData {
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
    getDummyList: build.query<ChildData[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const parentListResults = await fetchWithBQ("parent_list/");
        if (parentListResults.error) {
          return { error: parentListResults.error };
        }
        const parentList = parentListResults.data as ParentList[];
        const childFetchPromises = parentList.map((item) =>
          fetchWithBQ(`items/${item.id}`)
        );
        const childItemsResponses = await Promise.all(childFetchPromises);
        const childItemsData = childItemsResponses.map(
          (response) => response.data as ChildData
        );
        return { data: childItemsData };
      },
    }),
  }),
});

export const { useGetDummyListQuery } = dummyApi;
