import { ReactNode } from "react";

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between p-4 sticky top-0 bg-white z-10 border">
      <h1 className="text-xl">TaskMaster</h1>
      {children}
    </div>
  );
};

export default Navbar;
