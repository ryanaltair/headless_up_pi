# set -x
# pi=$(cat pi_config/hostname)
# ssh pi sudo cat /etc/apt/source.list
# cat ./pi_config/source.list | ssh pi 'sudo cat >> /etc/apt/source.list'

sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/' /etc/apt/sources.list || sed -i 's/ports.ubuntu.com/mirrors.aliyun.com/' /etc/apt/sources.list