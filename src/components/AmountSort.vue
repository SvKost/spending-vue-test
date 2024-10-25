<template>
  <div>
    <select v-model="store.sortOrder" class="border p-2 rounded">
      <option value="desc">Сортувати за спаданням</option>
      <option value="asc">Сортувати за зростанням</option>
    </select>
  </div>
</template>
