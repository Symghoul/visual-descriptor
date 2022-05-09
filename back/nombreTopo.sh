from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c1 = net.RemoteController( 'c1', ip='192.168.4.1', port=5000)
 s1 = net.addSwitch( 's1', procotols='OpenFlow10', listenPort=4555, mac='00::01')
 h1 = net.addHost( 'h1', mac='00::01', ip='192.168.4.50/24') 


 info("*** Creating links")
 net.addLink(h1, s1 , 15, 5, 1) 
 net.addLink(s1, c1 , 2, 1, 10) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 s1.start( [c1] )


 info("*** Running CLI")
 CLI( net )

 info("*** Stopping network")
 net.stop()
if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
