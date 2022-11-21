import axios from "axios";
import { Patient } from "../types/PatientTypes";

export const getList = async (sortBy: string): Promise<Patient[]> => {
    const response = await axios.get("http://localhost:9000/appointments")
        .then(response => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });

    return sortList(sortBy, response);
}

const sortList = (sortBy: string, data: Patient[]) => {
    const sortedArray = data.sort((a, b) => {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
    return sortedArray;
}

export const addNewEntry = async (data: Patient) => {
    const options = {
        headers: { "Content-Type": "application/json" }
    }
    const response = await axios.post("http://localhost:9000/addNewEntry", JSON.stringify(data), options
    )
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.log(error);
        })

    return sortList('', response);
}

export const deleteEntry = async (id: string) => {
    const response = await axios.delete(`http://localhost:9000/deleteEntry/${id}`)
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.log(error);
        })

    return sortList('', response);
}