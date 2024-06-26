import axios from "axios";
import { toast } from "react-toastify";

const baseApi = "http://localhost:5267/api/achievement/";

async function CreateNewAchievement(formData, navigate) {

    return await axios.post(baseApi + "create", formData)
        .then((res) => {
            toast.success(`Achievement "${res.data.title}" has been added`);
            navigate('/achievement/listing')
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}


async function GetAllAchievement() {

    return await axios.get(baseApi + "getAll")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function GetAchievementById(id) {

    return await axios.get(baseApi + `get/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function UpdateAchievement(id, formData, navigate) {

    return await axios.put(baseApi + `update/${id}`, formData)
        .then((res) => {
            toast.success(`Achievement: ${res.data.title} has been updated`);
            navigate('/achievement/listing')
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function DeleteAchievement(id) {

    return await axios.delete(baseApi + `delete/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function DeleteMultipleAchievement(idArray) {

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
    CreateNewAchievement,
    GetAllAchievement,
    GetAchievementById,
    UpdateAchievement,
    DeleteAchievement,
    DeleteMultipleAchievement
}; // Export the function
