"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  Image as ImageIcon,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
  StarOff,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"

interface GalleryItem {
  id: string
  title: string
  image_url: string
  category: string
  is_featured: boolean
  display_order: number
  created_at: string
}

const emptyItem = {
  title: "",
  image_url: "",
  category: "",
  is_featured: false,
  display_order: 0,
}

const categories = [
  "Gel Nails",
  "Acrylic Nails",
  "Nail Art",
  "French Manicure",
  "Ombre Nails",
  "Chrome Nails",
  "Glitter Nails",
  "Pedicure",
  "Bridal Nails",
  "Other",
]

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [formData, setFormData] = useState(emptyItem)
  const [filterCategory, setFilterCategory] = useState("all")
  const supabase = createClient()

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("display_order")
      .order("created_at", { ascending: false })
    
    if (error) {
      console.error("Error fetching gallery:", error)
    } else {
      setItems(data || [])
    }
    setIsLoading(false)
  }

  function openCreateDialog() {
    setEditingItem(null)
    setFormData(emptyItem)
    setIsDialogOpen(true)
  }

  function openEditDialog(item: GalleryItem) {
    setEditingItem(item)
    setFormData({
      title: item.title,
      image_url: item.image_url,
      category: item.category || "",
      is_featured: item.is_featured,
      display_order: item.display_order,
    })
    setIsDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingItem) {
        const { error } = await supabase
          .from("gallery")
          .update(formData)
          .eq("id", editingItem.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("gallery")
          .insert(formData)
        
        if (error) throw error
      }

      fetchItems()
      setIsDialogOpen(false)
      setFormData(emptyItem)
      setEditingItem(null)
    } catch (error) {
      console.error("Error saving gallery item:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function toggleFeatured(id: string, isFeatured: boolean) {
    const { error } = await supabase
      .from("gallery")
      .update({ is_featured: !isFeatured })
      .eq("id", id)
    
    if (error) {
      console.error("Error toggling featured:", error)
    } else {
      fetchItems()
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return
    
    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id)
    
    if (error) {
      console.error("Error deleting item:", error)
    } else {
      fetchItems()
    }
  }

  const filteredItems = filterCategory === "all" 
    ? items 
    : items.filter(item => item.category === filterCategory)

  const uniqueCategories = [...new Set(items.map(item => item.category).filter(Boolean))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground">Manage your portfolio images</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Filter */}
      {uniqueCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory("all")}
          >
            All ({items.length})
          </Button>
          {uniqueCategories.map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category)}
            >
              {category} ({items.filter(i => i.category === category).length})
            </Button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-4 opacity-50" />
            <p>No gallery images yet</p>
            <Button onClick={openCreateDialog} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
                {item.is_featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => openEditDialog(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => toggleFeatured(item.id, item.is_featured)}
                  >
                    {item.is_featured ? (
                      <StarOff className="h-4 w-4" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-sm truncate">{item.title}</p>
                {item.category && (
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Image" : "Add New Image"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update the image details" : "Add a new image to your portfolio"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Rose Gold Glitter Nails"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL *</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-xs text-muted-foreground">
                Paste a direct link to your image (from Instagram, Google Drive, etc.)
              </p>
            </div>

            {formData.image_url && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={formData.image_url}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Gel Nails, Nail Art"
                list="categories"
              />
              <datalist id="categories">
                {categories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_featured">Featured (show on homepage)</Label>
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingItem ? "Update Image" : "Add Image"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
