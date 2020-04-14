<template>
	<b-navbar :class="`${theme}-nav`" class="navbar" toggleable="lg" type="dark" variant="info">
		<router-link class="logo mr-5" to="/">
			<img src="../../assets/images/kraken-square.svg" />
		</router-link>

		<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="nav ml-4">
				<li class="nav-item" v-for="(navItem, index) in navItems" :key="index">
					<router-link :to="navItem.path" class="nav-link">{{navItem.text}}</router-link>
				</li>
			</b-navbar-nav>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
				<div class="status d-flex">
					<p class="text-uppercase mb-0 mx-2">Balance: ${{BALANCE}}</p>
					<p class="text-uppercase mb-0 mx-2">BETS LEFT: {{BETS}}</p>
				</div>
				<b-nav-form>
					<router-link to="/sign-up">
						<b-button class="create-account" variant="light" pill>Create account</b-button>
					</router-link>
				</b-nav-form>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
import anime from "animejs"
import { mapGetters } from 'vuex'
export default {
	name: 'navbar',
	props: {
		route: String,
	},
	data: () => ({
		theme: 'dark',
		navItems: [
			{ text: "Home", path: "/" },
			{ text: "Withdraw", path: "/withdraw" },
			{ text: "Tiers", path: "/tiers" },
			{ text: "Trading", path: "/trading" },
			{ text: "Deposit", path: "/deposit" },
			{ text: "Refferal", path: "/refferal" },
		]
	}),
	created() { this.setTheme() },
	computed: {
		...mapGetters(['BALANCE', 'BETS'])
	},
	watch: {
		route(r) { this.setTheme() }
	},
	methods: {
		setTheme() {
			this.theme = this.route === 'home' ? 'dark' : 'purple'
			if (this.route === 'home') {
				anime({
					targets: '.navbar',
					height: ['6.2rem', '3.34rem'],
					padding: ['0.5rem 2.5rem', '8px 16px'],
					duration: 800
				})
			}
			else {
				anime({
					targets: '.navbar',
					height: ['3.34rem', '6.2rem'],
					duration: 800
				})
			}
		}
	}
}
</script>

<style lang='scss' scoped>
	.navbar {
		transition: background-color 500ms ease-in-out;
		&.purple-nav {
			background-color: #5741d9 !important;
			padding: 0.5rem 2.5rem;
		}
		&.dark-nav {
			background-color: #404040 !important;
		}
		.nav {
			.nav-item {
				margin-right: 1rem;
				.nav-link {
					color: white;
					font-size: 0.9em;
					font-weight: bold;
				}
			}
		}
		.create-account {
			color: #512da8;
			font-weight: bold;
			font-size: 0.8em;
		}
		.status {
			justify-content: center;
			padding: 0.5rem;
			p {
				color: #bdbdbd;
				font-size: 0.75em;
				letter-spacing: 1px;
			}
		}
	}
</style>