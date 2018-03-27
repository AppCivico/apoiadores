<template>
	<main class="container">
		<section class="content">
			<h2>Project {{ id }}</h2>
		</section>
	</main>
</template>

<script>
export default {
	name: 'Projects',
	props: {
		id: String,
	},
};
</script>
