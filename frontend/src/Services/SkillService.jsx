import axios from "axios";
import { toast } from "react-toastify";

const baseApi = "http://localhost:5267/api/skill/";

async function CreateSkill(formData, navigate) {

    return await axios.post(baseApi + "create", formData)
        .then((res) => {
            toast.success(`Skill "${res.data.title}" has been added`);
            navigate('/skills/listing')
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function UpdateSkill(id, formData, navigate) {

    return await axios.put(baseApi + `update/${id}`, formData)
        .then((res) => {
            toast.success(`Skill: ${res.data.title} has been updated`);
            navigate('/skills/listing')
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

async function GetSkillById(id) {

    return await axios.get(baseApi + `get/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function DeleteSkillById(id) {

    return await axios.delete(baseApi + `delete/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function DeleteMultipleSkillById(idArray) {

    return await axios.post(baseApi + `deleteMultiple`, {deleteArray: idArray})
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
    GetAllSkill,
    GetSkillById,
    UpdateSkill,
    DeleteSkillById,
    DeleteMultipleSkillById
}; // Export the function
