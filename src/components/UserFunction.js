import axios from 'axios'

export const newlogin = async (User) => {
    return await axios.post("http://127.0.0.1:5000/login", {
        googleToken: User.googleToken,
        accessToken: User.accessToken,
        email: User.email,
        myToken: User.myToken
    }).then(response => [response.data.ok, response.data.token, response.data.calendar]
    ).catch(error => console.error(error))
}

export const cookielogin = async (token) => {
    return await axios.post("http://127.0.0.1:5000/cookielogin", {
        jwt: token
    }).then(response => response.data
    ).catch(error => {
        console.error(error)
        return "";
    })
};

// export const get_calendar_event = async (token) => {
//     return await axios
//         .get("http://127.0.0.1:5000/calendar", {
//             params:{
//                 token:token
//             }
//         }).then(response => response)
//         .catch(err => {
//             console.log(err);
//             return ""
//         })
// };

