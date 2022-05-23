from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( co ntroller=Controller )

 info("*** Creating nodes")
 c1 = net.RemoteController( 'c1', ip='192.168.4.104', port=5000)
 s1 = net.addSwitch( 's1', procotols='OVS', listenPort=4000, mac='10::02')
 h1 = net.addHost( 'h1', mac='00::08', ip='192.168.4.50/24') 
 h2 = net.addHost( 'h2', mac='00::09', ip='192.168.4.51/24') 


 info("*** Creating links")
 net.addLink(h1, s1 , delay= 15, loss= 5, bw= 1) 
 net.addLink(h2, s1 , delay= 15, loss= 5, bw= 1) 
 net.addLink(s1, c1 , delay= 15, loss= 5, bw= 1) 
 net.addLink(h2, s1 , delay= 15, loss= 5, bw= 1) 

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
