import axios from "axios";
import { toast } from "react-toastify";

const baseApi = "http://localhost:5267/api/project/";

async function CreateProject(formData, navigate) {

    return await axios.post(baseApi + "create", formData)
        .then((res) => {
            toast.success(`Project "${res.data.title}" has been added`);
            navigate('/project/listing')
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}


async function GetAllProject() {

    return await axios.get(baseApi + "getAll")
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function GetProjectById(id) {

    return await axios.get(baseApi + `get/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function UpdateProject(id, formData, navigate) {

    return await axios.put(baseApi + `update/${id}`, formData)
        .then((res) => {
            toast.success(`Project: ${res.data.title} has been updated`);
            navigate('/project/listing')
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function DeleteProject(id) {

    return await axios.delete(baseApi + `delete/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err; // Ensure the error is propagated
        });
}

async function DeleteMultipleProject(idArray) {

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
    CreateProject,
    GetAllProject,
    GetProjectById,
    UpdateProject,
    DeleteProject,
    DeleteMultipleProject
}; // Export the function
