<template>
	<main class="container project">
		<section class="content" v-if="project">
			<h2>COMPARTILHE UM SONHO</h2>
			<h3>{{ project.name }}</h3>
			<header>
				<div
					class="project__thumbnail"
					:style="{ backgroundImage: 'url(https://78.media.tumblr.com/tumblr_m2q8lrcojk1qfvoueo1_1280.jpg)'}"
				></div>
				<div class="project__header">
					<p><strong>{{ project.summary.captured_count }}</strong> pessoas já ajudaram</p>
					<p><strong>{{ project.summary.captured_count }}</strong> dias restantes</p>

					<h4>R$<br>
						<strong>{{ project.summary.captured_amount | formatBRL }}</strong>
					</h4>

					<div class="project__percentage">
						<span
							:style="{ width: `${getPercentage(project)}%`}"
						></span>
					</div>

					<strong>{{ getPercentage(project) }}% arrecadados da meta de R$ {{ project.goal | formatBRL }}</strong><br>
					<em>Esta campanha irá receber todas as contribuições em {{ project.end_ts | formatDateBasic }}</em>

					<a
						href="#"
						@click.prevent="setCurrentProgram(project)"
						class="btn"
					>
						QUERO AJUDAR
					</a>
				</div>
			</header>
			<div class="project__content">
				<p>{{ project.description }}</p>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	name: 'Project',
	props: {
		id: String,
	},
	mounted() {
		if (this.projects.length < 1) {
			this.$store.dispatch('LOAD_MERCHANTS');
		}
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
		setCurrentProgram(project) {
			this.$store.dispatch('CHANGE_SELECTED_PROGRAM', project)
				.then(() => {
					this.$router.push({ path: `/program/${project.id}` });
				});
		},
	},
};
</script>
