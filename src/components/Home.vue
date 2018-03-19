<template>
	<main>
		<section class="slogan">
			<div class="container">
				<h3>Faça sua Doação</h3>
				<h2 v-html="header.title"></h2>
				<p v-html="header.text"></p>
			</div>
		</section>
		<section class="programs">
			<div class="programs__positioner">
				<div class="container">
					<div class="programs__row">
						<div class="programs__program" v-for="(program, key) in programs" :key="key">
							<div class="program__content">
								<h3 v-html="program.title"></h3>
								<p>{{ program.text }}</p>
								<a
									v-if="key === 'donation'"
									href="#"
									@click.prevent="setCurrentProgram(program.active ? donation : null)"
									:class="program.active ? '' : 'disabled'"
								>
									{{ program.active ? 'DOE AGORA!' : 'EM BREVE' }}
								</a>
								<a
									v-else-if="key === 'project'"
									href="#"
									@click.prevent="setCurrentProgram(program.active ? '' : null)"
									:class="program.active ? '' : 'disabled'"
								>
									{{ program.active ? 'DOE AGORA!!' : 'EM BREVE' }}
								</a>
								<a
									v-else
									href="#"
									@click.prevent="setCurrentProgram(program.active ? '' : null)"
									:class="program.active ? '' : 'disabled'"
								>
									{{ program.active ? 'DOE AGORA!' : 'EM BREVE' }}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="video">
			<div class="container">
				<h2 v-html="video.title"></h2>
				<a
					@click.prevent="toggleModal"
					class="video__link"
				>
					<img :src="`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`" :alt="video.text">
				</a>
				<h3 v-if="donation">
						{{ donation.summary.captured_count }}
						pessoas já doaram,
						<a href="#" @click.prevent="setCurrentProgram(donation)">
							seja a próxima
						</a>
				</h3>
				<p v-html="video.text"></p>
			</div>
		</section>
		<div
			:class="`modal ${ this.modal ? 'active' : ''}`"
			@click.self="toggleModal"
		>
			<div class="modal__content">
				<div class="iframe">
					<iframe
						width="560"
						height="315"
						:src="`https://www.youtube.com/embed/${video.id}?rel=0&amp;showinfo=0`"
						frameborder="0"
						allowfullscreen>
					</iframe>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import config from '../config';

export default {
	name: 'Home',
	computed: {
		donation() {
			return this.$store.state.programs[0];
		},
	},
	data() {
		return {
			header: config.content.header,
			video: config.content.video,
			programs: config.content.programs,
			modal: false,
		};
	},
	mounted() {
		this.$store.dispatch('LOAD_MERCHANTS');
	},
	methods: {
		toggleModal() {
			this.modal = !this.modal;
		},
		setCurrentProgram(program) {
			if (program) {
				this.$store.dispatch('CHANGE_SELECTED_PROGRAM', program)
					.then(() => {
						this.$router.push({ path: `/program/${program.id}` });
					});
			}
		},
	},
};
</script>
