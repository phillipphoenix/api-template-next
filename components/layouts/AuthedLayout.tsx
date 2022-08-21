import { FC } from "react";
import { User } from "../../pages/api/auth/user";
import { TailSpin } from "../atoms/spinners/TailSpin";
import { MainMenuItem } from "../main-menu/MainMenuItem";
import { MdHome, MdOutlineDocumentScanner, MdVpnKey } from "react-icons/md";
import Link from "next/link";

type AuthedLayoutProps = {
  children: React.ReactNode;
  user?: User;
};

export const AuthedLayout: FC<AuthedLayoutProps> = ({ children, user }) => {
  if (!user) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <TailSpin size="lg" colour="slate-500" />
      </div>
    );
  }

  return (
    <div className="pt-14">
      <div className="w-full fixed top-0 h-12 bg-white border-b border-slate-400 drop-shadow-lg flex gap-4 items-center px-4">
        <span className="text-2xl mx-2">API</span>
        <Link href="/">
          <MainMenuItem label="HOME" icon={<MdHome className="text-2xl" />} />
        </Link>
        <Link href="/api-keys">
          <MainMenuItem
            label="API KEYS"
            icon={<MdVpnKey className="text-2xl" />}
          />
        </Link>
        <Link href="/examples/example-sg">
          <MainMenuItem
            label="Static Example"
            icon={<MdOutlineDocumentScanner className="text-2xl" />}
          />
        </Link>
        <Link href="/examples/example-ssr">
          <MainMenuItem
            label="Server Side Generated Example"
            icon={<MdOutlineDocumentScanner className="text-2xl" />}
          />
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};
