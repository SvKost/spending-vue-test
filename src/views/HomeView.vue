<script setup></script>

<template>
  <div class="relative w-full p-2 sm:p-4">
    <h1
      class="text-center font-bold mb-2 sm:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl px-2 sm:px-4 md:px-6 lg:px-8 leading-snug sm:leading-normal mx-auto max-w-4xl"
    >
      ТОП-10 транзакцій за даними Державної казначейської служби України
    </h1>
    <picture class="block w-full">
      <source
        srcset="../assets/img/main-img.webp"
        type="image/webp"
        media="(min-width: 640px)"
      />
      <source
        srcset="../assets/img/main-img.jpg"
        type="image/jpeg"
        media="(min-width: 640px)"
      />
      <img
        class="object-contain w-full max-h-[60vh] sm:max-h-[75vh] mx-auto"
        alt="Gadgets for calculations"
        loading="lazy"
        src="../assets/img/main-img.jpg"
      />
    </picture>
  </div>
</template>
