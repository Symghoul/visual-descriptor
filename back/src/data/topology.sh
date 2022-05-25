from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c1 = net.RemoteController( 'c1', ip='192.168.4.120', port=4000)
 c1 = net.RemoteController( 'c1', ip='192.168.4.121', port=4000)
 c1 = net.RemoteController( 'c1', ip='192.168.4.122', port=4000)
 s2 = net.addSwitch( 's2', procotols='OVS', listenPort=undefined, mac='10::13')
 s2 = net.addSwitch( 's2', procotols='OVS', listenPort=undefined, mac='10::14')
 s2 = net.addSwitch( 's2', procotols='OVS', listenPort=undefined, mac='10::15')
 h1 = net.addHost( 'h1', mac='00::10', ip='192.168.4.56/24') 
 h1 = net.addHost( 'h1', mac='00::11', ip='192.168.4.57/24') 
 h1 = net.addHost( 'h1', mac='00::12', ip='192.168.4.58/24') 


 info("*** Creating links")
 net.addLink(h1, s2 , delay= 15, loss= 5) 
 net.addLink(h1, s2 , delay= 15, loss= 5) 
 net.addLink(h1, s2 , delay= 15, loss= 5) 
 net.addLink(h1, s2 , delay= 15, loss= 5) 
 net.addLink(h2, s1 , delay= 15, loss= 5) 
 net.addLink(c1, s1 , delay= 15, loss= 5) 
 net.addLink(c2, s2 , delay= 15, loss= 5) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 c1.start()
 c1.start()
 s2.start( [NotLinkedYet] )
 s2.start( [NotLinkedYet] )
 s2.start( [NotLinkedYet] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
