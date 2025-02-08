import { toast } from "react-toastify";

export const handlesuccess = (msg)=>{
    toast.success(msg,{
        position:"top-right"
    })
}

export const handleerror = (msg)=>{
    toast.error(msg,{
        position:"top-right"
    })
}

export const intermediate = (msg)=>{
    toast.info(msg,{
        position:"top-right"
    })
}