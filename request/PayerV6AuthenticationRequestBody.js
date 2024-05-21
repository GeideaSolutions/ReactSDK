import BaseRequestBody from './base/BaseRequestBody.js'

export default class PayerV6AuthenticationRequestBody {
  static sessionId$ = '_sessionId'
  static orderId$ = '_orderId'
  static callbackUrl$ = '_callbackUrl'
  static cardOnFile$ = '_cardOnFile'
  static paymentOperation$ = '_paymentOperation'
  static paymentMethod$ = '_paymentMethod'
  static deviceIdentification$ = '_deviceIdentification'
  static merchantName$ = '_merchantName'
  static restrictPaymentMethods$ = '_restrictPaymentMethods'
  static isCreateCustomerEnabled$ = '_isCreateCustomerEnabled'
  static isSetPaymentMethodEnabled$ = '_isSetPaymentMethodEnabled'
  static javaEnabled$ = '_javaEnabled'
  static javaScriptEnabled$ = '_javaScriptEnabled'
  static browser$ = '_browser'
  static timeZone$ = '_timeZone'
  static source$ = '_source'
  static returnUrl$ =  '_returnurl' 
  
  constructor(_sessionId,
    _orderId,
    _paymentMethod,
    _deviceIdentification,
    _timeZone,
    _source, opts) {

      let _paymentOperation =
      opts && 'paymentOperation' in opts ? opts.paymentOperation : null;
    let _restrictPaymentMethods =
      opts && 'restrictPaymentMethods' in opts ? opts.restrictPaymentMethods : null;
    let _isSetPaymentMethodEnabled =
      opts && 'isSetPaymentMethodEnabled' in opts ? opts.isSetPaymentMethodEnabled : null;
    let _isCreateCustomerEnabled =
      opts && 'isCreateCustomerEnabled' in opts ? opts.isCreateCustomerEnabled : null;
    let _cardOnFile =
      opts && 'cardOnFile' in opts ? opts.cardOnFile : null;
      let _merchantName =
      opts && 'merchantName' in opts ? opts.merchantName : null;
    let _javaEnabled = opts && 'javaEnabled' in opts ? opts.javaEnabled : null
    let _browser = opts && 'browser' in opts ? opts.browser : null
    let _javaScriptEnabled = opts && 'javaScriptEnabled' in opts ? opts.javaScriptEnabled : null
    let _callbackUrl = opts && 'callbackUrl' in opts ? opts.callbackUrl : null
    let _returnUrl = opts && 'returnUrl' in opts ? opts.returnUrl : null
    
      

      this.sessionId = _sessionId
      this.orderId = _orderId
      this.paymentMethod = _paymentMethod
      this.deviceIdentification = _deviceIdentification
      this.timeZone = _timeZone
      this.source = _source

      this.callbackUrl = _callbackUrl
      this.paymentOperation = _paymentOperation
      this.restrictPaymentMethods = _restrictPaymentMethods
      this.cardOnFile = _cardOnFile
      this.isSetPaymentMethodEnabled = _isSetPaymentMethodEnabled
      this.isCreateCustomerEnabled = _isCreateCustomerEnabled
      this.merchantName = _merchantName
      this.javaEnabled = _javaEnabled
      this.javaScriptEnabled = _javaScriptEnabled
      this.browser = _browser
      this.returnUrl = _returnUrl
  }
  // get amount() {
  //   return this[PayerAuthenticationRequestBody._amount$]
  // }
  // set amount(value) {
  //   this[PayerAuthenticationRequestBody._amount$] = value
  // }
  // get currency() {
  //   return this[PayerAuthenticationRequestBody._currency$]
  // }
  // set currency(value) {
  //   this[PayerAuthenticationRequestBody._currency$] = value
  // }
  // get paymentMethod() {
  //   return this[PayerAuthenticationRequestBody._paymentMethod$]
  // }
  // set paymentMethod(value) {
  //   this[PayerAuthenticationRequestBody._paymentMethod$] = value
  // }
  // get orderId() {
  //   return this[PayerAuthenticationRequestBody._orderId$]
  // }
  // set orderId(value) {
  //   this[PayerAuthenticationRequestBody._orderId$] = value
  // }
  // get cardOnFile() {
  //   return this[PayerAuthenticationRequestBody.cardOnFile$]
  // }
  // set cardOnFile(value) {
  //   this[PayerAuthenticationRequestBody.cardOnFile$] = value
  // }
  // get merchantReferenceID() {
  //   return this[PayerAuthenticationRequestBody.merchantReferenceID$]
  // }
  // set merchantReferenceID(value) {
  //   this[PayerAuthenticationRequestBody.merchantReferenceID$] = value
  // }
  // get paymentOperation() {
  //   return this[PayerAuthenticationRequestBody.paymentOperation$]
  // }
  // set paymentOperation(value) {
  //   this[PayerAuthenticationRequestBody.paymentOperation$] = value
  // }
  // get callbackUrl() {
  //   return this[PayerAuthenticationRequestBody.callbackUrl$]
  // }
  // set callbackUrl(value) {
  //   this[PayerAuthenticationRequestBody.callbackUrl$] = value
  // }
  // get billing() {
  //   return this[PayerAuthenticationRequestBody.billing$]
  // }
  // set billing(value) {
  //   this[PayerAuthenticationRequestBody.billing$] = value
  // }
  // get shipping() {
  //   return this[PayerAuthenticationRequestBody.shipping$]
  // }
  // set shipping(value) {
  //   this[PayerAuthenticationRequestBody.shipping$] = value
  // }
  // get customerEmail() {
  //   return this[PayerAuthenticationRequestBody.customerEmail$]
  // }
  // set customerEmail(value) {
  //   this[PayerAuthenticationRequestBody.customerEmail$] = value
  // }
  // get returnUrl() {
  //   return this[PayerAuthenticationRequestBody.returnUrl$]
  // }
  // set returnUrl(value) {
  //   this[PayerAuthenticationRequestBody.returnUrl$] = value
  // }
  // get paymentIntentId() {
  //   return this[PayerAuthenticationRequestBody.paymentIntentId$]
  // }
  // set paymentIntentId(value) {
  //   this[PayerAuthenticationRequestBody.paymentIntentId$] = value
  // }

  paramsMap() {
    let params = {}
    params[BaseRequestBody.fieldSessionId] = this.sessionId
    params[BaseRequestBody.fieldSource] = this.source
    params[BaseRequestBody.fieldOrderId] = this.orderId
    params[BaseRequestBody.fieldTimeZone] =this.timeZone
    if(this.javaScriptEnabled!=null){
    params[BaseRequestBody.fieldJavaScriptEnabled] = this.javaScriptEnabled
  }
  if(this.javaEnabled!=null){
    params[BaseRequestBody.fieldJavaEnabled] = this.javaEnabled
  }
    if (this.callbackUrl != null) {
      params[BaseRequestBody.fieldCallbackUrl] = this.callbackUrl
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
    if(this.paymentMethod!=null){
    params[BaseRequestBody.fieldPaymentMethod] = this.paymentMethod.toMap()
  }
    params[BaseRequestBody.fieldBrowser] = 'ReactNativeSDK'
    params["device"] = {
      "browser":"Webview"
    }
    return params
  }
}
