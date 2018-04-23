<template>
	<main class="container projects theme_project">
		<section
			v-if="homepage === 'projects'"
			class="slogan">
			<div class="container">
				<h2 v-html="header.title"></h2>
				<p v-html="header.text"></p>
			</div>
		</section>
		<section class="content">
			<template v-if="homepage !== 'projects'">
				<h2>Compartilhe um sonho</h2>
				<h3>Escolha um projeto e ajude</h3>
			</template>

			<div class="projects__project projects__main" v-if="mainProject">
				<div
					class="projects__thumbnail"
					:style="{ backgroundImage: `url(${mainProject.image_url})`}"
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
					<div v-html="mainProject.short_description"></div>
					<router-link :to="`/projects/${mainProject.id}`">QUERO AJUDAR</router-link>
				</div>
			</div>

			<template v-if="homepage === 'projects'">
				<ul class="projects__nav">
					<li v-for="(program, key) in programs" v-if="key !== 'project'" :key="key">
						<a
							href="#"
							@click.prevent="setCurrentProgram(program.active ? key : null)"
							:class="program.active ? '' : 'disabled'"
							v-html="program.title"
						>
						</a>
					</li>
				</ul>

				<h3>Mais projetos</h3>
			</template>

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
						<div v-html="project.short_description"></div>
						<span>{{ project.summary.captured_count }} pessoas já ajudaram</span>
					</div>
					<router-link :to="`/projects/${project.id}`" class="btn">QUERO AJUDAR</router-link>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import config from '../config';

export default {
	name: 'Projects',
	data() {
		return {
			header: config.content.header,
			homepage: config.homepage,
			programs: config.content.programs,
		};
	},
	computed: {
		projects() {
			return this.$store.state.projects;
		},
		mainProject() {
			return this.projects.find(item => item.is_main);
		},
		donation() {
			return this.$store.state.programs[0];
		},
	},
	mounted() {
		if (this.projects.length < 1) {
			this.$store.dispatch('LOAD_MERCHANTS');
		}
	},
	methods: {
		getPercentage(project) {
			const perc = (project.summary.captured_amount * 100) / project.goal;
			return perc.toFixed(0);
		},
		setCurrentProgram(program) {
			if (program === 'donation') {
				const payload = {
					type: 'donation',
					data: this.donation,
				};
				this.$store.dispatch('CHANGE_SELECTED_OPTION', payload)
					.then(() => {
						this.$router.push({ path: `/program/${this.donation.id}` });
					});
			}
		},
	},
};
</script>
