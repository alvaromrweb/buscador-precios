import Meta from "./Meta"

export default function Layout({children}) {
  return (
    <>
        <Meta />
        <main className="bg-slate-800">
            {children}
        </main>
        
    </>
  )
}
