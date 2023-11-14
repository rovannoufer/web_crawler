function normalizeURL(url_string){
    const url_object = new URL(url_string)
    host_path =  `${url_object.hostname}${url_object.pathname}`
    if(host_path.length > 0 && host_path.slice(-1) === '/'){
        return host_path.slice(0,-1)
    }

    return host_path

}


module.exports = {
    normalizeURL
}