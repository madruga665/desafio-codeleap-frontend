import { cn } from "@/src/lib/utils";

type Heading1Props = {
  className: string;
}

export function Heading1({ children, className }: React.PropsWithChildren<Heading1Props>): React.JSX.Element {
  return (
    <h1 className={cn("text-[22px] font-bold", className)}>{children}</h1>
  )
}