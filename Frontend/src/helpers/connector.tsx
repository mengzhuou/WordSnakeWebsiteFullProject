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

export async function getWordAndDef(inputWord: string): Promise<String[]>{
    let content = await client({
        method: 'get',
        url: url+"getWordAndDef",
        params: {
          inputWord: inputWord
        },
        withCredentials: true
    });
    return content.data;
}

export async function getWordAndDefTest(): Promise<String[]>{
    let content = await client({
        method: 'get',
        url: url+"getWordAndDefTest",
        withCredentials: true
    });
    return content.data;
}