<template>
  <div class="min-h-screen bg-background pt-24 pb-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-black text-white tracking-tighter mb-12">
        Настройки <span class="text-primary italic">профиля</span>
      </h1>

      <div class="grid grid-cols-1 gap-8">
        <div class="p-8 md:p-10 bg-secondary/30 border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
          <div class="flex flex-col md:flex-row items-center gap-8 border-b border-white/5 pb-10 mb-10">
            <div class="relative group">
              <div class="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img :src="user?.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg'" 
                   class="relative w-24 h-24 rounded-3xl object-cover border-2 border-white/10" alt="Avatar">
            </div>
            
            <div class="text-center md:text-left">
              <h2 class="text-2xl font-black text-white mb-1">{{ user?.user_metadata?.full_name || 'Пользователь' }}</h2>
              <p class="text-muted-foreground font-medium mb-6">{{ user?.email }}</p>
              
              <div class="flex flex-wrap gap-3 justify-center md:justify-start">
                <div class="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                  Personal Account
                </div>
                <div class="px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black text-accent uppercase tracking-widest">
                  PRO Plan Active
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-[#24A1DE]/20 flex items-center justify-center text-[#24A1DE]">
                <Icon name="logos:telegram" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-black text-white">Привязка Telegram</h3>
            </div>

            <div v-if="!profile?.telegram_user_id" class="p-8 rounded-3xl bg-[#24A1DE]/10 border border-[#24A1DE]/20 text-center">
              <p class="text-slate-300 mb-8 max-w-sm mx-auto leading-relaxed">
                Привяжите свой Telegram аккаунт, чтобы бот мог проверить ваши права администратора в каналах.
              </p>

              <div id="telegram-widget-container" class="inline-block relative">
                 <div class="py-4 px-8 bg-[#24A1DE] text-white font-bold rounded-2xl animate-pulse">
                   Загрузка виджета...
                 </div>
              </div>
            </div>

            <div v-else class="flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl bg-green-500/10 border border-green-500/20 gap-4">
               <div class="flex items-center gap-4">
                 <div class="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500">
                   <Icon name="ph:check-circle-fill" class="w-8 h-8" />
                 </div>
                 <div>
                   <div class="text-white font-black">Telegram привязан</div>
                   <div class="text-xs text-muted-foreground font-medium">ID: {{ profile.telegram_user_id }}</div>
                 </div>
               </div>
               <button @click="unlinkTelegram" class="text-xs font-bold text-red-400/60 hover:text-red-400 transition-colors uppercase tracking-widest">Отвязать аккаунт</button>
            </div>
          </div>
        </div>

        <div class="p-8 md:p-10 bg-secondary/30 border border-white/5 rounded-[2.5rem] backdrop-blur-xl opacity-50">
           <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                <Icon name="ph:shield-warning-fill" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-black text-white">Безопасность</h3>
            </div>
            <p class="text-muted-foreground text-sm">Ваши OAuth сессии активны. Дополнительные настройки безопасности скоро будут доступны.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const supabase = useSupabaseClient<any>()
const userId = computed(() => (user.value as any)?.sub || user.value?.id || null)
const profile = ref<any>(null)

watch(userId, async (id) => {
  if (!id) {
    profile.value = null
    return
  }

  await fetchProfile()
  if (!profile.value?.telegram_user_id) {
    injectTelegramWidget()
  }
}, { immediate: true })

async function fetchProfile() {
  if (!userId.value) return

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId.value)
      .maybeSingle()
    
    if (data) {
      profile.value = data
    } else if (userId.value) {
      // Create profile record if it doesn't exist
      const { data: newProfile } = await supabase
        .from('profiles')
        .upsert({ id: userId.value })
        .select()
        .single()
      if (newProfile) profile.value = newProfile
    }
  } catch (e) {
    console.error('Profile fetch error:', e)
  }
}

function injectTelegramWidget() {
  const container = document.getElementById('telegram-widget-container')
  if (!container) return
  
  container.innerHTML = ''

  ;(window as any).onTelegramAuth = (tgUser: any) => {
    alert(
      'Logged in as ' +
      tgUser.first_name +
      ' ' +
      tgUser.last_name +
      ' (' +
      tgUser.id +
      (tgUser.username ? ', @' + tgUser.username : '') +
      ')'
    )
  }

  const script = document.createElement('script')
  script.async = true
  script.src = "https://telegram.org/js/telegram-widget.js?22"

  script.setAttribute('data-telegram-login', 'posttva_bot')
  script.setAttribute('data-size', 'large')
  script.setAttribute('data-radius', '12')
  script.setAttribute('data-onauth', 'onTelegramAuth(user)')
  script.setAttribute('data-request-access', 'write')
  
  container.appendChild(script)
}

async function unlinkTelegram() {
  if (!userId.value) return

  const { error } = await supabase
    .from('profiles')
    .update({ telegram_user_id: null })
    .eq('id', userId.value)
  
  if (!error) {
    if (profile.value) profile.value.telegram_user_id = null
    toast.info('Telegram отвязан')
    nextTick(() => injectTelegramWidget())
  }
}
</script>

