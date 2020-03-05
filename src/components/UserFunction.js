import axios from 'axios'
import Cookies from 'js-cookie';


export const login = (User) => {
    return axios
        .post("https://127.0.0.1:5000/login", {
            googleToken: User.id,
            email: User.email,
            myToken: User.myToken
        })
        .then(response => {
            Cookies.set('myToken', response.data.token, { expires: 7 })
            return response.data.token
        })
        .catch(err => {
            console.log(err)
            return ""
        })
}



