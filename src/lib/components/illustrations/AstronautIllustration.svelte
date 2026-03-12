<script lang="ts">
	import astronaut from '$lib/assets/astronaut.png';
	let { class: className = "" } = $props();
</script>

<div id="astronaut" class={className}>
	<img src={astronaut} alt="Astronaut illustration" />
</div>

<style>
	#astronaut {
		animation: float 1.67s ease-in-out infinite alternate;
		transform-box: fill-box;
		transform-origin: bottom;
		width: 100%;
		max-width: 473px;
		height: auto;
	}

	#astronaut img {
		width: 100%;
		height: auto;
	}

	@media (max-width: 767px) {
		#astronaut {
			margin-top: -2rem;
		}
	}

	@keyframes float {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-20px);
		}
	}
</style>
