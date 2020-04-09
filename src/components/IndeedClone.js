import axios from "axios";
import Cookies from "js-cookie";

export const searchJob = (searchTerm) => {
        // debugger;

    return axios
        .get("http://127.0.0.1:5000/indeedclone", {
            "term":searchTerm,
        })
        .then(response => {
            return response.data.list
        })
        .catch(err => {
            console.log(err)
            return ""
        })
}