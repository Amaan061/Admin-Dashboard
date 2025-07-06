import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="min-h-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-3xl xl:max-w-4xl px-4 xl:px-8 space-y-12 animate-fade-in">
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
          <CardContent className="p-10 xl:p-14 space-y-10">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">Email Notifications</div>
                <div className="text-muted-foreground text-base">Receive important updates via email.</div>
              </div>
              <input type="checkbox" disabled className="w-6 h-6 accent-primary opacity-50 cursor-not-allowed" />
            </div>
            {/* 2FA Enforcement */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">2FA Enforcement</div>
                <div className="text-muted-foreground text-base">Require two-factor authentication for all users.</div>
              </div>
              <input type="checkbox" disabled className="w-6 h-6 accent-primary opacity-50 cursor-not-allowed" />
            </div>
            {/* Reset Password */}
            <div>
              <div className="font-semibold text-lg mb-2">Reset Password</div>
              <div className="flex flex-col gap-4 max-w-md">
                <input type="password" placeholder="New Password" disabled className="rounded-lg px-4 py-3 border border-border bg-muted/60 text-foreground opacity-50 cursor-not-allowed" />
                <input type="password" placeholder="Confirm Password" disabled className="rounded-lg px-4 py-3 border border-border bg-muted/60 text-foreground opacity-50 cursor-not-allowed" />
                <button disabled className="bg-primary text-primary-foreground font-semibold rounded-lg px-6 py-3 opacity-50 cursor-not-allowed">Reset Password</button>
              </div>
            </div>
            {/* Non-functional note */}
            <div className="mt-8 text-center text-base text-muted-foreground italic">
              Note: This page is for demonstration only and is non-functional.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
