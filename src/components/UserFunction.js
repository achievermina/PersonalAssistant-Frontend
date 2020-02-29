import axios from 'axios'

// export const register = newUser => {
//     return axios
//         .post("users/register", {
//             first_name: newUser.first_name,
//             last_name: newUser.last_name,
//             email: newUser.email,
//             password: newUser.password
//         })
//         .then(response => {
//             console.log("Registered")
//         })
// }

export const login = user => {
    return axios
        .post("https://127.0.0.1:5000/login", {
            id: user.id,
            email: user.email,
            password: user.password,
            accessToken: user.accessToken,
            idToken: user.idToken,
            expires_at: user.expires_at,
        })
        .then(response => {
            localStorage.setItem('userToken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}