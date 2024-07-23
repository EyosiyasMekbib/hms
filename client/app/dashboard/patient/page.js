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
import { Cookie } from "next/font/google";
import Cookies from "js-cookie";

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("Male");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentMessage, setAppointmentMessage] = useState("");
    const authToken = Cookies.get("authToken");

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
            setFilteredPatients(response.data); // Initialize filtered patients
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

    const handleCreateAppointment = async (e, patientId, DocterId) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost/appointment-scheduling/api/appointments", {
                patientId: patientId,
                doctorId: DocterId,
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

    const openDialog = (patient) => {
        setSelectedPatient(patient);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = patients.filter((patient) =>
            patient.firstName.toLowerCase().includes(query) ||
            patient.lastName.toLowerCase().includes(query) ||
            patient.phoneNumber.includes(query)
        );
        setFilteredPatients(filtered);
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen">
            <div className="w-full max-w-7xl p-8 space-y-8 bg-white shadow-lg rounded-lg">
                <div className="space-y-2 text-start">
                    <h2 className="text-3xl font-bold">Patients</h2>
                </div>
                <Input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full mb-4"
                />
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
                            {filteredPatients.map((patient) => (
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
                                                <Button onClick={() => openDialog(patient)}>Set Appointment</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Set Appointment for {selectedPatient?.firstName} {selectedPatient?.lastName}</DialogTitle>
                                                </DialogHeader>
                                                <div className="p-4">
                                                    <form onSubmit={handleCreateAppointment}>
                                                        <Label htmlFor="appointmentDate">Appointment Date</Label>
                                                        <Input
                                                            id="appointmentDate"
                                                            type="date"
                                                            value={appointmentDate}
                                                            onChange={(e) => setAppointmentDate(e.target.value)}
                                                            required
                                                        />
                                                        <Button type="submit" className="mt-4">
                                                            Confirm Appointment
                                                        </Button>
                                                    </form>
                                                    {appointmentMessage && <p className="mt-2">{appointmentMessage}</p>}
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
