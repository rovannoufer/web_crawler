const { normalizeURL } = require('./crawling')
const { test, expect } = require('@jest/globals')


test('normalizeURL strip protocol', () =>{
    const input = 'https://blog.boot.dev/path'
    const actual_output = normalizeURL(input)
    const expected_output = 'blog.boot.dev/path'
    expect(actual_output).toEqual(expected_output)
})


test('normalizeURL strip protocol slash', () =>{
    const input = 'https://blog.boot.dev/path/'
    const actual_output = normalizeURL(input)
    const expected_output = 'blog.boot.dev/path'
    expect(actual_output).toEqual(expected_output)
})



test('normalizeURL strip capital', () =>{
    const input = 'https://BLOG.Boot.dev/path'
    const actual_output = normalizeURL(input)
    const expected_output = 'blog.boot.dev/path'
    expect(actual_output).toEqual(expected_output)
})