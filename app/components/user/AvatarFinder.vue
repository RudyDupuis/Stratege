<script setup lang="ts">
import MrPawn1Svg from "./avatar/mr-pawns/MrPawn1Svg.vue";
import MrPawn2Svg from "./avatar/mr-pawns/MrPawn2Svg.vue";
import MrPawn3Svg from "./avatar/mr-pawns/MrPawn3Svg.vue";
import MrPawn4Svg from "./avatar/mr-pawns/MrPawn4Svg.vue";
import MrPawn5Svg from "./avatar/mr-pawns/MrPawn5Svg.vue";
import MrPawn6Svg from "./avatar/mr-pawns/MrPawn6Svg.vue";

const props = defineProps<{
  avatarId: number;
}>();

const avatars = [
  MrPawn1Svg,
  MrPawn2Svg,
  MrPawn3Svg,
  MrPawn4Svg,
  MrPawn5Svg,
  MrPawn6Svg
];
const currentAvatar = computed(() => avatars[props.avatarId - 1]);

defineExpose({ avatars });
</script>
<template>
  <component :is="currentAvatar" />
</template>
