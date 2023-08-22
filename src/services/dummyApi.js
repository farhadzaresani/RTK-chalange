import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dummyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64e49099c555638029136ec8.mockapi.io/dummy/",
  }),
  endpoints: (build) => ({
    getDummyList: build.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const dataListresults = await fetchWithBQ("parent_list/").then(
          (res) => {
            res?.data?.map((item) => fetchWithBQ(`items/${item.id}`));
          }
        );
        return { data: dataListresults };
      },
    }),
  }),
});

export const { useGetDummyListQuery } = dummyApi;
