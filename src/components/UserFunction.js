import axios from 'axios'
import Cookies from 'js-cookie';
import {loginUser} from '../App.js'


export const newlogin = (User) => {
    debugger
    return axios.post("http://127.0.0.1:5000/login", {
        googleToken: User.googleToken,
        email: User.email,
        myToken: User.myToken
    }).then(response => [response.data.ok, response.data.token]
    ).catch(error => console.error(error))
}

export const cookielogin = (User) => {
    return axios.get("http://127.0.0.1:5000/cookielogin", {
        jwtToken: User.myToken
    }).then(response => response.data.user
    ).catch(error => console.error(error))
}

export const calendar = (User) => {
    return axios
        .post("http://127.0.0.1:5000/calendar", {
            googleToken: User.id,
            email: User.email,
            myToken: User.myToken,
        }).then(response => {
            Cookies.set('myToken', response.data.myToken, { expires: 7 })
            return response.data.myToken
        })
        .catch(err => {
            console.log(err)
            return ""
        })
}




