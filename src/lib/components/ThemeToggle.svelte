<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';

	let { class: className = "" } = $props();
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	class="theme-toggle {className}"
	aria-label="Toggle theme"
>
	{#if theme.value === 'dark'}
		<span class="material-icons">light_mode</span>
	{:else}
		<span class="material-icons">dark_mode</span>
	{/if}
</button>

<style>
	.theme-toggle {
		background: none;
		border: 1px solid var(--text-color);
		color: var(--text-color);
		padding: 0.5rem;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		opacity: 0.7;
	}

	.theme-toggle:hover {
		opacity: 1;
		background-color: var(--text-color);
		color: var(--bg-color);
	}
</style>
