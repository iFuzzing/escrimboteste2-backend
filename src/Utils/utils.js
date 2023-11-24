const isPassword = (password)=>{
	const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
	if (regex.test(password)) {
		return password;
	} else {
		return false;
	}
}

const isPhoneNumber = (number)=>{
	if(number.length != 11){
		return false
	}

	const intNumber = parseInt(number)
	if(isNaN(intNumber)){
		return false
	}

	return true
}

module.exports = {isPassword, isPhoneNumber}