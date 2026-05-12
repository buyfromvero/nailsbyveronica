import { Clock, Calendar, MapPin } from 'lucide-react'

export function WorkingHoursSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div>
            <p className="text-primary font-medium mb-2">Time Schedule</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Working Hours
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              At Nails by Veronica, I provide personalized nail care services by appointment only. 
              This ensures a seamless and dedicated experience for every client. 
              Serving ladies across Mumbai, Maharashtra.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Availability</h4>
                  <p className="text-muted-foreground">All Days - By Appointment</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Flexible Timing</h4>
                  <p className="text-muted-foreground">Schedule at your convenience</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-primary text-primary-foreground p-6 text-center">
              <h3 className="font-serif text-2xl font-bold">Appointment Based</h3>
              <p className="text-primary-foreground/80 mt-2">Book your session today</p>
            </div>
            <div className="p-6">
              <table className="w-full">
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4 text-foreground font-medium">Monday - Sunday</td>
                    <td className="py-4 text-right text-muted-foreground">By Appointment</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-foreground font-medium">Response Time</td>
                    <td className="py-4 text-right text-muted-foreground">Within 24 Hours</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-foreground font-medium">Booking</td>
                    <td className="py-4 text-right text-muted-foreground">Online / DM</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-center text-sm text-muted-foreground mt-6 pt-6 border-t">
                For appointments, please use the booking form or DM on Instagram
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
