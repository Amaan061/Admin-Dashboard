import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 overflow-hidden">
      <div className="w-full max-w-3xl xl:max-w-4xl px-4 xl:px-8 space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-base text-muted-foreground mt-1">
            Manage your admin dashboard preferences and configuration.
          </p>
        </div>
        <Card className="border-0 shadow-2xl bg-gradient-surface">
          <CardHeader className="bg-card-header rounded-t-lg p-6 xl:p-8">
            <CardTitle className="text-2xl xl:text-3xl">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-6 xl:p-8 space-y-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-base">Email Notifications</div>
                <div className="text-muted-foreground text-sm">Receive important updates via email.</div>
              </div>
              <input type="checkbox" disabled className="w-5 h-5 accent-primary opacity-50 cursor-not-allowed" />
            </div>
            {/* 2FA Enforcement */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-base">2FA Enforcement</div>
                <div className="text-muted-foreground text-sm">Require two-factor authentication for all users.</div>
              </div>
              <input type="checkbox" disabled className="w-5 h-5 accent-primary opacity-50 cursor-not-allowed" />
            </div>
            {/* Reset Password */}
            <div>
              <div className="font-semibold text-base mb-1">Reset Password</div>
              <div className="flex flex-col gap-2 max-w-md">
                <input type="password" placeholder="New Password" disabled className="rounded-lg px-4 py-2 border border-border bg-muted/60 text-foreground opacity-50 cursor-not-allowed h-10" />
                <input type="password" placeholder="Confirm Password" disabled className="rounded-lg px-4 py-2 border border-border bg-muted/60 text-foreground opacity-50 cursor-not-allowed h-10" />
                <button disabled className="bg-primary text-primary-foreground font-semibold rounded-lg px-6 py-2 opacity-50 cursor-not-allowed h-10">Reset Password</button>
              </div>
            </div>
            {/* Non-functional note */}
            <div className="mt-4 text-center text-sm text-muted-foreground italic">
              Note: This page is for demonstration only and is non-functional.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
