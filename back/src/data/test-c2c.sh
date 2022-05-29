from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c1 = net.addController( 'c1', ip='192.161.0.1', port=3001)
 c2 = net.addController( 'c2', ip='192.161.0.2', port=3003)


 info("*** Creating links")
 net.addLink(c1, c2 , delay= 0, loss= 0) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 c2.start()


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
