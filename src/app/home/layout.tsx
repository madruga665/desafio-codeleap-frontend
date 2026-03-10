import { Header } from "@/src/components/header/header";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main className="flex flex-col items-center gap-6 w-screen bg-white pb-6">
      <Header />
      {children}
    </main>
  )
}