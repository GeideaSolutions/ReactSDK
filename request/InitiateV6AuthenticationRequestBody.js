import BaseRequestBody from './base/BaseRequestBody.js'

export default class InitiateV6AuthenticationRequestBody {
  static sessionId$ = '_sessionId'
  static merchantName$ = '_merchantName'
  static callbackUrl$ = '_callbackUrl'
  static isSetPaymentMethodEnabled$ = '_isSetPaymentMethodEnabled'
  static isCreateCustomerEnabled$ = '_isCreateCustomerEnabled'
  static paymentOperation$ = '_paymentOperation'
  static cardOnFile$ = '_cardOnFile'
  static restrictPaymentMethods$ = '_restrictPaymentMethods'
  static deviceIdentification$ = '_deviceIdentification'
  static orderId$ = '_orderId'
  static cardNumber$ = '_cardNumber'
  static source$ = '_source'
  static returnUrl$ = '_returnUrl'

  constructor(_sessionId, _callbackUrl, _cardNumber, _returnUrl, opts) {
    let _paymentOperation =
      opts && 'paymentOperation' in opts ? opts.paymentOperation : null;
    let _restrictPaymentMethods =
      opts && 'restrictPaymentMethods' in opts ? opts.restrictPaymentMethods : null;
    let _source =
      opts && 'source' in opts ? opts.source : null;
    let _deviceIdentification =
      opts && 'deviceIdentification' in opts ? opts.deviceIdentification : null;
    let _isSetPaymentMethodEnabled =
      opts && 'isSetPaymentMethodEnabled' in opts ? opts.isSetPaymentMethodEnabled : null;
    let _isCreateCustomerEnabled =
      opts && 'isCreateCustomerEnabled' in opts ? opts.isCreateCustomerEnabled : null;
    let _cardOnFile =
      opts && 'cardOnFile' in opts ? opts.cardOnFile : null;
      let _merchantName =
      opts && 'merchantName' in opts ? opts.merchantName : null;

    this.cardNumber = _cardNumber
    this.callbackUrl = _callbackUrl
    this.returnUrl = _returnUrl
    this.paymentOperation = _paymentOperation
    this.sessionId = _sessionId
    this.restrictPaymentMethods = _restrictPaymentMethods
    this.deviceIdentification = _deviceIdentification
    this.source = _source
    this.cardOnFile = _cardOnFile
    this.isSetPaymentMethodEnabled = _isSetPaymentMethodEnabled
    this.isCreateCustomerEnabled = _isCreateCustomerEnabled
    this.merchantName = _merchantName
    
  }
  // get sessionId() {
  //   return this[InitiateV6AuthenticationRequestBody.sessionId$]
  // }
  // set sessionId(value) {
  //   this[InitiateV6AuthenticationRequestBody.sessionId$] = value
  // }

  // get callbackUrl() {
  //   return this[InitiateV6AuthenticationRequestBody.callbackUrl$]
  // }
  // set callbackUrl(value) {
  //   this[InitiateV6AuthenticationRequestBody.callbackUrl$] = value
  // }
  // get returnUrl() {
  //   return this[InitiateV6AuthenticationRequestBody.returnUrl$]
  // }
  // set returnUrl(value) {
  //   this[InitiateV6AuthenticationRequestBody.returnUrl$] = value
  // }
  // get merchantName() {
  //   return this[InitiateV6AuthenticationRequestBody.merchantName$]
  // }
  // set merchantName(value) {
  //   this[InitiateV6AuthenticationRequestBody.merchantName$] = value
  // }
  // get cardOnFile() {
  //   return this[InitiateV6AuthenticationRequestBody.cardOnFile$]
  // }
  // set cardOnFile(value) {
  //   this[InitiateV6AuthenticationRequestBody.cardOnFile$] = value
  // }
  // get paymentOperation() {
  //   return this[InitiateV6AuthenticationRequestBody.paymentOperation$]
  // }
  // set paymentOperation(value) {
  //   this[InitiateV6AuthenticationRequestBody.paymentOperation$] = value
  // }
  // get source() {
  //   return this[InitiateV6AuthenticationRequestBody.source$]
  // }
  // set source(value) {
  //   this[InitiateV6AuthenticationRequestBody.source$] = value
  // }
  // get deviceIdentification() {
  //   return this[InitiateV6AuthenticationRequestBody.deviceIdentification$]
  // }
  // set deviceIdentification(value) {
  //   this[InitiateV6AuthenticationRequestBody.deviceIdentification$] = value
  // }
  // get restrictPaymentMethods() {
  //   return this[InitiateV6AuthenticationRequestBody.restrictPaymentMethods$]
  // }
  // set restrictPaymentMethods(value) {
  //   this[InitiateV6AuthenticationRequestBody.restrictPaymentMethods$] = value
  // }
  // get isCreateCustomerEnabled() {
  //   return this[InitiateV6AuthenticationRequestBody.isCreateCustomerEnabled$]
  // }
  // set isCreateCustomerEnabled(value) {
  //   this[InitiateV6AuthenticationRequestBody.isCreateCustomerEnabled$] = value
  // }
  // get isSetPaymentMethodEnabled() {
  //   return this[InitiateV6AuthenticationRequestBody.isSetPaymentMethodEnabled$]
  // }
  // set isSetPaymentMethodEnabled(value) {
  //   this[InitiateV6AuthenticationRequestBody.isSetPaymentMethodEnabled$] = value
  // }

  paramsMap() {
    let params = {}
    params[BaseRequestBody.fieldSessionId] = this.sessionId
    params[BaseRequestBody.fieldCardNumber] = this.cardNumber
    if (this.callbackUrl != null) {
      params[BaseRequestBody.fieldCallbackUrl] = this.callbackUrl
    }
    if (this.returnUrl != null) {
      params[BaseRequestBody.fieldReturnUrl] = this.returnUrl
    }
    if (this.cardOnFile != null) {
      params[BaseRequestBody.fieldCardOnFile] = this.cardOnFile
    }
    if (this.merchantName != null) {
      params[BaseRequestBody.fieldMerchantName] =
        this.merchantName
    }
    if (this.paymentOperation != null) {
      params[BaseRequestBody.fieldPaymentOperation] = this.paymentOperation
    }
    if (this.source != null) {
      params[BaseRequestBody.fieldSource] = this.source
    }
    if (this.isCreateCustomerEnabled != null) {
      params[BaseRequestBody.fieldIsCreateCustomerEnabled] = this.isCreateCustomerEnabled;
    }
    if (this.isSetPaymentMethodEnabled != null) {
      params[BaseRequestBody.fieldIsSetPaymentMethodEnabled] = this.isSetPaymentMethodEnabled
    }
    if (this.restrictPaymentMethods != null) {
      params[BaseRequestBody.fieldRestrictPaymentMethods] = this.restrictPaymentMethods;
    }
    if (this.deviceIdentification != null) {
      params[BaseRequestBody.fieldDeviceIdentification] = this.deviceIdentification
    }
    params["device"] = {
        "browser":"Webview"
      }
      params["source"] = 'MobileApp'
    return params
  }
}
