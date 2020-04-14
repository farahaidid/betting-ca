<template>
	<div class="home py-5">
		<div class="bet-box mx-auto">
			<div class="tabs d-flex">
				<div @click="activeTab=0" class="tab" :class="activeTab==0&&'active'">Manual</div>
				<div @click="activeTab=1" class="tab" :class="activeTab==1&&'active'">Script</div>
			</div>
			<div v-if="activeTab==0" class="tab-manual p-4">
				<h3 class="cPrice">{{betPrice}}</h3>
				<p class="lead balance">Balance: $ {{balance}}</p>
				<p class="bets-left">Bets left: {{betsLeft}}</p>
				<b-form-checkbox v-model="is5x">$5X</b-form-checkbox>
				<div class="bet-actions mt-4 d-flex">
					<b-button
						@click="onBet('U')"
						:disabled="betsLeft===0||!validBetAmount"
						class="mx-2"
						variant="warning"
					>UP</b-button>
					<b-input-group append="$" class="mb-2 mr-sm-2 mb-sm-0">
						<b-input
							v-model="betAmount"
							:state="validBetAmount"
							type="number"
							class="bet-amount"
							placeholder="Bet amount"
						/>
					</b-input-group>
					<b-button
						@click="onBet('D')"
						:disabled="betsLeft===0||!validBetAmount"
						class="mx-2"
						variant="warning"
					>DOWN</b-button>
				</div>
				<router-link to="/withdraw">
					<b-button class="m-2" variant="success">WITHDRAW</b-button>
				</router-link>
			</div>
			<div v-if="activeTab==1" class="tab-script p-4">
				<div class="d-flex mb-2">
					<h3 class="lead">Scripts</h3>
					<div class="w-100"></div>
					<b-button
						size="sm"
						variant="secondary"
						@click="scriptEditor=!scriptEditor"
					>{{scriptEditor||script===''?'Save':'Edit'}}</b-button>
				</div>
				<b-form-textarea
					v-if="scriptEditor||script===''"
					class="script"
					v-model="script"
					rows="6"
					max-rows="10"
					placeholder="Enter your script here"
				></b-form-textarea>
				<highlight-code v-else class="script" lang="javascript" :code="script"></highlight-code>
			</div>
		</div>
		<b-modal v-model="oobModal" centered title="Out of bets">
			<p class="my-4">You have {{betsLeft}} bets available!</p>
		</b-modal>
	</div>
</template>

<script>
import Chart from "chart.js"
// You have to extract the component from the module
import "vue-code-highlight/themes/duotone-sea.css"
import { component as VueCodeHighlight } from 'vue-code-highlight';
import { mapMutations, mapGetters, mapActions } from "vuex"

export default {
	name: 'Home',
	components: {
		'highlight-script': VueCodeHighlight
	},
	data: () => ({
		activeTab: 0,
		graph: null,
		betPrice: 0.002,
		balance: 20,
		betsLeft: 3,
		oobModal: false,
		script: '',
		scriptEditor: true,
		balance: 20,
		betAmount: '',
		is5x: false
	}),
	created() {

		this.$emit('route', 'home')

		this.balance = this.BALANCE
		this.betsLeft = this.BETS

		this.LOGGED_IN && this.FETCH_PROFILE()

		this.initBetPrices()
	},
	mounted() {
		//this.renderGraph() 
	},
	watch: {
		betPrices() {
			//this.renderGraph()
		},
		betsLeft(b) {
			console.log(b)
			if (b === 0) {
				this.oobModal = true
			}
		},

	},
	computed: {
		...mapGetters(['BALANCE', 'BETS']),
		...mapGetters('AUTH', ['LOGGED_IN']),
		currentPrice() {
			return this.betPrices[this.betPrices.length - 1]
		},
		validBetAmount() {
			return +this.betAmount <= this.balance
		}
	},
	methods: {
		...mapMutations(['SET_STATE']),
		...mapActions('AUTH', ['FETCH_PROFILE', 'UPDATE_USER']),
		async initBetPrices() {
			while (1) {
				let toWait = this.random(0, 5) * 1000

				let iOrD = this.random(0, 1)

				let interval = setInterval(() => {
					let base = 0.002
					let newPrice = (iOrD == 0 && this.betPrice > base) ? this.betPrice - base : this.betPrice + base
					this.betPrice = +(newPrice.toFixed(3))
				}, 100);

				await this.delay(toWait)

				clearInterval(interval)
			}
		},
		random(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		delay(ms) {
			return new Promise(resolve => setTimeout(() => resolve(), ms))
		},
		onBet(ud) {
			this.betsLeft -= 1
			this.balance -= +this.betAmount

			this.UPDATE_USER({ balance: this.balance, bets: this.betsLeft })
			//this.SET_STATE()
		},
		renderGraph() {
			this.graph = new Chart('line-graph', {
				type: 'line',
				data: {
					labels: this.betPrices,
					datasets: [{
						label: 'Bets',
						data: this.betPrices,
						borderColor: ['#ffc107'],
						borderWidth: 2
					}]
				},
				options: {
					animation: {
						duration: 0 // general animation time
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	$bgPrimary: #3d3d3d;
	$bgSecondary: #333333;
	.home {
		background-color: $bgSecondary;
		height: 100%;
		color: #efebe9;
		.bet-box {
			width: 36rem;
			background-color: $bgPrimary;
			border-radius: 0.3rem;
			box-shadow: 1px 2px 3px #0000001a;
			.bet-amount {
				background-color: $bgPrimary;
				border-color: #616161;
			}
		}
		.tabs {
			border-top-left-radius: 0.3rem;
			border-top-right-radius: 0.3rem;
			overflow: hidden;
			border-bottom: 1px solid #424242;
			.tab {
				width: 100%;
				padding: 0.5rem 1rem;
				text-align: center;
				text-transform: uppercase;
				letter-spacing: 1px;
				font-size: 0.95em;
				cursor: pointer;
				&.active {
					background-color: #424242;
					color: #ffa726;
				}
			}
		}
		.tab-script {
			.script {
				max-height: 10rem;
			}
		}
	}
</style>