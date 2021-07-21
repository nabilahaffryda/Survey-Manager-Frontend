import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
// login request
// const loginCheck = params => {
//     return axios.post('/login', params).then(res => {
//         return res.data
//     })
// }
// export { loginCheck }
