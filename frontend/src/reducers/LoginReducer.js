export const initialState = {
  user: {},
  loading: true,
  error: "",
  authentication:false
};

export const LoginReducer = (state, action) => {
debugger
  console.log(action)
  switch (action.type) {
    case "OnRequest":
      return { ...state, user: action.payload, loading: true, error: "" };
    case "OnSuccess":
      return {  ...state,  user: action.payload, loading: false, error: "" ,authentication: true};
    case "OnFailure":
      return {  ...state, loading: true, error: action.payload };
    case "Finally":
      return { ...state, loading: false };
    case "Reset":
      return initialState;
    default:
      return state;
  }
};
