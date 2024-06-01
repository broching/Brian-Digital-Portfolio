import axios from "axios";
import { toast } from "react-toastify";

const baseApi = "http://localhost:5267/api/skill/";

async function CreateSkill(formData, navigate) {

    return await axios.post(baseApi + "create", formData)
        .then((res) => {
            toast.success(`Skill: ${res.data.title} has been added`);
            navigate('/skills')
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function GetAllSkill() {

    return await axios.get(baseApi + "get")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

export {
    CreateSkill,
    GetAllSkill
}; // Export the function
