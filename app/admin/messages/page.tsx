"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
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
  MessageSquare,
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  MailOpen,
  Reply,
  Trash2,
  Filter,
  Download,
} from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  admin_notes: string
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Contact[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const supabase = createClient()

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    filterMessages()
  }, [messages, searchQuery, statusFilter])

  async function fetchMessages() {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (error) {
      console.error("Error fetching messages:", error)
    } else {
      setMessages(data || [])
    }
    setIsLoading(false)
  }

  function filterMessages() {
    let filtered = [...messages]
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.subject.toLowerCase().includes(query)
      )
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter((m) => m.status === statusFilter)
    }
    
    setFilteredMessages(filtered)
  }

  async function updateStatus(id: string, status: string) {
    setIsUpdating(true)
    const { error } = await supabase
      .from("contacts")
      .update({ status, admin_notes: adminNotes })
      .eq("id", id)
    
    if (error) {
      console.error("Error updating message:", error)
    } else {
      fetchMessages()
      setIsViewOpen(false)
      setSelectedMessage(null)
      setAdminNotes("")
    }
    setIsUpdating(false)
  }

  async function deleteMessage(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return
    
    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id)
    
    if (error) {
      console.error("Error deleting message:", error)
    } else {
      fetchMessages()
    }
  }

  async function openViewDialog(message: Contact) {
    setSelectedMessage(message)
    setAdminNotes(message.admin_notes || "")
    setIsViewOpen(true)
    
    // Mark as read if unread
    if (message.status === "unread") {
      await supabase
        .from("contacts")
        .update({ status: "read" })
        .eq("id", message.id)
      fetchMessages()
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Unread</Badge>
      case "read":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Read</Badge>
      case "replied":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Replied</Badge>
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
    const headers = ["Name", "Email", "Subject", "Message", "Status", "Created At"]
    const csvData = filteredMessages.map((m) => [
      m.name,
      m.email,
      m.subject,
      m.message.replace(/,/g, ";"),
      m.status,
      formatDateTime(m.created_at),
    ])
    
    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `messages-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Manage contact form submissions</p>
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
                  placeholder="Search by name, email, or subject..."
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
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
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
          ) : filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
              <p>No messages found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow 
                      key={message.id}
                      className={message.status === "unread" ? "bg-primary/5" : ""}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {message.status === "unread" && (
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          )}
                          <div>
                            <p className={`font-medium ${message.status === "unread" ? "font-semibold" : ""}`}>
                              {message.name}
                            </p>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className={`truncate max-w-[200px] ${message.status === "unread" ? "font-semibold" : ""}`}>
                          {message.subject}
                        </p>
                      </TableCell>
                      <TableCell>{getStatusBadge(message.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(message.created_at)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openViewDialog(message)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Message
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`
                                updateStatus(message.id, "replied")
                              }}
                            >
                              <Reply className="h-4 w-4 mr-2" />
                              Reply via Email
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteMessage(message.id)}
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

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              View and respond to this message
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">From</Label>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Subject</Label>
                  <p className="font-medium">{selectedMessage.subject}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Received</Label>
                  <p className="font-medium">{formatDateTime(selectedMessage.created_at)}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Message</Label>
                <p className="mt-1 p-4 bg-muted rounded-lg whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div>
                <Label htmlFor="admin-notes">Admin Notes</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add notes about this message..."
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
                    variant={selectedMessage.status === "unread" ? "default" : "outline"}
                    onClick={() => updateStatus(selectedMessage.id, "unread")}
                    disabled={isUpdating}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Unread
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedMessage.status === "read" ? "default" : "outline"}
                    onClick={() => updateStatus(selectedMessage.id, "read")}
                    disabled={isUpdating}
                  >
                    <MailOpen className="h-4 w-4 mr-1" />
                    Read
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedMessage.status === "replied" ? "default" : "outline"}
                    onClick={() => updateStatus(selectedMessage.id, "replied")}
                    disabled={isUpdating}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Replied
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                if (selectedMessage) {
                  window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`
                }
              }}
            >
              <Reply className="h-4 w-4 mr-2" />
              Reply via Email
            </Button>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
