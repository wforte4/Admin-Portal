import { catchAxiosError } from "./error";
import { post, get , postFile} from "./restservice";
import Router from 'next/router';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const backendImages = "https://zerorevision.com/restapi/uploadimages/";

export async function createProfile(fullname, email, password, image) {
    // Request data to post to createprofile route on rest api
    const data = {
        fullName: fullname,
        email: email,
        password: password
    }
    const res = await post("/users", {
        body: data
    }).catch(catchAxiosError);
    if(res.error) return res.error;
    if(!res.data) return "Something wrong";

    return res.data.status;
}

export async function resetPassword(email, newpassword) {
    const data = new URLSearchParams({
        email,
        newpassword
    })
    const res = await post("/resetpass", data).catch(catchAxiosError);
    if(res.error) return res.error;
    return res.data.status;
}

export async function confirmEmail(fullname, email) {
    const data = new URLSearchParams({
        fullname,
        email
    })
    const res = await post("/confirmemailzr", data).catch(catchAxiosError);
    if(res.error) return res.error;
    return res.data.message;
}

export async function forgotPass(email) {
    const data = new URLSearchParams({
        email,
    })
    const res = await post("/forgotpass", data).catch(catchAxiosError);
    if(res.error) return res.error;
    return res.data.message;
}

export async function checkConfirm(email, confirmation) {
    const data = new URLSearchParams({
        email,
        confirmation
    })
    const res = await post("/checkconfirm", data).catch(catchAxiosError);
    if(res.error) return res.error;
    if(res.data) return res.data.status;
}

export async function deleteProfile(user) {
    const res = await get(`/removeuser/${user}`);
    if(res.data) return res.data;
    if(res.error) return res.error;
    return res.data;
}

export async function removeFile(filename) {
    const res = await get(`/removefile/${filename}`).then(
        res => {
            if(res.error) return res.error;
            console.log(res.data.status);
            return res.data.status;
        }
    )
}

export async function removeUserFile(filepath, user) {
    const data = new URLSearchParams({
        filepath, 
        user,
    });
    const res = await post("/removefile", data).catch(catchAxiosError);
    if(res.error) return res.error;
    return res.data.status;
}

export const COOKIES = {
    logintoken: "indexplus.token.secured"
};

export async function Logout() {
    cookies.remove('token');
    
    localStorage.removeItem('user');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('authorization');
    localStorage.removeItem('expiration');
    localStorage.removeItem('sub');
    console.log("User logged out")
    await Router.push("/logout");
}

export async function loginRequest(email, password) {
    // New Login Data request
    const data = new URLSearchParams({
        email, 
        password,
    });
    const res = await post("/auth", data).catch(catchAxiosError);
    console.log(res)
    if(res.error) return res.error;
    if(res.data.error) {
        return res.data.error;
    }
}

export async function getProfile(user) {
    const res = await get(`/getprofile/${user}`);
    if(res.error) return res.error;
    return res.data;
}

export async function getStaticImages() {
    const res = await get("/uploadedimages");
    return res.data;
}

export async function getUserImages(user) {
    const res = await get(`/uploadedimages/${user}`);
    return res.data;
}

// Store Item and Post Upload Endpoints //
export async function getStoreItems(store) {
    const res = await get(`/getstoreitems/${store}`);
    if(res.error) return res.error;
    if(!res.data) return "Did not load or no items yet...";
    return res.data;
}

export async function getStoreItemsByUser(owner) {
    const res = await get(`/getstoreitemsbyuser/${owner}`);
    if(res.error) return res.error;
    if(!res.data) return "Did not load or no items yet...";
    return res.data;
}

export async function getStorePosts(store) {
    const res = await get(`/getstoreposts/${store}`);
    if(res.error) return "noresponse";
    if(!res.data) return "Did not load or no posts yet...";
    console.log("called get posts");
    return res.data;
}

export async function getStorePost(postid) {
    const res = await get(`/getstorepost/${postid}`);
    if(res.error) return res.error;
    if(!res.data) return "Did not load the post";
    return res.data;
}

export async function getStoreItem(itemid) {
    const res = await get(`/getstoreitem/${itemid}`);
    if(res.error) return res.error;
    if(!res.data) return "Did not load the item";
    return res.data;
}

export async function likeItem(itemid) {
    const res = await get(`/likeitem/${itemid}`);
    if(res.error) return res.error;
    return res.data.status;
}

export async function dislikeItem(itemid) {
    const res = await get(`/dislikeitem/${itemid}`);
    if(res.error) return res.error;
    return res.data.status;
}

export async function getItemComments(itemid) {
    const res = await get(`/getcomments/${itemid}`);
    if(res.error) return res.error;
    return res.data;
}

export async function makeComment(owner, commentstring, connectingitem, rating) {
    const data = new URLSearchParams({
        owner,
        commentstring,
        connectingitem,
        rating
    })
    const res = await post("/makecomment", data).catch(catchAxiosError);
    if(res.error) return res.error;
    if(res.data) return res.data.status;
}

export async function getStoreAuth(user) {
    const res = await get(`/getstoreauth/${user}`);
    if(res.error) return res.error;
    if(res.data.status) return "No Store";
    return res.data;
}

export async function makeNewAuth(storename, storeurl, username) {
    const data = new URLSearchParams({
        username,
        storename,
        storeurl
    });
    const res = await post("/makestoreauth", data).catch(catchAxiosError);
    if(res.error) return res.error;
    if(!res.data.status) "Did not work";
    return res.data.status;
}

export async function addStoreItem(itemname, itemdescription, itemprice, itemimage, itemstore, itemowner) {
    const data = new URLSearchParams({
        itemname, 
        itemdescription, 
        itemprice, 
        itemimage, 
        itemstore,
        itemowner
    });
    const res = await post("/createstoreitem", data).catch(catchAxiosError);
    if(res.error) return res.error;
    if(!res.data.status) "No Response";
    return res.data.itemid;
}

export async function removeItem(id) {
    const res = await get(`/deleteitem/${id}`);
    if(res.error) return res.error;
    return res.data.status;
}

// Shopping Card Session fetching and creating //
// >> ADD TO CART
// >> REMOVE FROM CART
// >> GET SHOPPING SESSION (AUTO CREATES SESSION IF NOT EXISTS)
// >> 

export async function addToCart(email, item) {
    const data = new URLSearchParams({
        email, item
    })
    const additem = await post('/addtocart', data).catch(catchAxiosError);
    if(additem) return additem.data.status;
}

export async function getShoppingSession(email) {
    const res = await get(`/getshoppingsession/${email}`);
    if(res) return res.data;
}

export async function getCartItems(cartdata) {
    const res = await get(`/getcartitems/${cartdata}`);
    if(res) return res.data;
}

export async function clearCart(email) {
    localStorage.removeItem('cartsession');
    const res = await get(`/clearcart/${email}`);
    if(res) return res.data.status;
}

export async function getpaymentintent(email, cartdata) {
    const data = new URLSearchParams({
        email,
        cartdata,
    });
    const res = await post("/paymentIntent", data).catch(catchAxiosError);
    if(res.error) return res.error;
    if(!res.data) return "Did not load or no items yet...";
    return res.data.client_secret;
}