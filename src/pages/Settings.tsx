import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="w-full max-w-3xl xl:max-w-4xl mx-auto px-4 xl:px-8 space-y-12 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Manage your admin dashboard preferences and configuration.
        </p>
      </div>
      <Card className="border-0 shadow-2xl bg-gradient-surface">
        <CardHeader className="bg-card-header rounded-t-lg p-8 xl:p-10">
          <CardTitle className="text-2xl xl:text-3xl">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-10 xl:p-14">
          <div className="text-lg text-muted-foreground">
            This is a placeholder for settings. Add your preferences and configuration options here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
