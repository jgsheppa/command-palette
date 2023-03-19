import { ReactNode, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCommandPalette } from '@/hooks/useCommandPalette';

const routes = [{ path: '/about', pageName: "About" }, { path: '/', pageName: "Home" }, { path: '/contact', pageName: "Contact" }, { path: '/security', pageName: "Security" }, { path: '/blog', pageName: "Blog" }];

export function CommandPalette() {
  const { isCommandPaletteOpen, handleClosePalette } = useCommandPalette(routes.length);
  const router = useRouter();

  const otherRoutes = useMemo(
    () => routes.filter((route) => route.path !== router.route),
    [router.route],
  );

  return isCommandPaletteOpen ? (
    <CommandModal>
      <ul>
        {otherRoutes.map((route, index) => (
          <li key={index}>
            <Link href={route.path} onClick={handleClosePalette}>
              <div id={`route-${index + 1}`} tabIndex={index + 1} className="relative p-4">
                <p>{route.pageName}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </CommandModal>
  ) : null;
}

type CommandModalProps = {
  children: ReactNode;
}

function CommandModal({ children }: CommandModalProps) {
  const { handleClosePalette } = useCommandPalette(routes.length);

  return <div
    data-te-modal-init
    className="fixed top-0 left-0 z-[1055] block h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="exampleModalCenter"
    tabIndex={-1}
    aria-labelledby="exampleModalCenterTitle"
    aria-modal="true"
    role="dialog">
    <div
      data-te-modal-dialog-ref
      className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
      <div
        className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
        <div
          className="flex flex-shrink-0 items-center justify-end rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
          <button
            type="button"
            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-modal-dismiss
            aria-label="Close" onClick={handleClosePalette}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  </div>
}