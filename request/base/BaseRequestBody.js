export default class BaseRequestBody {
  constructor() {
    if (this.constructor == BaseRequestBody) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  /*base_request_body.BaseRequestBody.fieldAmount*/ static get fieldAmount() {
    return 'amount'
  }
  /*base_request_body.BaseRequestBody.fieldCurrency*/ static get fieldCurrency() {
    return 'currency'
  }
  /*base_request_body.BaseRequestBody.fieldCardNumber*/ static get fieldCardNumber() {
    return 'cardNumber'
  }
  /*base_request_body.BaseRequestBody.fieldCallbackUrl*/ static get fieldCallbackUrl() {
    return 'callbackUrl'
  }
  /*base_request_body.BaseRequestBody.fieldReturnUrl*/ static get fieldReturnUrl() {
    return 'returnUrl'
  }
  /*base_request_body.BaseRequestBody.fieldCardOnFile*/ static get fieldCardOnFile() {
    return 'cardOnFile'
  }
  /*base_request_body.BaseRequestBody.fieldOrderId*/ static get fieldOrderId() {
    return 'orderId'
  }
  /*base_request_body.BaseRequestBody.fieldSessionId*/ static get fieldSessionId() {
    return 'sessionId'
  }
  /*base_request_body.BaseRequestBody.fieldThreeDSecureId*/ static get fieldThreeDSecureId() {
    return 'threeDSecureId'
  }
  /*base_request_body.BaseRequestBody.fieldBrowser*/ static get fieldBrowser() {
    return 'browser'
  }
  /*base_request_body.BaseRequestBody.fieldPaymentMethod*/ static get fieldPaymentMethod() {
    return 'paymentMethod'
  }
  /*base_request_body.BaseRequestBody.fieldCardholderName*/ static get fieldCardholderName() {
    return 'cardholderName'
  }
  /*base_request_body.BaseRequestBody.fieldExpiryDate*/ static get fieldExpiryDate() {
    return 'expiryDate'
  }
  /*base_request_body.BaseRequestBody.fieldMonth*/ static get fieldMonth() {
    return 'month'
  }
  /*base_request_body.BaseRequestBody.fieldYear*/ static get fieldYear() {
    return 'year'
  }
  /*base_request_body.BaseRequestBody.fieldTokenId*/ static get fieldTokenId() {
    return 'tokenId'
  }
  /*base_request_body.BaseRequestBody.fieldInitiatedBy*/ static get fieldInitiatedBy() {
    return 'initiatedBy'
  }
  /*base_request_body.BaseRequestBody.fieldAgreementId*/ static get fieldAgreementId() {
    return 'agreementId'
  }
  /*base_request_body.BaseRequestBody.fieldReason*/ static get fieldReason() {
    return 'Reason'
  }
  /*base_request_body.BaseRequestBody.fieldMerchantName*/ static get fieldMerchantName() {
    return 'merchantName'
  }
   /*base_request_body.BaseRequestBody.fieldSource*/ static get fieldSource() {
    return 'source'
  }
   /*base_request_body.BaseRequestBody.fieldIsCreateCustomerEnabled*/ static get fieldIsCreateCustomerEnabled() {
    return 'isCreateCustomerEnabled'
  }
   /*base_request_body.BaseRequestBody.fieldMerchantName*/ static get fieldIsSetPaymentMethodEnabled() {
    return 'isSetPaymentMethodEnabled'
  }
   /*base_request_body.BaseRequestBody.fieldIsSetPaymentMethodEnabled*/ static get fieldDeviceIdentification() {
    return 'deviceIdentification'
  }
   /*base_request_body.BaseRequestBody.fieldRestrictPaymentMethods*/ static get fieldRestrictPaymentMethods() {
    return 'restrictPaymentMethods'
  }
  
  /*base_request_body.BaseRequestBody.fieldMerchantReferenceID*/ static get fieldMerchantReferenceID() {
    return 'merchantReferenceID'
  }
  /*base_request_body.BaseRequestBody.fieldMerchantReferenceId*/ static get fieldMerchantReferenceId() {
    return 'merchantReferenceId'
  }
   /*base_request_body.BaseRequestBody.fieldSignature*/ static get fieldSignature() {
    return 'signature'
  }
   /*base_request_body.BaseRequestBody.fieldTimestamp*/ static get fieldTimestamp() {
    return 'timestamp'
  }
  /*base_request_body.BaseRequestBody.fieldPaymentOperation*/ static get fieldPaymentOperation() {
    return 'paymentOperation'
  }
  /*base_request_body.BaseRequestBody.fieldBilling*/ static get fieldBilling() {
    return 'billing'
  }
  /*base_request_body.BaseRequestBody.fieldShipping*/ static get fieldShipping() {
    return 'shipping'
  }
  /*base_request_body.BaseRequestBody.fieldCustomerEmail*/ static get fieldCustomerEmail() {
    return 'customerEmail'
  }
  /*base_request_body.BaseRequestBody.fieldPaymentIntentId*/ static get fieldPaymentIntentId() {
    return 'paymentIntentId'
  }
  /*base_request_body.BaseRequestBody.fieldCountryCode*/ static get fieldCountryCode() {
    return 'countryCode'
  }
  /*base_request_body.BaseRequestBody.fieldStreet*/ static get fieldStreet() {
    return 'street'
  }
  /*base_request_body.BaseRequestBody.fieldCity*/ static get fieldCity() {
    return 'city'
  }
  /*base_request_body.BaseRequestBody.fieldPostCode*/ static get fieldPostCode() {
    return 'postCode'
  }
  /*base_request_body.BaseRequestBody.fieldCvv*/ static get fieldCvv() {
    return 'cvv'
  }

  /*base_request_body.BaseRequestBody.fieldJavaEnabled*/ static get fieldJavaEnabled() {
    return 'javaEnabled'
  }

  /*base_request_body.BaseRequestBody.fieldJavaScriptEnabled*/ static get fieldJavaScriptEnabled() {
    return 'javaScriptEnabled'
  }
  /*base_request_body.BaseRequestBody.fieldTimeZone*/ static get fieldTimeZone() {
    return 'timeZone'
  }
   /*base_request_body.BaseRequestBody.fieldCustomerPhoneNumber*/ static get fieldCustomerPhoneNumber() {
    return 'customerPhoneNumber'
  }
   /*base_request_body.BaseRequestBody.fieldCustomerPhoneCountryCode*/ static get fieldCustomerPhoneCountryCode() {
    return 'customerPhoneCountryCode'
  }
  
  
}
