import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import{ CookieJar } from 'tough-cookie';

const jar = new CookieJar();
const client = wrapper(axios.create( {jar} ));

var host = "http://localhost:8080";

var url = host + "/api/v1/";

export async function register(email: string, password: string, name: string, dob: string){
    let content = await client({
        method: 'post',
        url: url+"register",
        data:{
            email: email,
            password: password,
            name: name,
            dob: dob,
        }
    });
    return content;
}

export async function login(email: string, password: string){
    let content = await client({
        method: 'post',
        url: url+"login",
        data:{
            email: email,
            password: password,
        }
    });
    return content;
}


export async function logout(){
    let content = await client({
        method: 'post',
        url: url+"logout",
        withCredentials: true
    });
    return content;
}

export async function getWordAndDef(){
    let content = await client({
        method: 'post',
        url: url+"getWordAndDef",
        withCredentials: true
    });
    return content;
}

export async function getWordAndDefTest(){
    let content = await client({
        method: 'get',
        url: url+"getWordAndDefTest",
        withCredentials: true
    });
    return content;
}


// need to fetch token using some springboot method, so that the user can be verified when accessing
// the database even after login due to AuthenticationToken for password



