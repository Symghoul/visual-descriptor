from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 s2 = net.addSwitch( 's2', procotols='OVS', listenPort=undefined, mac='00:00:00:00:00:02')
 s3 = net.addSwitch( 's3', procotols='OVS', listenPort=undefined, mac='00:00:00:00:00:03')


 info("*** Creating links")
 net.addLink(s2, s3 , delay= 0, loss= 0) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 s2.start( [notLinkedYet] )
 s3.start( [notLinkedYet] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
