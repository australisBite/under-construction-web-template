import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

function createThemeStore() {
	let current = $state<Theme>('system');

	if (browser) {
		const saved = localStorage.getItem('theme') as Theme | null;
		if (saved) current = saved;
	}

	return {
		get value() {
			return current;
		},
		set value(v: Theme) {
			current = v;
			if (browser) {
				if (v === 'system') {
					localStorage.removeItem('theme');
					const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					document.documentElement.classList.toggle('dark', isDark);
				} else {
					localStorage.setItem('theme', v);
					document.documentElement.classList.toggle('dark', v === 'dark');
				}
			}
		},
		toggle() {
			const isDark = document.documentElement.classList.contains('dark');
			this.value = isDark ? 'light' : 'dark';
		}
	};
}

export const theme = createThemeStore();
