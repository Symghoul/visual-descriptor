from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c8 = net.addController( 'c8', ip='192.161.0.10', port=30016)
 s9 = net.addSwitch( 's9', procotols='OVS', listenPort=undefined, mac='00:00:00:00:00:011')


 info("*** Creating links")
 net.addLink(c8, s9 , delay= 0, loss= 0) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c8.start()
 s9.start( [c1] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
