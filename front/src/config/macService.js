/**
 * This method adds a digit to a hex value.
 * if n=F then that digit would be reseted to 0
 * @param {*} n a hex value
 * @returns n + 1
 */
const nextHex = (n) => {
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
};

/**
 * This function gives a MAC that is not being used
 * @param {} takenMAC MAC address that is already in use
 * @returns A MAC Address that is not being used
 */
const mac = (takenMAC) => {
  let tempTakenMAC = takenMAC;
  let tempTakenMACarr = tempTakenMAC.split(":");

  // This two variables are the digits of each pair in the MAC address
  // "a" is the first digit from left to right, "b" is the second digit.
  // example:
  //          5F
  //          ab
  let a = "";
  let b = "";

  let exit = false; // exit=true when the adding is completed

  // The for would stop once the adding process is finished
  for (let i = tempTakenMACarr.length - 1; i >= 0 && !exit; i--) {
    let hexDuo = tempTakenMACarr[i];
    console.log();
    if (hexDuo === "FF") {
      a = "0";
      b = "0";
    } else if (hexDuo.charAt(1) === "F") {
      // checks if b is F to restart value to 0
      a = nextHex(hexDuo.charAt(0));
      b = "0";
      exit = true;
    } else {
      // a does not have to change, add in b
      a = hexDuo.charAt(0);
      b = nextHex.charAt(1);
      exit = true;
    }
    tempTakenMACarr[i] = "" + a + b;
  }
  tempTakenMAC = tempTakenMACarr.toString();
  return tempTakenMAC.replaceAll(",", ":", ""); // format the string
};

export default mac;
