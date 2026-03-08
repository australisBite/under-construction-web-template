<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { theme } from '$lib/stores/theme.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- Inline script to prevent FOUC (Flash of Unstyled Content) -->
	<!-- Must run before rendering to apply theme immediately -->
	<script nonce="%sveltekit.nonce%">
		(function () {
			if (typeof document === 'undefined') return;
			const saved = localStorage.getItem('theme');
			const isDark =
				saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		})();
	</script>
</svelte:head>

{@render children()}
