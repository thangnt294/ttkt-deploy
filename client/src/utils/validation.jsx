/*eslint-disable */
const amex = '9999 999999 99999';
const other = '9999 9999 9999 9999';

export const isEmail = (email, required = true) => {
    const validEmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validEmailRegex.test(email) || (!required && !email);
}

export const isPhoneNumber = phone => {
    const validPhoneNumber =  /^[+]*[0-9]*$/;
    return validPhoneNumber.test(phone);
}

export const isPostalCode = postalCode => {
    const validPostalCode = /^[a-z0-9]*$/
    return validPostalCode.test(postalCode);
}

export const isValidTaxNumber = (taxNumber, required = true) => {
    const validTaxNumber = /^[a-zA-Z0-9]*$/
    return validTaxNumber.test(taxNumber) || (!required && !taxNumber);
}

export const isValidRegistrationNumber = (registrationNumber, required = true) => {
    const validRegistrationNumber = /^[a-zA-Z0-9]*$/
    return validRegistrationNumber.test(registrationNumber) || (!required && !registrationNumber);
}

export const isValidPassword = password => {
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/
    return validPassword.test(password);
}

export const isConfirmationCode = code => {
    const validCode = /^[0-9]{6}$/
    return validCode.test(code);
}

export const isNotSpace = code => {
    const validSpace = /([^\s])/
    return validSpace.test(code);
}

export const getCardMask = cardType => {
    return cardType === 'amex' ? amex : other;
}

export const getCreditCardType = cardNo => {
    const cardNumber = (cardNo || '').trim();
    let type = 'visa';
    let re = new RegExp("^4");
    if (!cardNo) return type;
    if (cardNumber.match(re) != null) type = "visa";

    re = new RegExp("^(34|37)");
    if (cardNumber.match(re) != null) type = "amex";

    re = new RegExp("^5[1-5]");
    if (cardNumber.match(re) != null) type = "mastercard";

    re = new RegExp("^6011");
    if (cardNumber.match(re) != null) type = "discover";
    
    re = new RegExp('^9792')
    if (cardNumber.match(re) != null) type = 'troy'

    return type;
}

export const isValidCardNumber = cardNumber => {
    const validCard = /^([0-9]{16})$/;
    const validAmexCard = /^[0-9]{15}$/;

    if (cardNumber) {
        const cardType = getCreditCardType(cardNumber);
        const trimmedCardNumber = cardNumber.replace(/\s+/g, '');

        return cardType === "amex" ? validAmexCard.test(trimmedCardNumber) : validCard.test(trimmedCardNumber);
    }
    return false;
}

export const isValidExpiredDate = expiredDate => {
    const now = new Date();
    const expiredParts = expiredDate.split('/');
    const month = parseInt(expiredParts[0], 10);
    const year = parseInt(expiredParts[1], 10);
    const validMonth = !isNaN(month) && expiredParts[0].length == 2 && month > 0 && month <= 12;
    const validYear = !isNaN(year) && expiredParts[1].length == 4;
    const validExpiredDate = year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);

    return validMonth && validYear && validExpiredDate;
}

export const isValidCVV = cvv => {
    const validCVV = /^[0-9]{3,10}$/
    return validCVV.test(cvv);
}

export const isValidCurrency = currency => {
    const validCurrency = /^[A-Za-z]*$/
    return validCurrency.test(currency);
}

export const isValidNetPrice = val => {
    if(!val) return true;
    const validNetPrice = /^-?\d+(,\d+)*(\.\d+)?$/
    return validNetPrice.test(val);
}

export const getErrorMessage = (error, name, validateMessage) => {
    if (error) {
        switch(error.type) {
            case "required":
                return `This field cannot be blank`;
            case "minLength":
            case "maxLength":
            case "validate":
                return validateMessage;
            case "pattern":
                return "Please enter valid number";
            default:
                return '';
        }
    }
    return '';
}
/*eslint-enable */