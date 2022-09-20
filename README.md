# Visual-descriptor #
A repository to work in a visual descriptor to the tool Mininet

## How to get this tool
**1.**  Download the _Vagrantfile_ at the **vagrant directory**

**2.** Open a _Terminal_ located at the vagrant directory

**3.** (Optional) Download the [Vagrant image](https://app.vagrantup.com/boxes/search?utf8=%E2%9C%93&sort=downloads&provider=&q=Symghoul) (for this version it is so heavy 4.68GB, but in the future the idea is distribute it to become the image lighter).
![Vagrant image](./resources/readme/vagrant_image.png)

**4.** After that, you could modify the vagrantfile in the vagrant directory. as below (if it's needed)
```sh
config.vm.box = "Symghoul/mininetVND"
```

**5.** Finally, write this and wait until it ends, vagrant will open the proviosioner on this case VirtualBox (All is modifiable, read the vagrantfile's instructions) 
```sh
vagrant up
```

the credentials are
- **User**: mininet
- **password** : mininet

![Mininet desktop](./resources/readme/Mininet_desktop.png)

Once you are in, open a terminal on the desktop and execute the runApp.sh script 
```sh
sh runApp.sh
```
![Mininet_Terminal](./resources/readme/mininet_Terminal.png)

## How to use this tool ##
Read the User Guide Mininet doc

