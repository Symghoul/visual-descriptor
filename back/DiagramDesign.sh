from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")


 info("*** Creating links")

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
