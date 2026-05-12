"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Mail,
  Instagram,
  MapPin,
  Clock,
  Bell,
  Save,
  Globe,
  Palette,
} from "lucide-react"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // Business Info
    businessName: "Nails by Veronica",
    ownerName: "Veronica Mendonca",
    email: "veronicamendonca2113@gmail.com",
    instagram: "@nails_by__veronica",
    location: "Mumbai, Maharashtra, India",
    
    // Working Hours
    workingHours: "Mon-Sat: 10:00 AM - 7:00 PM\nSunday: By Appointment Only",
    
    // Notifications
    emailNotifications: true,
    appointmentAlerts: true,
    
    // Website
    maintenanceMode: false,
    bookingEnabled: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // In a real app, you would save to Supabase here
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your website settings and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Business Information
            </CardTitle>
            <CardDescription>
              Your business details displayed on the website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                value={settings.ownerName}
                onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram Handle
              </Label>
              <Input
                id="instagram"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Working Hours
            </CardTitle>
            <CardDescription>
              Set your availability for appointments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workingHours">Working Hours</Label>
              <Textarea
                id="workingHours"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                rows={4}
                placeholder="Mon-Fri: 9:00 AM - 6:00 PM&#10;Saturday: 10:00 AM - 4:00 PM&#10;Sunday: Closed"
              />
              <p className="text-xs text-muted-foreground">
                Enter each day on a new line
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email alerts for new appointments and messages
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Appointment Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone books an appointment
                </p>
              </div>
              <Switch
                checked={settings.appointmentAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, appointmentAlerts: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Website Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Website Settings
            </CardTitle>
            <CardDescription>
              Control your website behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Online Booking</Label>
                <p className="text-sm text-muted-foreground">
                  Allow customers to book appointments online
                </p>
              </div>
              <Switch
                checked={settings.bookingEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, bookingEnabled: checked })}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-yellow-600">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable the website for visitors
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Setup Guide</CardTitle>
          <CardDescription>
            Follow these steps to complete your website setup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">1. Google Sheets Integration</h4>
              <p className="text-sm text-muted-foreground mb-2">
                To receive form submissions in Google Sheets:
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>Create a Google Sheet with columns for your data</li>
                <li>Go to Extensions - Apps Script</li>
                <li>Create a doPost function to handle submissions</li>
                <li>Deploy as a web app</li>
                <li>Add the URL as GOOGLE_SHEET_WEBHOOK_URL in Vars</li>
              </ol>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">2. Email Notifications</h4>
              <p className="text-sm text-muted-foreground mb-2">
                To receive email notifications:
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>Sign up at resend.com</li>
                <li>Get your API key</li>
                <li>Add RESEND_API_KEY in Vars</li>
                <li>Add NOTIFICATION_EMAIL in Vars</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">3. Google Sign-In</h4>
              <p className="text-sm text-muted-foreground mb-2">
                To enable Google OAuth:
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>Go to Supabase Dashboard - Authentication</li>
                <li>Enable Google provider</li>
                <li>Create OAuth credentials in Google Cloud Console</li>
                <li>Add Client ID and Secret in Supabase</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">4. Make Yourself Admin</h4>
              <p className="text-sm text-muted-foreground mb-2">
                To access the admin panel:
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>Sign up on the website first</li>
                <li>Go to Supabase Dashboard - Table Editor</li>
                <li>Open the profiles table</li>
                <li>Find your user and change role to &quot;admin&quot;</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
