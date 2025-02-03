
"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div>
      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md inline-block border shadow max-w-md mx-auto"
    />
    <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>

    </div>
    
  )
}
