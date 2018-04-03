import logoApoiadores from './assets/img/customization/partners/logo_apoiadores.png';
import logoAppCivico from './assets/img/customization/partners/logo_appcivico.png';

const config = {
	api:
		location.hostname === 'testerede.appcivico.com' ? 'https://api-apoiadores.appcivico.com' : 'https://dev-apoiadores-api.eokoe.com',
	domain:
		'site-apoiadores.eokoe.com',
	name:
		'Rede Sustentabilidade',
	partners: [
		{
			id: 1,
			name:
				'Apoiadores',
			logo: logoApoiadores,
			url:
				'https://appcivico.com/pt/apoiadores/',
		},
		{
			id: 2,
			name:
				'AppCívico',
			logo: logoAppCivico,
			url:
				'https://appcivico.com/',
		},
	],
	content: {
		header: {
			title:
				'MUITOS <strong>DOANDO</strong> <span>POUCO</span>',
			text:
				'A Rede Sustentabilidade foi construída com a participação direta de seus integrantes, um espaço de mobilização e inovação, no qual floresce uma nova cultura política.',
		},
		programs: {
			project: {
				title:
					'Seja parceiro dos nossos <strong>Projetos</strong>',
				text:
					'Acreditamos em ferramentas de financiamento inovadoras e participativas. Seja um parceiro financeiro dos nossos projetos.',
				active: true,
			},
			service: {
				title:
					'Participe! Doe seu <strong>Serviço</strong>',
				text:
					'A forma como a gente faz política, determina a forma como a gente governa. Faça parte do time de voluntários da Rede.',
				active: false,
			},
			donation: {
				title:
					'Faça sua <strong>Doação</strong>',
				text:
					'Você não precisa ser filiado para colaborar financeiramente com a Rede Sustentabilidade. Os desafios são grandes.',
				active: true,
			},
		},
		video: {
			title:
				'Apoie a Rede no <strong>Combate às  Fake News</strong>',
			id:
				'Pqs6-rLmqWI',
			text:
				'Desde a campanha presidencial de 2010, com uma intensificação em 2014, Marina Silva é alvo de notícias falsas e ataques mentirosos. Estas investidas partem de membros de diferentes campos políticos. Apoie a “REDE no combate às fake news”, um projeto inovador com o objetivo se contrapor às mentiras virtuais sobre Marina Silva e a Rede Sustentabilidade nas eleições de 2018. <a href="./static/fake_news.pdf" target="_blank">Conheça o projeto</a>',
		},
	},
};

export default config;
