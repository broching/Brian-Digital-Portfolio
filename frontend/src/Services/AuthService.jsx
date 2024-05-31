import axios from "axios"

const baseApi = "http://localhost:5267/api/account/"

export const LoginApi = async (email, password) => {
    try {
        const data = await axios.post(baseApi + "login", { email, password });
        return data;
    }
    catch (error) {
        // console.log(error);
        return;
    }
};

export const RegisterApi = async (email, password, firstName, LastName) => {
    try {
        const data = await axios.post(baseApi + "register", { email, password, firstName, LastName });
        return data;
    }
    catch (error) {
        console.log(error);
        return;
    }
};