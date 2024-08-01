"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("Male");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [recordDetails, setRecordDetails] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [medication, setMedication] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentMessage, setAppointmentMessage] = useState("");
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIyMzc1ODc5LCJleHAiOjE3MjM4MTU4Nzl9.7uuAzCsY2VgoiXJgjPECwRbnKpTxPivfHA8bb2_PevE"

    useEffect(() => {
        if (authToken) {
            fetchPatients();
        }
    }, [authToken]);

    const fetchPatients = async () => {
        try {
            const response = await axios.get("http://localhost/patient-management/api/patients", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setPatients(response.data);
        } catch (error) {
            console.error("Failed to fetch patients", error);
        }
    };

    const handleCreatePatient = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost/patient-management/api/patients", {
                firstName,
                lastName,
                dateOfBirth,
                gender,
                address,
                phoneNumber,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setMessage("Patient created successfully!");
            fetchPatients(); // Refresh the list of patients
            setFirstName("");
            setLastName("");
            setDateOfBirth("");
            setGender("Male");
            setAddress("");
            setPhoneNumber("");
        } catch (error) {
            setMessage("Failed to create patient. Please try again.");
        }
    };

    const handleCreateAppointment = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost/appointment-scheduling/api/appointments", {
                patientId: selectedPatient._id,
                doctorId: "some-doctor-id", // Replace with actual doctor ID
                appointmentDate,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setAppointmentMessage("Appointment scheduled successfully!");
            setAppointmentDate("");
            setSelectedPatient(null);
        } catch (error) {
            setAppointmentMessage("Failed to schedule appointment. Please try again.");
        }
    };

    const handleCreateMedicalRecord = async (e) => {
        e.preventDefault();

        // Mock successful response
        const mockSuccessResponse = {
            message: "Medical record with prescription created successfully",
            data: {
                patientId: selectedPatient._id,
                recordDetails,
                diagnosis,
                treatment,
                medication,
                dosage,
                frequency,
                startDate,
                endDate,
            },
        };

        console.log("Mock medical record created with data:", mockSuccessResponse.data);

        setMessage(mockSuccessResponse.message);
        setRecordDetails("");
        setDiagnosis("");
        setTreatment("");
        setMedication("");
        setDosage("");
        setFrequency("");
        setStartDate("");
        setEndDate("");
        setSelectedPatient(null);
    };

    const openDialog = (patient) => {
        setSelectedPatient(patient);
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen">
            <div className="w-full max-w-7xl p-8 space-y-8 bg-white shadow-lg rounded-lg">
                <div className="space-y-2 text-start">
                    <h2 className="text-3xl font-bold">Patients</h2>
                </div>
                <form className="flex space-x-4" onSubmit={handleCreatePatient}>
                    <div className="flex flex-col space-y-2 flex-1">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2 flex-1">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2 flex-1">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2 flex-1">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-col space-y-2 flex-1">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-2 flex-1">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-end">
                        <Button type="submit" className="w-full text-white py-2 rounded-lg">
                            Create Patient
                        </Button>
                    </div>
                </form>
                {message && <p className="text-start ">{message}</p>}
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Patient List</h3>
                    <Table>
                        <TableCaption>A list of your patients.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Date of Birth</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.map((patient) => (
                                <TableRow key={patient._id}>
                                    <TableCell>
                                        <Link href={`patient/${patient._id}`}>
                                            {patient.firstName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{patient.lastName}</TableCell>
                                    <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                                    <TableCell>{patient.gender}</TableCell>
                                    <TableCell>{patient.address}</TableCell>
                                    <TableCell>{patient.phoneNumber}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button onClick={() => openDialog(patient)}>Create Medical Record</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Create Medical Record for {selectedPatient?.firstName} {selectedPatient?.lastName}</DialogTitle>
                                                </DialogHeader>
                                                <div className="p-4">
                                                    <form onSubmit={handleCreateMedicalRecord}>
                                                        <Label htmlFor="recordDetails">Record Details</Label>
                                                        <Input
                                                            id="recordDetails"
                                                            type="text"
                                                            placeholder="Details of the medical record"
                                                            value={recordDetails}
                                                            onChange={(e) => setRecordDetails(e.target.value)}
                                                            required
                                                        />
                                                        <Label htmlFor="diagnosis" className="mt-4">Diagnosis</Label>
                                                        <Input
                                                            id="diagnosis"
                                                            type="text"
                                                            placeholder="Diagnosis"
                                                            value={diagnosis}
                                                            onChange={(e) => setDiagnosis(e.target.value)}
                                                            required
                                                        />
                                                        <Label htmlFor="treatment" className="mt-4">Treatment</Label>
                                                        <Input
                                                            id="treatment"
                                                            type="text"
                                                            placeholder="Treatment"
                                                            value={treatment}
                                                            onChange={(e) => setTreatment(e.target.value)}
                                                            required
                                                        />
                                                        <Label htmlFor="medication" className="mt-4">Medication</Label>
                                                        <Input
                                                            id="medication"
                                                            type="text"
                                                            placeholder="Medication"
                                                            value={medication}
                                                            onChange={(e) => setMedication(e.target.value)}
                                                            required
                                                        />
                                                        <Label htmlFor="dosage" className="mt-4">Dosage</Label>
                                                        <Input
                                                            id="dosage"
                                                            type="text"
                                                            placeholder="Dosage"
                                                            value={dosage}
                                                            onChange={(e) => setDosage(e.target.value)}
                                                            required
                                                        />
                                                        <Label htmlFor="frequency" className="mt-4">Frequency</Label>
                                                        <Input
                                                            id="frequency"
                                                            type="text"
                                                            placeholder="Frequency"
                                                            value={frequency}
                                                            onChange={(e) => setFrequency(e.target.value)}
                                                            required
                                                        />
                                                        <Label htmlFor="startDate" className="mt-4">Start Date</Label>
                                                        <Input
                                                            id="startDate"
                                                            type="date"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                            required
                                                        />
                                                        <Label htmlFor="endDate" className="mt-4">End Date</Label>
                                                        <Input
                                                            id="endDate"
                                                            type="date"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                            required
                                                        />
                                                        <Button type="submit" className="mt-4">
                                                            Confirm Medical Record
                                                        </Button>
                                                    </form>
                                                    {message && <p className="mt-2">{message}</p>}
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
