//Load a book from disk
function loadBook(filename, displayName) {
    let currentBook = ""
    let url = "books/" + filename;

    //reset our UI
    document.getElementById("fileName").innerHTML = displayName;
    document.getElementById("searchstat").innerHTML = "";
    document.getElementById("keyword").value = "";

    //create a server request to load our book
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true)
    xhr.send()
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200){
            currentBook = xhr.responseText
            console.log(typeof(currentBook))
            console.log(currentBook[0]);
        //     var s = "dhruv"
        //  s = s.substring(0, 2) + "<br>" + s.substring(2, s.length);
        //     console.log(s);
            // for(var i=0; i<currentBook.length; i++) {
            //     if(currentBook[i] === "."){
            //    currentBook =  currentBook.substring(0, i) + "<br>" + currentBook.substring(i, currentBook.length);
            //    console.log(currentBook);
            //     } 
            // }
            // getDocsStats(currentBook) 
            //remove line breaks and carriage returns and replace with a <br> using REGULAR EXPRESSION
            // currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, "<br>")
            document.getElementById('fileContent').innerHTML = currentBook
            var element = document.getElementById('fileContent')
            element.scrollTop = 0
        }
    }
}

//get the stats for the book
function getDocsStats(fileContent){
    var docLength = document.getElementById("docLength");
    var wordCount = document.getElementById("wordCount");
    var charCount = document.getElementById("charCount");

    let text = fileContent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g)
    let wordDictionary = {}
    //count every word in the word array
    for(let word in wordArray){
        let wordValue = wordArray[word]
        if(wordDictionary[wordValue] > 0){
            wordDictionary[wordValue] += 1;
        } else {
            wordDictionary[wordValue] = 1
        }
    }
    //sort the array
    let wordList = sortProperties(wordDictionary)

    //Return the top 5 words
    var top5Words = wordList.slice(0, 6)
    //Return the least 5 words
    var least5Words = wordList.slice(-6, wordList.length)
    console.log('hhhh')

    //write the values to the page
    UlTemplate(top5Words, document.getElementById("mostUsed"))
    UlTemplate(least5Words, document.getElementById("leastUsed"))
}
function UlTemplate(items, element) {
    let rowTemplate = document.getElementById("template-ul-items")
    let templateHTML = rowTemplate.innerHTML
    let resultsHTML = ""
    for( i=0; i<items.length-1; i++) {
        resultsHTML += templateHTML.replace('{{val}}', items[i][0]+ " : " + items[i][1] + "time(s)")
    }
    element.innerHTML = resultsHTML
}

function sortProperties(obj) {
    //first convert the object to array
    let rtnArray = Object.defineProperties(obj)

    //sort the array 
    rtnArray.sort(function (first, second) {
        return second[1] - first[1]
    })
    return rtnArray
}


// var theReal = currentBook.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g)
// console.log('regex is real', theReal);