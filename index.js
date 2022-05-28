const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Online'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);


const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const TOKEN = "OTc4OTMyMzM3NzQ2MjUxODM3.GOsFOi.CcesBczYF0S8lGcB96P5FeeU63YCrsMtc5gACk";
client.login(TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  let Parser = require('rss-parser');
  let parser = new Parser();
  
  (async function getNews() {
      let embed = new MessageEmbed();
      let feed = await parser.parseURL('https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us');
  
      let currentTime = new Date().toISOString();
      currentTime = Date.parse(currentTime);
      const channel = await client.channels.fetch('974014805709037668');
  
      feed.items.forEach(item => {
          let date = item.pubDate;
          date = Date.parse(date);
          
          // check for anime category and any new posts within the last 60 seconds
          if (currentTime - date < 60000 && item.categories.includes('Anime')) {
              let strDate = item.pubDate;
              strDate = strDate.substring(5, 16);
  
              embed
                  .setTitle(item.title)
                  .setURL(item.link)
                  .setDescription(item.contentSnippet)
                  .setColor('#9e9e9e')
                  .setFooter({text: 'Anime News Network | ' + strDate})
              channel.send({embeds: [embed]})
          }
      });
  
      
      setInterval(getNews, 60000);
  })();
});