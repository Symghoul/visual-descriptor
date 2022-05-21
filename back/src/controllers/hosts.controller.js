const hostsCtrl = {};

const host = require("../model/hosts");

hostsCtrl.gethosts = async (req, res) => {
  const hosts = await host.find();
  res.json(hosts);
};

hostsCtrl.createhosts = async (req, res) => {
  const { id, name, symbol, ip, mask, mac, active, type, x, y, color } =
    req.body;
  const newHost = new host({
    indicator: id,
    name,
    symbol,
    ip,
    mask,
    mac,
    active,
    type,
    x,
    y,
    color,
  });
  try{
  await newHost.save();
  res.send({ message: "host guardado" });
  }catch(error){
    if(error.keyValue.ip)
      res.status(401).send( error);
    else if(error.keyValue.mac)
      res.status(402).send(error);
  }
};

hostsCtrl.gethostById = async (req, res) => {
  const h = await host.find({ indicator: req.params.indicator });

  res.send(h);
};

hostsCtrl.updatehost = async (req, res) => {
  const { name, symbol, ip, mask, mac, active, type, x, y, color } = req.body;
  const action = await host.updateOne(
    { indicator: req.params.indicator },
    {
      name,
      symbol,
      ip,
      mask,
      mac,
      active,
      type,
      x,
      y,
      color,
    }
  );
  if (action.matchedCount === 1) res.send({ message: "host modificado" });
  else {
    res.send({ message: "No se modificó el host" });
  }
};

hostsCtrl.deletehost = async (req, res) => {
  const action = await host.deleteOne({ indicator: req.params.indicator });
  if (action.deletedCount === 1) res.send({ message: "host eliminado" });
  else {
    res.send({ message: "host no eliminado" });
  }
};

module.exports = hostsCtrl;
