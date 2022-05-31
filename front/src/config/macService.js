const mac = (mac1) => {
  let mac = mac1;
  let split = mac.split(":");
  let newMac1 = "";
  let newMac2 = "";
  let exit = false;
  //
  for (let i = split.length - 1; i >= 0 && !exit; i--) {
    let six = split[i];
    console.log();
    if (six === "FF") {
      newMac1 = "0";
      newMac2 = "0";
    } else if (six.substring(1) === "F") {
      newMac1 = convert2Hex(six.substring(0, 1));
      newMac2 = "0";
      exit = true;
    } else {
      newMac1 = six.substring(0, 1);
      newMac2 = convert2Hex(six.substring(1, 2));
      exit = true;
    }
    split[i] = "" + newMac1 + newMac2;
  }
  mac = split.toString();
  return mac.replaceAll(",", ":", "");
};

function convert2Hex(n) {
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

export default mac;
