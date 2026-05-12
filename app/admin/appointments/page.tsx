"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Filter,
  Download,
} from "lucide-react"

interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  service: string
  preferred_date: string
  preferred_time: string
  message: string
  status: string
  admin_notes: string
  created_at: string
  updated_at: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const supabase = createClient()

  useEffect(() => {
    fetchAppointments()
  }, [])

  useEffect(() => {
    filterAppointments()
  }, [appointments, searchQuery, statusFilter])

  async function fetchAppointments() {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (error) {
      console.error("Error fetching appointments:", error)
    } else {
      setAppointments(data || [])
    }
    setIsLoading(false)
  }

  function filterAppointments() {
    let filtered = [...appointments]
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.email.toLowerCase().includes(query) ||
          a.service.toLowerCase().includes(query)
      )
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter)
    }
    
    setFilteredAppointments(filtered)
  }

  async function updateStatus(id: string, status: string) {
    setIsUpdating(true)
    const { error } = await supabase
      .from("appointments")
      .update({ status, admin_notes: adminNotes })
      .eq("id", id)
    
    if (error) {
      console.error("Error updating appointment:", error)
    } else {
      fetchAppointments()
      setIsViewOpen(false)
      setSelectedAppointment(null)
      setAdminNotes("")
    }
    setIsUpdating(false)
  }

  async function deleteAppointment(id: string) {
    if (!confirm("Are you sure you want to delete this appointment?")) return
    
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id)
    
    if (error) {
      console.error("Error deleting appointment:", error)
    } else {
      fetchAppointments()
    }
  }

  function openViewDialog(appointment: Appointment) {
    setSelectedAppointment(appointment)
    setAdminNotes(appointment.admin_notes || "")
    setIsViewOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  function exportToCSV() {
    const headers = ["Name", "Email", "Phone", "Service", "Date", "Time", "Status", "Created At"]
    const csvData = filteredAppointments.map((a) => [
      a.name,
      a.email,
      a.phone,
      a.service,
      a.preferred_date,
      a.preferred_time,
      a.status,
      formatDateTime(a.created_at),
    ])
    
    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `appointments-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Manage all booking requests</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <Calendar className="h-12 w-12 mb-4 opacity-50" />
              <p>No appointments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{appointment.name}</p>
                          <p className="text-sm text-muted-foreground">{appointment.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>
                        <div>
                          <p>{formatDate(appointment.preferred_date)}</p>
                          <p className="text-sm text-muted-foreground">{appointment.preferred_time}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(appointment.created_at)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openViewDialog(appointment)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateStatus(appointment.id, "confirmed")}
                              disabled={appointment.status === "confirmed"}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Confirmed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateStatus(appointment.id, "completed")}
                              disabled={appointment.status === "completed"}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateStatus(appointment.id, "cancelled")}
                              disabled={appointment.status === "cancelled"}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteAppointment(appointment.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View/Edit Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View and manage this appointment
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Client Name</Label>
                  <p className="font-medium">{selectedAppointment.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedAppointment.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedAppointment.phone || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Service</Label>
                  <p className="font-medium">{selectedAppointment.service}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Preferred Date</Label>
                  <p className="font-medium">{formatDate(selectedAppointment.preferred_date)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Preferred Time</Label>
                  <p className="font-medium">{selectedAppointment.preferred_time}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedAppointment.status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Submitted</Label>
                  <p className="font-medium">{formatDateTime(selectedAppointment.created_at)}</p>
                </div>
              </div>
              
              {selectedAppointment.message && (
                <div>
                  <Label className="text-muted-foreground">Client Message</Label>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{selectedAppointment.message}</p>
                </div>
              )}

              <div>
                <Label htmlFor="admin-notes">Admin Notes</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add notes about this appointment..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-muted-foreground">Update Status</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    size="sm"
                    variant={selectedAppointment.status === "pending" ? "default" : "outline"}
                    onClick={() => updateStatus(selectedAppointment.id, "pending")}
                    disabled={isUpdating}
                  >
                    Pending
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedAppointment.status === "confirmed" ? "default" : "outline"}
                    onClick={() => updateStatus(selectedAppointment.id, "confirmed")}
                    disabled={isUpdating}
                  >
                    Confirmed
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedAppointment.status === "completed" ? "default" : "outline"}
                    onClick={() => updateStatus(selectedAppointment.id, "completed")}
                    disabled={isUpdating}
                  >
                    Completed
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedAppointment.status === "cancelled" ? "destructive" : "outline"}
                    onClick={() => updateStatus(selectedAppointment.id, "cancelled")}
                    disabled={isUpdating}
                  >
                    Cancelled
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
