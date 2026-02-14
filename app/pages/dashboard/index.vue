<template>
  <div class="min-h-screen bg-background pt-24 pb-12">
    <div class="container mx-auto px-4">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Панель управления</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Ваши <span class="text-primary italic">каналы</span>
          </h1>
        </div>
        
        <button @click="isAddModalOpen = true" class="group relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-primary text-white font-black rounded-2xl transition-all hover:shadow-[0_15px_30px_-5px_rgba(82,136,193,0.4)] active:scale-95">
          <Icon name="ph:plus-bold" class="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Добавить канал
        </button>
      </div>

      <!-- Channels Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-if="loading" class="col-span-full flex justify-center py-20">
          <Icon name="svg-spinners:ring-resize" class="w-10 h-10 text-primary" />
        </div>

        <!-- Empty State -->
        <div v-else-if="!channels.length" class="col-span-full py-24 flex flex-col items-center text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-secondary/20">
          <div class="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-muted-foreground mb-6">
            <Icon name="ph:broadcast-bold" class="w-10 h-10 opacity-20" />
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Ни одного канала не привязано</h3>
          <p class="text-muted-foreground max-w-sm">Добавьте свой первый канал, чтобы начать автоматизировать публикации с помощью AI.</p>
        </div>

        <!-- Channel Card -->
        <div v-for="channel in channels" :key="channel.id" 
             class="group relative p-8 bg-secondary/40 border border-white/10 rounded-[2.5rem] hover:border-primary/50 transition-all duration-500 overflow-hidden">
             <div class="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
             
             <div class="relative z-10">
               <div class="flex items-start justify-between mb-8">
                 <div class="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl font-black leading-none">
                   {{ channel.title?.charAt(0) || 'C' }}
                 </div>
                 <div class="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span class="text-[9px] font-black text-green-500 uppercase">Активен</span>
                 </div>
               </div>

               <h3 class="text-xl font-black text-white mb-1 group-hover:text-primary transition-colors">{{ channel.title }}</h3>
               <p class="text-muted-foreground text-sm font-medium mb-8">ID: {{ channel.chat_id }}</p>

               <div class="flex items-center justify-between pt-6 border-t border-white/5">
                  <div class="flex items-center gap-2">
                    <button 
                      @click="sendTestPost(channel)" 
                      :disabled="isPosting"
                      class="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
                    >
                      <Icon name="ph:paper-plane-tilt-bold" :class="{ 'animate-bounce': isPosting }" />
                      Запостить
                    </button>
                    <button @click="deleteChannel(channel.id)" class="p-3 bg-white/5 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <Icon name="ph:trash-bold" class="w-5 h-5" />
                    </button>
                  </div>
               </div>
             </div>
        </div>
      </div>
    </div>

    <!-- Add Channel Modal -->
    <div v-if="isAddModalOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-background/80 backdrop-blur-xl" @click="isAddModalOpen = false"></div>
      <div class="relative w-full max-w-lg bg-secondary border border-white/10 rounded-[2.5rem] p-10 overflow-hidden">
        <h2 class="text-3xl font-black text-white mb-4 tracking-tighter">Привязка канала</h2>
        <p class="text-muted-foreground mb-8 text-sm">Бот должен быть администратором канала с правами на публикацию.</p>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
            <span class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">1</span>
            <span class="text-sm">Добавьте <strong class="text-primary font-black">@posttva_bot</strong> в канал</span>
          </div>
          <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
            <span class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">2</span>
            <span class="text-sm">Перешлите пост из канала <strong class="text-white">боту в ЛС</strong></span>
          </div>
        </div>

        <div class="space-y-4 mb-6">
          <input v-model="newChannel.title" type="text" placeholder="Название канала (для вас)" class="w-full py-4 px-6 bg-background rounded-2xl border border-white/10 text-white focus:border-primary transition-all outline-none text-sm">
          <input v-model="newChannel.chat_id" type="text" placeholder="ID канала (например: -100...)" class="w-full py-4 px-6 bg-background rounded-2xl border border-white/10 text-white focus:border-primary transition-all outline-none text-sm">
        </div>

        <div class="flex gap-4">
          <button @click="isAddModalOpen = false" class="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">Отмена</button>
          <button @click="addChannel" :disabled="!newChannel.title || !newChannel.chat_id" class="flex-1 py-4 bg-primary text-white font-black rounded-2xl hover:shadow-lg transition-all disabled:opacity-50">Подключить</button>
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

const supabase = useSupabaseClient<any>()
const user = useSupabaseUser()
const channels = ref<any[]>([])
const loading = ref(true)
const isAddModalOpen = ref(false)
const isPosting = ref(false)

const newChannel = ref({
  title: '',
  chat_id: ''
})

async function fetchChannels() {
  loading.value = true
  const { data, error } = await supabase
    .from('telegram_channels')
    .select('*')
    .order('added_at', { ascending: false })
  
  if (data) channels.value = data
  loading.value = false
}

async function addChannel() {
  const { data, error } = await supabase
    .from('telegram_channels')
    .insert({
      owner_id: user.value?.id,
      chat_id: newChannel.value.chat_id,
      title: newChannel.value.title
    })
    .select()
    .single()

  if (error) {
    toast.error('Ошибка: ' + error.message)
  } else {
    toast.success('Канал успешно привязан!')
    channels.value.unshift(data)
    isAddModalOpen.value = false
    newChannel.value = { title: '', chat_id: '' }
  }
}

async function deleteChannel(id: string) {
  const { error } = await supabase
    .from('telegram_channels')
    .delete()
    .eq('id', id)

  if (!error) {
    channels.value = channels.value.filter(c => c.id !== id)
    toast.info('Канал удален')
  }
}

const sendTestPost = async (channel: any) => {
  isPosting.value = true
  try {
    const response: any = await $fetch('/api/telegram/post', {
      method: 'POST',
      body: {
        chat_id: channel.chat_id,
        text: `🚀 <b>Тестовый пост из POSTVA!</b>\n\nЭтот канал успешно подключен к системе.\n\n📅 <i>Дата: ${new Date().toLocaleString()}</i>`
      }
    })
    
    if (response.success) {
      toast.success('Пост успешно отправлен!')
    }
  } catch (e: any) {
    toast.error(e.data?.message || 'Ошибка отправки. Проверьте права бота в канале.')
  } finally {
    isPosting.value = false
  }
}

onMounted(() => {
  fetchChannels()
})
</script>
