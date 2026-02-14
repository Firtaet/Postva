import { Bot, InlineKeyboard } from "grammy";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "..", ".env") });

const botToken = process.env.MPEGAS_BOT_API_TELEGRAM;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!botToken || !supabaseUrl || !supabaseKey) {
    console.error("❌ Missing environment variables in .env");
    process.exit(1);
}

const bot = new Bot(botToken);
const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_ID = 8251235965;

bot.use(async (ctx, next) => {
    if (ctx.from?.id !== ADMIN_ID) {
        if (ctx.message?.text === "/start") {
            await ctx.reply("⛔ У вас нет доступа к этой админ-панели.");
        }
        return;
    }
    await next();
});

bot.command("start", async (ctx) => {
    await ctx.reply("👑 *Админ-панель POSTVA (Steam Gifts)*", {
        parse_mode: "Markdown",
        reply_markup: new InlineKeyboard().text("📋 Список заявок", "list_gifts")
    });
});

bot.callbackQuery("list_gifts", async (ctx) => {
    const { data, error } = await supabase
        .from("steam_gifts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) return ctx.reply("Ошибка БД: " + error.message);
    if (!data?.length) return ctx.reply("Заявок пока нет.");

    await ctx.answerCallbackQuery();

    for (const gift of data) {
        const status = gift.is_sent ? "✅ Отправлено" : "⏳ Ожидает";
        const keyboard = new InlineKeyboard()
            .text(gift.is_sent ? "❌ Снять отметку" : "✅ Отметить: Отправлено", `toggle_${gift.id}`);

        await ctx.reply(`
📬 *Заявка*
📧 Email: ${gift.user_email}
🔗 Ссылка: ${gift.trade_link}
📊 Статус: ${status}
    `, { parse_mode: "Markdown", reply_markup: keyboard });
    }
});

bot.callbackQuery(/^toggle_(.+)$/, async (ctx) => {
    const id = ctx.match[1];

    // Получаем текущее состояние
    const { data: current } = await supabase
        .from("steam_gifts")
        .select("is_sent")
        .eq("id", id)
        .single();

    if (!current) return ctx.reply("Заявка не найдена.");

    const { error } = await supabase
        .from("steam_gifts")
        .update({ is_sent: !current.is_sent })
        .eq("id", id);

    if (error) return ctx.reply("Ошибка обновления: " + error.message);

    await ctx.answerCallbackQuery("Статус обновлен!");
    await ctx.editMessageText(ctx.callbackQuery.message.text.replace(
        current.is_sent ? "✅ Отправлено" : "⏳ Ожидает",
        !current.is_sent ? "✅ Отправлено" : "⏳ Ожидает"
    ), {
        reply_markup: new InlineKeyboard()
            .text(!current.is_sent ? "❌ Снять отметку" : "✅ Отметить: Отправлено", `toggle_${id}`)
    });
});

bot.start();
console.log("👑 Admin Bot (bot2) started...");
