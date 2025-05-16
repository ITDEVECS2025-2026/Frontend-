import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://api.ecs-laboratory.com/",
    headers: {
        "Content-Type": "application/json",
    }
})

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(config.headers){
        config.headers.Authorization = token? `Bearer ${token}` : '';

    }
    return config;
}
)

export default axiosClient