from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=undefined, mac='10::11')
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=undefined, mac='10::12')
 s2 = net.addSwitch( 's2', procotols='OVS', listenPort=undefined, mac='10::13')


 info("*** Creating links")

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 s1.start( [c1] )
 s1.start( [NotLinkedYet] )
 s2.start( [NotLinkedYet] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
