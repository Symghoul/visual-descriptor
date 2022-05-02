from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteComntroller 

def topology(): 
 "Create a network."
 net = Mininet_wifi( controller=Controller )

 info("*** Creating nodes")
 s2 = net.addSwitch( 's2', protocols='OpenFlow10', listenPort=6673, mac='00:00:00:00:00:02' )
 s3 = net.addSwitch( 's3', protocols='OpenFlow10', listenPort=6674, mac='00:00:00:00:00:03' )
 h4 = net.addHost( 'h4', mac='00:00:00:00:00:04', ip='10.0.0.4/8' )
 h5 = net.addHost( 'h5', mac='00:00:00:00:00:05', ip='10.0.0.5/8' )
 h6 = net.addHost( 'h6', mac='00:00:00:00:00:06', ip='10.0.0.6/8' )
 h7 = net.addHost( 'h7', mac='00:00:00:00:00:07', ip='10.0.0.7/8' )

 info("*** Creating links")
 net.addLink(h4, s2)
 net.addLink(h5, s2)
 net.addLink(h6, s3)
 net.addLink(h7, s3)

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 c1.start()
 s3.start( [c1] )
 s2.start( [c1] )


 info("*** Running CLI")
 CLI_wifi( net )

 info("*** Stopping network")
 net.stop()
if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
