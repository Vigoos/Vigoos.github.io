<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-teal-500 selection:text-white">
    <AppHeader />
    
    <main>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>