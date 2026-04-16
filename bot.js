import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
import { mlModel } from './src/lib/mlEngine.js'; // The exact same model the website uses

// Load environment variables from .env
dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  console.error("❌ ERROR: Missing DISCORD_BOT_TOKEN in .env file.");
  console.error("Please add your Discord Bot Token to the .env file and restart the bot.");
  process.exit(1);
}

// Initialize the Discord Client with necessary permissions
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Required to read what users type
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel, Partials.Message]
});

client.once('ready', () => {
  console.log('=============================================');
  console.log(`🤖 Sentinel Node Active: Logged in as ${client.user.tag}`);
  console.log('📡 Intelligence Layer: ONLINE (Local ML Core)');
  console.log('=============================================');
});

// Resources to send on detection
const selfCareSuggestions = `
Here are a few quick self-care suggestions you can try right now:
🧘‍♂️ **Guided Meditation** - Focus on your breathing for 5 minutes.
🌳 **Nature Exposure** - Step outside for some fresh air and sunlight.
📓 **Mood Journaling** - Write down your thoughts to clear your mind.
🎧 **Binaural Beats** - Listen to calming lo-fi or ambient music.
`;

const professionalResources = `
If you need professional support, please reach out to these resources:
🏥 **Crisis Text Line** - Text HOME to 741741 to connect with a crisis counselor 24/7.
📞 **National Suicide Prevention Lifeline** - Call or text 988.
🌍 **The Trevor Project** - (LGBTQ Youth) Call 866-488-7386 or text START to 678-678.
`;

client.on('messageCreate', async (message) => {
  // Ignore messages from bots (including ourselves)
  if (message.author.bot) return;

  // Sometimes messages are empty (e.g. if a user only posts an image)
  if (!message.content || message.content.length === 0) return;

  try {
    // Pass the message directly into our Local ML Engine
    const { label, confidence } = mlModel.classify(message.content);

    // We only take action if confidence is high and it's a severe label
    if (label === 'Crisis') {
      console.log(`[ALERT] CRISIS DETECTED in #${message.channel.name} by ${message.author.tag}: "${message.content}"`);
      
      try {
        // Send a private Direct Message to the user
        await message.author.send(
          `**Mission Critical Alert**\n\nHi ${message.author.username},\nWe noticed your recent message exhibited severe distress signals. Your life has immense value. Please consider reaching out for immediate help.\n${professionalResources}`
        );
        // Add a subtle reaction to the public message so mods know it was flagged
        await message.react('🚨');
      } catch (err) {
        console.log("Could not DM user, their DMs might be closed.");
      }
    } else if (label === 'Moderate') {
      console.log(`[WARNING] MODERATE distress detected by ${message.author.tag}`);
      
      try {
        await message.author.send(
          `**Sentinel Check-in**\n\nHi ${message.author.username},\nWe noticed you might be having a difficult time based on your recent message. \n${selfCareSuggestions}\n\n${professionalResources}`
        );
        // Subtle acknowledgment
        await message.react('💙');
      } catch (err) {
         // Silently fail if DMs closed
      }
    } 
    // We intentionally ignore 'Mild' and 'None' so the bot isn't annoying

  } catch (err) {
    console.error("Error processing message:", err);
  }
});

// Login using the environment token
client.login(token).catch(err => {
  console.error("❌ Failed to login to Discord. Is your token correct?", err.message);
});
