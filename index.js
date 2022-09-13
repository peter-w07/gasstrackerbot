(async()=>{
                let process = require('process');
                process.on('uncaughtException', function (err) {
                    console.log(`Error!`);
                    console.log(err);
                  });
                  const events = require('events');
                  const { exec } = require("child_process")
                  let Discord = require("discord.js")
let Database  = require("easy-json-database")
let { MessageEmbed, MessageButton, MessageActionRow, Intents, Permissions, MessageSelectMenu }= require("discord.js")
let logs = require("discord-logs")
const os = require("os-utils");
const ms = require("ms")
let https = require("https")
let fs = require('fs');
                    const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
                    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                    const s4d = {
                        Discord,
                        database: new Database(`./database.json`),
fire:null,
                        joiningMember:null,
                        reply:null,
                        tokenInvalid:false,
                        tokenError: null,
                        player:null,
                        manager:null,
                        Inviter:null,
                        message:null,
                        notifer:null,
                        checkMessageExists() {
                            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                        }
                    };
                    s4d.client = new s4d.Discord.Client({
                    intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
                    partials: ["REACTION", "CHANNEL"]
                    });
                    s4d.client.on('ready', () => {
                        console.log(s4d.client.user.tag + " is alive!")
                    })
                    logs(s4d.client);         
                    var gas_under, gas_over;


await s4d.client.login((process.env.token)).catch((e) => {
        s4d.tokenInvalid = true;
        s4d.tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid bot token was provided!")
        } else {
            throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
        }
    });

s4d.client.on('ready', async () => {

      /*
      when the bot is tered on run this code
      */
     gas_under = false;

          while(s4d.client && s4d.client.token) {
              await delay(50);

        /*
        make a loop forever
        */
       https.get('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=QHVJHD1IMWSWRKW11XSUW95U19VIWBVSR2', async resp => {
    let data2 = "";
    resp.on("data",async chunk => {
    data2 += chunk;
    });
    resp.on("end",async () => {
    let data = JSON.parse(data2)

          /*
          make a api calll
          */
         s4d.client.user.setPresence({status: "online",activities:[{name:(['⚡',data.result.FastGasPrice,' |🚶‍♀️',data.result.ProposeGasPrice,' |🐢',data.result.SafeGasPrice].join('')),type:"WATCHING"}]});

          /*
          set the bots stats
          */

          /*
          if gas gos lower then send a msg
          */
         if ((Number((data.result.ProposeGasPrice))) <= 45) {

            /*
            see if it under the set pruce all redy
            */
           if (gas_under == false) {
          gas_under = true;

              /*
              send the msg
              */
             s4d.client.channels.cache.get('991756014191911003').send({content:String((' <@&991764034300944455> we are under ' + String(data.result.ProposeGasPrice)))});
        }
      } else if ((Number((data.result.ProposeGasPrice))) <= 90) {
        gas_under = false;
      }
      if ((Number((data.result.ProposeGasPrice))) >= 250) {

            /*
            see if it over the set pruce all redy
            */
           if (gas_over == false) {
          gas_over = true;

              /*
              send the msg
              */
             s4d.client.channels.cache.get('991756014191911003').send({content:String(('<@&991764034300944455> we are over' + String(data.result.ProposeGasPrice)))});
        }
      } else if ((Number((data.result.ProposeGasPrice))) <= 200) {
        gas_over = false;
      }

    });
    })
    .on("error",async err => {
    console.log("Error: " + err.message);
    });
    await delay(Number(1)*1000);

              console.log('ran')
          }

});

                    return s4d
                    })();