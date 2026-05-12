import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Mail, CheckCircle } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Logo />
      </div>

      {/* Success Message */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-xl text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-2xl">Check Your Email</CardTitle>
              <CardDescription>
                We have sent you a confirmation email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <span>Please check your inbox</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Click the link in the email to verify your account. 
                If you do not see the email, check your spam folder.
              </p>

              <div className="pt-4 space-y-3">
                <Button asChild className="w-full">
                  <Link href="/">Go to Homepage</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/auth/login">Back to Sign In</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
