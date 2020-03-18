import axios from "axios";
import { env, keys } from "@/config/constants";

let config = {
    baseURL: env[process.env.NODE_ENV] || env.development,
};

const _axios = axios.create(config);

_axios.defaults.headers.common['x-api-key'] = 'GfWvpOFkVJu2jJH5zsyonkTueSG98Ezj';

export default _axios;
