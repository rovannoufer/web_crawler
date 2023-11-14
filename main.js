const { crawl } = require('./crawling')

async function main(){

    if(process.argv.length < 3){
        console.log ("No Website")
        process.exit(1)
    }


    if(process.argv.length > 3){
        console.log ("Many command line Arguments")
        process.exit(1)
    }
    

    const base = process.argv[2]
    console.log(`Start Crawling of ${base}`)
    const pages = await crawl(base, base, {})
    
    for(const page of Object.entries(pages)){
        console.log(page)
    }
}


main()