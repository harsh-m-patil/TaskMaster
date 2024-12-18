import Link from "next/link";
import { IconCards, IconChecklist, IconHome2 } from "@tabler/icons-react";

const Sidebar = () => {
  return (
    <div className="col-span-1 p-4 border h-full flex flex-col gap-5 sticky left-0 bottom-0">
      <Link
        href="/dashboard"
        className="py-3 bg-gradient-to-r px-2 sm:px-6 flex place-items-center text-center border gap-5 rounded-2xl from-sky-400 to-blue-500"
      >
        <span className="p-1 rounded-xl bg-white">
          <IconHome2 />
        </span>
        <span className="hidden sm:block">Home</span>
      </Link>
      <Link
        href="/dashboard/projects"
        className="py-3 bg-gradient-to-r px-2 sm:px-6 flex place-items-center text-center border gap-5 rounded-2xl from-sky-400 to-blue-500"
      >
        <span className="p-1 rounded-xl bg-white">
          <IconChecklist />
        </span>
        <span className="hidden sm:block">Projects</span>
      </Link>
      <Link
        href="/dashboard/assigned"
        className="py-3 bg-gradient-to-r px-2 sm:px-6 flex place-items-center text-center border gap-5 rounded-2xl from-sky-400 to-blue-500"
      >
        <span className="p-1 rounded-xl bg-white">
          <IconCards />
        </span>
        <span className="hidden sm:block">Assigned</span>
      </Link>
    </div>
  );
};

export default Sidebar;
