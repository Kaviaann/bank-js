const fs = require('fs-extra');
const prompt = require('prompt-sync')();

const filePath = "./balance.json";

if(fs.existsSync(filePath)){
    let value = prompt("Value : ");
    value = Number(value);

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
            console.log(bal);
        }

        fs.writeFileSync(filePath, JSON.stringify(parsedJson,null,2), 'utf-8');

        console.log(`Succesfully added ${value} into ur balance\nTotal balance now: $${parsedJson.balance}`);
    }

    catch(e){
        const parsedJson = {
            balance : [value]
        };

        fs.writeFileSync(filePath, JSON.stringify(parsedJson, null, 2), 'utf-8');

        console.log(`Succesfully added ${value} into ur balance\nTotal balance now: $${parsedJson.balance}`);
    }
}