<template>
	<div>
		<h1>Is Registered</h1>

		<Login route="/payment"/>

		<hr>

		<h2>Você é novo por aqui?</h2>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo cupiditate,
		quasi provident a iusto dignissimos, debitis nostrum repellat!
		Architecto libero laudantium tempore deserunt totam quaerat fugit harum,
		sequi doloribus odit!</p>
		<router-link to="/register">Cadastre-se</router-link>
	</div>
</template>

<script>
import Login from '../Login';

export default {
	name: 'IsRegistered',
	components: {
		Login,
	},
};
</script>
