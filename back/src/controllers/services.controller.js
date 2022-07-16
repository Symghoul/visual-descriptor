const services = {};

const controller = require("../model/controller");
const switche = require("../model/switch");
const host = require("../model/hosts");


/**
 * Checking if the IP address is already in use. If it is, it generates a new one as a DCHP service.
 * @param {*} req Query param
 * @param {*} res Query param
 */
services.dhcp = async (req, res) => {

    //Unlikely but still missing the case of, what happens if the available ips run out?
    let exit = false;
    let mask = req.body.mask;
    let ipDevice = req.body.ip;
    let repeated = false;

    const ctrlsCollection = await controller.find().exec();       
    const hostsCollection = await host.find().exec();

    while(!exit){
      for(let i=0; i<ctrlsCollection.length; i++){      //Search if a controller has that IP
        if(ipDevice !== ctrlsCollection[i].ip){
          exit=true;
        }else{
            repeated = true;
        }
      }
      for(let i=0; i<hostsCollection.length; i++){      //Search if a hosts has that IP
        if(ipDevice !== hostsCollection[i].ip){
        exit=true;
        }else{
            repeated = true;
        }
      }
      if(repeated){
        ipDevice = newIp(ipDevice,mask);}
    }
    res.send({"dhcp":`${ipDevice}`});
  }

/**
 * Checking if the mac address is already in use. If it is, it generates a new one.
 * @param {*} req Query param
 * @param {*} res Query param
 */
services.macAllowed = async(req, res) => {
      
      //Unlikely but still missing the case of, what happens if the available macs run out?
      let exit = false;
      let mac = req.body.mac;
      let repeated = false;
      const switchCollection = await switche.find().exec();
      const hostsCollection = await host.find().exec();
      while(!exit){
      for(let i=0; i<switchCollection.length; i++){         //Search if a switch has that mac
        if(mac !== switchCollection[i].mac){
          exit=true;
        }else{
            repeated = true;
        }
    }
      for(let i=0; i<hostsCollection.length; i++){          //Search if a hosts has that mac
        if(mac !== hostsCollection[i].mac){
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


/**
 * Give the next Ip address like a +1 at the ip, but keeping in mind the mask of the net
 * @param ipv4 - 192.168.1.1
 * @param mask1 - 24
 * @returns
 */
function newIp(ipv4, mask1){
    let ip = ipv4;
    let mask = mask1;
    let split = ip.split(".")
    let newIp1 = Number(split[0]);      //Every IP's bytes 
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
    return ip;
}

/**
 * This function gives a MAC that is not being used
 * @param {} takenMAC MAC address that is already in use
 * @returns A MAC Address that is not being used
 */
 function newMac(takenMAC){
    let tempTakenMAC = takenMAC;
    let tempTakenMACarr = tempTakenMAC.split(":");
  
    //this two variables are the digits of each pair in the MAC address
    // "a" is the first digit from left to right, "b" is the second digit.
    //  5F
    //  ab
    let a = "";
    let b = "";
  
    let exit = false; //control
  
    // The for would stop once ...
    for (let i = tempTakenMACarr.length - 1; i >= 0 && !exit; i--) {
      let six = tempTakenMACarr[i];
      console.log();
      if (six === "FF") {
        a = "0";
        b = "0";
      } else if (six.substring(1) === "F") {
        a = nextHex(six.substring(0, 1));
        b = "0";
        exit = true;
      } else {
        a = six.substring(0, 1);
        b = nextHex(six.substring(1, 2));
        exit = true;
      }
      tempTakenMACarr[i] = "" + a + b;
    }
    tempTakenMAC = tempTakenMACarr.toString();
    return tempTakenMAC.replaceAll(",", ":", "");
  };
  
  /**
   * +1 to an n keeping in mind the hexadecimal format
   * @param {*} n A number (or letter)
   * @returns the n+1
   */
  function nextHex(n) {
    if (n === "9") n = "A";
    else if (n === "A") n = "B";
    else if (n === "B") n = "C";
    else if (n === "C") n = "D";
    else if (n === "D") n = "E";
    else if (n === "E") n = "F";
    else if (n === "F") n = "0";
    else {
      let temp = Number(n);
      temp += 1;
      n = "" + temp;
    }
    return n;
  }
  

module.exports = services