from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import controller, remoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c1 = net.RemoteController( 'c1', ip='192.168.4.1', port=5000)
 s1 = net.addSwitch( 's1', procotols='OpenFlow10', listenPort=4555, mac='00::01')
 s2 = net.addSwitch( 's2', procotols='OpenFlow10', listenPort=4555, mac='00::02')
 h1 = net.addHost( 'h1', mac='00::07', ip='192.168.4.50/24') 
 h2 = net.addHost( 'h2', mac='00::08', ip='192.168.4.51/24') 


 info("*** Creating links")
 net.addLink(h1, s1 , 15, 5, 1) 
 net.addLink(s1, c1 , 2, 1, 10) 
 net.addLink(h2, s2 , 15, 5, 1) 
 net.addLink(s2, c1 , 2, 1, 10) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 s1.start( [c1] )
 s2.start( [c1] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
