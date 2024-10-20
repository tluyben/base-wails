import React, { useState, useEffect } from "react";
import {
  Menu,
  Search,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
  currentProject: string | null;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentProject,
  currentPage,
  onNavigate,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", active: true },
    { name: "Page 1", icon: "page1", requiresProject: true },
    { name: "Page 2", icon: "page2", requiresProject: true },
    { name: "Page 3", icon: "page3", requiresProject: true },
    { name: "Page 4", icon: "page4", requiresProject: true },
    { name: "Page 5", icon: "page5", requiresProject: true },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/src/assets/images/logo-universal.png"
              alt="Logo"
              className={`transition-all duration-300 ease-in-out ${
                isCollapsed ? "h-14 w-14 min-w-[30px]" : "h-14 w-14 mr-2"
              }`}
            />
            {!isCollapsed && (
              <h1
                className="font-bold text-lg ml-2"
                title={currentProject ? currentProject : "Base Wails"}
              >
                {currentProject ? currentProject : "Base Wails"}
              </h1>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`ml-2 transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "transform translate-x-[-20px] rotate-180"
                : "transform translate-x-0 rotate-0"
            }`}
          >
            {isCollapsed ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        <nav>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant={currentPage === item.name ? "default" : "ghost"}
              className={`w-full justify-start ${
                !item.requiresProject || currentProject
                  ? ""
                  : "text-gray-400 pointer-events-none"
              }`}
              onClick={() => onNavigate(item.name)}
            >
              <Menu className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="w-full max-w-xl">
              <Search className="absolute mt-2 ml-2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
