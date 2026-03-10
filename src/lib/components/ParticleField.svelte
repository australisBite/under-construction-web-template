<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { theme } from '$lib/stores/theme.svelte';

	let canvas: HTMLCanvasElement;
	let geometry: THREE.BufferGeometry;
	let colorTypeArr: Uint8Array;
	const N = 10000;

	// ── Color Palettes ─────────────────────────────────────────────
	const lightPalette: [number, number, number][] = [
		[0x1a / 255, 0x73 / 255, 0xe8 / 255], // Deep Blue
		[0x1e / 255, 0x8e / 255, 0x3e / 255], // Deep Green
		[0x8a / 255, 0x2b / 255, 0xe2 / 255], // Violet
		[0x00 / 255, 0x00 / 255, 0x00 / 255] // Black
	];

	const darkPalette: [number, number, number][] = [
		[0x8a / 255, 0xb4 / 255, 0xf8 / 255], // Light Blue
		[0x81 / 255, 0xc9 / 255, 0x95 / 255], // Light Green
		[0xfd / 255, 0xd6 / 255, 0x63 / 255], // Light Yellow
		[0xff / 255, 0xff / 255, 0xff / 255] // White
	];

	const getPalette = () => {
		if (typeof document === 'undefined') return lightPalette;
		return document.documentElement.classList.contains('dark') ? darkPalette : lightPalette;
	};

	const updateColors = () => {
		if (!geometry || !colorTypeArr) return;
		const palette = getPalette();
		const colors = geometry.attributes.color.array as Float32Array;

		for (let i = 0; i < N; i++) {
			const type = colorTypeArr[i];
			const c = palette[type];
			colors[i * 3] = c[0];
			colors[i * 3 + 1] = c[1];
			colors[i * 3 + 2] = c[2];
		}
		geometry.attributes.color.needsUpdate = true;
	};

	$effect(() => {
		// Suscribe to theme value changes
		const _ = theme.value;
		updateColors();
	});

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
		camera.position.z = 500;

		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0);

		const tc = document.createElement('canvas');
		tc.width = 32;
		tc.height = 32;
		const tctx = tc.getContext('2d')!;
		tctx.beginPath();
		tctx.arc(16, 16, 14, 0, Math.PI * 2);
		tctx.fillStyle = '#ffffff';
		tctx.fill();
		const sprite = new THREE.CanvasTexture(tc);

		const ROWS = 100;
		const COLS = 100;

		const halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
		const halfW = halfH * camera.aspect;

		const posArr = new Float32Array(N * 3);
		const colArr = new Float32Array(N * 3);
		const homeX = new Float32Array(N);
		const homeY = new Float32Array(N);
		const velX = new Float32Array(N);
		const velY = new Float32Array(N);
		colorTypeArr = new Uint8Array(N);

		for (let i = 0; i < N; i++) {
			const row = Math.floor(i / COLS);
			const col = i % COLS;

			const x = (col / COLS - 0.5) * halfW * 2.5 + (Math.random() - 0.5) * 5;
			const y = (row / ROWS - 0.5) * halfH * 2.5 + (Math.random() - 0.5) * 5;
			const z = (Math.random() - 0.5) * 20;

			posArr[i * 3] = x;
			posArr[i * 3 + 1] = y;
			posArr[i * 3 + 2] = z;
			homeX[i] = x;
			homeY[i] = y;
			velX[i] = 0;
			velY[i] = 0;

			const type = Math.floor(Math.random() * 4);
			colorTypeArr[i] = type;

			const palette = getPalette();
			const c = palette[type];
			colArr[i * 3] = c[0];
			colArr[i * 3 + 1] = c[1];
			colArr[i * 3 + 2] = c[2];
		}

		geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colArr, 3));

		const material = new THREE.PointsMaterial({
			size: 2.0,
			map: sprite,
			vertexColors: true,
			transparent: true,
			alphaTest: 0.1,
			depthWrite: false,
			sizeAttenuation: true
		});

		scene.add(new THREE.Points(geometry, material));

		let mouseX3D = 99999;
		let mouseY3D = 99999;

		function onPointerMove(e: PointerEvent) {
			const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
			const ndcY = -((e.clientY / window.innerHeight) * 2 - 1);
			const h = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
			const w = h * camera.aspect;
			mouseX3D = ndcX * w;
			mouseY3D = ndcY * h;
		}
		window.addEventListener('pointermove', onPointerMove);

		function onResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		window.addEventListener('resize', onResize);

		const REPEL_RADIUS = 100;
		const REPEL_STRENGTH = 0.5;
		const SPRING = 0.008;
		const DAMPING = 0.96;

		let animId: number;

		function animate() {
			animId = requestAnimationFrame(animate);
			const pos = geometry.attributes.position.array as Float32Array;

			for (let i = 0; i < N; i++) {
				const xi = i * 3;
				const x = pos[xi];
				const y = pos[xi + 1];

				velX[i] += (homeX[i] - x) * SPRING;
				velY[i] += (homeY[i] - y) * SPRING;

				const dx = x - mouseX3D;
				const dy = y - mouseY3D;
				const distSq = dx * dx + dy * dy;

				if (distSq < REPEL_RADIUS * REPEL_RADIUS) {
					const dist = Math.sqrt(distSq);
					const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
					velX[i] += (dx / (dist || 0.001)) * force;
					velY[i] += (dy / (dist || 0.001)) * force;
				}

				velX[i] *= DAMPING;
				velY[i] *= DAMPING;

				pos[xi] += velX[i];
				pos[xi + 1] += velY[i];
			}

			geometry.attributes.position.needsUpdate = true;
			renderer.render(scene, camera);
		}

		animate();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('resize', onResize);
			renderer.dispose();
			geometry.dispose();
			material.dispose();
			sprite.dispose();
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}
</style>
