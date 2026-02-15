<template>
  <div class="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-primary/10 rounded-full blur-[110px] animate-pulse delay-1000"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(82,136,193,0.05)_1px,transparent_0)] bg-[size:30px_30px]"></div>
    </div>

    <div class="container relative z-10 mx-auto px-4 pt-32 pb-24">
      <div class="max-w-3xl mx-auto">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 group">
          <Icon name="ph:arrow-left-bold" class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span class="text-xs font-black uppercase tracking-widest">Вернуться</span>
        </NuxtLink>

        <div class="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-12">
          <p class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Support</p>
          <h1 class="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">Contact Us</h1>
          <p class="text-muted-foreground text-lg leading-relaxed mb-10">
            Если есть вопросы, предложения или нужна помощь, напишите на почту ниже.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 sm:items-center p-4 rounded-2xl bg-background/60 border border-white/10 mb-6">
            <a
              :href="`mailto:${email}`"
              class="flex-1 font-bold text-white text-base md:text-lg break-all hover:text-accent transition-colors"
            >
              {{ email }}
            </a>
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
              @click="copyEmail"
            >
              <Icon :name="copied ? 'ph:check-bold' : 'ph:copy-bold'" class="w-4 h-4" />
              {{ copied ? 'Скопировано' : 'Копировать' }}
            </button>
          </div>

          <a
            :href="`mailto:${email}`"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 bg-accent/10 text-accent text-sm font-black uppercase tracking-wider hover:bg-accent/20 transition-colors"
          >
            <Icon name="ph:paper-plane-tilt-bold" class="w-4 h-4" />
            Написать на почту
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = 'postva999@gmail.com'
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true

    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}

onBeforeUnmount(() => {
  if (resetTimer) clearTimeout(resetTimer)
})

useSeoMeta({
  title: 'Contact Us | POSTVA',
  description: 'Свяжитесь с POSTVA по электронной почте.',
})
</script>
