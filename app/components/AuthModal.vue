<script setup lang="ts">
const isOpen = ref(false)
const supabase = useSupabaseClient()

const login = async (provider: 'google' | 'discord' | 'github') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin
    }
  })
  if (error) {
    console.error('Login error:', error.message)
    // Here logic can be added for notification
  }
}

defineExpose({
  open: () => (isOpen.value = true),
  close: () => (isOpen.value = false)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-background/80 backdrop-blur-xl animate-fade-in" @click="isOpen = false"></div>
      
      <!-- Modal -->
      <div class="relative w-full max-w-md bg-secondary/50 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-2xl shadow-2xl animate-modal-in overflow-hidden">
        <!-- Abstract gradient inside modal -->
        <div class="absolute -top-[20%] -right-[20%] w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
        
        <div class="relative z-10 text-center">
          <div class="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary">
            <Icon name="ph:lock-keyhole-fill" class="w-10 h-10" />
          </div>
          
          <h2 class="text-3xl font-black text-white mb-4 tracking-tighter">Добро пожаловать</h2>
          <p class="text-muted-foreground mb-10 text-lg leading-relaxed">
            Войдите в систему, чтобы получить полный доступ к автоматизации ваших каналов.
          </p>
          
          <div class="flex flex-col gap-4">
            <!-- Google -->
            <button @click="login('google')" 
                    class="flex items-center justify-center gap-4 py-4 px-6 bg-white text-black hover:bg-neutral-100 transition-all rounded-2xl font-bold shadow-lg active:scale-95 group">
              <Icon name="logos:google-icon" class="w-6 h-6 group-hover:scale-110 transition-transform" />
              Продолжить через Google
            </button>
            
            <!-- Discord -->
            <button @click="login('discord')" 
                    class="flex items-center justify-center gap-4 py-4 px-6 bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all rounded-2xl font-bold shadow-lg active:scale-95 group">
              <Icon name="logos:discord-icon" class="w-6 h-6 group-hover:scale-110 transition-transform" />
              Продолжить через Discord
            </button>
            
            <!-- GitHub -->
            <button @click="login('github')" 
                    class="flex items-center justify-center gap-4 py-4 px-6 bg-[#24292F] text-white hover:bg-[#1A1E23] transition-all rounded-2xl font-bold border border-white/5 shadow-lg active:scale-95 group">
              <Icon name="logos:github-icon" class="w-6 h-6 invert group-hover:scale-110 transition-transform" />
              Продолжить через GitHub
            </button>
          </div>
          
          <p class="mt-8 text-xs text-muted-foreground/60 uppercase tracking-widest font-bold">
            Безопасно через Supabase &copy;
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
.animate-modal-in { animation: modal-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>
