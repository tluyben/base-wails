import { useState } from "react"
import { Tree } from "./ui/tree"
import { RootPage, Level1Page, Level2Page } from "./TreePages"
import { ScrollArea } from "./ui/scroll-area"
import { Button } from "./ui/button"
import { ChevronLeft } from "lucide-react"

export default function Layout() {
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(<RootPage />)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleNodeClick = (node: { level: number }) => {
    switch (node.level) {
      case 0:
        setCurrentPage(<RootPage />)
        break
      case 1:
        setCurrentPage(<Level1Page />)
        break
      case 2:
        setCurrentPage(<Level2Page />)
        break
      default:
        setCurrentPage(<RootPage />)
    }
  }

  const handleRootClick = () => {
    setIsCollapsed(false)
  }

  return (
    <div className="flex h-screen">
      <div 
        className={`border-r bg-gray-50/40 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center">
            <img
              src="/src/assets/images/logo-universal.png"
              alt="Logo"
              className={`transition-all duration-300 ease-in-out ${
                isCollapsed ? "h-8 w-8 min-w-[32px]" : "h-8 w-8 mr-2"
              }`}
            />
            {!isCollapsed && (
              <h1 className="font-bold text-lg ml-2">
                Base Wails
              </h1>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`transition-all duration-300 ease-in-out ${
              isCollapsed
                ? "transform translate-x-[-8px] rotate-180"
                : "transform translate-x-0 rotate-0"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <Tree 
            onNodeClick={handleNodeClick} 
            isCollapsed={isCollapsed}
            onRootClick={handleRootClick}
          />
        </ScrollArea>
      </div>
      <main className="flex-1 p-6 overflow-auto">
        {currentPage}
      </main>
    </div>
  )
}
