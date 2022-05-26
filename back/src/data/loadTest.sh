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
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=undefined, mac='00:00:00:00:00:01')
 h1 = net.addHost( 'h1', mac='00:00:00:00:00:02', ip='192.168.0.2/24') 
 h2 = net.addHost( 'h2', mac='00:00:00:00:00:03', ip='192.168.0.3/24') 


 info("*** Creating links")
 net.addLink(c1, s1 , delay= 0, loss= 0) 
 net.addLink(s1, h1 , delay= 0, loss= 0) 
 net.addLink(s1, h2 , delay= 0, loss= 0) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 s1.start( [c1] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
