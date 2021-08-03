let fs = require("fs");
let path = require("path");
let inputArr = process.argv.slice(2);
let fileArr = [];
let optionArr = [];
for(let i in inputArr)
{
    let firstchar = inputArr[i].charAt(0);
    if(firstchar == "-")
    {
        optionArr.push(inputArr[i]);
    }
    else
    fileArr.push(inputArr[i]);
}
let file = "";
for(let i in fileArr)
{
    let filepath = fileArr[i];
    let filecheck = fs.existsSync(filepath);
    if(filecheck == true)
    {
    let filename = path.basename(filepath);
    file = file + fs.readFileSync(filename) + "\r\n";
    }
    else
    console.log("file is not found");
}
//console.log(file);
let contentarr = file.split("\r\n");
//console.log(contentarr);
//console.log(optionArr);
let scomm = optionArr.includes("-s");
let temp = [];
if(scomm)
{
    for(let i in contentarr)
    {
        if(contentarr[i]=="" && contentarr[i-1]=="")
        {
            contentarr[i] = null;
        }
        else if(contentarr[i] == "" && contentarr[i-1]==null)
        {
            contentarr[i] = null;
        }
    }
    for(let i in contentarr)
    {
        if(contentarr[i]!==null)
        {
            temp.push(contentarr[i]);
        }
    }
    contentarr = temp;
}
//console.log(contentarr.join("\n"));

let ncomm = optionArr.includes("-n");
let bcomm = optionArr.includes("-b");
let finalopp = "";
if(ncomm || bcomm)
{
    if(optionArr.indexOf("-n") < optionArr.indexOf("-b"))
    {
        finalopp = "-n";
    }
    else if(optionArr.indexOf("-b") < optionArr.indexOf("-n"))
    {
        finalopp = "-b";
    }
    else if(ncomm)
    {
        finalopp = "-n";
    }
    else if(bcomm)
    {
        finalopp = "-b";
    }
}
if(finalopp == "-n")
{
 //console.log("-n comm");
    let count = 1;
    for(let i in contentarr)
    {
            contentarr[i] = count + ". " + contentarr[i];
            count++;
        
    }
}

if(finalopp == "-b")
{
    
        let ct = 1;
        for(let i in contentarr)
        {
        if(contentarr[i] !="")
        {
            contentarr[i] = ct + ". " + contentarr[i];
            ct++;
        }
    }
}
console.log(contentarr.join("\n"));