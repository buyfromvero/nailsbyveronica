"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
  DialogTrigger,
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
  Scissors,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  category: string
  price_from: number
  price_to: number
  duration: string
  is_active: boolean
  display_order: number
  created_at: string
}

const emptyService = {
  name: "",
  description: "",
  category: "hands",
  price_from: 0,
  price_to: 0,
  duration: "",
  is_active: true,
  display_order: 0,
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState(emptyService)
  const supabase = createClient()

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("category")
      .order("display_order")
    
    if (error) {
      console.error("Error fetching services:", error)
    } else {
      setServices(data || [])
    }
    setIsLoading(false)
  }

  function openCreateDialog() {
    setEditingService(null)
    setFormData(emptyService)
    setIsDialogOpen(true)
  }

  function openEditDialog(service: Service) {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || "",
      category: service.category,
      price_from: service.price_from,
      price_to: service.price_to,
      duration: service.duration || "",
      is_active: service.is_active,
      display_order: service.display_order,
    })
    setIsDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(formData)
          .eq("id", editingService.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("services")
          .insert(formData)
        
        if (error) throw error
      }

      fetchServices()
      setIsDialogOpen(false)
      setFormData(emptyService)
      setEditingService(null)
    } catch (error) {
      console.error("Error saving service:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function toggleActive(id: string, isActive: boolean) {
    const { error } = await supabase
      .from("services")
      .update({ is_active: !isActive })
      .eq("id", id)
    
    if (error) {
      console.error("Error toggling service:", error)
    } else {
      fetchServices()
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Are you sure you want to delete this service?")) return
    
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id)
    
    if (error) {
      console.error("Error deleting service:", error)
    } else {
      fetchServices()
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "hands":
        return <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">Hands</Badge>
      case "feet":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Feet</Badge>
      case "addons":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Add-ons</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  const formatPrice = (from: number, to: number) => {
    if (from === to || !to) {
      return `₹${from}`
    }
    return `₹${from} - ₹${to}`
  }

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {} as Record<string, Service[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-muted-foreground">Manage your nail services and pricing</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Services by Category */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : services.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Scissors className="h-12 w-12 mb-4 opacity-50" />
            <p>No services yet</p>
            <Button onClick={openCreateDialog} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Service
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getCategoryBadge(category)}
                  <span className="capitalize">{category}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    ({categoryServices.length} services)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryServices.map((service) => (
                        <TableRow key={service.id} className={!service.is_active ? "opacity-50" : ""}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{service.name}</p>
                              {service.description && (
                                <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                                  {service.description}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatPrice(service.price_from, service.price_to)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {service.duration || "-"}
                          </TableCell>
                          <TableCell>
                            {service.is_active ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                                Hidden
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditDialog(service)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleActive(service.id, service.is_active)}>
                                  {service.is_active ? (
                                    <>
                                      <EyeOff className="h-4 w-4 mr-2" />
                                      Hide
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-4 w-4 mr-2" />
                                      Show
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteService(service.id)}
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription>
              {editingService ? "Update the service details" : "Create a new nail service"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Gel Manicure"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the service"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hands">Hands</SelectItem>
                  <SelectItem value="feet">Feet</SelectItem>
                  <SelectItem value="addons">Add-ons</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price_from">Price From (₹) *</Label>
                <Input
                  id="price_from"
                  type="number"
                  value={formData.price_from}
                  onChange={(e) => setFormData({ ...formData, price_from: parseFloat(e.target.value) || 0 })}
                  placeholder="500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_to">Price To (₹)</Label>
                <Input
                  id="price_to"
                  type="number"
                  value={formData.price_to}
                  onChange={(e) => setFormData({ ...formData, price_to: parseFloat(e.target.value) || 0 })}
                  placeholder="1000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 45-60 mins"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">Show on website</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingService ? "Update Service" : "Add Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
