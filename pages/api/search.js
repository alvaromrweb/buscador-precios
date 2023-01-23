import puppeteer from 'puppeteer-core'
import {scrollPageToBottom} from 'puppeteer-autoscroll-down'
import fs from 'fs'

export default async function handler(req, res) {
  // Añadir la palabra precio al final de la busqueda para mejor resultado
  const search = `${req.query.q} precio` 
  // Ponemos tamaño de movil porque las imagenes tienen mejor calidad
  const viewWidth = 375
  const viewHeight = 800

  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: [`--window-size=${viewWidth},${viewHeight}`],
    defaultViewport: {
      width: viewWidth,
      height: viewHeight,
      isMobile: true
    }
  });
  const page = await browser.newPage();
  // await page.waitForSelector('img.XNo5Ab', {visible: true})

  // const wait = (ms) => new Promise(res => setTimeout(res, ms));

  await page.goto(`https://www.google.es/search?q=${search}`, {"waitUntil" : "networkidle0"});
  // const lastPosition = await scrollPageToBottom(page, {
  //   size: 500,
  //   delay: 1000
  // })
  // await wait(3000)
  const html = await page.content();
  fs.writeFileSync('logs/test', html)

  const data = await page.evaluate(() => {
    const results = []; 
    const items = document.querySelectorAll("#rso > div"); 
    items.forEach(item => { 
      const title = item.querySelector("h3")?.innerText
      const link = item.querySelector("a")?.href
      const description = item.querySelector("[data-content-feature='2'] > div")?.innerText
      const web = item.querySelector("cite")?.innerText.split(' ')[0]
      let img = item.querySelector("img")?.src

      // Si la imagen tiene esa cadena, es que no ha cargado aun
      if(img == "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==") {
        const imgId = item.querySelector("img")?.id
        // Aqui estoy encontrando en un script mediante el id de la imagen, la url de la imagen que carga mas tarde
        const imgUrl = document.documentElement.outerHTML.split(`${imgId}\"\:\"`)[1].split('\"')[0]  
        img = JSON.parse(`"${imgUrl}"`)
      }
      
      if(title) {
        results.push({title, link, img, description, web}); 
      }
    });
    return results; 
  });

  await browser.close()
  console.log(data)
  res.status(200).json({ data })
}
