import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Spinner from "../components/Spinner"
import Result from "../components/Result"
import SkeletonResult from "../components/SkeletonResult"

const comparePrices = ( order ) => {
  return function innerSort(a, b) {
    let comparison = 0

    if (a.price === null && b.price !== null) {
      comparison = 1
    } else if (b.price === null && a.price !== null) {
      comparison = -1
    } else if (a.price !== null && b.price !== null) {
      
      if ( parseFloat(a.price) > parseFloat(b.price)){
        comparison = 1;
      } else if ( parseFloat(a.price) < parseFloat(b.price)){
        comparison = -1;
      }
    }
    return (
      (order === 'desc' && (a.price !== null && b.price !== null)) ? (comparison * -1) : comparison
    );
  }
}


export default function Home({props}) {

  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [results, setResults] = useState([])
  const [resultsOriginalOrder, setResultsOriginalOrder] = useState([])
  const [loading, setLoading] = useState(false)

  let skeletonResults = Array(10).fill(0);

  const handleSearch = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`api/search?q=${search}`)
      const {data} = await response.json()
      setResultsOriginalOrder(data)
      if(orderBy !== '') {
        const orderedData = [...data].sort(comparePrices(orderBy))
        setResults(orderedData)
      } else {
        setResults(data)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if(orderBy !== '') {
      const resultadosOrdenados = [...results].sort(comparePrices(orderBy))
      setResults(resultadosOrdenados)
    } else {
      setResults(resultsOriginalOrder)
    }
    
  }, [orderBy])
  

  return (
    <Layout>
      <div className="container mx-auto text-center min-h-screen pb-5">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-4xl font-bold mt-5 text-white bounce">Buscador de precios</h1>
          <form className="mt-10  gap-5 w-11/12 md:w-1/2 text-left">
            <div className="w-full flex">
              <div className="w-3/5 md:w-3/4">
                <input type="text" id="search" placeholder="Nombre del producto" className="rounded-l-lg  bg-white/10 text-white outline-none px-3 py-2 w-full" value={search} onChange={e => setSearch(e.target.value)} />
                <small className="text-gray-400 text-left cursor-pointer" onClick={e => setSearch('Mando Xbox Series X')}>Por ejemplo: "Mando Xbox Series X"</small>
              </div>
              <div className="w-2/5 md:w-1/4">
                <select className="w-full rounded-r-lg bg-white/10  outline-none px-3 py-2 border-l border-white/20 placeholder-gray-400 bg-gray-700 text-white" value={orderBy} onChange={e => setOrderBy(e.target.value)}>
                  <option value="">Ordenar resultados</option>
                  <option value="asc">Precio Asc</option>
                  <option value="desc">Precio Desc</option>
                </select>
              </div>
              
            </div>
            <div className="mt-5 flex justify-center">
              <button type="submit" className="w-full text-xl bg-sky-500 hover:bg-sky-700 transition-colors py-2 px-10 text-white font-bold rounded flex justify-center gap-2 disabled:opacity-75" disabled={loading} onClick={handleSearch}>
                {loading ? (
                  <>
                    Buscando... <Spinner/>
                  </>
                  ) : 'Buscar'}
                </button>
            </div>
          </form>
          
          <div id="results" className="w-11/12 md:w-10/12">
            <div  className="flex flex-col gap-5 mt-10">
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
      </div>
    </Layout>
  )
}
