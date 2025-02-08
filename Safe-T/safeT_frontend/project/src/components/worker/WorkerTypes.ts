export interface WorkerHealth {
    id: number;
    bandId: number;
    name: string;
    gender: 'MALE' | 'FEMALE';
    age: number;
    medicalCondition: string;
    heartRate: number;
    bodyTemp: number;
    spo2: number;
    status: 'green' | 'yellow' | 'red';
}
