import MarvelClient from "../client/MarvelClient";

export const data = {
  state: {
    list: [],
    total: 0,
    pageSize: 10,
    page: 0,
    loading: false,
    error: null,
    sorted: undefined,
  },
  reducers: {
    setLoading(state, loading) {
      return {
        ...state,
        loading,
      };
    },
    setData(state, { total, list, page, sorted }) {
      return {
        ...state,
        total,
        list,
        page,
        sorted,
      };
    },
    setError(state, error) {
      return {
        ...state,
        error,
      };
    },
  },
  effects: (dispatch) => ({
    async getHeros({ page, sorted }, state) {
      dispatch.data.setLoading(true);
      dispatch.data.setError(null);

      try {
        const { data } = await MarvelClient.get("/v1/public/characters", {
          params: {
            nameStartsWith: state.query.name,
            limit: state.data.pageSize,
            offset: state.data.pageSize * page,
            orderBy: sorted,
          },
        });

        dispatch.data.setData({
          total: data.data.total,
          list: data.data.results,
          page: Math.floor(data.data.offset / state.data.pageSize),
          sorted: sorted,
        });
      } catch (e) {
        if (typeof e === "object" && e.message) {
          dispatch.data.setError(e.message);
        } else {
          dispatch.data.setError(JSON.stringify(e));
        }
      } finally {
        dispatch.data.setLoading(false);
      }
    },
  }),
};
