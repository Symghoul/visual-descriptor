#!/usr/bin/python 

from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 
from mininet.link import TCLink

def topology(): 
 "Create a network."
 net = Mininet( controller=Controller, waitConnected=True, link=TCLink )

 info("*** Adding controller")
 net.addController( 'c1', port=3001)
 info("*** Adding switches")
 s2 = net.addSwitch( 's2', protocols='OVS', port=3002, mac='00:00:00:00:00:01')
 info("*** Adding nodes")
 h3 = net.addHost( 'h3', mac='00:00:00:00:00:02', ip='192.168.0.2') 
 info("*** Adding nodes")
 h4 = net.addHost( 'h4', mac='00:00:00:00:00:03', ip='192.168.0.3') 


 info("*** Creating links")
 net.addLink(h3, s2 , bw=1, delay='0ms', loss=0) 
 net.addLink(h4, s2 , bw=1, delay='0ms', loss=0) 
 net.addLink(h3, s2 , bw=1, delay='0ms', loss=0) 
 net.addLink(h4, s2 , bw=1, delay='0ms', loss=0) 
 net.addLink(h3, s2 , bw=1, delay='0ms', loss=0) 
 net.addLink(h4, s2 , bw=1, delay='0ms', loss=0) 

 info("*** Starting network")

 net.start()


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
