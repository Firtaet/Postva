import { Bot, InlineKeyboard } from "grammy";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "..", ".env") });

const botToken = process.env.MPEGAS_BOT_API_TELEGRAM;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAdminKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!botToken || !supabaseUrl || !supabaseAdminKey) {
  console.error(
    "Missing environment variables in .env. Required: MPEGAS_BOT_API_TELEGRAM, SUPABASE_URL, SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)."
  );
  process.exit(1);
}

const bot = new Bot(botToken);
const supabase = createClient(supabaseUrl, supabaseAdminKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const ADMIN_ID = 8251235965;

bot.use(async (ctx, next) => {
  if (ctx.from?.id !== ADMIN_ID) {
    if (ctx.message?.text === "/start") {
      await ctx.reply("У вас нет доступа к этой админ-панели.");
    }
    return;
  }

  await next();
});

bot.command("start", async (ctx) => {
  await ctx.reply("Админ-панель POSTVA", {
    reply_markup: new InlineKeyboard()
      .text("Список заявок Steam", "list_gifts")
      .row()
      .text("Подписчики рассылки", "newsletter_menu")
  });
});

bot.callbackQuery("newsletter_menu", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Раздел рассылки:", {
    reply_markup: new InlineKeyboard()
      .text("Показать всех", "newsletter_list")
      .row()
      .text("Подсчитать общее число", "newsletter_count")
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
    const status = gift.is_sent ? "Отправлено" : "Ожидает";
    const keyboard = new InlineKeyboard().text(
      gift.is_sent ? "Снять отметку" : "Отметить: Отправлено",
      `toggle_${gift.id}`
    );

    await ctx.reply(
      `Заявка\nEmail: ${gift.user_email}\nСсылка: ${gift.trade_link}\nСтатус: ${status}`,
      { reply_markup: keyboard }
    );
  }
});

bot.callbackQuery(/^toggle_(.+)$/, async (ctx) => {
  const id = ctx.match[1];

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

  await ctx.answerCallbackQuery("Статус обновлен");
  await ctx.editMessageText(
    ctx.callbackQuery.message.text.replace(
      current.is_sent ? "Отправлено" : "Ожидает",
      !current.is_sent ? "Отправлено" : "Ожидает"
    ),
    {
      reply_markup: new InlineKeyboard().text(
        !current.is_sent ? "Снять отметку" : "Отметить: Отправлено",
        `toggle_${id}`
      )
    }
  );
});

bot.callbackQuery("newsletter_count", async (ctx) => {
  const { count, error } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true });

  if (error) return ctx.reply("Ошибка БД: " + error.message);

  await ctx.answerCallbackQuery();
  await ctx.reply(`Всего подписчиков рассылки: ${count || 0}`);
});

bot.callbackQuery("newsletter_list", async (ctx) => {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("email, created_at")
    .order("created_at", { ascending: false });

  if (error) return ctx.reply("Ошибка БД: " + error.message);
  if (!data?.length) return ctx.reply("Подписчиков пока нет.");

  await ctx.answerCallbackQuery();

  const lines = data.map((item, index) => {
    const date = item.created_at ? new Date(item.created_at).toLocaleString("ru-RU") : "-";
    return `${index + 1}. ${item.email} (${date})`;
  });

  const chunkSize = 80;
  for (let i = 0; i < lines.length; i += chunkSize) {
    const chunk = lines.slice(i, i + chunkSize).join("\n");
    await ctx.reply(`Подписчики рассылки:\n${chunk}`);
  }
});

bot.start();
console.log("Admin Bot (bot2) started...");
