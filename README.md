# Visual-descriptor #
A repository to work in a visual descriptor to the tool Mininet

## How to get this tool
Firstly, you must had the [Vagrant image](https://app.vagrantup.com/boxes/search?utf8=%E2%9C%93&sort=downloads&provider=&q=Symghoul) (for this versions it is so heavy 4.68GB, but in the future the idea is distribute it to become the image lighter).
After that, you must modify the vagrantfile in the vagrant directory.

### *<<And this is where i'd put a image... IF I HAD ONE¡¡¡¡¡>>* ###

modifying it as below (if it's needed)
```sh
config.vm.box = "Symghoul/mininetVND"
config.vm.box_version = "1.0.0"
```

Now, at the terminal write
```sh
vagrant add Symghoul/mininetVND
```

Finally, write this and wait until it ends, vagrant will open the proviosioner on this case VirtualBox (All is modifiable, read the vagrantfile's instructions) 
```sh
vagrant up
```

In this moment, the credentials are
- **User**: mininet
- **password** : mininet

Once you are in, open a terminal on the desktop and execute the runApp.sh script 
```sh
sh runApp.sh
```

## How to use this tool ##
Read the User Guide Mininet doc

