<script>
  import { readable } from 'svelte/store';

  const components = {
    RxJS: import('./RxJS.svelte'),
  };

  const selected = readable(location.hash.substring(1), set => {
    const handler = () => set(location.hash.substring(1));
    window.addEventListener('hashchange', handler);
    () => window.removeEventListener('hashchange', handler);
  });
</script>

<div id="app-container">
  <ul>
    {#each Object.keys(components) as item}
      <li class:selected={selected === item}><a href={'/#' + encodeURIComponent(item)}>{item}</a></li>
    {/each}
  </ul>
  <div class="app-content">
    {#if components[$selected]}
      {#await components[$selected] then comp}
        <svelte:component this={comp.default} />
      {/await}
    {:else}
      <h1>Nothing selected</h1>
    {/if}
  </div>
</div>

<!-- markup (zero or more items) goes here -->
<style lang="scss">
  :global(html, body),
  #app-container {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  :global(html) {
    height: 100vh;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .app-content {
    flex: 1;
  }

  #app-container {
    display: flex;
    gap: 0.5rem;

    > ul {
      flex-basis: 30%;
      border-right: 1px solid black;
      height: 100%;
    }
  }
</style>
