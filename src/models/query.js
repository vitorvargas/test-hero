export const query = {
  state: {
    name: null,
    likeMore: null
  },
  reducers: {
    setQuery(state, payload) {
      let newState = {...state};

      newState.name = payload.name;
      newState.likeMore = payload.likeMore;

      return newState;
    }
  }
};