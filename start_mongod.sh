sudo mongod --dbpath /home/murmur/Belgeler/mongodb/ --bind_ip ${ip_adres=$(ip a | grep 'inet 192' | awk '{print $2}' | cut -d '/' -f1)}