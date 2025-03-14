<script lang="ts">
  import "../../app.css";
  import {
    MODULE_ADDR,
    getPageResource,
    type PageResource,
  } from "$lib/utils.js";
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { addressStore } from "$lib/addressStore";
  import { goto } from "$app/navigation";
  import Input from "$lib/Input.svelte";

  export let data;

  let pageResource: PageResource | null = null;

  let isLoaded = false;

  $: isUsersPage = data.address === $addressStore;

  onMount(async () => {
    MODULE_ADDR;
    pageResource = await getPageResource(data.address);
    isLoaded = true;

    addressStore.autoConnectIfAllowed();
    addressStore.listenAccountChange();
  });

  async function onSubmit(
    e: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) {
    e.preventDefault();
    if (!isUsersPage) return;
    const formData = new FormData(e.currentTarget);
    await addressStore.setupPage({
      name: formData.get("name")?.toString() || "",
      website: formData.get("website")?.toString() || "",
      twitter: formData.get("twitter")?.toString() || "",
      facebook: formData.get("facebook")?.toString() || "",
      instagram: formData.get("instagram")?.toString() || "",
      youtube: formData.get("youtube")?.toString() || "",
      tiktok: formData.get("tiktok")?.toString() || "",
    });
  }
</script>

<svelte:head>
  <title>
    {pageResource ? `Page of ${pageResource.name}` : "Aptos Landing"}
  </title>
</svelte:head>

<header class="flex items-center justify-between h-14 px-4 bg-yellow-200">
  <a
    class="text-xl font-bold"
    target="_blank"
    href="https://github.com/BerzanXYZ/aptos-landing-interface"
  >
    Aptos Landing
  </a>

  {#if $addressStore && !isUsersPage}
    <a
      class="flex items-center h-8 px-3 rounded-md font-bold bg-yellow-400 hover:bg-yellow-500 hover:scale-95 duration-150"
      href="{base}/{$addressStore}"
    >
      Go To Your Own Page
    </a>
  {:else if !$addressStore}
    <button
      on:click={addressStore.connect}
      class="h-8 px-3 rounded-md text-lg font-bold bg-yellow-400 hover:bg-yellow-500 hover:scale-95 duration-150"
    >
      Connect
    </button>
  {:else}
    <p class="flex items-center h-8 px-3 rounded-md font-bold bg-yellow-400">
      It's Your Own Page
    </p>
  {/if}
</header>

<main class="flex justify-center px-4 py-8">
  {#if isLoaded}
    <form
      class="flex flex-col w-full max-w-xl gap-3 sm:gap-4"
      on:submit={onSubmit}
    >
      <Input
        name="name"
        type="text"
        value={pageResource?.name}
        disabled={!isUsersPage}
      />
      <Input
        name="website"
        type="url"
        value={pageResource?.website}
        disabled={!isUsersPage}
      />
      <Input
        name="twitter"
        type="text"
        value={pageResource?.twitter}
        disabled={!isUsersPage}
      />
      <Input
        name="facebook"
        type="text"
        value={pageResource?.facebook}
        disabled={!isUsersPage}
      />
      <Input
        name="instagram"
        type="text"
        value={pageResource?.instagram}
        disabled={!isUsersPage}
      />
      <Input
        name="youtube"
        type="url"
        value={pageResource?.youtube}
        disabled={!isUsersPage}
      />
      <Input
        name="tiktok"
        type="text"
        value={pageResource?.tiktok}
        disabled={!isUsersPage}
      />
      {#if isUsersPage}
        <button
          class="self-end h-8 px-3 rounded-md text-lg font-bold bg-yellow-400 hover:bg-yellow-500 hover:scale-95 duration-150"
          type="submit"
        >
          Save Changes
        </button>
      {/if}
    </form>
  {:else}
    <div>Loading...</div>
  {/if}
</main>
