'use client'

import { useState } from 'react'
import type { Project } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '../ui/textarea'
import { addProject, deleteProject, logout } from '@/app/admin/actions'
import { format } from 'date-fns'
import { Eye, Play, Trash2, PlusCircle } from 'lucide-react'

type DashboardClientProps = {
  projects: Project[]
  analytics: {
    pageViews: number
    videoPlays: number
  }
  userEmail: string
}

export default function DashboardClient({ projects, analytics, userEmail }: DashboardClientProps) {
  const [isAddOpen, setAddOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
           <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="ml-auto flex items-center gap-2">
                <span>{userEmail}</span>
                <form>
                  <Button formAction={logout} variant="outline">Logout</Button>
                </form>
            </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Site Views
                        </CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.pageViews}</div>
                        <p className="text-xs text-muted-foreground">
                        All page view events recorded
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Video Plays
                        </CardTitle>
                        <Play className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.videoPlays}</div>
                         <p className="text-xs text-muted-foreground">
                        All video play events recorded
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Projects</CardTitle>
                            <CardDescription>Manage your video projects.</CardDescription>
                        </div>
                        <Dialog open={isAddOpen} onOpenChange={setAddOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm" className="gap-1">
                              <PlusCircle className="h-3.5 w-3.5" />
                              Add Project
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                             <form action={async (formData) => {
                                await addProject(formData)
                                setAddOpen(false)
                              }}>
                                <DialogHeader>
                                <DialogTitle>Add New Project</DialogTitle>
                                <DialogDescription>
                                    Add a new video by providing the YouTube URL and other details.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">Title</Label>
                                    <Input id="title" name="title" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="youtubeUrl" className="text-right">YouTube URL</Label>
                                    <Input id="youtubeUrl" name="youtubeUrl" className="col-span-3" placeholder="https://www.youtube.com/watch?v=..." required/>
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">Category</Label>
                                    <Select name="category" required>
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Wedding">Wedding</SelectItem>
                                        <SelectItem value="Commercial">Commercial</SelectItem>
                                        <SelectItem value="Documentary">Documentary</SelectItem>
                                      </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">Description</Label>
                                    <Textarea id="description" name="description" className="col-span-3" />
                                </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                  </DialogClose>
                                  <Button type="submit">Add Project</Button>
                                </DialogFooter>
                              </form>
                          </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell>{project.category}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {format(new Date(project.createdAt), 'MMMM d, yyyy')}
                                </TableCell>
                                <TableCell>
                                    <form action={() => deleteProject(project.id)}>
                                        <Button size="icon" variant="ghost" type="submit">
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  )
}
