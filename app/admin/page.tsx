"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import {
  Calendar,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  Mail,
  Scissors,
  Image,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Trash2,
  Send,
  Phone,
  MapPin,
  Activity,
  BarChart3,
  Bell,
  Search,
  Filter,
  Download,
  Settings,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
  Zap,
  IndianRupee,
} from "lucide-react"

interface Stats {
  totalAppointments: number
  pendingAppointments: number
  confirmedAppointments: number
  completedAppointments: number
  cancelledAppointments: number
  totalMessages: number
  unreadMessages: number
  repliedMessages: number
  totalUsers: number
  totalServices: number
  activeServices: number
  totalGalleryItems: number
  todayAppointments: number
  weekAppointments: number
  monthRevenue: number
}

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
}

interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  created_at: string
}

interface Service {
  id: string
  name: string
  category: string
  price_from: number
  price_to: number
  is_active: boolean
}

interface ActivityItem {
  id: string
  type: "appointment" | "message" | "service" | "user"
  action: string
  title: string
  subtitle: string
  timestamp: string
  status?: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    totalMessages: 0,
    unreadMessages: 0,
    repliedMessages: 0,
    totalUsers: 0,
    totalServices: 0,
    activeServices: 0,
    totalGalleryItems: 0,
    todayAppointments: 0,
    weekAppointments: 0,
    monthRevenue: 0,
  })
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState("")
  const [replyMessage, setReplyMessage] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const supabase = createClient()
  const router = useRouter()

  const fetchAllData = useCallback(async () => {
    try {
      // Fetch appointments
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false })
      
      const appointments = appointmentsData || []
      
      // Fetch messages
      const { data: messagesData } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
      
      const messages = messagesData || []
      
      // Fetch services
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .order("display_order")
      
      const services = servicesData || []
      
      // Fetch users
      const { data: usersData } = await supabase
        .from("profiles")
        .select("id")
      
      // Fetch gallery
      const { data: galleryData } = await supabase
        .from("gallery")
        .select("id")
      
      // Calculate stats
      const today = new Date().toISOString().split("T")[0]
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      
      const todayAppointments = appointments.filter(
        a => a.preferred_date === today
      ).length
      
      const weekAppointments = appointments.filter(
        a => new Date(a.created_at) >= new Date(weekAgo)
      ).length
      
      // Estimate monthly revenue from completed appointments
      const completedThisMonth = appointments.filter(a => {
        const date = new Date(a.created_at)
        const now = new Date()
        return a.status === "completed" && 
          date.getMonth() === now.getMonth() && 
          date.getFullYear() === now.getFullYear()
      })
      
      // Average service price estimation
      const avgPrice = services.length > 0 
        ? services.reduce((sum, s) => sum + (s.price_from + (s.price_to || s.price_from)) / 2, 0) / services.length
        : 500
      const monthRevenue = completedThisMonth.length * avgPrice

      setStats({
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter(a => a.status === "pending").length,
        confirmedAppointments: appointments.filter(a => a.status === "confirmed").length,
        completedAppointments: appointments.filter(a => a.status === "completed").length,
        cancelledAppointments: appointments.filter(a => a.status === "cancelled").length,
        totalMessages: messages.length,
        unreadMessages: messages.filter(m => m.status === "unread").length,
        repliedMessages: messages.filter(m => m.status === "replied").length,
        totalUsers: usersData?.length || 0,
        totalServices: services.length,
        activeServices: services.filter(s => s.is_active).length,
        totalGalleryItems: galleryData?.length || 0,
        todayAppointments,
        weekAppointments,
        monthRevenue,
      })

      setAppointments(appointments)
      setMessages(messages)
      setServices(services)

      // Build activity feed
      const activities: ActivityItem[] = []
      
      appointments.slice(0, 10).forEach(apt => {
        activities.push({
          id: `apt-${apt.id}`,
          type: "appointment",
          action: apt.status === "pending" ? "New booking request" : `Appointment ${apt.status}`,
          title: apt.name,
          subtitle: `${apt.service} - ${formatDate(apt.preferred_date)}`,
          timestamp: apt.created_at,
          status: apt.status,
        })
      })
      
      messages.slice(0, 10).forEach(msg => {
        activities.push({
          id: `msg-${msg.id}`,
          type: "message",
          action: msg.status === "unread" ? "New message" : `Message ${msg.status}`,
          title: msg.name,
          subtitle: msg.subject,
          timestamp: msg.created_at,
          status: msg.status,
        })
      })
      
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setActivityFeed(activities.slice(0, 15))
      
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [supabase])

