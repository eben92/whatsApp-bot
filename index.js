const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const schedule = require("node-schedule");

const rule = new schedule.RecurrenceRule();

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("ready", async () => {
  console.log("Client is ready!");

  const chats = await client.getChats();
  const myGroup = chats.find((chat) => chat.name === "Lmao");
  console.log(myGroup);

  // schedule a message to be sent when its 10:30 PM today only
  // rule.minute
  // schedule.scheduleJob((rule.minute = 11), () => {
  //   const message = new MessageMedia(
  //     "https://i.imgur.com/XyqQY.jpg",
  //     "image/jpeg"
  //   );
  //   myGroup.sendMessage(message);
  // });

  rule.dayOfWeek = [0, new schedule.Range(5, 6)];
  rule.hour = 22;
  rule.minute = 39;
  rule.tz = "Etc/UTC";
  schedule.scheduleJob(rule, async () => {
    // const message = new MessageMedia("https://i.imgur.com/dZQQZ.jpg");
    myGroup.sendMessage("welcome eben");
    console.log("Sending message");
  });
  myGroup.sendMessage("Hello World!");
});

//Replying Messages with image from url
client.on("message", async (message) => {
  // console.log(message);

  // send message to 0550404071 (whatsapp number) when the time is 9:00 AM
  if (message.body === "hello") {
    // console.log(message.fromMe);

    myGroup.sendMessage();
    // const image = new MessageMedia("https://i.imgur.com/dZQMxXb.jpg");
    // await message.reply(image);
    client.sendMessage("233209248872@c.us", "hello boss");
  }

  if (message.body === "meme") {
    //get media from url
    const media = await MessageMedia.fromUrl(
      "https://user-images.githubusercontent.com/41937681/162612030-11575069-33c2-4df2-ab1b-3fb3cb06f4cf.png"
    );

    //replying with media
    client.sendMessage(message.from, media, {
      caption: "meme",
    });
  }
});
