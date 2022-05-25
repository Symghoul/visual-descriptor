from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c1 = net.RemoteController( 'c1', ip='192.168.4.122', port=4000)
 c2 = net.RemoteController( 'c2', ip='192.168.4.123', port=4000)
 s2 = net.addSwitch( 's2', procotols='OVS', listenPort=undefined, mac='10::15')
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=undefined, mac='10::16')
 h1 = net.addHost( 'h1', mac='00::12', ip='192.168.4.58/24') 


 info("*** Creating links")
 net.addLink(c2, s2 , delay= 15, loss= 5) 
 net.addLink(c1, s1 , delay= 15, loss= 5) 
 net.addLink(h1, s1 , delay= 15, loss= 5) 
 net.addLink(h1, s2 , delay= 15, loss= 5) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 c2.start()
 s2.start( [NotLinkedYet] )
 s1.start( [NotLinkedYet] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
