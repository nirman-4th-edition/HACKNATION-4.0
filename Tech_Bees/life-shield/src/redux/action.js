import axios from "axios";
import { NODE_BACKEND_URL as server } from "./store";

export const loginUser = (email, password, role) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.post(
      `${server}/${role}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      localStorage.setItem("role_user", role);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    }

    dispatch({
      type: "loginSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser = (formData, role) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const { data } = await axios.post(`${server}/${role}/register`, formData, {
      withCredentials: true,
    });

    if (data.success) {
      localStorage.setItem("role_user", role);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    }
    dispatch({
      type: "registerSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "registerFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const role = localStorage.getItem("role_user");
    const { data } = await axios.get(
      `${server}/${role ? role : user?.role}/profile`,
      {
        withCredentials: true,
        credentials: "include",
      }
    );

    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "loadUserFailure",
    });
  }
};

export const logout = (role) => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    const { data } = await axios.get(`${server}/${role}/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "logoutSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "logoutfailure",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (formData, role) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.post(
      `${server}/${role}/update-profile`,
      formData,
      {
        withCredentials: true,
      },
      {
        "Content-Type": "multipart/form-data",
      }
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};
