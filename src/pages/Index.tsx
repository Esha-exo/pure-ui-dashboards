import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/20">
      <div className="container max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            HR Portal
          </h1>
          <p className="text-xl text-muted-foreground">Choose your dashboard</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate("/employee")}>
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center text-2xl">Employee Dashboard</CardTitle>
              <CardDescription className="text-center">Upload and manage your documents</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => navigate("/employee")} className="w-full">
                Enter as Employee
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate("/admin")}>
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center text-2xl">Admin Dashboard</CardTitle>
              <CardDescription className="text-center">Manage employee records and files</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => navigate("/admin")} className="w-full">
                Enter as Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
