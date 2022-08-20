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
 net.addController( 'c0')
 net.addController( 'c1')
 info("*** Adding switches")
 s2 = net.addSwitch( 's2', protocols='OVS', port=3002)
 info("*** Adding switches")
 s3 = net.addSwitch( 's3', port=3002, mac='00:00:00:00:00:02')
 info("*** Adding switches")
 s3 = net.addSwitch( 's3', protocols='OVS', mac='00:00:00:00:00:22')
 info("*** Adding nodes")
 h4 = net.addHost( 'h4', mac='00::02', ip='192.168.4.50') 
 info("*** Adding nodes")
 h4 = net.addHost( 'h4', mac='00:00:00:00:00:20', ip='192.161.0.10') 


 info("*** Creating links")
 net.addLink(h4, s2 , bw=1, delay='15ms', loss=5) 
 net.addLink(s3, h4 , bw=10, delay='2ms', loss=1) 

 info("*** Starting network")

 net.start()


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
