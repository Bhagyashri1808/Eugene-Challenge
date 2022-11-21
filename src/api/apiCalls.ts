import axios from "axios";
import { Patient } from "../types/PatientTypes";

export const getList = async (sortBy: number): Promise<Patient[]> => {
    const response = await axios.get("http://localhost:9000/appointments")
        .then(response => {
            return response.data;
        }).catch(() => {
            return [];
        });
    return sortList(sortBy, response);
}

const sortList = (sortBy: number, data: Patient[]) => {
    const sortedArray = data.sort((a, b) => {
        return sortBy === 1 ? new Date(b.startDate).getTime() - new Date(a.startDate).getTime() : a.clinicianName.localeCompare(b.clinicianName);
    });
    return sortedArray;
}

export const addNewEntry = async (data: Patient, sortBy: number) => {
    const options = {
        headers: { "Content-Type": "application/json" }
    }
    const response = await axios.post("http://localhost:9000/addNewEntry", JSON.stringify(data), options
    )
        .then(response => {
            return response.data;
        })
        .catch(() => {
            return [];
        })

    return sortList(sortBy, response);
}

export const deleteEntry = async (id: string, sortBy: number) => {
    const response = await axios.delete(`http://localhost:9000/deleteEntry/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(() => {
            return [];
        })

    return sortList(sortBy, response);
}