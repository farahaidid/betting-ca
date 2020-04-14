<template>
	<div class="sign-in d-flex">
		<div class="signin-box mx-auto text-center">
			<h1 class="text-bold deep-purple">Secure Sign-In</h1>
			<p class="font-small deep-purple">
				<span class="mr-2">New to Kraken?</span>
				<router-link to="/sign-up">Create account</router-link>
			</p>

			<div class="my-4">
				<b-icon icon="shield-lock" class="icon-shield-lock" />
			</div>

			<b-form>
				<b-input-group class="my-3" size="lg">
					<b-form-input v-model="email" type="text" placeholder="Email address" />
				</b-input-group>

				<b-input-group class="my-3" size="lg">
					<b-form-input v-model="password" type="password" placeholder="Password" />
				</b-input-group>

				<b-button @click="onClickSignIn" class="my-3" pill variant="primary" block>Sign In</b-button>

				<div class="d-flex">
					<router-link to="/fotgot-password" class="w-100 font-small deep-purple">Forgot Password?</router-link>
					<div class="w-100"></div>
					<router-link to="/fotgot-username" class="w-100 font-small deep-purple">Forgot Username?</router-link>
				</div>
			</b-form>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'sign-in',
	data: () => ({
		email: '',
		password: ''
	}),
	created() {
		this.$emit('route', 'sign-in')
	},
	methods: {
		...mapActions('AUTH', ['SIGN_IN']),
		async onClickSignIn() {
			let fields = ['Email', 'Password']
			const showError = message => {
				this.$toast.open({ message, type: 'error' })
			}
			for (let f of fields) {
				if (this[f.toLowerCase()].trim() === '') {
					showError(f + ' is required!'); return
				}
			}

			let { error, message } = await this.SIGN_IN({
				email: this.email,
				password: this.password
			})
			if (error) { showError(message); return }

			this.$router.replace('/')
		}
	},
}
</script>

<style lang='scss' scoped>
	.sign-in {
		height: 100vh;
		flex-direction: column;
		justify-content: center;
		.signin-box {
			width: 400px;
			height: max-content;
			.icon-shield-lock {
				color: #5741d9;
				font-size: 5rem;
			}
			.form-control {
				font-size: 1em;
				height: 3rem;
			}
			a {
				text-decoration: underline !important;
			}
		}
	}
</style>