import { model, Schema, Document, connect} from "mongoose";
import "dotenv/config";
const { Client } = require('discord.js') 

connect("mongodb+srv://Magicoo51889:1tgw6K1CquZC5Cj3@cluster0.7xetp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => console.log("Ego is connected to MongoDB"));

const client = new Client();

interface IUser extends Document {
  discordId: string;
  ego: number;
}

const Model = model<IUser>("User", new Schema({
  discordId: String,
  ego: Number,
}))

client.on("message", async message => {
  const mentions = message.mentions.users.array();

  if (message.content.includes("ego") && !message.content.startsWith("%ego") && mentions.length > 0) {
    const user = await Model.findOne({
      discordId: mentions[0].id,
    });

    if (!user) {
      await new Model({
        discordId: mentions[0].id,
        ego: 1,
      }).save();

      return;
    }

    user.ego = user.ego + 1;
    await user.save();
  }

  if (message.content.startsWith("%ego")) {
    const user = await Model.findOne({
      discordId: mentions[0].id,
    });

    if (!user) {
      return message.reply("doesnt exist you egotistical fuck");
    }

    message.channel.send(`<@${user.discordId}>'s total ego size: ${user.ego}ft`);
  } 
});

client.once('ready', () => {
  console.log("Ego logged in")
});

