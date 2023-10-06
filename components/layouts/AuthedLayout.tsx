import { FC } from "react";
import { User } from "../../pages/api/auth/user";
import { TailSpin } from "../atoms/spinners/TailSpin";
import { MainMenuItem } from "../main-menu/MainMenuItem";
import {
  MdHome,
  MdLibraryBooks,
  MdMenuBook,
  MdOutlineDocumentScanner,
  MdVpnKey,
} from "react-icons/md";
import Link from "next/link";

type AuthedLayoutProps = {
  children: React.ReactNode;
  user?: User;
};

export const AuthedLayout: FC<AuthedLayoutProps> = ({ children, user }) => {
  if (!user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="pt-14">
      <div className="fixed top-0 flex h-12 w-full items-center gap-4 border-b border-slate-400 bg-white px-4 drop-shadow-lg">
        <span className="mx-2 text-2xl">API</span>
        <Link href="/">
          <span>
            <MainMenuItem label="HOME" icon={<MdHome className="text-2xl" />} />
          </span>
        </Link>
        <Link href="/models">
          <span>
            <MainMenuItem
              label="MODELS"
              icon={<MdMenuBook className="text-2xl" />}
            />
          </span>
        </Link>
        <Link href="/api-keys">
          <span>
            <MainMenuItem
              label="API KEYS"
              icon={<MdVpnKey className="text-2xl" />}
            />
          </span>
        </Link>
        <Link href="/api-doc">
          <span>
            <MainMenuItem
              label="API DOCUMENTATION"
              icon={<MdLibraryBooks className="text-2xl" />}
            />
          </span>
        </Link>
        <Link href="/examples/example-sg">
          <span>
            <MainMenuItem
              label="Static Example"
              icon={<MdOutlineDocumentScanner className="text-2xl" />}
            />
          </span>
        </Link>
        <Link href="/examples/example-ssr">
          <span>
            <MainMenuItem
              label="Server Side Generated Example"
              icon={<MdOutlineDocumentScanner className="text-2xl" />}
            />
          </span>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};
