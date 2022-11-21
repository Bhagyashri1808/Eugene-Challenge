type Patient = {
    id: string,
    startDate: string,
    endDate: string,
    clinicianName: string,
    patient: {
        id: string,
        name: string
    },
    status: string
}

export type { Patient };