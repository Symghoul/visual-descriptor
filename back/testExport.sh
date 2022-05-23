from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c1 = net.RemoteController( 'c1', ip='192.161.0.1', port=3001)
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=undefined, mac='00:00:00:00:00:01')
 s2 = net.addSwitch( 's2', procotols='OVS', listenPort=undefined, mac='00:00:00:00:00:02')
 h1 = net.addHost( 'h1', mac='00:00:00:00:00:03', ip='192.168.0.2/23') 
 h2 = net.addHost( 'h2', mac='00:00:00:00:00:04', ip='192.168.0.3/23') 
 h3 = net.addHost( 'h3', mac='00:00:00:00:00:05', ip='192.168.0.4/23') 
 h4 = net.addHost( 'h4', mac='00:00:00:00:00:06', ip='192.168.0.5/23') 


 info("*** Creating links")

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 s1.start( [notLinkedYet] )
 s2.start( [notLinkedYet] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
