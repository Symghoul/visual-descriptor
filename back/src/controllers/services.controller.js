const services = {};

services.newIp = (req, res) => {
    let ip = req.body.ip
    let mask = req.body.mask
    let split = ip.split(".")
    let newIp1 = Number(split[0]);
    let newIp2 = Number(split[1]);
    let newIp3 = Number(split[2]);
    let newIp4 = Number(split[3]);

    if(mask<=7){
        if(newIp1===254 && newIp2===254 && newIp3===254 && newIp4===254){
            newIp1=1;
        }else if(newIp2===254 && newIp3===254 && newIp4===254){
            newIp2 = 1;
        }else if(newIp3===254 && newIp4===254){
            newIp2+=1; 
        }else if(newIp4===254){
            newIp3+=1;
        }
    }
    else if(mask<=15){
        if(newIp2===254 && newIp3===254 && newIp4===254){
            newIp2 = 1;
        }else if(newIp3===254 && newIp4===254){
            newIp2+=1; 
        }else if(newIp4===254){
            newIp3+=1;
        }
    }
    else if(mask<=23){
        if(newIp3===254 && newIp4===254){
            newIp3=1; 
        }else if(newIp4===254){
            newIp3+=1;
        }
    }
    if(newIp4===254){
        newIp4 = 1;
    }
    else {newIp4 = newIp4+1;}

    ip= newIp1+"."+newIp2+"."+newIp3+"."+newIp4;
    res.send({"ip":`${ip}`});
}

services.newMac = (req,res) => {
    let mac = req.body.mac;
    let split = mac.split(":");
    let newMac1 = "";
    let newMac2 = "";
    let temp = "";
    let exit = false;
    //
    for(let i=(split.length-1) ;i>=0 && !exit;i--){
        let six = split[i];
        console.log()
        if(six=="FF"){
            newMac1="0";
            newMac2="0";
        }else if(six.substring(1)=="F"){
            newMac1 = convert2Hex(six.substring(0,1));
            newMac2 = "0"
            exit = true;
        }else{
            newMac1 = six.substring(0,1);
            newMac2 = convert2Hex(six.substring(1,2));
            exit = true;
        }
        split[i] = ""+newMac1+newMac2;
        }
    mac = split.toString();
    res.send({"mac":`${mac.replaceAll(",",":", "")}`})
}

function convert2Hex(n){

    
    if(n=="9")
        n="A";
    else if(n=="A")
        n="B";
    else if(n==="B")
        n="C";
    else if(n=="C")
        n="D";
    else if(n=="D")
        n="E";
    else if(n=="E")
        n="F";
    else if(n=="F")
        n="0";
    else{
        
        temp = Number(n);
        temp +=1;
        n= ""+temp;
    }
    return n;
}

module.exports = services