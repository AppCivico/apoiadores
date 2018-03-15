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
						<td>{{ formatDate(charge.created_at) }}</td>
						<td>{{ charge.is_recurring ? 'Mensal' : 'Única' }}</td>
						<td><strong>R$ {{ charge.charge_amount | formatBRL }}</strong></td>
						<td>{{ statusType(charge.charge_transaction_status) }}</td>
					</tr>
				</tbody>
			</table>
			<p><router-link to="/my-account/history">ver mais</router-link></p>
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
					<button type="button" class="btn" @click="edit('access')">Alterar</button>
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
					<button type="button" class="btn" @click="edit('contact')">Alterar</button>
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
								<span>{{ niceType(card.brand) }}</span>
							</li>
						</ul>
					</div>
					<button type="button" class="btn" @click="edit('cards')">Alterar</button>
				</section>
			</div>
		</div>
	</main>
</template>

<script>
/* eslint-disable camelcase */
import creditCardType from 'credit-card-type';

export default {
	name: 'MyAccount',
	data() {
		return {
			status: {
				captured: 'Confirmada',
				cancelled: 'Cancelada',
				finalHeight: 250,
			},
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
		edit(type) {
			console.log('editar', type);
		},
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
			const currentPhone = phone.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
			// eslint-disable-next-line
			return !currentPhone[2] ? currentPhone[1] : '(' + currentPhone[1] + ') ' + currentPhone[2] + (currentPhone[3] ? '-' + currentPhone[3] : '');
		},
		statusType(type) {
			return this.status[type] ? this.status[type] : type;
		},
		formatDate(data) {
			const week = [
				'Segunda-feira',
				'Terça-feira',
				'Quarta-feira',
				'Quinta-feira',
				'Sexta-feira',
				'Sábado',
				'Domingo',
			];
			const months = [
				'Janeiro',
				'Fevereiro',
				'Março',
				'Abril',
				'Maio',
				'Junho',
				'Julho',
				'Agosto',
				'Setembro',
				'Outubro',
				'Novembro',
				'Dezembro',
			];
			const date = new Date(data);

			const weekDay = week[date.getDay()];
			const day = date.getDate();
			const month = months[date.getMonth()];
			const year = date.getFullYear();

			const time = data
				.split('T')[1]
				.replace(':', 'h')
				.split(':')[0];

			return `${weekDay}, ${day} de ${month} de ${year} - ${time}`;
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
		}
	},
};
</script>
