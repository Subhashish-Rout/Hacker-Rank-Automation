let puppeteer = require('puppeteer')
console.log("Before")
let browserWillBeLaunchedPromise = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    rgs : ['--start-fullscreen','--start-maximized']
})
browserWillBeLaunchedPromise.then(function(browserInstance){
    let newTabPromise = browserInstance.newPage()
    return newTabPromise
}).then(function(newTabPromise){
    console.log("New Tab Opened")
    let pageWillBeOpened = newTabPromise.goto('https://pepcoding.com/resources/')
    return pageWillBeOpened
}).then(function(pageWillBeOpened){
    console.log("Website Opened")
})
console.log("After")