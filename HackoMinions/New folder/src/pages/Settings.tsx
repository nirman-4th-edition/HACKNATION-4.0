import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon, LogOut, Camera } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");
  const [fullName, setFullName] = useState("Fullname");
  const [email, setEmail] = useState("Name@example.com");

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Successfully signed out!");
    navigate("/login");
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    toast.success(`${isDarkMode ? "Light" : "Dark"} mode activated!`);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        toast.success("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Settings
          <SettingsIcon className="w-8 h-8 animate-calendar-spin text-primary" />
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24 animate-float">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{fullName[0]}</AvatarFallback>
            </Avatar>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={handleAvatarUpload}
            />
            <Label
              htmlFor="avatar-upload"
              className="cursor-pointer flex items-center space-x-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md transition-all duration-300"
            >
              <Camera className="h-4 w-4" />
              <span>Change Profile Picture</span>
            </Label>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Dark Mode</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle dark mode on/off
              </p>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
              className="transition-all duration-300"
            />
          </div>

          <div className="pt-6 border-t">
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;