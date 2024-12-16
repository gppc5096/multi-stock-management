import { Card } from "@/components/ui/card";
import OptionSettings from "@/components/settings/OptionSettings";
import DataManagement from "@/components/settings/DataManagement";

const Settings = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-16 z-40 bg-background py-4 border-b">
        <h1 className="text-4xl font-bold text-center" style={{ color: '#c23c10' }}>Multi Stock Management</h1>
      </div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#10c21e' }}>설정</h1>
      <div className="space-y-8">
        <Card className="p-4">
          <OptionSettings />
        </Card>
        <Card className="p-4">
          <DataManagement />
        </Card>
      </div>
    </div>
  );
};

export default Settings;