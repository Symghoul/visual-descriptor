from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c2 = net.RemoteController( 'c2', ip='192.168.4.123', port=4000)
 c1 = net.RemoteController( 'c1', ip='192.168.4.125', port=4000)
 s2 = net.addSwitch( 's2', procotols='OVS', listenPort=undefined, mac='10::15')
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=undefined, mac='10::18')


 info("*** Creating links")
 net.addLink(s2, c1 , delay= 15, loss= 5) 
 net.addLink(s1, c1 , delay= 15, loss= 5) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c2.start()
 c1.start()
 s2.start( [c2] )
 s1.start( [c2] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
