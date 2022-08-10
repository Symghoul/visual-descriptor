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
 net.addController( 'c2', port=3001)
 info("*** Adding switches")
 s3 = net.addSwitch( 's3', protocols='OVS', port=3002, mac='00:00:00:00:00:01')
 info("*** Adding switches")
 s7 = net.addSwitch( 's7', protocols='OVS', port=3004, mac='00:00:00:00:00:04')
 info("*** Adding nodes")
 h4 = net.addHost( 'h4', mac='00:00:00:00:00:02', ip='192.168.0.2') 
 info("*** Adding nodes")
 h5 = net.addHost( 'h5', mac='00:00:00:00:00:03', ip='192.168.0.3') 
 info("*** Adding nodes")
 h8 = net.addHost( 'h8', mac='00:00:00:00:00:05', ip='192.168.0.5') 
 info("*** Adding nodes")
 h9 = net.addHost( 'h9', mac='00:00:00:00:00:06', ip='192.168.0.6') 


 info("*** Creating links")
 net.addLink(h4, s3 , bw=1, delay='0ms', loss=0) 
 net.addLink(h5, s3 , bw=1, delay='0ms', loss=0) 
 net.addLink(h8, s7 , bw=1, delay='0ms', loss=0) 
 net.addLink(h9, s7 , bw=1, delay='0ms', loss=0) 
 net.addLink(s7, s3 , bw=1, delay='0ms', loss=0) 

 info("*** Starting network")

 net.start()


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
