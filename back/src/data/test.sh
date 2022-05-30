from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c1 = net.addController( 'c1', ip='192.168.0.1', port=3001)
 c2 = net.addController( 'c2', ip='192.168.0.2', port=3002)
 s1 = net.addSwitch( 's1', procotols='OVS', port=3002, mac='00:0F:00:00:00:01')
 s2 = net.addSwitch( 's2', procotols='OVS', port=3004, mac='00:00:00:00:00:02')
 h1 = net.addHost( 'h1', mac='00:00:00:00:00:03', ip='192.168.12.33/24') 
 h2 = net.addHost( 'h2', mac='00:00:00:00:00:04', ip='192.168.0.4/24') 
 h3 = net.addHost( 'h3', mac='00:00:00:00:00:05', ip='192.168.0.53/24') 


 info("*** Creating links")
 net.addLink(c1, s1 , delay= 0, loss= 0) 
 net.addLink(c2, s2 , delay= 0, loss= 0) 
 net.addLink(s1, h1 , delay= 0, loss= 0) 
 net.addLink(s1, h2 , delay= 0, loss= 0) 
 net.addLink(s2, h3 , delay= 0, loss= 0) 
 net.addLink(c2, c1 , delay= 0, loss= 0) 
 net.addLink(h2, h3 , delay= 0, loss= 0) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 c2.start()
 s1.start( [c1] )
 s2.start( [c2] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
