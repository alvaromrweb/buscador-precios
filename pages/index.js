import { useState } from "react"
import Layout from "../components/Layout"
import Spinner from "../components/Spinner"
import Result from "../components/Result"
import SkeletonResult from "../components/SkeletonResult"

export default function Home({props}) {

  const [search, setSearch] = useState('Mando Xbox Series X')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  let skeletonResults = Array(10).fill(0);

  const handleSearch = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`api/search?q=${search}`)
      const {data} = await response.json()
      console.log(data)
      setResults(data)
      
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <Layout>
      <div className="container mx-auto text-center min-h-screen pb-5">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-4xl font-bold mt-5 text-white bounce">Buscador de precios</h1>
          <form className="mt-10 md:flex gap-5 w-11/12 md:w-1/2 text-left">
            <div className="w-full">
              <input type="text" id="search" placeholder="Introduce el nombre del producto" className="000 rounded bg-white/10 text-white outline-none px-3 py-2 w-full" value={search} onChange={e => setSearch(e.target.value)} />
              <small className="text-gray-400 text-left">Por ejemplo: "Mando Xbox Series X"</small>
            </div>
            <div>
              <button type="submit" className="w-full md:w-auto mt-5 md:mt-0 bg-sky-500 hover:bg-sky-700 transition-colors py-2 px-10 text-white font-bold rounded flex justify-center gap-2 disabled:opacity-75" disabled={loading} onClick={handleSearch}>
                {loading ? (
                  <>
                    Buscando... <Spinner/>
                  </>
                  ) : 'Buscar'}
                </button>
            </div>
          </form>
          
          <div id="results" className="flex flex-col w-11/12 md:w-10/12 gap-5 mt-5">
            {loading ? (
              skeletonResults.map((_, index) => <SkeletonResult key={index} />)
            ) : (
              results.length ? results.map(result => (
                <Result key={result.link} result={result} />
              )) : ''

            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