useEffect(() => {
  async function checkAdminAccess() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If not logged in
    if (!user) {
      router.push("/login")
      return
    }

    // Check profile role
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    // If not admin
    if (
  error ||
  profile?.role !== "admin" ||
  user.email !== "YOUR_EMAIL@gmail.com"
) {
      router.push("/")
      return
    }

    // Load admin data only if admin
    fetchAllData()

    // Auto refresh
    const interval = setInterval(() => {
      fetchAllData()
    }, 30000)

    return () => clearInterval(interval)
  }

  checkAdminAccess()
}, [fetchAllData, router, supabase])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchAllData()
  }

  async function updateAppointmentStatus(id: string, status: string) {
    setIsUpdating(true)
    const { error } = await supabase
      .from("appointments")
      .update({ status, admin_notes: adminNotes })
      .eq("id", id)
    
    if (!error) {
      await fetchAllData()
      setIsAppointmentDialogOpen(false)
      setSelectedAppointment(null)
      setAdminNotes("")
    }
    setIsUpdating(false)
  }

  async function updateMessageStatus(id: string, status: string) {
    setIsUpdating(true)
    const { error } = await supabase
      .from("contacts")
      .update({ status })
      .eq("id", id)
    
    if (!error) {
      await fetchAllData()
      if (status !== "read") {
        setIsMessageDialogOpen(false)
        setSelectedMessage(null)
        setReplyMessage("")
      }
    }
    setIsUpdating(false)
  }

  async function deleteAppointment(id: string) {
    if (!confirm("Are you sure you want to delete this appointment?")) return
    
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id)
    
    if (!error) {
      await fetchAllData()
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return
    
    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id)
    
    if (!error) {
      await fetchAllData()
    }
  }

  function openAppointmentDialog(appointment: Appointment) {
    setSelectedAppointment(appointment)
    setAdminNotes(appointment.admin_notes || "")
    setIsAppointmentDialogOpen(true)
  }

  function openMessageDialog(message: Message) {
    setSelectedMessage(message)
    setReplyMessage("")
    setIsMessageDialogOpen(true)
    // Mark as read when opened
    if (message.status === "unread") {
      updateMessageStatus(message.id, "read")
    }
  }

  const getStatusBadge = (status: string, type: "appointment" | "message" = "appointment") => {
    if (type === "appointment") {
      switch (status) {
        case "pending":
          return <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">Pending</Badge>
        case "confirmed":
          return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">Confirmed</Badge>
        case "completed":
          return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Completed</Badge>
        case "cancelled":
          return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">Cancelled</Badge>
        default:
          return <Badge variant="outline">{status}</Badge>
      }
    } else {
      switch (status) {
        case "unread":
          return <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">Unread</Badge>
        case "read":
          return <Badge className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100">Read</Badge>
        case "replied":
          return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Replied</Badge>
        default:
          return <Badge variant="outline">{status}</Badge>
      }
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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return formatDate(dateString)
  }

  const exportToCSV = (type: "appointments" | "messages") => {
    let csvContent = ""
    let filename = ""

    if (type === "appointments") {
      filename = `appointments_${new Date().toISOString().split("T")[0]}.csv`
      csvContent = "Name,Email,Phone,Service,Preferred Date,Preferred Time,Status,Message,Admin Notes,Created At\n"
      filteredAppointments.forEach(apt => {
        csvContent += `"${apt.name}","${apt.email}","${apt.phone || ''}","${apt.service}","${apt.preferred_date}","${apt.preferred_time}","${apt.status}","${(apt.message || '').replace(/"/g, '""')}","${(apt.admin_notes || '').replace(/"/g, '""')}","${apt.created_at}"\n`
      })
    } else {
      filename = `messages_${new Date().toISOString().split("T")[0]}.csv`
      csvContent = "Name,Email,Phone,Subject,Message,Status,Created At\n"
      filteredMessages.forEach(msg => {
        csvContent += `"${msg.name}","${msg.email}","${msg.phone || ''}","${msg.subject}","${(msg.message || '').replace(/"/g, '""')}","${msg.status}","${msg.created_at}"\n`
      })
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = searchQuery === "" || 
      apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = searchQuery === "" ||
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || msg.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate percentages for progress indicators
  const appointmentCompletionRate = stats.totalAppointments > 0 
    ? Math.round((stats.completedAppointments / stats.totalAppointments) * 100)
    : 0
  
  const messageResponseRate = stats.totalMessages > 0
    ? Math.round((stats.repliedMessages / stats.totalMessages) * 100)
    : 0

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="h-8 bg-muted rounded w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
          <p className="text-muted-foreground">Track, manage, and update everything in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/admin/settings">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Alert Banner for Pending Items */}
      {(stats.pendingAppointments > 0 || stats.unreadMessages > 0) && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Bell className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-amber-900">Action Required</p>
                <p className="text-sm text-amber-700">
                  {stats.pendingAppointments > 0 && `${stats.pendingAppointments} pending appointment${stats.pendingAppointments > 1 ? "s" : ""}`}
                  {stats.pendingAppointments > 0 && stats.unreadMessages > 0 && " and "}
                  {stats.unreadMessages > 0 && `${stats.unreadMessages} unread message${stats.unreadMessages > 1 ? "s" : ""}`}
                  {" need your attention"}
                </p>
              </div>
              <div className="flex gap-2">
                {stats.pendingAppointments > 0 && (
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("appointments")}>
                    View Appointments
                  </Button>
                )}
                {stats.unreadMessages > 0 && (
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("messages")}>
                    View Messages
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                <p className="text-3xl font-bold">{stats.totalAppointments}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion Rate</span>
                <span className="font-medium">{appointmentCompletionRate}%</span>
              </div>
              <Progress value={appointmentCompletionRate} className="h-2" />
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-amber-600">
                <Clock className="h-3.5 w-3.5" />
                {stats.pendingAppointments} pending
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle className="h-3.5 w-3.5" />
                {stats.completedAppointments} done
              </span>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages</p>
                <p className="text-3xl font-bold">{stats.totalMessages}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response Rate</span>
                <span className="font-medium">{messageResponseRate}%</span>
              </div>
              <Progress value={messageResponseRate} className="h-2" />
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-amber-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {stats.unreadMessages} unread
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <Send className="h-3.5 w-3.5" />
                {stats.repliedMessages} replied
              </span>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Services</p>
                <p className="text-3xl font-bold">{stats.totalServices}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center">
                <Scissors className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-emerald-600">
                <Sparkles className="h-3.5 w-3.5" />
                {stats.activeServices} active
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Image className="h-3.5 w-3.5" />
                {stats.totalGalleryItems} gallery items
              </span>
            </div>
            <div className="mt-3">
              <Link href="/admin/services">
                <Button variant="ghost" size="sm" className="h-8 px-2 -ml-2">
                  Manage Services <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Est. Revenue</p>
                <p className="text-3xl font-bold flex items-center">
                  <IndianRupee className="h-6 w-6" />
                  {stats.monthRevenue.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-blue-600">
                <Calendar className="h-3.5 w-3.5" />
                {stats.todayAppointments} today
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Activity className="h-3.5 w-3.5" />
                {stats.weekAppointments} this week
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xs text-muted-foreground">Based on completed appointments this month</span>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </Card>
      </div>

      {/* Tabs for Different Views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Appointments</span>
            {stats.pendingAppointments > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {stats.pendingAppointments}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="messages" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
            {stats.unreadMessages > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {stats.unreadMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Today's Schedule */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">Today&apos;s Schedule</CardTitle>
                  <CardDescription>Appointments for {formatDate(new Date().toISOString())}</CardDescription>
                </div>
                <Link href="/admin/appointments">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {appointments.filter(apt => apt.preferred_date === new Date().toISOString().split("T")[0]).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Calendar className="h-10 w-10 mb-3 opacity-50" />
                    <p>No appointments scheduled for today</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[280px] pr-4">
                    <div className="space-y-3">
                      {appointments
                        .filter(apt => apt.preferred_date === new Date().toISOString().split("T")[0])
                        .sort((a, b) => a.preferred_time.localeCompare(b.preferred_time))
                        .map((apt) => (
                          <div
                            key={apt.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                            onClick={() => openAppointmentDialog(apt)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{apt.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {apt.preferred_time} - {apt.service}
                                </p>
                              </div>
                            </div>
                            {getStatusBadge(apt.status)}
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">Recent Messages</CardTitle>
                  <CardDescription>Latest contact form submissions</CardDescription>
                </div>
                <Link href="/admin/messages">
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Mail className="h-10 w-10 mb-3 opacity-50" />
                    <p>No messages yet</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[280px] pr-4">
                    <div className="space-y-3">
                      {messages.slice(0, 6).map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer ${
                            msg.status === "unread" ? "bg-amber-50/50 border border-amber-100" : "bg-muted/50"
                          }`}
                          onClick={() => openMessageDialog(msg)}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              msg.status === "unread" ? "bg-amber-100" : "bg-muted"
                            }`}>
                              <Mail className={`h-5 w-5 ${msg.status === "unread" ? "text-amber-600" : "text-muted-foreground"}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">{msg.name}</p>
                              <p className="text-sm text-muted-foreground truncate">{msg.subject}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-2">
                            {getStatusBadge(msg.status, "message")}
                            <span className="text-xs text-muted-foreground">{formatTimeAgo(msg.created_at)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Row */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Registered Users</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.confirmedAppointments}</p>
                  <p className="text-sm text-muted-foreground">Confirmed Bookings</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingAppointments}</p>
                  <p className="text-sm text-muted-foreground">Awaiting Response</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.cancelledAppointments}</p>
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common management tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <Link href="/admin/appointments" className="block">
                  <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Manage Bookings</span>
                  </Button>
                </Link>
                <Link href="/admin/messages" className="block">
                  <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    <span>Read Messages</span>
                  </Button>
                </Link>
                <Link href="/admin/services" className="block">
                  <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                    <Scissors className="h-5 w-5 text-pink-600" />
                    <span>Edit Services</span>
                  </Button>
                </Link>
                <Link href="/admin/gallery" className="block">
                  <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                    <Image className="h-5 w-5 text-emerald-600" />
                    <span>Update Gallery</span>
                  </Button>
                </Link>
                <Link href="/admin/users" className="block">
                  <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>View Users</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>All Appointments</CardTitle>
                  <CardDescription>Manage and update booking requests</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV("appointments")}
                    disabled={filteredAppointments.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
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
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.map((apt) => (
                        <TableRow key={apt.id} className="cursor-pointer" onClick={() => openAppointmentDialog(apt)}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{apt.name}</p>
                              <p className="text-sm text-muted-foreground">{apt.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{apt.service}</TableCell>
                          <TableCell>
                            <div>
                              <p>{formatDate(apt.preferred_date)}</p>
                              <p className="text-sm text-muted-foreground">{apt.preferred_time}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(apt.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatTimeAgo(apt.created_at)}
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openAppointmentDialog(apt)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => updateAppointmentStatus(apt.id, "confirmed")}
                                  disabled={apt.status === "confirmed"}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Confirm
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => updateAppointmentStatus(apt.id, "completed")}
                                  disabled={apt.status === "completed"}
                                >
                                  <Star className="h-4 w-4 mr-2" />
                                  Complete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => updateAppointmentStatus(apt.id, "cancelled")}
                                  disabled={apt.status === "cancelled"}
                                  className="text-red-600"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteAppointment(apt.id)}
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
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>All Messages</CardTitle>
                  <CardDescription>Contact form submissions and inquiries</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
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
            </CardHeader>
            <CardContent className="p-0">
              {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                  <p>No messages found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sender</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Received</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMessages.map((msg) => (
                        <TableRow 
                          key={msg.id} 
                          className={`cursor-pointer ${msg.status === "unread" ? "bg-amber-50/30" : ""}`}
                          onClick={() => openMessageDialog(msg)}
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium">{msg.name}</p>
                              <p className="text-sm text-muted-foreground">{msg.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="truncate max-w-[200px]">{msg.subject}</p>
                          </TableCell>
                          <TableCell>{getStatusBadge(msg.status, "message")}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatTimeAgo(msg.created_at)}
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openMessageDialog(msg)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Read Message
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => updateMessageStatus(msg.id, "replied")}
                                  disabled={msg.status === "replied"}
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Mark as Replied
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteMessage(msg.id)}
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
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Recent actions and updates across your business</CardDescription>
            </CardHeader>
            <CardContent>
              {activityFeed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Activity className="h-12 w-12 mb-4 opacity-50" />
                  <p>No recent activity</p>
                </div>
              ) : (
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {activityFeed.map((activity, index) => (
                      <div key={activity.id}>
                        <div className="flex items-start gap-4">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            activity.type === "appointment" ? "bg-primary/10" :
                            activity.type === "message" ? "bg-purple-100" :
                            "bg-muted"
                          }`}>
                            {activity.type === "appointment" ? (
                              <Calendar className="h-5 w-5 text-primary" />
                            ) : activity.type === "message" ? (
                              <MessageSquare className="h-5 w-5 text-purple-600" />
                            ) : (
                              <Zap className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium">{activity.action}</p>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatTimeAgo(activity.timestamp)}
                              </span>
                            </div>
                            <p className="font-medium truncate">{activity.title}</p>
                            <p className="text-sm text-muted-foreground truncate">{activity.subtitle}</p>
                            {activity.status && (
                              <div className="mt-1">
                                {getStatusBadge(activity.status, activity.type === "message" ? "message" : "appointment")}
                              </div>
                            )}
                          </div>
                        </div>
                        {index < activityFeed.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Appointment Detail Dialog */}
      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>View and manage this booking request</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {selectedAppointment.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{selectedAppointment.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.email}</p>
                  </div>
                </div>
                {getStatusBadge(selectedAppointment.status)}
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Service</Label>
                  <p className="font-medium">{selectedAppointment.service}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Phone</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {selectedAppointment.phone || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Preferred Date</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(selectedAppointment.preferred_date)}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Preferred Time</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {selectedAppointment.preferred_time}
                  </p>
                </div>
              </div>

              {selectedAppointment.message && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Client Message</Label>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm">{selectedAppointment.message}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="admin-notes" className="text-muted-foreground text-xs uppercase tracking-wide">
                  Admin Notes
                </Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add internal notes about this appointment..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wide">Update Status</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedAppointment.status === "pending" ? "default" : "outline"}
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, "pending")}
                    disabled={isUpdating}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Pending
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedAppointment.status === "confirmed" ? "default" : "outline"}
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, "confirmed")}
                    disabled={isUpdating}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Confirmed
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedAppointment.status === "completed" ? "default" : "outline"}
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, "completed")}
                    disabled={isUpdating}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Completed
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedAppointment.status === "cancelled" ? "destructive" : "outline"}
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, "cancelled")}
                    disabled={isUpdating}
                    className={selectedAppointment.status !== "cancelled" ? "text-red-600 hover:text-red-700" : ""}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Cancelled
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Submitted on {formatDateTime(selectedAppointment.created_at)}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAppointmentDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Detail Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>Read and respond to this inquiry</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-purple-600">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{selectedMessage.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>
                </div>
                {getStatusBadge(selectedMessage.status, "message")}
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Phone</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {selectedMessage.phone || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide">Subject</Label>
                  <p className="font-medium">{selectedMessage.subject}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wide">Message</Label>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wide">Quick Actions</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Reply via Email
                  </Button>
                  {selectedMessage.phone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedMessage.phone}`)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant={selectedMessage.status === "replied" ? "default" : "outline"}
                    onClick={() => updateMessageStatus(selectedMessage.id, "replied")}
                    disabled={isUpdating || selectedMessage.status === "replied"}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Mark as Replied
                  </Button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Received on {formatDateTime(selectedMessage.created_at)}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={() => {
                deleteMessage(selectedMessage!.id)
                setIsMessageDialogOpen(false)
              }}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
