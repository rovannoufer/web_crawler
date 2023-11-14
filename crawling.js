const { contentType } = require('express/lib/response')
const { JSDOM } = require('jsdom')


async function crawl(baseurl, current_url, pages){

    const baseurl_obj = new URL(baseurl)
    const current_url_obj = new URL(current_url)
    if(baseurl_obj.hostname !== current_url_obj.hostname){
        return pages
    }

    const normalized_current_url = normalizeURL(current_url)
    if(pages[normalized_current_url] > 0){
        pages[normalized_current_url]++
        return pages
    }

    pages[normalized_current_url] = 1


    console.log(`Actively crawl ${current_url}`)
    try{
        const resp = await fetch(current_url)
        if(resp.status > 399){
            console.log(`Error in fetching with status code : ${resp.status} on page : ${current_url}`)
            return pages
        }

        const contenttype = resp.headers.get("content-type")
        if(!contenttype.includes("text/html")){
            console.log(`Non HTML response content type: ${contenttype} on page : ${current_url}`)
            return pages
        }
       const html_body = await resp.text()

       const next_urls = geturlfromhtml(html_body,baseurl) 

       for(const next_url of next_urls){
         pages = await crawl(baseurl, next_url, pages)
       }

    }catch(err){
        console.log(`Error in fetching : ${err.message}, on page: ${current_url}`)
    }
    return pages
}

function geturlfromhtml(html_body, base_url){
    const urls = []
    const dom = new JSDOM(html_body)
    const link_elements = dom.window.document.querySelectorAll('a')
    for(const link_element of link_elements){
       //relative
        if(link_element.href.slice(0,1) === '/'){
           try{
            const urlobj = new URL(`${base_url}${link_element.href}`)
            urls.push(urlobj.href)
           }
           catch(err){
            console.log(`Error : ${err.message}`)
           }
        }

        //absolute
        else{
           try{
            const urlobj = new URL(link_element.href)
            urls.push(urlobj.href)
           }catch(err){
            console.log(`Error : ${err.message}`)
           }
        }
        
    }

    return urls
}



function normalizeURL(url_string){
    const url_object = new URL(url_string)
    host_path =  `${url_object.hostname}${url_object.pathname}`
    if(host_path.length > 0 && host_path.slice(-1) === '/'){
        return host_path.slice(0,-1)
    }

    return host_path

}


function print_report(pages){
    console.log('==========')
    console.log('START - REPORT')
    console.log('==========')
    const sort_pages1 = sort_pages(pages)
    for (const sorted_page of sort_pages1){
      const url = sorted_page[0]
      const count = sorted_page[1]
      console.log(`Found ${count} internal links to ${url}`)
    }

    console.log('==========')
    console.log('END - REPORT')
    console.log('==========')
  }
  
  // sortPages sorts a dictionary of pages
  // into a list of tuples (url, count)
  // with the highest counts first in the list
  function sort_pages(pages){
    // 2D array where the
    // inner array: [ url, count ]
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
      return b[1] - a[1]
    })
    return pagesArr
  }
  
 

module.exports = {
    normalizeURL,
    geturlfromhtml,
    crawl,
    sort_pages,
    print_report
}