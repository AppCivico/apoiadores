<template>
	<main class="container project theme_project">
		<article class="content" v-if="project">
			<h2>COMPARTILHE UM SONHO</h2>
			<h3>{{ project.name }}</h3>
			<div class="project__header">
				<div v-if="project.image_url || project.video_url" class="project__thumbnail" :class="'project__thumbnail--' + (project.video_url != null ? 'video' : 'image')">
					<iframe v-if="project.video_url" :src="project.video_url" width="560" height="315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					<img v-else :src="project.image_url" :alt="project.image_alt">
				</div>
				<div class="header__content">
					<p><strong>{{ project.summary.captured_count }}</strong> pessoas já ajudaram</p>
					<router-link :to="`/projects/${this.id}/donations`">Transparência</router-link>
					<p><strong>{{ getRemainingDays(project.end_ts) }}</strong> dias restantes</p>

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
			</div>
			<div class="project__content" v-html="project.description"></div>
			<footer v-if="project.legal_name || project.legal_document" class="project__footer">
				<dl class="legal-info">
					<dt v-if="project.legal_name">Razão Social</dt>
					<dd v-if="project.legal_name">{{ project.legal_name }}</dd>
					<dt v-if="project.legal_document">CNPJ</dt>
					<dd v-if="project.legal_document">{{ project.legal_document | formatCNPJ }}</dd>
				</dl>
			</footer>
		</article>
	</main>
</template>

<script>
import moment from 'moment';

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
			const perc = (project.summary.captured_amount * 100) / project.goal;
			return perc.toFixed(0);
		},
		setCurrentProgram(project) {
			const payload = {
				type: 'project',
				data: project,
			};
			this.$store.dispatch('CHANGE_SELECTED_OPTION', payload)
				.then(() => {
					this.$router.push({ path: '/rewards' });
				});
		},
		getRemainingDays(date) {
			const endDate = moment(date);
			return endDate.diff(moment(), 'days');
		},
	},
};
</script>
