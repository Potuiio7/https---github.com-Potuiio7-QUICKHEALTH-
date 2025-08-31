import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import WaitTimePredictor from "@/components/dashboard/wait-time-predictor";
import AppointmentBooking from "@/components/dashboard/appointment-booking";
import { Separator } from "@/components/ui/separator";

// Mock data for appointments
const mockAppointments = [
    { id: "1", hospital: "Accra General Hospital", date: "2024-09-15", time: "10:30 AM", status: "Confirmed" },
    { id: "2", hospital: "Kumasi Polyclinic", date: "2024-09-22", time: "02:00 PM", status: "Completed" },
    { id: "3", hospital: "Accra General Hospital", date: "2024-10-01", time: "09:00 AM", status: "Pending" },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-headline mb-6">Patient Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <AppointmentBooking />

          <Card>
            <CardHeader>
              <CardTitle>My Appointments</CardTitle>
              <CardDescription>
                Here is a list of your upcoming and past appointments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAppointments.map((appt) => (
                    <TableRow key={appt.id}>
                      <TableCell className="font-medium">{appt.hospital}</TableCell>
                      <TableCell>{appt.date}</TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>
                        <Badge variant={appt.status === "Confirmed" ? "default" : appt.status === "Completed" ? "secondary" : "outline"}>
                          {appt.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <WaitTimePredictor />
        </div>
      </div>
    </div>
  );
}
