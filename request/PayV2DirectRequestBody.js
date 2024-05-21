import BaseRequestBody from './base/BaseRequestBody.js'

export default class PayV2DirectRequestBody {
  static sessionId$ = '_sessionId'
  static orderId$ = '_orderId'
  static threeDSecureId$ = '_threeDSecureId'
  static paymentOperation$ = '_paymentOperation'
  static customerPhoneNumber$ = '_customerPhoneNumber'
  static customerPhoneCountryCode$ = '_customerPhoneCountryCode'
  static paymentMethod$ = '_paymentMethod'
  static returnUrl$ = '_returnUrl'
  static source$ = '_source'

  constructor(
    _sessionId,
    _threeDSecureId,
    _orderId,
    _paymentMethod,
    _source,
    opts
  ) {
    let _paymentOperation =
      opts && 'paymentOperation' in opts ? opts.paymentOperation : null
    let _returnUrl =
      opts && 'returnUrl' in opts ? opts.returnUrl : null
    let _customerPhoneNumber =
      opts && 'customerPhoneNumber' in opts ? opts.customerPhoneNumber : null
    let _customerPhoneCountryCode =
      opts && 'customerPhoneCountryCode' in opts ? opts.customerPhoneCountryCode : null
    this.threeDSecureId = _threeDSecureId
    this.orderId = _orderId
    this.paymentMethod = _paymentMethod
    this.returnUrl = _returnUrl;
    this.sessionId = _sessionId;
    this.source = _source
    this.paymentOperation = _paymentOperation
    this.customerPhoneCountryCode = _customerPhoneCountryCode;
    this.customerPhoneNumber = _customerPhoneNumber;
  }
  // get amount() {
  //   return this[PayDirectRequestBody._amount$]
  // }
  // set amount(value) {
  //   this[PayDirectRequestBody._amount$] = value
  // }
  // get currency() {
  //   return this[PayDirectRequestBody._currency$]
  // }
  // set currency(value) {
  //   this[PayDirectRequestBody._currency$] = value
  // }
  // get billing() {
  //   return this[PayDirectRequestBody.billing$]
  // }
  // set billing(value) {
  //   this[PayDirectRequestBody.billing$] = value
  // }
  // get shipping() {
  //   return this[PayDirectRequestBody.shipping$]
  // }
  // set shipping(value) {
  //   this[PayDirectRequestBody.shipping$] = value
  // }
  // get PaymentCard() {
  //   return this[PayDirectRequestBody._paymentMethod$]
  // }
  // set PaymentCard(value) {
  //   this[PayDirectRequestBody._paymentMethod$] = value
  // }
  // get orderId() {
  //   return this[PayDirectRequestBody._orderId$]
  // }
  // set orderId(value) {
  //   this[PayDirectRequestBody._orderId$] = value
  // }
  // get paymentOperation() {
  //   return this[PayDirectRequestBody.paymentOperation$]
  // }
  // set paymentOperation(value) {
  //   this[PayDirectRequestBody.paymentOperation$] = value
  // }
  // get callbackUrl() {
  //   return this[PayDirectRequestBody.callbackUrl$]
  // }
  // set callbackUrl(value) {
  //   this[PayDirectRequestBody.callbackUrl$] = value
  // }
  // get paymentIntentId() {
  //   return this[PayDirectRequestBody.paymentIntentId$]
  // }
  // set paymentIntentId(value) {
  //   this[PayDirectRequestBody.paymentIntentId$] = value
  // }

  paramsMap() {
    let params = {}
    params[BaseRequestBody.fieldSessionId] = this.sessionId
    params[BaseRequestBody.fieldThreeDSecureId] = this.threeDSecureId
    params[BaseRequestBody.fieldOrderId] = this.orderId
    params[BaseRequestBody.fieldPaymentMethod] = this.paymentMethod.toMap()
    params[BaseRequestBody.fieldSource] = this.source
    if (this.callbackUrl != null) {
      params[BaseRequestBody.fieldReturnUrl] = this.returnUrl
    }
    if (this.billing != null) {
      params[BaseRequestBody.fieldCustomerPhoneNumber] = this.customerPhoneNumber
    }
    if (this.shipping != null) {
      params[BaseRequestBody.fieldCustomerPhoneCountryCode] = this.customerPhoneCountryCode
    }
    if (this.paymentOperation != null) {
      params[BaseRequestBody.fieldPaymentOperation] = this.paymentOperation
    }
    params[BaseRequestBody.fieldBrowser] = 'ReactNativeSDK'

    return params
  }
}
