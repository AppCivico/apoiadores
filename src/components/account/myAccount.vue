<template>
	<main class="container my-account">
		<section class="content history">
			<h2>Minha Conta</h2>
			<h3>Histório de doações</h3>
			<table v-if="charges.length > 0">
				<thead>
					<tr>
						<td>Data e hora</td>
						<td>Periodicidade</td>
						<td>Valor</td>
						<td>Status</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="charge in charges" :key="charge.flotum_charge_id">
						<td>{{ charge.created_at | formatDate }}</td>
						<td>{{ charge.is_recurring ? 'Mensal' : 'Única' }}</td>
						<td><strong>R$ {{ charge.charge_amount | formatBRL }}</strong></td>
						<td>{{ statusType(charge.charge_transaction_status) }}</td>
					</tr>
				</tbody>
			</table>
			<p v-else class="empty">Você ainda não registrou doações.</p>
			<p class="more"><router-link to="/my-account/history">ver mais</router-link></p>
		</section>

		<div class="row">
			<div class="row__box">
				<section class="content">
					<h3>Meus dados de acesso</h3>
					<div :style="{ height: `${finalHeight}px`}">
						<p>
							<strong>Email cadastrado</strong><br>
							{{ user.email }}
						</p>
						<p>
							<strong>Senha</strong><br>
							********
						</p>
						<p>
							<strong>CPF</strong><br>
							{{ user.cpf }}
						</p>
					</div>
					<button type="button" class="btn" @click="toggleModal('access', true)">Alterar</button>
				</section>
			</div>
			<div class="row__box">
				<section class="content">
					<h3>Meus dados de contato</h3>
					<div :style="{ height: `${finalHeight}px`}">
						<p>
							<strong>Telefone</strong><br>
							{{ maskPhone(user.cellphone_number) }}
						</p>
						<p>
							<strong>Endereço</strong><br>
							{{ user.address_street }},
							{{ user.address_number }}
							<span v-if="user.address_observation"> - </span>
							{{ user.address_observation }}<br>
							{{ user.address_neighbourhood }} -
							CEP {{ user.address_zip }}<br>
							{{ user.address_city }} - {{ user.address_state }}
						</p>
					</div>
					<button type="button" class="btn" @click="toggleModal('contact', true)">Alterar</button>
				</section>
			</div>
			<div class="row__box">
				<section class="content">
					<h3>Meus dados financeiros</h3>
					<div :style="{ height: `${finalHeight}px`}">
						<p>
							<strong>Cartão de Crédito</strong><br>
						</p>
						<ul v-if="user.credit_cards.length > 0">
							<li class="card" v-for="card in user.credit_cards" :key="card.id">
								Final {{ endNumber(card.mask) }}
								<button type="button" @click="removeCard(card.id)">&#215;</button>
								<span>{{ niceType(card.brand) }}</span>
							</li>
						</ul>
					</div>
					<button
						type="button"
						class="btn"
						@click="toggleModalCard(true)">
						Adicionar novo cartão
					</button>
				</section>
			</div>
		</div>
		<editModal :type="modal.type" :active="modal.active" @close="toggleModal('', false)"/>
		<addCard :activeCard="modalCard" @close="toggleModalCard(false)"/>
	</main>
</template>

<script>
/* eslint-disable camelcase */
import creditCardType from 'credit-card-type';

import editModal from './editModal';
import addCard from './addCard';

export default {
	name: 'MyAccount',
	components: {
		editModal,
		addCard,
	},
	data() {
		return {
			status: {
				captured: 'Confirmada',
				cancelled: 'Cancelada',
			},
			finalHeight: 250,
			modal: {
				type: 'access',
				active: false,
			},
			modalCard: false,
		};
	},
	mounted() {
		this.$store.dispatch('LOAD_CHARGES', 5);
		this.alignBoxes();
	},
	computed: {
		charges() {
			return this.$store.state.charges;
		},
		user() {
			return this.$store.state.user;
		},
	},
	methods: {
		endNumber(num) {
			return num.slice(num.length - 3, num.length);
		},
		niceType(type) {
			const types = creditCardType('');
			const nice = types.find(item => item.type.replace('-', '') === type);
			if (nice) {
				return nice.niceType;
			}
			return type;
		},
		maskPhone(phone) {
			const currentPhone = phone.replace('+55', '').replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
			// eslint-disable-next-line
			return !currentPhone[2] ? currentPhone[1] : '(' + currentPhone[1] + ') ' + currentPhone[2] + (currentPhone[3] ? '-' + currentPhone[3] : '');
		},
		statusType(type) {
			return this.status[type] ? this.status[type] : type;
		},
		alignBoxes() {
			const boxes = Array.from(document.querySelectorAll('.row__box'));
			let highest = 0;
			boxes.map((box) => {
				const height = box.querySelector('div').clientHeight;
				if (height > highest) {
					highest = height;
				}
			});
			this.finalHeight = highest;
		},
		toggleModal(type, active) {
			this.modal = {
				type,
				active,
			};
		},
		toggleModalCard(type) {
			this.modalCard = type;
		},
		removeCard(id) {
			this.$store.dispatch('REMOVE_CARD', id)
				.then(() => {
					this.$store.dispatch('LOAD_USER');
				});
		},
	},
};
</script>
