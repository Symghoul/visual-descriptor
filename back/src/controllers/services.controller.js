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

}

function temp(split, mask){

}

module.exports = services