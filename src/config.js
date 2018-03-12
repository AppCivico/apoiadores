import logoApoiadores from './assets/img/customization/partners/logo_apoiadores.png';
import logoAppCivico from './assets/img/customization/partners/logo_appcivico.png';

const config = {
	api: 'https://dev-apoiadores-api.eokoe.com',
	domain: 'site-apoiadores.eokoe.com',
	name: 'Rede Sustentabilidade',
	partners: [
		{
			id: 1,
			name: 'Apoiadores',
			logo: logoApoiadores,
			url: 'https://appcivico.com/pt/apoiadores/',
		},
		{
			id: 2,
			name: 'AppCívico',
			logo: logoAppCivico,
			url: 'https://appcivico.com/',
		},
	],
	content: {
		header: {
			title: 'MUITOS<strong>DOANDO</strong><span>POUCO</span>',
			text: 'A REDE está ciente de que sua força organizativa e sua contribuição política serão mais inspiradoras e sustentáveis na medida em que forem o reflexo de uma cultura verdadeira e de práticas autênticas dos que se dispõe a liderar. <strong>Participe</strong>!',
		},
		programs: {
			project: {
				title: 'Compartilhe um <strong>Sonho</strong>',
				text: 'A democracia precisa de cidadãos e cidadãs responsáveis, bem informados e bem formados',
				active: false,
			},
			service: {
				title: 'Doe seu <strong>Serviço</strong>',
				text: 'A democracia precisa de cidadãos e cidadãs responsáveis, bem informados e bem formados',
				active: false,
			},
			donation: {
				title: 'Faça uma <strong>Doação</strong>',
				text: 'A democracia precisa de cidadãos e cidadãs responsáveis, bem informados e bem formados',
				active: true,
			},
		},
		video: {
			title: 'Um chamado ao <strong>engajamento</strong>',
			id: 'Pqs6-rLmqWI',
			text: 'Ouça o que Marina Silva tem a dizer sobre engajamento. A REDE está ciente de que sua força organizativa e sua contribuição política serão mais inspiradoras e sustentáveis na medida em que forem o reflexo de uma cultura verdadeira e de práticas autênticas dos que se dispõe a liderar.',
		},
	},
};

export default config;
