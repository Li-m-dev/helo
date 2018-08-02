import axios from "axios";

const GET_USER = "GET_USER";
const GET_ME = "GET_ME";

const initialState = {
  username: "",
  profile_pic: ""
};
export function getUser(username, profile_pic) {
  // console.log(typeof username, typeof profile_pic);
  return {
    type: GET_USER,
    payload: { username, profile_pic }
  };
}

export function getMe() {
  return {
    type: GET_ME,
    payload: axios.get("/api/auth/me")
    // .then(response => {
    //   console.log("reducer response", response);
    //   return response.data;
    // })
  };
}

export default function reducer(state = initialState, action) {
  console.log("ACTION PAYLOAD", action.payload);
  console.log(action.type);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        username: action.payload.username,
        profile_pic: action.payload.profile_pic
      };
    case `${GET_ME}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data.username,
        profile_pic: action.payload.data.profile_pic
      };
    default:
      return state;
  }
}
