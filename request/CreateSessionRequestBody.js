import BaseRequestBody from "./base/BaseRequestBody";

export default class CreateSessionRequestBody {
    static amount$ = "_amount";
    static currency$ = "_currency";
    static language$ = "_language";
    static timestamp$ = "_timestamp";
    static callbackUrl$ = "_callbackUrl";
    static merchantReferenceId$ = "_merchantReferenceId";
    static paymentIntentId$ = "_paymentIntentId";
    static paymentOperation$ = "_paymentOperation";
    static cardOnFile$ = "_cardOnFile";
    static appearanceShowEmail$ = "_appearanceShowEmail";
    static appearanceShowAddress$ = "_appearanceShowAddress";
    static appearanceShowPhone$ = "_appearanceShowPhone";
    static appearanceReceiptPage$ = "_appearanceReceiptPage";
    static appearanceStylesHideGeideaLogo$ = "_appearanceStylesHideGeideaLogo";
    static appearanceUiMode$ = "_appearanceUiMode";
    static signature$ = "_signature";
    static returnUrl$ = "_returnUrl";
    static tokenId$ = "_tokenId";
    static initiatedBy$ = "_initiatedBy";


    constructor(
        _amount,
        _currency,
        _timestamp,
        _language = null,
        _callbackUrl = null,
        _merchantReferenceId,
        _paymentOperation = null,
        _cardOnFile = null,
        _appearance = null,
        _signature,
        _paymentIntentId = null,
        _returnUrl,
        _tokenId=null,
        _initiatedBy=null,
    ) {
        this.amount = _amount
        this.currency = _currency
        this.language = _language
        this.timestamp = _timestamp
        this.callbackUrl = _callbackUrl
        this.returnUrl = _returnUrl
        this.tokenId = _tokenId
        this.merchantReferenceId = _merchantReferenceId
        this.paymentIntentId = _paymentIntentId
        this.paymentOperation = _paymentOperation
        this.cardOnFile = _cardOnFile
        this.appearance = {
            ...(_appearance || {}),
            receiptPage: _appearance?.receiptPage,
            styles: {
                ...(_appearance?.styles || {}),
                hideGeideaLogo: _appearance?.styles?.hideGeideaLogo,
            },
            uiMode: _appearance?.uiMode,
        };
        this.signature = _signature
        this.initiatedBy = _initiatedBy
    }

    paramsMap() {
        let params = {}
        params[BaseRequestBody.fieldAmount] = this.amount
        params[BaseRequestBody.fieldCurrency] = this.currency
        params[BaseRequestBody.fieldTimestamp] = this.timestamp
        params[BaseRequestBody.fieldCallbackUrl] = this.callbackUrl
        params[BaseRequestBody.fieldReturnUrl] = this.returnUrl
        params[BaseRequestBody.fieldTokenId] = this.tokenId
        params[BaseRequestBody.fieldSignature] = this.signature
        params[BaseRequestBody.fieldMerchantReferenceId] = this.merchantReferenceId
        if(this.paymentIntentId!==null){
        params[BaseRequestBody.fieldPaymentIntentId] = this.paymentIntentId
        }
        if (this.paymentOperation !== null) {
            params[BaseRequestBody.fieldPaymentOperation] = this.paymentOperation;
          }
          
          if (this.cardOnFile !== null) {
            params[BaseRequestBody.fieldCardOnFile] = this.cardOnFile;
          }
          
          if (this.appearance !== null) {
            params[BaseRequestBody.fieldAppearance] = JSON.stringify(this.appearance);
          }
          
          if (this.language !== null) {
            params[BaseRequestBody.fieldLanguage] = this.language;
          }
          if(this.initiatedBy !== null){
          params[BaseRequestBody.fieldInitiatedBy] = this.initiatedBy;
          }else{
            params[BaseRequestBody.fieldInitiatedBy] = "Internet";
          }
        return params
    }
}