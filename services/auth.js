import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
import {baseConfig} from './restservice';
import {Logout} from './apiservice';
import { post, get , postFile} from "./restservice";
// set up cookies
const cookies = new Cookies();

export async function handleAuthSSR(ctx) {
  let token = null;
  // if context has request info aka Server Side
  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
  }
  else {
    // we dont have request info aka Client Side
    token = cookies.get('token')
  }

  try {
    const response = await axios.get(baseConfig.baseURL + "/user/restricted", { headers: { 'Authorization':'Bearer ' + token } });
    // dont really care about response, as long as it not an error
    console.log("Golang Server Login Status ::", response.data.status)

  } catch (err) {
    // in case of error
    console.log(err.response.data.status);
    console.log("redirecting back to main page");
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/'
      })
      ctx.res.end()
    } else {
      Router.push('/')
    }
  }
}

export async function handleAuthEditor(ctx) {
  let token = null;
  // if context has request info aka Server Side
  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
  }
  else {
    // we dont have request info aka Client Side
    token = cookies.get('token')
  }

  try {
    const response = await axios.get(serverUrl + "/user/restricted", { headers: { 'Authorization':'Bearer ' + token } });
    // dont really care about response, as long as it not an error
    console.log("token ping:", response.data.status)
  } catch (err) {
    // in case of error
    console.log("redirecting back to main page");
    // redirect to login
    cookies.remove('token')
    localStorage.removeItem('user')
    localStorage.removeItem('loggedin')
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/login'
      })
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }

  const currentsession = await ctx.query.name;
  const cards = await getAllFlashCards(currentsession);
  const authorizedcards = [];
  var user = '';
  if(!user) {
    user = await asyncLocalStorage.getItem('user');
  }
  console.log(user);
  if(cards) {
    cards.map((card) => {
      if(card.owner == user) {
        authorizedcards.push(card);
      }
    })
  }
  return authorizedcards;
}