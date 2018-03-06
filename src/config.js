import logoApoiadores from './assets/img/partners/logo_apoiadores.png';
import logoAppCivico from './assets/img/partners/logo_appcivico.png';

const config = {
	api: 'https://dev-apoiadores-api.eokoe.com',
	domain: 'site-apoiadores.eokoe.com',
	name: 'Rede Sustentabilidade',
	partners: [
		{
			name: 'Apoiadores',
			logo: logoApoiadores,
			url: 'https://appcivico.com/pt/apoiadores/',
		},
		{
			name: 'AppCívico',
			logo: logoAppCivico,
			url: 'https://appcivico.com/',
		},
	],
	content: {
		header: {
			title: 'MUITOS<strong>DOANDO</strong><span>POUCO</span>',
			text: 'A REDE está ciente de que sua força organizativa e sua contribuição política serão mais inspiradoras e sustentáveis na medida em que forem o reflexo de uma cultura verdadeira e de práticas autênticas dos que se dispõe a liderar. Participe!',
		},
		boxes: {
			project: 'A democracia precisa de cidadãos e cidadãs responsáveis, bem informados e bem formados',
			service: 'A democracia precisa de cidadãos e cidadãs responsáveis, bem informados e bem formados',
			donation: 'A democracia precisa de cidadãos e cidadãs responsáveis, bem informados e bem formados',
		},
		video: {
			title: 'Um chamado ao <strong>engajamento</strong>',
			subtitle: 'XXXX pessoas já doaram, <a href="#donation">seja a próxima</a>',
			url: 'https://www.youtube.com/watch?v=Pqs6-rLmqWI',
			text: 'Ouça o que Marina Silva tem a dizer sobre engajamento. A REDE está ciente de que sua força organizativa e sua contribuição política serão mais inspiradoras e sustentáveis na medida em que forem o reflexo de uma cultura verdadeira e de práticas autênticas dos que se dispõe a liderar.',
		},
	},
};

export default config;
