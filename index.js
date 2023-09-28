const prompt = require('prompt-sync')();
const fs = require('fs-extra');
const { stringify } = require('querystring');

let filePath = "./data/balance.json";
let fileDir = filePath.slice(0, filePath.lastIndexOf('/')+1)
let fileName = filePath.slice(filePath.lastIndexOf('/')+1);
let answer = "5";

do {
    log("\n\n\n\n=========================")
    log("Your Bank Account\n")
    log("Choose action : \n1. Add Ballance\n2. Withdraw Balance\n3. Transfer Balance\n4. Check Balance\n5. Exit\n");

    answer = prompt("Answer : ")
    answer = Number(answer);

    switch (answer) {
        case 1:
            addB(); // work perfectly fine
            break;

        case 2:
            takeB(); // work fine.. maybe?
            break;

        case 3:
            tfB(); // unfinished
            break;

        case 4:
            seeB(); // work fine
            break;
    
        case NaN:
            return;
            break;

        default:
            return;
            break;
    }
}

while (answer != "5");


function addB(){

    let value = prompt("Value : ");
    value = Number(value);

    if(fs.existsSync(filePath)){

        try{
            const dataJson = fs.readFileSync(filePath, 'utf-8');
            const parsedJson = JSON.parse(dataJson);
            const bal = parsedJson.balance;

            bal.push(value);

            if(bal.lenght > 2||"2"){
                result = bal.reduce((a,b) => a+b );
                bal.push(result);
                bal.shift();
                bal.shift();
            }

            fs.writeFileSync(filePath, JSON.stringify(parsedJson,null,2), 'utf-8');

            console.log(`Succesfully added ${value} into ur balance\nTotal balance now: $${parsedJson.balance}`);
        }

        catch(e){
            fs.mkdir(fileDir,{recursive:true});

            const parsedJson = {
                balance : [value]
            };

            fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, 2), 'utf-8');

            console.log(`Succesfully added ${value} into ur balance\nTotal balance now: $${parsedJson.balance}`);
        }
    }

}


function seeB(){

    if(fs.existsSync(filePath)){

        try{
            const dataJson = fs.readFileSync(filePath);
            const parsedJson = JSON.parse(dataJson);

            console.log(`Ur balance is : $${parsedJson.balance}`);
        }

        catch{
            fs.mkdirSync(fileDir, {recursive:true});
            let value = value||0;

            const parsedJson = {
                balance : [value]
            };

            fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, 2), 'utf-8');

            console.log(`Succesfully added : $${parsedJson.balance}`);
        }
    }

    else{
        fs.mkdirSync(filePath, {recursive:true});
        let value = 0;

        const parsedJson = {
            balance : [value]
        };

        fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, 2), 'utf-8');

        console.log(`Ur Balance rn is : ${value}`);
    }

}


function takeB(){

    let value = prompt("Put ur withdrawal amount : ")
    value = Number(value);

    if(fs.existsSync(filePath)&&value != NaN||undefined){

        try{
            const dataJson = fs.readFileSync(filePath);
            const parsedJson = JSON.parse(dataJson);

            parsedJson.balance -= [value];

            fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, 2), 'utf-8');
            console.log(`U take $${value} from ur balance`);
            console.log(`Ur total balance is : ${parsedJson.balance}`);
        }

        catch{
            fs.mkdirSync(filePath, {recursive:true});
            let value = 0;
    
            const parsedJson = {
                balance : [value]
            };
    
            fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, 2), 'utf-8');
    
            console.log(`U can't withdraw, Ur Balance rn is : ${value}`);
        }
    }

    else {
        fs.mkdirSync(filePath, {recursive:true});
        let value = 0;

        const parsedJson = {
            balance : [value]
        };

        fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, 2), 'utf-8');

        console.log(`U can't withdraw, Ur Balance rn is : ${value}`);
    }


}

function log(value) {
    console.log(value);
};