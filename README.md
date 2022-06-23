
# Weave Music - Erela.js and Lavalink 🎶

## Links
[![support](https://img.shields.io/badge/SUPPORT-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/ggSCzK7W)
[![invite](https://img.shields.io/badge/INVITE-WEAVE-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/api/oauth2/authorize?client_id=985972679263805492&permissions=414501432577&scope=bot%20applications.commands)

## Features
  * Quick and easy to use
  * Youtube / Spotify / Apple Music 
  * DJ Only Commands & Role

## Requirements

    1. A Mongo Database.
    2. A Spotify Client ID and Client Secret for Spotify Support
       Can be obtained from here: https://developer.spotify.com/dashboard/
    3. A working Lavalink Server --> Example provided
        Recommened to get the latest jar file --> https://github.com/freyacodes/Lavalink/releases/
    4. A Discord Bot Token & Client ID
    
## Config.json

Add your requirements to the config.json found in ./Structures/config.json
```json
{
    "Token": "",
    "Database": "",
    "ClientID": "",
    "ErrorChannelD": "",
    "SpotifyClientID": "",
    "SpotifySecret": "",
    
    "nodes": [
        {
            "id": "main",
            "host": "",
            "port": 2333,
            "password": "",
            "retryAmount": 15, 
            "retryDelay": 
        }
    ]
}
```

**Start Commands:**

For Bot (in Bot Directory):
1. `npm install`
2. `node .`


For Lavalink Server (in Lavalink Server Directory):
1. `java -jar Lavalink.jar`

## Code Usage

Feel free to use this code in any of your projects. No credit is due (although it's appreciated), however a repo star goes a long way.
