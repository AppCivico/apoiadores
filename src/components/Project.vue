<template>
	<main class="container project">
		<section class="content">
			<h2>COMPARTILHE UM SONHOS</h2>
			<h3>{{ project.name }}</h3>
			<header>
				<div :style="{ backgroundImage: 'url(https://78.media.tumblr.com/tumblr_m2q8lrcojk1qfvoueo1_1280.jpg)'}"></div>
				<div class="project__header">
					<p><strong>{{ project.count }}</strong> pessoas já ajudaram</p>
					<p><strong>{{ project.count }}</strong> dias restantes</p>

					<div class="project__percentage">
						{{ getPercentage(project) }}%
						<span
							:style="{ width: `${getPercentage(project)}%`}"
						></span>
					</div>
				</div>
			</header>
		</section>
	</main>
</template>

<script>
export default {
	name: 'Projects',
	props: {
		id: String,
	},
	computed: {
		projects() {
			return this.$store.state.projects;
		},
		project() {
			return this.projects.find(item => `${item.id}` === this.id);
		},
	},
	methods: {
		getPercentage(project) {
			return (project.summary.captured_amount * 100) / project.goal;
		},
	},
};
</script>
