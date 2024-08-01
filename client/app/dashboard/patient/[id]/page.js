"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function PatientDetail({ params }) {
    const [patient, setPatient] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [prescription, setPrescription] = useState(null);
    const [recordDetails, setRecordDetails] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [treatment, setTreatment] = useState("");
    const [visitDate, setVisitDate] = useState("");
    const [medication, setMedication] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const id = params.id;
    const authToken = Cookies.get('authToken');

    useEffect(() => {
        if (id) {
            fetchPatient();
            fetchMedicalRecords();
        }
    }, [id]);

    const fetchPatient = async () => {
        try {
            const response = await axios.get(`http://localhost/patient-management/api/patients/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setPatient(response.data);
        } catch (error) {
            console.error('Error fetching patient details:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMedicalRecords = async () => {
        try {
            const response = await axios.get(`http://localhost/medical-records/api/medical-records/patient/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setMedicalRecords(response.data);
        } catch (error) {
            console.error('Error fetching medical records:', error);
        }
    };

    const fetchPrescription = async (medicalRecordId) => {
        try {
            const response = await axios.get(`http://localhost/prescription-management/api/prescriptions/medical-record/${medicalRecordId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setPrescription(response.data[0]);
        } catch (error) {
            console.error('Error fetching prescription:', error);
        }
    };

    const handleRecordClick = async (record) => {
        setSelectedRecord(record);
        fetchPrescription(record.id);
    };

    const handleCreateMedicalRecord = async (e) => {
        e.preventDefault();

        try {
            const medicalRecordResponse = await axios.post('http://localhost/medical-records/api/medical-records', {
                patientId: id,
                doctorId: "12y6dfd77", // Replace with actual doctor ID
                visitDate,
                diagnosis,
                treatment,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const medicalRecordId = medicalRecordResponse.data.id;

            const prescriptionResponse = await axios.post('http://localhost/prescription-management/api/prescriptions', {
                medicalRecordId,
                doctorId: "12y6dfd77", // Replace with actual doctor ID
                medication,
                dosage,
                frequency,
                startDate,
                endDate,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setMessage("Medical record and prescription created successfully!");

            // Refresh medical records list
            fetchMedicalRecords();

            // Clear form fields
            setRecordDetails("");
            setDiagnosis("");
            setTreatment("");
            setVisitDate("");
            setMedication("");
            setDosage("");
            setFrequency("");
            setStartDate("");
            setEndDate("");
        } catch (error) {
            setMessage("Failed to create medical record and prescription. Please try again.");
            console.error('Error creating medical record and prescription:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <PuffLoader loading={true} />
            </div>
        );
    }

    if (!patient) {
        return <div className="flex h-screen justify-center items-center text-gray-500">Patient not found</div>;
    }

    const age = patient.dateOfBirth ? new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear() : null;

    return (
        <div >
            <div className="w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">{`${patient.firstName} ${patient.lastName}`}</h1>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <p><strong>Age:</strong> {age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Address:</strong> {patient.address}</p>
                    <p><strong>Phone Number:</strong> {patient.phoneNumber}</p>
                </div>
                <div className="mb-6">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Create Medical Record</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Medical Record for {`${patient.firstName} ${patient.lastName}`}</DialogTitle>
                            </DialogHeader>
                            <div className="p-4">
                                <form onSubmit={handleCreateMedicalRecord}>
                                    <Label htmlFor="visitDate">Visit Date</Label>
                                    <Input
                                        id="visitDate"
                                        type="date"
                                        value={visitDate}
                                        onChange={(e) => setVisitDate(e.target.value)}
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
                                    <div className="mt-6">
                                        <Label htmlFor="medication">Medication</Label>
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
                                    </div>
                                    <Button type="submit" className="mt-4">Confirm Medical Record</Button>
                                </form>
                                {message && <p className="mt-2 text-green-500">{message}</p>}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
                    <Table>
                        <TableCaption>A list of medical records for this patient.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Visit Date</TableHead>
                                <TableHead>Diagnosis</TableHead>
                                <TableHead>Treatment</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {medicalRecords.map((record) => (
                                <TableRow key={record.id} onClick={() => handleRecordClick(record)} className="cursor-pointer">
                                    <TableCell>{new Date(record.visitDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{record.diagnosis}</TableCell>
                                    <TableCell>{record.treatment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Medical Record Details</DialogTitle>
                    </DialogHeader>
                    {selectedRecord && (
                        <div>
                            <p><strong>Visit Date:</strong> {new Date(selectedRecord.visitDate).toLocaleDateString()}</p>
                            <p><strong>Diagnosis:</strong> {selectedRecord.diagnosis}</p>
                            <p><strong>Treatment:</strong> {selectedRecord.treatment}</p>
                            {prescription && (
                                <div>
                                    <h3 className="text-xl font-bold mt-4">Prescription</h3>
                                    <p><strong>Medication:</strong> {prescription.medication}</p>
                                    <p><strong>Dosage:</strong> {prescription.dosage}</p>
                                    <p><strong>Frequency:</strong> {prescription.frequency}</p>
                                    <p><strong>Start Date:</strong> {new Date(prescription.startDate).toLocaleDateString()}</p>
                                    <p><strong>End Date:</strong> {new Date(prescription.endDate).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
