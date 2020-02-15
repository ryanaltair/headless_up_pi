#!/usr/bin/env node

const fs = require('fs').promises
const os = require('os')
if (os.type() != "Darwin") {
    console.log('sorry, only support mac now')
    process.exit()
}



const options = {
    interactive: {
        default: true
    },
    ssid: {
        type: "input",
        describe: "Enter SSID",
    },
    passphase: {
        type: "input",
        describe: "Enter passphase, more than chars",
    }
};


async function enableSSH() {
    let sshFlag = "/Volumes/boot/ssh"
    await fs.writeFile(sshFlag, "")
    console.log("enable ssh")
}
async function setWifi(ssid, passwd) {
    let country = "CN"
    let wpa_content =
        `country = ${country}
ctrl_interface = DIR = /var/run / wpa_supplicant GROUP = netdev
update_config = 1

network = {
    ssid = "${ssid}"
    psk = "${passwd}"
}
`
    let wifi_wpa_path = "/Volumes/boot/wpa_supplicant.conf"
    await fs.writeFile(wifi_wpa_path, wpa_content)
    console.log("enable wifi")
    console.log("ssid:", ssid)
    console.log("passphase:", passwd)
}

async function work() {
    try {
        let out = await fs.access('/Volumes/boot')
        if (out === fs.constants.W_OK | fs.constants.R_OK) {
            console.log('find raspberry pi boot volumes')
            const yargsInteractive = require("yargs-interactive");
            yargsInteractive()
                .usage("$0 <command> [args]")
                .interactive(options)
                .then(result => {
                    enableSSH()
                    setWifi(result.ssid, result.passphase)
                    console.log(result);
                });

        }
    } catch (error) {
        console.log('[ERROR]failed find raspberry pi boot volumes')
    }
}

work()