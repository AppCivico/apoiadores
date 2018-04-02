<template>
	<main class="container projects">
		<section class="content">
			<h2>Compartilhe um sonho</h2>
			<h3>Escolha um projeto e ajude</h3>

			<div class="projects__project projects__main">
				<div
					class="projects__thumbnail"
					:style="{ backgroundImage: 'url(https://78.media.tumblr.com/tumblr_m2q8lrcojk1qfvoueo1_1280.jpg)'}"
				>
					<div class="thumbnail__percentage">
						{{ getPercentage(mainProject) }}%
						<span
							:style="{ width: `${getPercentage(mainProject)}%`}"
						></span>
					</div>
				</div>
				<div class="projects__content">
					<h4>{{ mainProject.name }}</h4>
					<p>{{ mainProject.description }}</p>
					<router-link :to="`/projects/${mainProject.id}`">QUERO AJUDAR</router-link>
				</div>
			</div>

			<div class="projects__row">
				<div class="projects__project" v-for="project in projects" :key="project.id">
					<div
						class="projects__thumbnail"
						:style="{ backgroundImage: `url(${project.image_url})`}"
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
						<span>{{ project.summary.captured_count }} pessoas já ajudaram</span>
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
	mounted() {
		if (this.projects.length < 1) {
			this.$store.dispatch('LOAD_MERCHANTS');
		}
	},
	computed: {
		projects() {
			return this.$store.state.projects;
		},
		mainProject() {
			return this.projects.find(item => item.is_main);
		},
	},
	methods: {
		getPercentage(project) {
			return (project.summary.captured_amount * 100) / project.goal;
		},
	},
};
</script>
