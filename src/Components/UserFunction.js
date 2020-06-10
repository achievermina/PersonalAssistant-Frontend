import axios from 'axios'

export const newlogin = async (User) => {
    return await axios.post(process.env.REACT_APP_BACKEND_LOGIN_ENDPOINT, {
        googleExchangeToken: User.googleExchangeToken,
        googleAccessToken: User.googleAccessToken,
        email: User.email,
        myToken: User.myToken
    }).then(response => [response.data.ok, response.data.token, response.data.calendar]
    ).catch(error => console.error(error))
}

export const cookielogin = async (token) => {
    return await axios.post(process.env.REACT_APP_BACKEND_COOKIELOGIN_ENDPOINT, {
        jwt: token
    }).then(response => response.data
    ).catch(error => {
        console.error(error)
        return "";
    })
};