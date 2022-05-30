const services = {};

const controller = require("../model/controller");
const switche = require("../model/switch");
const host = require("../model/hosts");

services.dhcp = async (req, res) => {

    //No es probable pero aún falta el caso de, qué pasa si se acaban las Ips disponibles?
    let exit = false;
    let mask = req.body.mask;
    let dhcp = req.body.ip;
    let repeated = false;
    const objCtrls = await controller.find().exec();
    const objhosts = await host.find().exec();
    while(!exit){
      for(let i=0; i<objCtrls.length; i++){
        if(dhcp !== objCtrls[i].ip){
          exit=true;
        }else{
            repeated = true;
        }
      }
      for(let i=0; i<objhosts.length; i++){
        if(dhcp !== objhosts[i].ip){
        exit=true;
        }else{
            repeated = true;
        }
      }
      if(repeated){
        dhcp = newIp(dhcp,mask);}
    }
    res.send({"dhcp":`${dhcp}`});
  }
services.macAllowed = async(req, res) => {
      
      //No es probable (practicamente imposible) pero aún falta el caso de, qué pasa si se acaban las mac disponibles?
      let exit = false;
      let mac = req.body.mac;
      let repeated = false;
      const objswit = await switche.find().exec();
      const objhosts = await host.find().exec();
      while(!exit){
      for(let i=0; i<objswit.length; i++){
        if(mac !== objswit[i].mac){
          exit=true;
        }else{
            repeated = true;
        }
    }
      for(let i=0; i<objhosts.length; i++){
        if(mac !== objhosts[i].mac){
        exit=true;
    }else{
        repeated = true;
        }
    }
    if(repeated){
        mac = newMac(mac);}
    }
    res.send({"mac":`${mac}`});
}

function newIp(ipv4, mask1){
    let ip = ipv4;
    let mask = mask1;
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

function newMac(mac1){
    let mac = mac1;
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