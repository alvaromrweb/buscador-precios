import Head from "next/head"

export default function Meta({title = 'Buscador de precios', keywords = 'buscador precios, buscador, precios', description = 'App para listar precios del producto que busques'}) {
  return (
    <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
