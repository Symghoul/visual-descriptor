from mininet.topo import Topo 
from mininet.net import Mininet 
from mininet.log import info, setLogLevel 
from mininet.cli import CLI 
from mininet.node import Controller, RemoteController 

def topology(): 
 "Create a network."
 net = Mininet( co ntroller=Controller )

 info("*** Creating nodes")
 undefined = net.addController( 'undefined', ip='192.168.4.50', port=5000)
 undefined = net.addController( 'undefined', ip='192.168.4.1', port=5000)
 undefined = net.addController( 'undefined', ip='192.168.4.250', port=5000)
 undefined = net.addController( 'undefined', ip='192.168.4.5', port=5000)


 info("*** Creating links")

 info("*** Starting network")
 net.configureWifiNodes()

 net.build()
 undefined.start()
 undefined.start()
 undefined.start()
 undefined.start()


 info("*** Running CLI")
 CLI( net )

if __name__ == '__main__':
 setLogLevel( 'info' )
 topology()
