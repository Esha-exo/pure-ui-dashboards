import { useState } from "react";
import { Upload, FileText, Home, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Upload {
  id: string;
  fileName: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const EmployeeDashboard = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([
    { id: "1", fileName: "Resume_2024.pdf", date: "2024-01-15", status: "approved" },
    { id: "2", fileName: "Certificate.pdf", date: "2024-01-10", status: "pending" },
    { id: "3", fileName: "ID_Proof.pdf", date: "2024-01-05", status: "approved" },
  ]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!employeeId || !selectedFile) {
      toast({
        title: "Missing Information",
        description: "Please enter Employee ID and select a file",
        variant: "destructive",
      });
      return;
    }

    const newUpload: Upload = {
      id: Date.now().toString(),
      fileName: selectedFile.name,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setUploads([newUpload, ...uploads]);
    toast({
      title: "Upload Successful",
      description: `${selectedFile.name} has been uploaded successfully`,
    });

    setEmployeeId("");
    setSelectedFile(null);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "bg-success/10 text-success border-success/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status as keyof typeof variants];
  };

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">HR Portal</h1>
          <p className="text-xs text-muted-foreground mt-1">Employee Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
            <Home className="h-5 w-5" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground">
            <Upload className="h-5 w-5" />
            Upload Document
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground">
            <FileText className="h-5 w-5" />
            My Documents
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground">
            <HelpCircle className="h-5 w-5" />
            Help
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Upload Documents</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 space-y-6">
          {/* Upload Card */}
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>Upload Your Document</CardTitle>
              <CardDescription>Submit your employee documents for review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Employee ID</label>
                <Input
                  placeholder="Enter your employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select File</label>
                <Input type="file" onChange={handleFileChange} />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                )}
              </div>
              <Button onClick={handleUpload} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>

          {/* Recent Uploads Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>My Recent Uploads</CardTitle>
              <CardDescription>Track the status of your submitted documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell className="font-medium">{upload.fileName}</TableCell>
                      <TableCell>{upload.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(upload.status)}>
                          {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                        </Badge>
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
  );
};

export default EmployeeDashboard;
