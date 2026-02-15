<script setup lang="ts">
import { toast } from 'vue-sonner'

const user = useSupabaseUser()
const tradeLink = ref('')
const totalClaimed = ref(0)
const maxCount = 10
const loading = ref(true)
const submitting = ref(false)
const userGiftStatus = ref<any>(null)

onMounted(async () => {
  await fetchStatus()
})

async function fetchStatus() {
  loading.value = true
  try {
    const data: any = await $fetch('/api/steam/status')
    totalClaimed.value = data.total_count
    userGiftStatus.value = data.user_status
  } catch (e) {
    console.error('Failed to fetch status')
  } finally {
    loading.value = false
  }
}

const isStep1Done = computed(() => !!user.value)
const isStep2Done = computed(() => {
  const steamRegex = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9_-]+$/
  return steamRegex.test(tradeLink.value)
})

const canClaim = computed(() => {
  return isStep1Done.value && isStep2Done.value && !userGiftStatus.value && totalClaimed.value < maxCount
})

const claimGift = async () => {
  if (!canClaim.value) return

  submitting.value = true

  try {
    const response: any = await $fetch('/api/steam/submit', {
      method: 'POST',
      body: { trade_link: tradeLink.value }
    })

    if (response.success) {
      toast.success('Заявка принята!', {
        description: 'Подарок будет отправлен в течение 24 часов после проверки.'
      })
      await fetchStatus()
    }
  } catch (e: any) {
    toast.error(e.data?.message || 'Ошибка при отправке заявки')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="relative min-h-screen bg-[#0b0e14] text-white selection:bg-orange-500/30 overflow-hidden">
    <div class="fixed inset-0 z-0">
      <div class="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
      <div class="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>

    <div class="container relative z-10 mx-auto px-4 pt-32 pb-24 max-w-5xl">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
         <Icon name="svg-spinners:ring-resize" class="w-12 h-12 text-orange-500" />
      </div>
      
      <div v-else class="flex flex-col lg:flex-row gap-16 items-center">
        <div class="flex-1 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-black tracking-widest uppercase border rounded-full bg-orange-500/10 border-orange-500/20 text-orange-500">
            {{ totalClaimed >= maxCount ? 'Event Ended' : 'Limited Time Offer' }}
          </div>
          <h1 class="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight text-white">
            Получи <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-600">3 наклейки</span> <br/> CS2 бесплатно
          </h1>
          <p class="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Мы стимулируем новых администраторов! Выполните простые шаги и получите подарочный набор наклеек. 
          </p>

          <div class="inline-flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl mb-12">
            <div class="relative w-16 h-16 flex items-center justify-center">
              <svg class="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4" fill="transparent" class="text-white/10" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4" fill="transparent" class="text-orange-500" 
                        stroke-dasharray="175" :stroke-dashoffset="175 - (175 * totalClaimed / maxCount)" stroke-linecap="round" />
              </svg>
              <span class="absolute text-xl font-black">{{ maxCount - totalClaimed }}</span>
            </div>
            <div>
              <div class="text-white font-black uppercase text-xs tracking-widest mb-1">Осталось подарков</div>
              <div class="text-slate-400 text-sm font-bold">Выдано {{ totalClaimed }} из {{ maxCount }}</div>
            </div>
          </div>
        </div>

        <div class="w-full max-w-[450px]">
          <div class="p-8 md:p-10 rounded-[2.5rem] bg-slate-900/50 border border-white/5 backdrop-blur-2xl shadow-2xl">
            
            <div v-if="userGiftStatus" class="text-center py-10">
               <div class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mx-auto mb-6">
                 <Icon name="ph:check-bold" class="w-10 h-10" />
               </div>
               <h2 class="text-2xl font-black text-white mb-2">Заявка принята!</h2>
               <p class="text-slate-400 text-sm">
                 {{ userGiftStatus.is_sent ? 'Подарок уже отправлен в Steam. Проверьте входящие предложения обмена!' : 'Ожидайте отправки в течение дня. Мы сообщим вам!' }}
               </p>
            </div>

            <div v-else-if="totalClaimed >= maxCount" class="text-center py-10">
               <div class="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mx-auto mb-6">
                 <Icon name="ph:x-bold" class="w-10 h-10" />
               </div>
               <h2 class="text-2xl font-black text-white mb-2">Акция завершена</h2>
               <p class="text-slate-400 text-sm">Все 10 подарков были успешно выданы. Подписывайтесь на наши соцсети, чтобы не пропустить следующий розыгрыш!</p>
            </div>

            <div v-else>
              <h2 class="text-2xl font-black mb-8 tracking-tighter">Действия</h2>
              
              <div class="space-y-6">
                <div class="p-6 rounded-2xl border transition-all duration-300"
                     :class="isStep1Done ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/10'">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
                           :class="isStep1Done ? 'bg-green-500/20 text-green-500' : 'bg-white/10 text-white'">1</div>
                      <span class="font-bold text-sm" :class="isStep1Done ? 'text-green-500' : 'text-white'">Регистрация в POSTVA</span>
                    </div>
                    <Icon v-if="isStep1Done" name="ph:check-circle-fill" class="w-6 h-6 text-green-500" />
                  </div>
                  <p class="text-xs text-slate-400 leading-relaxed mb-4">
                    Создайте аккаунт, чтобы мы могли отправить подарок.
                  </p>
                  <NuxtLink v-if="!isStep1Done" to="/login" class="inline-block py-2 px-6 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
                    Войти
                  </NuxtLink>
                </div>

                <div class="p-6 rounded-2xl border transition-all duration-300"
                     :class="isStep2Done ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/10'">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
                           :class="isStep2Done ? 'bg-green-500/20 text-green-500' : 'bg-white/10 text-white'">2</div>
                      <span class="font-bold text-sm" :class="isStep2Done ? 'text-green-500' : 'text-white'">Ссылка на обмен Steam</span>
                    </div>
                    <Icon v-if="isStep2Done" name="ph:check-circle-fill" class="w-6 h-6 text-green-500" />
                  </div>
                  <input 
                    v-model="tradeLink"
                    type="text" 
                    placeholder="https://steamcommunity.com/tradeoffer/new/..." 
                    class="w-full py-3 px-4 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-all mb-4"
                  />
                  <a href="https://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url" target="_blank" class="text-[10px] text-orange-500/60 hover:text-orange-500 underline uppercase font-bold tracking-widest">
                    Где взять ссылку?
                  </a>
                </div>

                <button 
                  @click="claimGift"
                  :disabled="!canClaim || submitting"
                  class="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-500 active:scale-95 flex items-center justify-center gap-3"
                  :class="canClaim && !submitting ? 'bg-gradient-to-r from-orange-400 to-yellow-600 text-black shadow-lg shadow-orange-500/20' : 'bg-white/10 text-white/40 cursor-not-allowed'"
                >
                  <Icon v-if="submitting" name="svg-spinners:ring-resize" class="w-5 h-5" />
                  <template v-else>
                    <span>Получить подарок</span>
                    <Icon name="ph:gift-bold" class="w-5 h-5" />
                  </template>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}
</style>
