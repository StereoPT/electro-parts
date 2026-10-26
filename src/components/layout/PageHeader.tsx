import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type PageHeaderProps = {
  title: string;
  actions?: ReactNode;
};

export const PageHeader = ({ title, actions }: PageHeaderProps) => {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator className="mr-2 h-4" orientation="vertical" />
      <h1 className="font-semibold text-base">{title}</h1>
      {actions ? (
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
};
