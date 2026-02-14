import { Bot } from "grammy";
import * as dotenv from "dotenv";
import path from "path";

// Load .env from root
dotenv.config({ path: path.join(process.cwd(), "..", ".env") });

const token = process.env.POSTTVA_BOT_API_TELEGRAM;

if (!token) {
    console.error("❌ Error: POSTTVA_BOT_API_TELEGRAM is not defined in .env");
    process.exit(1);
}

const bot = new Bot(token);

// Commands
bot.command("start", (ctx) => {
    ctx.reply(`
🚀 *Добро пожаловать в POSTVA Bot!*

Я помогу тебе связать твои Telegram каналы с сервисом POSTVA для автоматического постинга.

*Как привязать канал:*
1. Добавь меня в администраторы твоего канала.
2. Дай мне права на "Публикацию сообщений".
3. Перешли любое сообщение из этого канала мне в личку.

Я пришлю тебе ID канала, который нужно будет вставить в панели управления.
  `, { parse_mode: "Markdown" });
});

// Handle forwarded messages to get Chat ID
bot.on("message:forward_origin", (ctx) => {
    const origin = ctx.message.forward_origin;

    if (origin.type === "channel") {
        const chatId = origin.chat.id;
        const chatTitle = origin.chat.title;

        ctx.reply(`
✅ *Канал распознан!*

*Название:* ${chatTitle}
*ID:* \`${chatId}\`

Скопируйте этот ID и вставьте его в соответствующее поле на сайте в разделе Dashboard.
    `, { parse_mode: "Markdown" });
    } else {
        ctx.reply("❌ Пожалуйста, перешлите сообщение именно из *публичного или приватного канала*.");
    }
});

// Help command
bot.command("help", (ctx) => {
    ctx.reply("Просто добавьте бота в канал и перешлите сообщение из него здесь.");
});

// Errors
bot.catch((err) => {
    console.error("Bot error:", err);
});

console.log("🚀 POSTVA Bot is running...");
bot.start();
