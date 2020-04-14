<template>
	<div class="withdraw d-flex">
		<div class="withdraw-box mx-auto text-center">
			<h1 class="deep-purple">Withdraw your balance</h1>
			<p class="font-small text-danger">
				<strong>NB:</strong> You can only
				withdraw
				<strong>$5</strong> as this is free account.
			</p>
			<b-form>
				<b-input-group class="my-3" size="lg">
					<b-form-input type="text" placeholder="Your bitcoin address" />
				</b-input-group>
				<b-button class="my-3" pill variant="primary" block>Confirm Withdraw</b-button>
			</b-form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'withdraw',
	created() {
		this.$emit('route', 'withdraw')
	},
}
</script>

<style lang='scss' scoped>
	.withdraw {
		height: 80vh;
		justify-content: center;
		flex-direction: column;
		.withdraw-box {
			.form-control {
				font-size: 1em;
				height: 3rem;
			}
		}
	}
</style>