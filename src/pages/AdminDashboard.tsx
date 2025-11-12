import { useState } from "react";
import { LayoutDashboard, Users, FileText, BarChart3, Settings, Search, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmployeeRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  fileName: string;
  date: string;
  status: "available" | "limited" | "part-time";
}

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [records] = useState<EmployeeRecord[]>([
    { id: "1", employeeId: "EMP001", employeeName: "John Smith", fileName: "Resume_2024.pdf", date: "2024-01-15", status: "available" },
    { id: "2", employeeId: "EMP002", employeeName: "Sarah Johnson", fileName: "Certificate.pdf", date: "2024-01-14", status: "limited" },
    { id: "3", employeeId: "EMP003", employeeName: "Mike Davis", fileName: "ID_Proof.pdf", date: "2024-01-13", status: "available" },
    { id: "4", employeeId: "EMP004", employeeName: "Emily Brown", fileName: "Passport.pdf", date: "2024-01-12", status: "part-time" },
    { id: "5", employeeId: "EMP005", employeeName: "David Wilson", fileName: "Contract.pdf", date: "2024-01-11", status: "available" },
  ]);

  const filteredRecords = records.filter((record) =>
    record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const config = {
      available: { bg: "bg-success/10", text: "text-success", border: "border-success/20", label: "Available" },
      limited: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20", label: "Limited" },
      "part-time": { bg: "bg-info/10", text: "text-info", border: "border-info/20", label: "Part-Time" },
    };
    const { bg, text, border, label } = config[status as keyof typeof config];
    return <Badge variant="outline" className={`${bg} ${text} ${border}`}>{label}</Badge>;
  };

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Dark Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-primary">HR Admin</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">Management Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
            <Users className="h-5 w-5" />
            Employees
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
            <FileText className="h-5 w-5" />
            Documents
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
            <BarChart3 className="h-5 w-5" />
            Reports
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
            <Settings className="h-5 w-5" />
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 shadow-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">AD</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">248</p>
                <p className="text-xs text-success mt-1">+12% from last month</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Files</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,284</p>
                <p className="text-xs text-success mt-1">+8% from last month</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Uploads Today</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">23</p>
                <p className="text-xs text-info mt-1">5 pending review</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3</p>
                <p className="text-xs text-warning mt-1">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Employee Records Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee File Records</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">View and manage all employee documents</p>
                </div>
                <div className="flex gap-3">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Sort by Date</SelectItem>
                      <SelectItem value="name">Sort by Name</SelectItem>
                      <SelectItem value="id">Sort by ID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employeeId}</TableCell>
                      <TableCell>{record.employeeName}</TableCell>
                      <TableCell>{record.fileName}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
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

export default AdminDashboard;
