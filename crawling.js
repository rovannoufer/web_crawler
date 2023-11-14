const { JSDOM } = require('jsdom')




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


module.exports = {
    normalizeURL,
    geturlfromhtml
}