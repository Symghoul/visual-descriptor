from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteComntroller 

def topology(): 
 "Create a network."
 net = Mininet_wifi( controller=Controller )

 info("*** Creating nodes")
