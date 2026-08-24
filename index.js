const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/terrairabot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});
app.command("/terrairabot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/terrairabot-ping - Check bot latency
/terrairabot-help - Show this help message
/terrariabot-fact - pulls a random fact from the Terraria wiki`
  });


});
app.command("/terrariabot-fact", async ({ ack, respond }) => {
  await ack();

  try {
    let page;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await axios.get("https://terraria.wiki.gg/api.php", {
        params: {
          action: "query",
          generator: "random",
          grnnamespace: 0,
          grnlimit: 1,
          prop: "extracts",
          exintro: 1,
          explaintext: 1,
          format: "json"
        }
      });
      const candidate = Object.values(response.data.query.pages)[0];
      if (!candidate.title.includes("/")) {
        page = candidate;
        break;
      }
    }
    if (!page) {
      throw new Error("No English article found");
    }
    await respond({
      text: `Terraria Wiki: ${page.title}\n${page.extract || "No summary available."}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a Terraria Wiki article." });
  }
});

app.command("/terrariabot-summon", async ({ ack, respond }) => {
  await ack();

  const bossImages = [
    { name: "King Slime", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/King_Slime.png" },
    { name: "Eye of Cthulhu", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Eye_of_Cthulhu.png" },
    { name: "Eater of Worlds", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Eater_of_Worlds.png" },
    { name: "Brain of Cthulhu", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Brain_of_Cthulhu.png" },
    { name: "Queen Bee", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Queen_Bee.png" },
    { name: "Skeletron", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Skeletron.png" },
    { name: "Wall of Flesh", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Wall_of_Flesh.png" },
    { name: "Queen Slime", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Queen_Slime.png" },
    { name: "The Destroyer", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/The_Destroyer.png" },
    { name: "Skeletron Prime", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Skeletron_Prime.png" },
    { name: "Plantera", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Plantera.png" },
    { name: "Golem", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Golem.png" },
    { name: "Duke Fishron", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Duke_Fishron.png" },
    { name: "Lunatic Cultist", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Lunatic_Cultist.png" },
    { name: "Moon Lord", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Moon_Lord.png" },
    { name: "Empress of Light", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Empress_of_Light.png" },
    { name: "Betsy", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Betsy.png" },
    { name: "Solar Pillar", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Solar_Pillar.png" },
    { name: "Vortex Pillar", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Vortex_Pillar.png" },
    { name: "Nebula Pillar", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Nebula_Pillar.png" },
    { name: "Stardust Pillar", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Stardust_Pillar.png" },
    { name: "Dreadnautilus", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Dreadnautilus.png" },
    { name: "Deerclops", image_url: "https://terraria.wiki.gg/wiki/Special:FilePath/Deerclops.png" }
  ];

  const calamityBossImages = [
    { name: "Desert Scourge (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Desert_Scourge.png" },
    { name: "Crabulon (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Crabulon.png" },
    { name: "The Hive Mind (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/The_Hive_Mind.png" },
    { name: "The Perforators (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/The_Perforators.png" },
    { name: "The Slime God (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/The_Slime_God.png" },
    { name: "Cryogen (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Cryogen.png" },
    { name: "Aquatic Scourge (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Aquatic_Scourge.png" },
    { name: "Brimstone Elemental (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Brimstone_Elemental.png" },
    { name: "Calamitas Clone (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Calamitas_Clone.png" },
    { name: "Leviathan and Anahita (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Leviathan_and_Anahita.png" },
    { name: "Astrum Aureus (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Astrum_Aureus.png" },
    { name: "The Plaguebringer Goliath (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/The_Plaguebringer_Goliath.png" },
    { name: "The Great Sand Shark (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/The_Great_Sand_Shark.png" },
    { name: "The Devourer of Gods (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/The_Devourer_of_Gods.png" },
    { name: "Yharon, Dragon of Rebirth (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Yharon%2C_Dragon_of_Rebirth.png" },
    { name: "The Exo Mechs (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Exo_Mechs.png" },
    { name: "Supreme Calamitas (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Supreme_Calamitas.png" },
    { name: "Providence, the Profaned Goddess (Calamity)", image_url: "https://calamitymod.wiki.gg/wiki/Special:FilePath/Providence%2C_the_Profaned_Goddess.png" }
  ];

  const allBossImages = [...bossImages, ...calamityBossImages];
  const boss = allBossImages[Math.floor(Math.random() * allBossImages.length)];
  await respond({
    text: `Your boss is: ${boss.name}`,
    blocks: [
      {
        type: "image",
        image_url: boss.image_url,
        alt_text: boss.name
      }
    ]
  });
});
























(async () => {
  await app.start();
  console.log("bot is running!");
})();