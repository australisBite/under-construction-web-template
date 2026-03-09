<script lang="ts">
	// Importar componentes Svelte personalizados
	import ParticleField from '$lib/components/ParticleField.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import ManIllustration from '$lib/components/illustrations/ManIllustration.svelte';
	import DogIllustration from '$lib/components/illustrations/DogIllustration.svelte';
</script>

<svelte:head>
	<!-- Cargar fuentes de Google: Lato e Iconos de Material -->
	<link
		href="https://fonts.googleapis.com/css?family=Lato:400,900&display=swap"
		rel="stylesheet"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
		crossorigin="anonymous"
	/>
	<title>TuCopiloto - Under Construction</title>
</svelte:head>

<!-- Componente de animación de partículas de fondo -->
<ParticleField />

<!-- Botón de cambio de tema en posición fija en la esquina superior derecha -->
<div style="position: fixed; top: 1rem; right: 1rem; z-index: 100;">
	<ThemeToggle />
</div>

<!-- Contenedor principal con posicionamiento relativo sobre el campo de partículas -->
<div style="position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column;">
	<div class="container-fluid" style="flex: 1;">
		<!-- Sección de título centrado -->
		<div class="row justify-content-center">
			<div class="col-12 main-title">
				<h1>Website</h1>
				<h2>under construction</h2>
			</div>
		</div>

		<!-- Contenedor para las ilustraciones SVG animadas -->
		<div class="illustration-container">
			<ManIllustration />
			<DogIllustration />
		</div>
	</div>

	<!-- Sección del pie de página -->
	<footer class="footer">
		<span style="font-size: 4rem;">tucopiloto.com</span>
		<div style="margin-top: 1rem; font-size: 1.6rem; opacity: 1;">
			<p style="margin: 0 0 0.25rem 0;">Sitio web en desarrollo</p>
			<p style="margin: 0 0 0.5rem 0;">Erick Carrillo</p>
			<a
				href="https://github.com/australisBite"
				target="_blank"
				rel="noopener noreferrer"
				class="github-btn"
			>
				<svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor" aria-hidden="true">
					<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
				</svg>
				GitHub
			</a>
		</div>
	</footer>
</div>
