const { normalizeURL, geturlfromhtml, sort_pages } = require('./crawling.js')
const { test, expect } = require('@jest/globals')




test('normalizeURL strip protocol', () =>{
    const input = 'https://www.google.com'
    const actual_output = normalizeURL(input)
    const expected_output = 'www.google.com'
    expect(actual_output).toEqual(expected_output)
})


test('normalizeURL strip protocol slash', () =>{
    const input = 'https://www.google.com/'
    const actual_output = normalizeURL(input)
    const expected_output = 'www.google.com'
    expect(actual_output).toEqual(expected_output)
})



test('normalizeURL strip capital', () =>{
    const input = 'https://www.GOOGLE.com'
    const actual_output = normalizeURL(input)
    const expected_output = 'www.google.com'
    expect(actual_output).toEqual(expected_output)
})



test('geturlfromhtml', () =>{
    const input = `
    <html>
       <body>
       <a href="https://www.google.com/path/">Google</a>
       </body>
    </html> 
    `

    const input_base_url = "https://www.google.com/path/"
    const actual_output = geturlfromhtml(input, input_base_url)
    const expected_output = ["https://www.google.com/path/"]
    expect(actual_output).toEqual(expected_output)
})


test('geturlfromhtml relativeurls', () =>{
    const input = `
    <html>
       <body>
       <a href="/path/">Google</a>
       </body>
    </html> 
    `

    const input_base_url = "https://www.google.com"
    const actual_output = geturlfromhtml(input, input_base_url)
    const expected_output = ["https://www.google.com/path/"]
    expect(actual_output).toEqual(expected_output)
})




test('geturlfromhtml multipleurls', () =>{
    const input = `
    <html>
       <body>
       <a href="https://www.google.com/path1/">Google path1</a>
       <a href="/path2/">Google path2</a>
       <a href="/path3/">Google path3</a>
       </body>
    </html> 
    `

    const input_base_url = "https://www.google.com"
    const actual_output = geturlfromhtml(input, input_base_url)
    const expected_output = ["https://www.google.com/path1/", "https://www.google.com/path2/", "https://www.google.com/path3/"]
    expect(actual_output).toEqual(expected_output)
})




test('geturlfromhtml invalidurls', () =>{
    const input = `
    <html>
       <body>
       <a href="invalid url">--In--valid--</a>
       </body>
    </html> 
    `

    const input_base_url = "https://www.google.com"
    const actual_output = geturlfromhtml(input, input_base_url)
    const expected_output = []
    expect(actual_output).toEqual(expected_output)
})




test('sortpages', () => {
    const input = {
      "https://www.google.com/path1": 5,
      "https://www.google.com": 1,
      "https://www.google.com/path2": 3,
      "https://www.google.com/path4": 10,
      "https://www.google.com/path5": 7 
    }
    const actual = sort_pages(input)
    const expected = [
      [ "https://www.google.com/path4", 10 ],
      [ "https://www.google.com/path5", 7 ],
      [ "https://www.google.com/path1", 5 ],
      [ "https://www.google.com/path2", 3 ],
      [ "https://www.google.com", 1 ]
    ]
    expect(actual).toEqual(expected)
  })
  