import React, { LabelHTMLAttributes } from 'react';

const Header = ({ handleAddNewEntry, handleChange, selectedIndex }) => {

    const handleButtonClick = () => {
        const newEntry = {
            "id": Math.random().toString(),
            "startDate": "2021-10-02T06:00:00.000Z",
            "endDate": "2021-10-02T07:00:00.000Z",
            "clinicianName": "John Adams",
            "patient": {
                "id": "246ea59b-a083-49c9-a994-053726c3daa9",
                "name": "Bhagyashri"
            },
            "status": "ACTIVE"
        }

        handleAddNewEntry(newEntry);
    }

    const change = (event) => {
        handleChange(parseInt(event.target.value));
    }

    return (<div style={{ display: "flex", height: "40px" }}>
        <h3>List</h3>
        <label htmlFor="groupBy">Group By:</label>
        <select id="groupBy" onChange={change} value={selectedIndex}>
            <option value="1">Appointment Date</option>
            <option value="2">Clinician Name</option>
        </select>
        <button onClick={handleButtonClick}>Add</button>
    </div>)
}

export default Header;