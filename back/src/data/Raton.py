from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 
from mininet.link import TCLink

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller, waitConnected=True, link=TCLink )

 info("*** Adding controller")
 net.addController( 'c0', ip='192.161.0.1', port=3001)
 net.addController( 'c1', ip='192.161.0.2', port=3001)
 info("*** Adding switches")
 s2 = net.addSwitch( 's2', procotols='OVS', port=3002, mac='00:00:00:00:00:01')
 info("*** Adding switches")
 s3 = net.addSwitch( 's3', procotols='OVS', port=3002, mac='00:00:00:00:00:02')
 info("*** Adding nodes")
 h4 = net.addHost( 'h4', mac='00::02', ip='192.168.4.50/255.255.255.0') 


 info("*** Creating links")
 net.addLink(h4, s2 , bw=1, delay='15ms', loss=5) 
 net.addLink(s2, c0 , bw=10, delay='2ms', loss=1) 
 net.addLink(s3, h4 , bw=10, delay='2ms', loss=1) 
 net.addLink(s3, c1 , bw=10, delay='2ms', loss=1) 

 info("*** Starting network")

 net.start()


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()