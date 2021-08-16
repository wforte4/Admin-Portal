import { catchAxiosError } from "./error";
import { post, get } from "./restservice";

export async function addMessage(username, message) {
    const data = new URLSearchParams({
        username,
        message,
    });
    const res = await post("/addmessage", data).catch(catchAxiosError);
    if(res.error) return res.error;
    if(res.data) return res.data.status;
}

export async function getAllMessages(username) {
    const res = await get("/getmessagecenter/{id}");
    if(res.error) return res.error;
    if(res.data) return res.data;
}