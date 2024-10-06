<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

</script>

<Navbar  />

<main class="transition-all duration-300">
	<slot />
</main>
