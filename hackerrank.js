const loginLink = "https://www.hackerrank.com/auth/login";
const codeFile = require('./code')
let email = "segnarulmi@vusra.com";
let password = "123456";

let puppeteer = require("puppeteer");

console.log("Before");

let page;

// Puppeteer works on promises

let browserWillbeLauncedPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});
// we used puppeteer launch method to return an instance of broswer  

browserWillbeLauncedPromise
  .then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
  })
  .then(function (newTab) {
    console.log("New Tab opened");
    page = newTab;
    let pageWillbeOpenedPromise = newTab.goto(loginLink);
    return pageWillbeOpenedPromise;
  })
  .then(function () {
    let typedEmailPromise = page.type("input[id='input-1']", email, {
      delay: 100,
    });
    return typedEmailPromise;
  })
  .then(function () {
    let typePasswordPromise = page.type("input[id='input-2']", password, {
      delay: 100,
    });
    return typePasswordPromise;
  })
  .then(function () {
    let loginPromise = page.click('button[data-analytics="LoginPassword"]', {
      delay: 100,
    });
    return loginPromise;
  }).then(function(){
      let algoWillBeclickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]' , page)
      return algoWillBeclickedPromise
  }).then(function(){
      let getToWarmUpPromise = waitAndClick('input[value="warmup"]',page)
      return getToWarmUpPromise
  }).then(function(){
    let ChallengesArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled' , {delay : 100})
    return ChallengesArrPromise
  }).then(function (questionsArr) {
    console.log("No of Questions" + questionsArr.length);
    let questionWillBeSolvedPromise = questionSolver(page , questionsArr[0] , codeFile.answers[0] )
});



console.log("After");
function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitModalPromise = cPage.waitForSelector(selector);
        waitModalPromise.then(function(){
            let clickModalPromise = cPage.click(selector,{delay:100})
            return clickModalPromise
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
}

function questionSolver(page , question , answer){
    return new Promise(function(resolve , reject){
      let questionWillBeClickedPromise =  question.click()
      questionWillBeClickedPromise.then(function(){
        let waitForEditorPromise = waitAndClick('.monaco-editor.no-user-select.vs',page)
        return waitForEditorPromise
      }).then(function(){
        return waitAndClick('.checkbox-input',page);
      }).then(function(){
        return page.waitForSelector('.text-area.custominput')
      }).then(function(){
        return page.type('.text-area.custominput',answer,{delay:10})
      }).then(function(){
        let ctrlIsPressedPromise = page.keyboard.down('Control');
        return ctrlIsPressedPromise
      }).then(function(){
        return page.keyboard.press('A',{delay:20});
      }).then(function(){
        let XisPressedPromise = page.keyboard.press('X',{delay:20})
        return XisPressedPromise
      }).then(function(){
        let ctrlIsReleasedPromise = page.keyboard.up('Control')
        return ctrlIsReleasedPromise
      }).then(function(){
        console.log('CtrlisReleased')
      }).then(function(){
        let waitForEditorPromise = waitAndClick('.monaco-editor.no-user-select.vs',page)
        return waitForEditorPromise
      }).then(function(){
        let ctrlIsPressedPromise = page.keyboard.down('Control');
        return ctrlIsPressedPromise
      }).then(function(){
        return page.keyboard.press('A',{delay:20});
      }).then(function(){
        return page.keyboard.press('V',{delay:10})
      }).then(function(){
        let ctrlIsReleasedPromise = page.keyboard.up('Control')
        return ctrlIsReleasedPromise
      }).then(function(){
        return page.click('.hr-monaco__run-code',{delay:10})
      }).then(function(){
        resolve();
      }).catch(function(err){
        console.log(err)
      })
    })   
}