/**
 * Created by baebae on 12/8/15.
 */
var LoginController = {

	viewController: null,
	formData: {
		email: "",
		password: ""
	},

	updateState() {
		this.viewController.setState({
			flagReadyForLogin: this.checkLoginReady()
		});
	},
	setViewController(controller) {
		this.viewController = controller;
	},
	setPassword(password) {
		this.formData.password = password;
		this.updateState();
	},
	setEmail(email) {
		this.formData.email = email;
		this.updateState();
	},
	checkLoginReady() {
		if (this.formData.email.length > 0 && this.formData.password.length > 0) {
			return true;
		} else {
			return false;
		}
	},
	doLogin() {
		if (this.checkLoginReady()) {
			alert("Login Information:" + JSON.stringify(this.formData));
		}
	},
	doSignUp() {
		alert("Sign Up");
	},
	doForgetPassword() {
		alert("Forgot Password");
	}
};

module.exports = LoginController;