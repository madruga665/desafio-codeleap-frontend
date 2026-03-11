import { Header } from "@/src/components/header/header";

export default function Layout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center gap-6 w-screen bg-white pb-6 relative min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  )
}