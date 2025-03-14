<script lang="ts">
  import type { HTMLInputTypeAttribute } from "svelte/elements";

  export let name: string;
  export let value: string | undefined;
  export let disabled: boolean;
  export let type: HTMLInputTypeAttribute;
  export const label = name[0].toUpperCase() + name.slice(1);
</script>

<div class="flex items-center px-3 py-2 gap-3 bg-yellow-200 rounded-md">
  <p class="font-bold">{label}:</p>
  <input
    class="w-full bg-transparent outline-none font-medium text-neutral-600 placeholder:text-neutral-400"
    {disabled}
    {type}
    {name}
    placeholder="none"
    value={value || ""}
  />
</div>
