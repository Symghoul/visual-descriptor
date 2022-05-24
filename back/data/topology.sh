from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c1 = net.RemoteController( 'c1', ip='192.168.4.109', port=4000)
 c1 = net.RemoteController( 'c1', ip='192.168.4.120', port=4000)
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=undefined, mac='10::02')
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=undefined, mac='10::11')
 h1 = net.addHost( 'h1', mac='00::08', ip='192.168.4.50/255.255.255.0') 
 h2 = net.addHost( 'h2', mac='00::09', ip='192.168.4.51/255.255.255.0') 


 info("*** Creating links")
 net.addLink(h1, s1 , delay= 15, loss= 5) 
 net.addLink(h2, s1 , delay= 15, loss= 5) 
 net.addLink(s1, c1 , delay= 15, loss= 5) 
 net.addLink(h2, s1 , delay= 15, loss= 5) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 c1.start()
 s1.start( [c1] )
 s1.start( [c1] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
