<template>
  <div class="relative min-h-screen bg-background text-white pt-24 pb-20 overflow-hidden">
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-[-25%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-primary/20 blur-[150px]"></div>
      <div class="absolute top-[-15%] right-[-8%] w-[45vw] h-[45vw] rounded-full bg-accent/15 blur-[140px]"></div>
      <div class="absolute bottom-[-25%] right-[8%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[170px]"></div>
      <div class="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:52px_52px]"></div>
    </div>

    <div class="container mx-auto px-4 max-w-[1400px]">
      <div class="mb-10 md:mb-14">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] uppercase rounded-full bg-primary/10 border border-primary/20 text-primary">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Email Newsletter
        </div>
        <h1 class="text-4xl md:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.95]">
          Подписка на <span class="text-primary italic">рассылку</span>
        </h1>
        <p class="mt-6 text-slate-300/80 text-base md:text-lg max-w-3xl leading-relaxed">
          Получайте важные обновления продукта и новые релизы. Для подписки используется email вашего аккаунта.
        </p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-8 items-stretch">
        <div class="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 md:p-12 backdrop-blur-2xl shadow-[0_30px_90px_-45px_rgba(82,136,193,0.6)]">
          <div class="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-3">Email аккаунта</div>
          <div class="text-xl md:text-3xl font-black break-all mb-10">
            {{ accountEmail || 'Email не найден' }}
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <button
              @click="subscribe"
              :disabled="submitting || unsubmitting || subscribed || !accountEmail"
              class="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all"
              :class="subscribed ? 'bg-green-500/20 border border-green-500/30 text-green-400 cursor-default' : 'bg-primary text-white hover:shadow-[0_15px_35px_-10px_rgba(82,136,193,0.75)] active:scale-[0.98]'"
            >
              <span v-if="submitting" class="inline-flex items-center gap-2">
                <Icon name="svg-spinners:ring-resize" class="w-4 h-4" />
                Подписываем...
              </span>
              <span v-else-if="subscribed">Вы уже подписаны</span>
              <span v-else>Подписаться</span>
            </button>

            <button
              @click="unsubscribe"
              :disabled="unsubmitting || submitting || !subscribed"
              class="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border transition-all disabled:opacity-50"
              :class="subscribed ? 'border-red-400/30 text-red-300 bg-red-400/10 hover:bg-red-400/15' : 'border-white/10 text-white/40 bg-white/5 cursor-not-allowed'"
            >
              <span v-if="unsubmitting" class="inline-flex items-center gap-2">
                <Icon name="svg-spinners:ring-resize" class="w-4 h-4" />
                Отписываем...
              </span>
              <span v-else>Отписаться</span>
            </button>
          </div>

          <p class="mt-7 text-sm text-muted-foreground max-w-2xl">
            По кнопке подписки email аккаунта добавляется в базу рассылки. В любой момент можно отписаться.
          </p>
        </div>

        <div class="rounded-[2.5rem] border border-white/10 bg-secondary/30 p-8 md:p-10 backdrop-blur-2xl">
          <div class="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-4">Статус</div>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-3 h-3 rounded-full" :class="subscribed ? 'bg-green-500' : 'bg-orange-400'"></div>
            <div class="font-black text-lg">{{ subscribed ? 'Подписка активна' : 'Не подписан' }}</div>
          </div>

          <div v-if="loading" class="text-sm text-muted-foreground">Загрузка статуса...</div>
          <div v-else-if="subscribedAt" class="text-sm text-muted-foreground">
            Дата подписки: {{ formatDate(subscribedAt) }}
          </div>
          <div v-else class="text-sm text-muted-foreground">
            Подпишитесь, чтобы получать продуктовые новости.
          </div>
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
const accountEmail = computed(() => user.value?.email?.trim().toLowerCase() || '')

const loading = ref(true)
const submitting = ref(false)
const unsubmitting = ref(false)
const subscribed = ref(false)
const subscribedAt = ref<string | null>(null)

function formatDate(value: string) {
  return new Date(value).toLocaleString()
}

async function refreshStatus() {
  loading.value = true
  try {
    const response: any = await $fetch('/api/newsletter/status')
    subscribed.value = !!response?.subscribed
    subscribedAt.value = response?.subscribed_at || null
  } catch (e: any) {
    toast.error(e?.data?.message || 'Не удалось получить статус подписки')
  } finally {
    loading.value = false
  }
}

async function subscribe() {
  if (!accountEmail.value || subscribed.value) return

  submitting.value = true
  try {
    const response: any = await $fetch('/api/newsletter/subscribe', {
      method: 'POST'
    })

    if (response?.success) {
      subscribed.value = true
      subscribedAt.value = response?.data?.created_at || subscribedAt.value || new Date().toISOString()
      toast.success(response?.already_subscribed ? 'Вы уже подписаны на рассылку' : 'Подписка оформлена')
    }
  } catch (e: any) {
    toast.error(e?.data?.message || 'Ошибка при подписке')
  } finally {
    submitting.value = false
  }
}

async function unsubscribe() {
  if (!subscribed.value) return

  unsubmitting.value = true
  try {
    const response: any = await $fetch('/api/newsletter/unsubscribe', {
      method: 'POST'
    })

    if (response?.success) {
      subscribed.value = false
      subscribedAt.value = null
      toast.success('Вы отписались от рассылки')
    }
  } catch (e: any) {
    toast.error(e?.data?.message || 'Ошибка при отписке')
  } finally {
    unsubmitting.value = false
  }
}

onMounted(() => {
  refreshStatus()
})
</script>
