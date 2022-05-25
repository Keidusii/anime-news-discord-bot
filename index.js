const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const TOKEN = "OTc4OTMyMzM3NzQ2MjUxODM3.GOsFOi.CcesBczYF0S8lGcB96P5FeeU63YCrsMtc5gACk";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);

let Parser = require('rss-parser');
let parser = new Parser();

(async function getNews() {

    let feed = await parser.parseURL('https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us');

    let currentTime = new Date().toISOString();
    currentTime = Date.parse(currentTime);

    feed.items.forEach(item => {
        let date = item.pubDate;
        date = Date.parse(date);

        // check for anime category and any new posts within the last 60 seconds
        if (currentTime - date < 60000 && item.categories.includes('Anime')) {
            let strDate = item.pubDate;
            strDate = strDate.substring(5, 16);
            console.log(item.title + ': ' + item.link + ': ' + strDate + '\n');

            let embed = new MessageEmbed()
                .setTitle(item.title)
                .setURL(item.url)
                .setDescription(item.contentSnippet)
                .setColor('#9e9e9e')
                .setFooter({text: 'Anime News Network | ' + strDate})
            channel.send({embeds: [embed]})
        }
    });


    setTimeout(getNews, 60000);
})();