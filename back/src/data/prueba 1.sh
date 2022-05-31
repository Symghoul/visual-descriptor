from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller )

 info("*** Creating nodes")
 c4 = net.addController( 'c4', ip='192.168.0.16', port=3009)
 s6 = net.addSwitch( 's6', procotols='OVS', port=30010, mac='00:00:00:00:00:018')
 s7 = net.addSwitch( 's7', procotols='OVS', port=30011, mac='00:00:00:00:00:019')
 h13 = net.addHost( 'h13', mac='00:00:00:00:00:020', ip='192.168.0.17/255.255.255.0') 
 h14 = net.addHost( 'h14', mac='00:00:00:00:00:021', ip='192.168.0.18/255.255.255.0') 
 h15 = net.addHost( 'h15', mac='00:00:00:00:00:022', ip='192.168.0.19/255.255.255.0') 


 info("*** Creating links")
 net.addLink(c4, s6 , delay= 0, loss= 0) 
 net.addLink(c4, s7 , delay= 0, loss= 0) 
 net.addLink(s7, h14 , delay= 0, loss= 0) 
 net.addLink(s7, h15 , delay= 0, loss= 0) 
 net.addLink(s6, h13 , delay= 0, loss= 0) 

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c4.start()
 s6.start( [c1] )
 s7.start( [c1] )


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
