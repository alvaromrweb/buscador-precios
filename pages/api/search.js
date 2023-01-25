import puppeteer from 'puppeteer'
import { KnownDevices } from 'puppeteer'
import fs from 'fs'

export default async function handler(req, res) {

  // Añadir la palabra precio al final de la busqueda para mejor resultado
  const search = `${req.query.q} precio` 
  
  const Iphone = KnownDevices['iPhone 8']

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(Iphone);
  // await page.waitForSelector('img.XNo5Ab', {visible: true})

  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  await page.goto(`https://www.google.es/search?q=${search}`);

  const html = await page.content();
  fs.writeFileSync('logs/test', html)

  const data = await page.evaluate(() => {
    const results = []; 
    const items = document.querySelectorAll("#rso > div"); 
    items.forEach(item => { 
      const title = item.querySelector("div[role='heading'][aria-level='3']")?.innerText
      const link = item.querySelector("a")?.href
      const description = item.querySelector("[data-content-feature='1'] > div")?.innerText
      const web = item.querySelector(".Aozhyc")?.innerText
      const webImg = item.querySelector("img")?.src

      // Para sacar el precio, primero se intenta sacar de donde deberia estar y luego si no está, se intenta encontrar en todo el texto del resultado de Google
      let price = item.querySelector(".jC6vSe")?.innerText.match(/\d+(,\d{2})/g)
      price = price ? price[0] : null
      if(!price) {
        price = item.innerText.match(/\d+(,\d{2})/g)
        price = price ? price[0] : null
      }

      let img = item.querySelector("div[data-sokoban-feature='Vjbam'] img")?.src

      // Si la imagen tiene esa cadena, es que no ha cargado aun
      if(img == "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==") {
        const imgId = item.querySelector("div[data-sokoban-feature='Vjbam'] img")?.id
        // Aqui estoy encontrando en un script mediante el id de la imagen, la url de la imagen que carga mas tarde
        const imgUrl = document.documentElement.outerHTML.split(`${imgId}\"\:\"`)[1].split('\"')[0]  
        img = JSON.parse(`"${imgUrl}"`)
      }
      
      if(title) {
        results.push({title, link, price, img, description, web, webImg}); 
      }
    });
    return results; 
  });

  await browser.close()
  console.log(data)
  res.status(200).json({ data })
}
