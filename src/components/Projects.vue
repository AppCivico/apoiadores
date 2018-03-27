<template>
	<main class="container">
		<section class="content">
			<h2>Compartilhe um sonho</h2>
			<h3>Escolha um projeto e ajude</h3>
			<div class="project" v-for="project in hardCoded" :key="project.id">
				<span>{{ getPercentage(project) }}%</span>
				<h4>{{ project.title }}</h4>
				<p>{{ project.description }}</p>
				<span>{{ project.count }} pessoas já ajudaram</span>
				<router-link :to="`/projects/${project.id}`"></router-link>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	name: 'Projects',
	data() {
		return {
			hardCoded: [
				{
					id: 1,
					title: 'Sozinhas podemos ser gotas, mas juntas somos um oceano',
					description: 'Vivamus finibus neque vitae diam efficitur, nec tempus augue hendrerit. Vestibulum condimentum ullamcorper turpis, ut auctor nulla facilisis at. Finibus neque vitae diam efficitur, nec tempus augue hendrerit. Vestibulum condimentum ullamcorper turpis, ut auctor nulla facilisis at.',
					count: 2299,
					amount: 50,
					target: 200,
				},
				{
					id: 2,
					title: 'Sozinhas podemos ser gotas, mas juntas somos um oceano',
					description: 'Vivamus finibus neque vitae diam efficitur, nec tempus augue hendrerit. Vestibulum condimentum ullamcorper turpis, ut auctor nulla facilisis at. Finibus neque vitae diam efficitur, nec tempus augue hendrerit. Vestibulum condimentum ullamcorper turpis, ut auctor nulla facilisis at.',
					count: 100,
					amount: 50,
					target: 100,
				},
			],
		};
	},
	methods: {
		getPercentage(project) {
			return (project.amount * 100) / project.target;
		},
	},
};
</script>
