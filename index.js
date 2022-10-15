const TelegramApi = require("node-telegram-bot-api");

const fs = require("fs");
const files = fs.readdirSync("public/images");

const token = "5703860431:AAGfBM38uS9xGIkLmZq3bcV1B-cm_6dDScQ";

const bot = new TelegramApi(token, { polling: true });

const start = () => {
  void bot.setMyCommands([
    { command: "/check", description: "проверь свою железность" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendMessage(chatId, "АУФ, ЧЕРТИ");
    }

    if (text === "/check" || text === "/start") {
      const chosenFile = files[Math.floor(Math.random() * files.length)];
      const percent = Math.floor(Math.random() * 100).toFixed(0);

      await bot.sendPhoto(chatId, `public/images/${chosenFile}`);
      return await bot.sendMessage(chatId, `Ты железный на ${percent}%`);
    }
    return bot.sendMessage(chatId, "Ты че, волк????");
  });
};

start();
