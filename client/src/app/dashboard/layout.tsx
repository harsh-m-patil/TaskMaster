import Sidebar from "@/components/ui/sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-8 h-[94vh]">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
