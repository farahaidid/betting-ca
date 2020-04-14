<template>
	<div class="sign-up d-flex">
		<div class="signup-box mx-auto text-center">
			<h1 class="deep-purple">Create your account</h1>
			<p
				class="font-small deep-purple mb-5"
			>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor earum temporibus aspernatur excepturi nam at?</p>
			<b-form class="mt-5">
				<b-input-group class="my-3" size="lg">
					<b-form-input v-model="form.userName" type="text" placeholder="Username" />
				</b-input-group>

				<b-input-group class="my-3" size="lg">
					<b-form-input v-model="form.email" type="email" placeholder="Email address" />
				</b-input-group>

				<b-input-group class="mt-3" size="lg">
					<b-form-input v-model="form.password" type="password" placeholder="Password" />
				</b-input-group>

				<p class="my-2 text-left">
					<b-icon icon="lock-fill" class="mr-1"></b-icon>
					<a href="#" class="deep-purple">Security tip:</a>
					<span>Do not reuse an existing password</span>
				</p>

				<hr class="my-2" />

				<p class="my-4">
					<b-icon icon="geo-alt" class="deep-purple mr-2"></b-icon>
					<span class="grey-6">Where is your primary residence?</span>
				</p>

				<b-form-select v-model="form.country" :options="countries" size="lg"></b-form-select>
				<hr class="my-2" />

				<b-input-group class="mt-3" size="lg">
					<b-form-input v-model="form.invitationCode" type="text" placeholder="Invitation code" />
				</b-input-group>

				<b-button
					class="btn-create-account my-3 text-uppercase font-small bg-deep-purple"
					size="lg"
					variant="primary"
					@click="createAccount"
				>Create account</b-button>
			</b-form>
			<p>
				Already created an account?
				<router-link to="/sign-in" class="deep-purple">Sign in</router-link>instead.
			</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'sign-up',
	data: () => ({
		toasts: [],
		form: {
			email: '',
			userName: '',
			password: '',
			country: 'BD',
			invitationCode: ''
		},
		countries: [
			{ "name": "Afghanistan", "code": "AF" },
			{ "name": "land Islands", "code": "AX" },
			{ "name": "Albania", "code": "AL" },
			{ "name": "Algeria", "code": "DZ" },
			{ "name": "American Samoa", "code": "AS" },
			{ "name": "AndorrA", "code": "AD" },
			{ "name": "Angola", "code": "AO" },
			{ "name": "Anguilla", "code": "AI" },
			{ "name": "Antarctica", "code": "AQ" },
			{ "name": "Antigua and Barbuda", "code": "AG" },
			{ "name": "Argentina", "code": "AR" },
			{ "name": "Armenia", "code": "AM" },
			{ "name": "Aruba", "code": "AW" },
			{ "name": "Australia", "code": "AU" },
			{ "name": "Austria", "code": "AT" },
			{ "name": "Azerbaijan", "code": "AZ" },
			{ "name": "Bahamas", "code": "BS" },
			{ "name": "Bahrain", "code": "BH" },
			{ "name": "Bangladesh", "code": "BD" },
			{ "name": "Barbados", "code": "BB" },
			{ "name": "Belarus", "code": "BY" },
			{ "name": "Belgium", "code": "BE" },
			{ "name": "Belize", "code": "BZ" },
			{ "name": "Benin", "code": "BJ" },
			{ "name": "Bermuda", "code": "BM" },
			{ "name": "Bhutan", "code": "BT" },
			{ "name": "Bolivia", "code": "BO" },
			{ "name": "Bosnia and Herzegovina", "code": "BA" },
			{ "name": "Botswana", "code": "BW" },
			{ "name": "Bouvet Island", "code": "BV" },
			{ "name": "Brazil", "code": "BR" },
			{ "name": "British Indian Ocean Territory", "code": "IO" },
			{ "name": "Brunei Darussalam", "code": "BN" },
			{ "name": "Bulgaria", "code": "BG" },
			{ "name": "Burkina Faso", "code": "BF" },
			{ "name": "Burundi", "code": "BI" },
			{ "name": "Cambodia", "code": "KH" },
			{ "name": "Cameroon", "code": "CM" },
			{ "name": "Canada", "code": "CA" },
			{ "name": "Cape Verde", "code": "CV" },
			{ "name": "Cayman Islands", "code": "KY" },
			{ "name": "Central African Republic", "code": "CF" },
			{ "name": "Chad", "code": "TD" },
			{ "name": "Chile", "code": "CL" },
			{ "name": "China", "code": "CN" },
			{ "name": "Christmas Island", "code": "CX" },
			{ "name": "Cocos (Keeling) Islands", "code": "CC" },
			{ "name": "Colombia", "code": "CO" },
			{ "name": "Comoros", "code": "KM" },
			{ "name": "Congo", "code": "CG" },
			{ "name": "Congo, The Democratic Republic of the", "code": "CD" },
			{ "name": "Cook Islands", "code": "CK" },
			{ "name": "Costa Rica", "code": "CR" },
			{ "name": "Cote D'Ivoire", "code": "CI" },
			{ "name": "Croatia", "code": "HR" },
			{ "name": "Cuba", "code": "CU" },
			{ "name": "Cyprus", "code": "CY" },
			{ "name": "Czech Republic", "code": "CZ" },
			{ "name": "Denmark", "code": "DK" },
			{ "name": "Djibouti", "code": "DJ" },
			{ "name": "Dominica", "code": "DM" },
			{ "name": "Dominican Republic", "code": "DO" },
			{ "name": "Ecuador", "code": "EC" },
			{ "name": "Egypt", "code": "EG" },
			{ "name": "El Salvador", "code": "SV" },
			{ "name": "Equatorial Guinea", "code": "GQ" },
			{ "name": "Eritrea", "code": "ER" },
			{ "name": "Estonia", "code": "EE" },
			{ "name": "Ethiopia", "code": "ET" },
			{ "name": "Falkland Islands (Malvinas)", "code": "FK" },
			{ "name": "Faroe Islands", "code": "FO" },
			{ "name": "Fiji", "code": "FJ" },
			{ "name": "Finland", "code": "FI" },
			{ "name": "France", "code": "FR" },
			{ "name": "French Guiana", "code": "GF" },
			{ "name": "French Polynesia", "code": "PF" },
			{ "name": "French Southern Territories", "code": "TF" },
			{ "name": "Gabon", "code": "GA" },
			{ "name": "Gambia", "code": "GM" },
			{ "name": "Georgia", "code": "GE" },
			{ "name": "Germany", "code": "DE" },
			{ "name": "Ghana", "code": "GH" },
			{ "name": "Gibraltar", "code": "GI" },
			{ "name": "Greece", "code": "GR" },
			{ "name": "Greenland", "code": "GL" },
			{ "name": "Grenada", "code": "GD" },
			{ "name": "Guadeloupe", "code": "GP" },
			{ "name": "Guam", "code": "GU" },
			{ "name": "Guatemala", "code": "GT" },
			{ "name": "Guernsey", "code": "GG" },
			{ "name": "Guinea", "code": "GN" },
			{ "name": "Guinea-Bissau", "code": "GW" },
			{ "name": "Guyana", "code": "GY" },
			{ "name": "Haiti", "code": "HT" },
			{ "name": "Heard Island and Mcdonald Islands", "code": "HM" },
			{ "name": "Holy See (Vatican City State)", "code": "VA" },
			{ "name": "Honduras", "code": "HN" },
			{ "name": "Hong Kong", "code": "HK" },
			{ "name": "Hungary", "code": "HU" },
			{ "name": "Iceland", "code": "IS" },
			{ "name": "India", "code": "IN" },
			{ "name": "Indonesia", "code": "ID" },
			{ "name": "Iran, Islamic Republic Of", "code": "IR" },
			{ "name": "Iraq", "code": "IQ" },
			{ "name": "Ireland", "code": "IE" },
			{ "name": "Isle of Man", "code": "IM" },
			{ "name": "Israel", "code": "IL" },
			{ "name": "Italy", "code": "IT" },
			{ "name": "Jamaica", "code": "JM" },
			{ "name": "Japan", "code": "JP" },
			{ "name": "Jersey", "code": "JE" },
			{ "name": "Jordan", "code": "JO" },
			{ "name": "Kazakhstan", "code": "KZ" },
			{ "name": "Kenya", "code": "KE" },
			{ "name": "Kiribati", "code": "KI" },
			{ "name": "Korea, Democratic People'S Republic of", "code": "KP" },
			{ "name": "Korea, Republic of", "code": "KR" },
			{ "name": "Kuwait", "code": "KW" },
			{ "name": "Kyrgyzstan", "code": "KG" },
			{ "name": "Lao People'S Democratic Republic", "code": "LA" },
			{ "name": "Latvia", "code": "LV" },
			{ "name": "Lebanon", "code": "LB" },
			{ "name": "Lesotho", "code": "LS" },
			{ "name": "Liberia", "code": "LR" },
			{ "name": "Libyan Arab Jamahiriya", "code": "LY" },
			{ "name": "Liechtenstein", "code": "LI" },
			{ "name": "Lithuania", "code": "LT" },
			{ "name": "Luxembourg", "code": "LU" },
			{ "name": "Macao", "code": "MO" },
			{ "name": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
			{ "name": "Madagascar", "code": "MG" },
			{ "name": "Malawi", "code": "MW" },
			{ "name": "Malaysia", "code": "MY" },
			{ "name": "Maldives", "code": "MV" },
			{ "name": "Mali", "code": "ML" },
			{ "name": "Malta", "code": "MT" },
			{ "name": "Marshall Islands", "code": "MH" },
			{ "name": "Martinique", "code": "MQ" },
			{ "name": "Mauritania", "code": "MR" },
			{ "name": "Mauritius", "code": "MU" },
			{ "name": "Mayotte", "code": "YT" },
			{ "name": "Mexico", "code": "MX" },
			{ "name": "Micronesia, Federated States of", "code": "FM" },
			{ "name": "Moldova, Republic of", "code": "MD" },
			{ "name": "Monaco", "code": "MC" },
			{ "name": "Mongolia", "code": "MN" },
			{ "name": "Montenegro", "code": "ME" },
			{ "name": "Montserrat", "code": "MS" },
			{ "name": "Morocco", "code": "MA" },
			{ "name": "Mozambique", "code": "MZ" },
			{ "name": "Myanmar", "code": "MM" },
			{ "name": "Namibia", "code": "NA" },
			{ "name": "Nauru", "code": "NR" },
			{ "name": "Nepal", "code": "NP" },
			{ "name": "Netherlands", "code": "NL" },
			{ "name": "Netherlands Antilles", "code": "AN" },
			{ "name": "New Caledonia", "code": "NC" },
			{ "name": "New Zealand", "code": "NZ" },
			{ "name": "Nicaragua", "code": "NI" },
			{ "name": "Niger", "code": "NE" },
			{ "name": "Nigeria", "code": "NG" },
			{ "name": "Niue", "code": "NU" },
			{ "name": "Norfolk Island", "code": "NF" },
			{ "name": "Northern Mariana Islands", "code": "MP" },
			{ "name": "Norway", "code": "NO" },
			{ "name": "Oman", "code": "OM" },
			{ "name": "Pakistan", "code": "PK" },
			{ "name": "Palau", "code": "PW" },
			{ "name": "Palestinian Territory, Occupied", "code": "PS" },
			{ "name": "Panama", "code": "PA" },
			{ "name": "Papua New Guinea", "code": "PG" },
			{ "name": "Paraguay", "code": "PY" },
			{ "name": "Peru", "code": "PE" },
			{ "name": "Philippines", "code": "PH" },
			{ "name": "Pitcairn", "code": "PN" },
			{ "name": "Poland", "code": "PL" },
			{ "name": "Portugal", "code": "PT" },
			{ "name": "Puerto Rico", "code": "PR" },
			{ "name": "Qatar", "code": "QA" },
			{ "name": "Reunion", "code": "RE" },
			{ "name": "Romania", "code": "RO" },
			{ "name": "Russian Federation", "code": "RU" },
			{ "name": "RWANDA", "code": "RW" },
			{ "name": "Saint Helena", "code": "SH" },
			{ "name": "Saint Kitts and Nevis", "code": "KN" },
			{ "name": "Saint Lucia", "code": "LC" },
			{ "name": "Saint Pierre and Miquelon", "code": "PM" },
			{ "name": "Saint Vincent and the Grenadines", "code": "VC" },
			{ "name": "Samoa", "code": "WS" },
			{ "name": "San Marino", "code": "SM" },
			{ "name": "Sao Tome and Principe", "code": "ST" },
			{ "name": "Saudi Arabia", "code": "SA" },
			{ "name": "Senegal", "code": "SN" },
			{ "name": "Serbia", "code": "RS" },
			{ "name": "Seychelles", "code": "SC" },
			{ "name": "Sierra Leone", "code": "SL" },
			{ "name": "Singapore", "code": "SG" },
			{ "name": "Slovakia", "code": "SK" },
			{ "name": "Slovenia", "code": "SI" },
			{ "name": "Solomon Islands", "code": "SB" },
			{ "name": "Somalia", "code": "SO" },
			{ "name": "South Africa", "code": "ZA" },
			{ "name": "South Georgia and the South Sandwich Islands", "code": "GS" },
			{ "name": "Spain", "code": "ES" },
			{ "name": "Sri Lanka", "code": "LK" },
			{ "name": "Sudan", "code": "SD" },
			{ "name": "Suriname", "code": "SR" },
			{ "name": "Svalbard and Jan Mayen", "code": "SJ" },
			{ "name": "Swaziland", "code": "SZ" },
			{ "name": "Sweden", "code": "SE" },
			{ "name": "Switzerland", "code": "CH" },
			{ "name": "Syrian Arab Republic", "code": "SY" },
			{ "name": "Taiwan, Province of China", "code": "TW" },
			{ "name": "Tajikistan", "code": "TJ" },
			{ "name": "Tanzania, United Republic of", "code": "TZ" },
			{ "name": "Thailand", "code": "TH" },
			{ "name": "Timor-Leste", "code": "TL" },
			{ "name": "Togo", "code": "TG" },
			{ "name": "Tokelau", "code": "TK" },
			{ "name": "Tonga", "code": "TO" },
			{ "name": "Trinidad and Tobago", "code": "TT" },
			{ "name": "Tunisia", "code": "TN" },
			{ "name": "Turkey", "code": "TR" },
			{ "name": "Turkmenistan", "code": "TM" },
			{ "name": "Turks and Caicos Islands", "code": "TC" },
			{ "name": "Tuvalu", "code": "TV" },
			{ "name": "Uganda", "code": "UG" },
			{ "name": "Ukraine", "code": "UA" },
			{ "name": "United Arab Emirates", "code": "AE" },
			{ "name": "United Kingdom", "code": "GB" },
			{ "name": "United States", "code": "US" },
			{ "name": "United States Minor Outlying Islands", "code": "UM" },
			{ "name": "Uruguay", "code": "UY" },
			{ "name": "Uzbekistan", "code": "UZ" },
			{ "name": "Vanuatu", "code": "VU" },
			{ "name": "Venezuela", "code": "VE" },
			{ "name": "Viet Nam", "code": "VN" },
			{ "name": "Virgin Islands, British", "code": "VG" },
			{ "name": "Virgin Islands, U.S.", "code": "VI" },
			{ "name": "Wallis and Futuna", "code": "WF" },
			{ "name": "Western Sahara", "code": "EH" },
			{ "name": "Yemen", "code": "YE" },
			{ "name": "Zambia", "code": "ZM" },
			{ "name": "Zimbabwe", "code": "ZW" }
		]
	}),
	created() {
		this.$emit('route', 'sign-ups')
		this.countries = this.countries.map(c => ({ text: c.name, value: c.code }))
	},
	methods: {
		...mapActions('AUTH', ['SIGN_UP']),
		async createAccount() {
			let fields = ['email', 'userName', 'password', 'invitationCode']
			const showError = message => {
				this.toasts.push({ message, type: 'error' })
			}
			for (let f of fields) {
				if (this.form[f].trim() === '') {
					showError(f + ' is required!'); return
				}
			}

			let country = this.countries.find(c => c.value === this.form.country)
			let { error, message } = await this.SIGN_UP({
				...this.form, country: {
					name: country.text,
					code: country.value
				}
			})

			if (error) { showError(message); return }
			this.$toast.open({
				type: 'success',
				message: 'You have successfully signed up.' +
					'You can signin now with your username and password'
			})

			fields.forEach(field => this.form[field] = '')

		}
	},
	watch: {
		toasts() {
			if (this.toasts.length === 0) return
			let { message, type } = this.toasts[0]
			this.$toast.open({ message, type })
			this.toasts.shift()
		}
	},
}
</script>

<style lang='scss' scoped>
	.sign-up {
		padding: 4rem 0;
		flex-direction: column;
		justify-content: center;
		.signup-box {
			width: 400px;
			height: max-content;
			.form-control,
			.custom-select {
				font-size: 1em;
				height: 3rem;
			}
			.grey-6 {
				color: #757575;
			}
			.btn-create-account {
				padding: 1rem 2rem;
				font-weight: bold;
				letter-spacing: 1px;
			}
		}
	}
</style>