import React, { useEffect, useState } from 'react';
import { Patient } from '../types/PatientTypes';
import { getList, addNewEntry, deleteEntry } from '../api/apiCalls';
import Header from './Header';

const DataTable = () => {

    const [patientData, setPatientData] = useState(new Array<Patient>());
    const fetchData = async (sortBy: string) => {
        const response = await getList(sortBy);
        setPatientData(response);
    };

    useEffect(() => {
        fetchData('');
    }, []);

    const getTableRow = (item: Patient) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        const msInHour = 1000 * 60 * 60;

        const duration = Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / msInHour);
        const color = duration > 1 ? "green" : "white";
        return (<tr key={item.id} style={{ backgroundColor: `${color}` }}>
            <td>{item.patient.name}</td>
            <td>{startDate.toDateString()}</td>
            <td>{startDate.toTimeString()}</td>
            <td>{duration}</td>
            <td>{item.clinicianName}</td>
            <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
        </tr>);
    }

    const handleAddNewEntry = async (newEntry: Patient) => {

        const data = await addNewEntry(newEntry);
        setPatientData(data);
    }

    const handleDelete = async (id: string) => {
        const data = await deleteEntry(id);
        setPatientData(data);
    }

    return (
        <div>
            <Header handleAddNewEntry={handleAddNewEntry} />
            <table>
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Start Date</th>
                        <th>Start Time</th>
                        <th>Duration</th>
                        <th>Clinician Name</th>
                    </tr>
                </thead>
                <tbody>
                    {patientData.length > 1 && patientData.map(item => {
                        return getTableRow(item);
                    })}

                </tbody>
            </table>
        </div>);
}

export default DataTable;