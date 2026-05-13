"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  const fetchAllData = useCallback(async () => {
    console.log("Admin data loaded")
  }, [])

  useEffect(() => {
    async function checkAdminAccess() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        // Wait until auth loads
        if (!user) {
          router.push("/auth/login")
          return
        }

        // Check admin using EMAIL
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", user.email)
          .single()

        const isAdmin = profile?.role === "admin"

        if (!isAdmin) {
          router.push("/")
          return
        }

        setAuthorized(true)

        await fetchAllData()
      } catch (err) {
        console.error(err)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
  }, [fetchAllData, router, supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking admin access...</p>
      </div>
    )
  }

  if (!authorized) {
    return null
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="border rounded-xl p-6">
        <p>Welcome Admin 🎉</p>
      </div>
    </div>
  )
}