<template>
  <div class="chain-cards d-flex flex-column justify-content-between">
    <img
      :src="
        props.type === 'gif'
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${props.id}.gif`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`
      "
      alt="Image of a pokemon"
    />
    <div class="bottom-shadow"></div>
    <p v-if="props.name">{{ props.name.toUpperCase() }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  id: Number,
  type: String | null,
});
</script>

<style lang="scss" scoped>
@import "../style";

$offset: -8px;

.chain-cards {
  width: 100px;
}

.chain-cards p {
  position: relative;
  top: $offset;
  color: $white;
  text-align: center;
}

.chain-cards img {
  position: relative;
  z-index: 1;
  align-self: center;
  width: 50px;
  height: 50px;
}

.bottom-shadow {
  position: relative;
  top: $offset;
  align-self: center;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.489);
  width: 65%;
  height: 15px;
}
</style>
