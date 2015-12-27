/**
 * Created by baebae on 12/8/15.
 */
var React = require('react-native');
var {
		StyleSheet,
		View,
		ScrollView,
		Image,
		Text,
		TextInput,
		TouchableOpacity,
		LayoutAnimation
} = React;
var Button = require('react-native-material-button');
var LoginController = require('../controller/LoginController');
var {bp, vw, vh} = require('react-native-relative-units')(100);

var inputMail = 'inputMail';
var inputPassword = 'inputPassword';
var LoginPage = React.createClass({
	model: {
		flagPasswordFocus: false
		, flagMailFocus : false
		, flagFormFocus: false
	},
	getInitialState: function() {
		LoginController.setViewController(this);
		return {
			flagReadyForLogin: false
			, flagFormFocus: false
			, marginTopInputForm: 35 * vh
			, marginTopCancelForm: -15 * vh
		}
	},
	setFocusInputForm: function(flagPasswordField) {
		if (!flagPasswordField) {
			this.model.flagMailFocus = true;
		} else {
			this.model.flagPasswordFocus = true;
		}
		if (this.model.flagFormFocus == false && (this.model.flagMailFocus || this.model.flagPasswordFocus)) {
			this.model.flagFormFocus = true;

			this.moveUpAnimation();
		}
	},
	removeFocusInputForm: function(flagPasswordField) {
		if (!flagPasswordField) {
			this.model.flagMailFocus = false;
		} else {
			this.model.flagPasswordFocus = false;
		}
		if (this.model.flagFormFocus == true && (!this.model.flagMailFocus && !this.model.flagPasswordFocus)) {
			this.model.flagFormFocus = false;
			this.moveDownAnimation();
		}
	},

	moveUpAnimation : function() {
		this.setState({
			flagFormFocus: true
		});
		LayoutAnimation.easeInEaseOut();
		this.setState({
			marginTopInputForm: 25 * vh
			, marginTopCancelForm: 0
		})
	},
	moveDownAnimation: function() {
		this.setState({
			flagFormFocus: false
		});
		LayoutAnimation.easeInEaseOut();
		this.setState({
			marginTopInputForm: 35 * vh
			, marginTopCancelForm: -15 * vh
		})
	},

	render: function() {

		let loginButton = {
			rippleColor: 'rgba(255, 255, 255, 0.1)',
			style: styles.login_button,
			title: 'Log In'
		};

		let signupButton = {
			rippleColor: 'rgba(255, 255, 255, 0.1)',
			style: styles.sign_button,
			title: 'Sign Up for Free'
		};
		if (this.state.flagReadyForLogin == false) {
			loginButton.rippleColor = 'rgba(255, 255, 255, 0)';
			loginButton.style = styles.login_button_disabled;
		};
		var imgView = null;
		if (this.state.flagFormFocus == false) {
			imgView = (<Image style={styles.top_logo}
							  source={{uri: "img/tipjar_logo.png"}} />);
		}
		let parentObj = this;
		return (
			<View style={styles.container}>
				<View style={[styles.cancel_area, {
					marginTop: this.state.marginTopCancelForm,
				}]
				}>
					<TouchableOpacity onPress={() => {
						this.refs[inputMail].blur();
						this.refs[inputPassword].blur();
						this.moveDownAnimation();
					}}>
						<Text style={[styles.cancel_font, {flex: 1, marginLeft: 10 }]}>Cancel</Text>
					</TouchableOpacity>
					<Text style={[styles.cancel_font, {flex: 3, marginLeft: 10, textAlign: 'center'}]}>Login</Text>
					<Text style={[styles.cancel_font, {flex: 1, marginLeft: 10 }]}></Text>
				</View>
				<View style={styles.top_logo_area}>
					{imgView}
				</View>
				<View style={[styles.login_area, { marginTop: this.state.marginTopInputForm}]}>
					<View style={styles.email_area}>
						<Text style={styles.login_label}> E-mail </Text>
						<TextInput ref={'inputMail'}
								   style={{flex: 3, marginLeft: 10 }}
								   onChangeText={(text) => LoginController.setEmail(text)}
								   onFocus={() => parentObj.setFocusInputForm(false)}
								   onEndEditing={() => setTimeout(()=>{parentObj.removeFocusInputForm(false)}, 100)}
								   placeholder="me@example.com">

						</TextInput>
					</View>

					<View style={styles.password_area}>
						<Text style={styles.login_label}> Password </Text>
						<TextInput ref={'inputPassword'}
								   style={{flex: 3, marginLeft: 10 }}
								   secureTextEntry={true}
								   onChangeText={(text) => LoginController.setPassword(text)}
								   onFocus={() => parentObj.setFocusInputForm(true)}
								   onEndEditing={() => setTimeout(()=>{parentObj.removeFocusInputForm(true)}, 100)}
								   placeholder="Your Mint Password">

						</TextInput>
					</View>

					<View style={styles.login_button_area}>
						<Button
								rippleColor = {loginButton.rippleColor}
								style = {loginButton.style}
								onPressOut = {() => {
									this.refs[inputMail].blur();
									this.refs[inputPassword].blur();
									LoginController.doLogin();
								}}>
							<Text style={styles.button_text_style}>{loginButton.title}</Text>
						</Button>
					</View>

					<View style={styles.forget_label_area}>
						<TouchableOpacity
								onPress={() => LoginController.doForgetPassword()}>
							<Text style={styles.forget_label}> Forget Password </Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.bottom_area}>
					<View style={{flex: 1, width: vw * 100}}>
						<Button
								rippleColor = {signupButton.rippleColor}
								style = {signupButton.style}
								onPressOut = {() => {
									parentObj.removeFocusInputForm(false);
									parentObj.removeFocusInputForm(true);
									LoginController.doSignUp()
								}}>
							<Text style={styles.button_text_style}>{signupButton.title}</Text>
						</Button>
					</View>
					<View style={{flex: 1}}>
						<Image style={styles.bottom_logo}
							   source={{uri: "img/bottom_logo.png"}} />
					</View>
				</View>
			</View>);

	}
});
var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFFFFF'
	},
	cancel_area: {
		position: 'absolute',
		width: vw * 100,
		height: vh * 15,
		backgroundColor: '#3eca84',
		alignItems: 'center',
		flexDirection:'row'
	},
	cancel_font: {
		color: '#FFF',
		textAlign: 'center',
		fontSize: vh * 2.5,
		fontWeight: '600'
	},

	top_logo_area: {
		position: 'absolute',
		marginTop: vh * 10,
		width: vw * 100,
		height: vh * 15,
		alignItems: 'center',
	},

	bottom_logo_area: {
		position: 'absolute',
		marginTop: vh * 90,
		width: vw * 100,
		height: vh * 10,
		alignItems: 'center',
	},

	login_area: {
		position: 'absolute',
		marginTop: vh * 35,
		width: vw * 100,
		height: vh * 30,
		flexDirection:'column',
	},

	email_area: {
		flex: 1,
		borderTopWidth: 1,
		borderColor: '#CCC',
		alignItems: 'center',
		flexDirection:'row'
	},
	password_area: {
		flex: 1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#CCC',
		alignItems: 'center',
		flexDirection:'row'
	},
	login_button_area: {
		flex: 1.4,
		alignItems: 'center',
		flexDirection:'row',
	},
	login_button_disabled: {
		width: vw * 90,
		marginTop: vh * 2,
		paddingTop: vh * 2,
		borderRadius: vh * 0.8,
		paddingBottom: vh * 2,
		marginLeft: vw * 5,
		backgroundColor: '#a3e5f3',
		alignItems: 'center'
	},
	login_button: {
		width: vw * 90,
		marginTop: vh * 2,
		paddingTop: vh * 2,
		borderRadius: vh * 0.8,
		paddingBottom: vh * 2,
		marginLeft: vw * 5,
		backgroundColor: '#45cae6',
		alignItems: 'center'
	},

	forget_label_area: {
		flex: 0.8,
		marginTop: vh,
		flexDirection:'column',
		alignItems: 'center',
	},
	forget_label: {
		textAlign: 'center',
		color: '#d0d0d0'
	},

	login_label: {
		flex: 1,
		textAlign: 'left',
		paddingLeft: 10,
		fontSize: 15,
		fontWeight: '700'
	},

	top_logo :{
		width: vh * 30,
		height: vh * 10
	},

	bottom_area: {
		position: 'absolute',
		marginTop: vh * 80,
		width: vw * 100,
		height: vh * 20,
		flexDirection:'column',
		alignItems: 'center',
	},

	sign_button: {
		width: vw * 90,
		paddingTop: vh * 2,
		paddingBottom: vh * 2,
		marginLeft: vw * 5,
		borderRadius: vh * 0.8,
		backgroundColor: '#ffab40',
	},

	button_text_style: {
		color: '#FFF',
		textAlign: 'center',
		fontSize: vh * 2.5,
		fontWeight: '600'
	},
	bottom_logo :{
		width: vw * 20,
		height: vw * 6
	}
});
module.exports = LoginPage;