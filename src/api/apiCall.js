import { tableUrls } from "../const/routePaths"
import { methodApi } from "./config"

export const getHeader=async()=>{
    try {
        const response =await methodApi("get",tableUrls.header,{})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getDetail=async()=>{
    try {
        const response =await methodApi("get",tableUrls.detail,{})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getItem=async()=>{
    try {
        const response =await methodApi("get",tableUrls.item,{})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const postSale=async(data)=>{
    try {
        const response =await methodApi("post",tableUrls.headerMultiple,data)
        return response.data
    } catch (error) {
        console.error(error)
        return error
    }
}