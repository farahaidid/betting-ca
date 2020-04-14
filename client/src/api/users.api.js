import { baseApi } from "../axios/config.axios"
import ep from "./config.api"

export const FETCH_PROFILE = async ({ id, token }) => {
   try {
      baseApi.defaults.headers['access-token'] = token
      let user = (await baseApi.get(ep.user + id)).data
      return { user, error: false, message: "PROFILE FETCHED" }
   }
   catch (error) {
      let data = error.response.data || error
      return { error: true, message: data.message }
   }
}
export const UPDATE_USER = async (id, token, data) => {
   try {
      baseApi.defaults.headers['access-token'] = token
      let res = (await baseApi.patch(ep.user + id, data)).data
      return { data: res, error: false, message: "PROFILE UPDATED" }
   }
   catch (error) {
      let data = error.response.data || error
      return { error: true, message: data.message }
   }
}
export const SIGN_IN = async req => {
   try {
      let data = (await baseApi.post(ep.signIn, req)).data
      return {
         error: false, message: "SIGNED_IN",
         user: { _id: data._id }, accessToken: data.token
      }
   }
   catch (error) {
      console.log(error)
      return { error: true, message: error.message }
   }
}
export const SIGN_UP = async req => {
   try {
      let res = (await baseApi.post(ep.signUp, req)).data
      console.log(res)
      return { error: false, message: "SIGNED_UP" }
   }
   catch (error) {
      let data = error.response.data || error
      return { error: true, message: data.message }
   }
}

export default {
   SIGN_IN, SIGN_UP, FETCH_PROFILE, UPDATE_USER
}