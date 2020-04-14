<template>
	<div id="app">
		<navbar :route="route" />
		<router-view @route="r=>route=r" />
	</div>
</template>

<script>
import NavBar from "./components/layouts/NavBar"
export default {
	name: 'app',
	components: {
		[NavBar.name]: NavBar
	},
	data: () => ({
		route: 'home'
	})
}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		height: 100vh ;
	}
	.deep-purple {
		&,
		a {
			color: #5741d9 !important;
		}
	}
	.bg-deep-purple {
		background-color: #5741d9 !important;
	}
	.text-bold {
		font-weight: bold;
	}
	.font-small {
		font-size: 0.8em !important;
	}
</style>
