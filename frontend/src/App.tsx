import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Example from "./components/Example";
import { useAppStore } from "./store";

const App: React.FC = () => {
  const { currentProjectId, setCurrentProjectId } = useAppStore();
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");

  useEffect(() => {
    if (currentProjectId) {
      setCurrentPage("Page1");
    }
  }, [currentProjectId]);

  const handleProjectAdded = (projectId: string) => {
    setCurrentProjectId(projectId);
    setCurrentPage("Page1");
  };
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const getCurrentProject = () => {
    const { projects } = useAppStore.getState();
    return projects.find((p: any) => p.id === currentProjectId) || null;
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Page 1":
        return <Example />;
      case "Page 2":
        return <Example />;
      case "Page 3":
        return <Example />;
      case "Page 4":
        return <Example />;
      case "Page 5":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      currentProject={getCurrentProject()?.name || null}
      currentPage={currentPage}
      onNavigate={handleNavigate}
    >
      {renderCurrentPage()}
    </Layout>
  );
};

export default App;
