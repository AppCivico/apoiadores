<template>
	<main class="container projects">
		<section class="content">
			<h2>Compartilhe um sonho</h2>
			<h3>Escolha um projeto e ajude</h3>
			<div class="projects__row">
				<div class="projects__project" v-for="project in hardCoded" :key="project.id">
					<div
						class="project__thumbnail"
						:style="{ backgroundImage: 'url(https://78.media.tumblr.com/tumblr_m2q8lrcojk1qfvoueo1_1280.jpg)'}"
					>
						<div class="thumbnail__percentage">
							{{ getPercentage(project) }}%
							<span
								:style="{ width: `${getPercentage(project)}%`}"
							></span>
						</div>
					</div>
					<div class="projects__content">
						<h4>{{ project.name }}</h4>
						<p>{{ project.description }}</p>
						<span>{{ project.count }} pessoas já ajudaram</span>
					</div>
					<router-link :to="`/projects/${project.id}`" class="btn">QUERO AJUDAR</router-link>
				</div>
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
					name: 'Sozinhas podemos ser gotas, mas juntas somos um oceano',
					description: 'Vivamus finibus neque vitae diam efficitur, nec tempus augue hendrerit. Vestibulum condimentum ullamcorper turpis, ut auctor nulla facilisis at. Finibus neque vitae diam efficitur, nec tempus augue hendrerit. Vestibulum condimentum ullamcorper turpis, ut auctor nulla facilisis at.',
					count: 2299,
					amount: 50,
					goal: 200,
				},
				{
					id: 2,
					name: 'Sozinhas podemos ser gotas, mas juntas somos um oceano',
					description: 'Vivamus finibus neque vitae diam efficitur, nec tempus augue hendrerit. Vestibulum condimentum ullamcorper turpis, ut auctor nulla facilisis at. Finibus neque vitae diam efficitur, nec tempus augue hendrerit. Vestibulum condimentum ullamcorper turpis, ut auctor nulla facilisis at.',
					count: 100,
					amount: 50,
					goal: 100,
				},
			],
		};
	},
	computed: {
		projects() {
			return this.$store.state.projects;
		},
	},
	methods: {
		getPercentage(project) {
			return (project.amount * 100) / project.goal;
		},
	},
};
</script>
