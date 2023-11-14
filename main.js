const { crawl } = require('./crawling')

function main(){

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
    crawl(base)
}


main()