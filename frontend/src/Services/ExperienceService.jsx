import axios from "axios";
import { toast } from "react-toastify";

const baseApi = "http://localhost:5267/api/experience/";

async function CreateExperience(formData, navigate) {

    return await axios.post(baseApi + "create", formData)
        .then((res) => {
            toast.success(`Experience "${res.data.title}" has been added`);
            navigate('/experience/listing')
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}


async function GetAllExperience() {

    return await axios.get(baseApi + "get")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function GetExperienceById(id) {

    return await axios.get(baseApi + `get/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function UpdateExperience(id, formData, navigate) {

    return await axios.put(baseApi + `update/${id}`, formData)
        .then((res) => {
            toast.success(`Experience: ${res.data.title} has been updated`);
            navigate('/experience/listing')
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function DeleteExperience(id) {

    return await axios.delete(baseApi + `delete/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function DeleteMultipleExperience(idArray) {

    return await axios.post(baseApi + `deleteMultiple`, {DeleteList: idArray})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

export {
    CreateExperience,
    GetAllExperience,
    GetExperienceById,
    UpdateExperience,
    DeleteExperience,
    DeleteMultipleExperience
}; // Export the function
