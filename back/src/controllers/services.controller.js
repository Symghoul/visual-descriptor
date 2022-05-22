const services = {};

services.mask = (req,res) => {

    function mask(mac){

    let bits = (mac)
    let split = bits.split(".")
    let sum = 1;
    let exit = false;
    for (let i = 0; i < split.length && !exit; i++) {
    
        if(Number(split[i])===0){
            exit = true
        }else{
        sum = sum*Number(split[i]);
        }
    }
    
    bits = Math.log(sum)/Math.log(2)
    bits = Math.round(bits)
    return bits;
    }
}

services.newIp = (req, res) => {
    let ip = req.data.ip
    let split = ip.split(".")
    let sum = 1;
    let exit = false;

    
}

services.newMac = (req,res) => {

}

module.exports = services