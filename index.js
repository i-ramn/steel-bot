const TelegramApi = require("node-telegram-bot-api");

const fs = require("fs");
const files = fs.readdirSync("public/images");

const token = "5703860431:AAGfBM38uS9xGIkLmZq3bcV1B-cm_6dDScQ";

const bot = new TelegramApi(token, { polling: true });

const START = "/start@nejeleznij_bot";
const CHECK = "/check@nejeleznij_bot";

const start = () => {
  void bot.setMyCommands([
    { command: START, description: "Стартуем проверочку" },
    {
      command: CHECK,
      description: "Проверь свою железность",
    },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === START) {
      return await bot.sendMessage(chatId, "АУФ, ЧЕРТИ");
    }

    if (text === CHECK) {
      const chosenFile = files[Math.floor(Math.random() * files.length)];
      const percent = Math.floor(Math.random() * 100).toFixed(0);

      await bot.sendMessage(chatId, `Ты железный на ${percent}%`);
      return await bot.sendPhoto(chatId, `public/images/${chosenFile}`);
    }
    return await bot.sendMessage(chatId, "ты че волк???");
  });
};

start();
