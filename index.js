const prompt = require('prompt-sync')();
const fs = require('fs-extra');
const { stringify } = require('querystring');

let balancePath = "./data/balance.json";
let balanceDir = balancePath.slice(0, balancePath.lastIndexOf('/')+1)
let balanceFile = balancePath.slice(balancePath.lastIndexOf('/')+1);
let answer = "5";

do {

    log("\n\n\n\n=========================")
    log("Your Bank Account\n")
    log("Choose action : \n1. Add Ballance\n2. Withdraw Balance\n3. Transfer Balance\n4. Chech Balance\n5. Exit\n");

    answer = prompt("Answer : ")
    answer = Number(answer);

    switch (answer) {
        case 1:
            addB();
            break;

        case 2:
            takeB();
            break;

        case 3:
            tfB();
            break;

        case 4:
            seeB();
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


async function addB(){

    let value = prompt("Enter Balance : ");
    value = Number(value);

    if(!fs.existsSync(balancePath)) {
        fs.mkdirSync(balanceDir, { recursive : true });

        const dataJson = {
            balance : [value]
        };

        fs.writeFileSync(balancePath, JSON.stringify(dataJson, null, 2));

        if(fs.existsSync(balancePath)){
            console.log("Succes Adding Balance!");
        } 
    } 

    else{
        const dataJson = fs.readFileSync(balancePath, 'utf8');
        const parsedData = JSON.parse(dataJson);

        if(parsedData.balance.length > 1){
            let result = parsedData.balance.reduce((a,b) => {
                return a + b;
            });
            parsedData.balance.push(result);
        }

            parsedData.balance.push(value);
        
        if(parsedData.balance.lenght > 1){
            parsedData.balance.shift();
        };

        fs.writeFileSync(balancePath, JSON.stringify(parsedData, null, 2), 'utf8');
    };

    
}

function log(value) {
    console.log(value);
};