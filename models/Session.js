

export default class Session{
  static id$ =  'Session.id';
  static amount$ =  'Session.amount';
  static currency$ =  'Session.currency';
  static callbackUrl$ = 'Session.callbackUrl'; 
  static returnUrl$ =  'Session.returnUrl';
  static expiryDate$ =  'Session.expiryDate';
  static status$ =  'Session.status';
  static merchantId$ =  'Session.merchantId';
  static merchantPublicKey$ =  'Session.merchantPublicKey';
  static language$ =  'Session.language';
  static merchantReferenceId$ =  'Session.merchantReferenceId';
  static paymentIntentId$ =  'Session.paymentIntentId';
  static paymentOperation$ =  'Session.paymentOperation';
  static cardOnFile$ =  'Session.cardOnFile';
  static cofAgreement$ =  'Session.cofAgreement';
  static initiatedBy$ =  'Session.initiatedBy';
  static tokenId$ =  'Session.tokenId';
  static customer$ =  'Session.customer';
  static platform$ =  'Session.platform';
  static paymentOptions$ = 'Session.paymentOptions'; 
  static recurrence$ =  'Session.recurrence';
  static appearance$ =  'Session.appearance';
  static metadata$ =  'Session.metadata';
  static paymentMethod$ =  'Session.paymentMethod';
  static subscription$ =  'Session.subscription';
  
  constructor({
    id,
    amount,
    currency,
    callbackUrl,
    returnUrl,
    expiryDate,
    status,
    merchantId,
    merchantPublicKey,
    language,
    merchantReferenceId,
    paymentIntentId,
    paymentOperation,
    cardOnFile,
    cofAgreement,
    initiatedBy,
    tokenId,
    customer,
    platform,
    paymentOptions,
    recurrence,
    order,
    items,
    appearance,
    metadata,
    paymentMethod,
    subscription
  }) {
    this.id$ = id;
    this.amount$ = amount;
    this.currency$ = currency;
    this.callbackUrl$ =  callbackUrl;
    this.returnUrl$ =  returnUrl;
    this.expiryDate$ =  expiryDate;
    this.status$ =  status;
    this.merchantId$ =  merchantId;
    this.merchantPublicKey$ =  merchantPublicKey;
    this.language$ =  language;
    this.merchantReferenceId$ =  merchantReferenceId;
    this.paymentIntentId$ =  paymentIntentId;
    this.paymentOperation$ =  paymentOperation;
    this.cardOnFile$ =  cardOnFile;
    this.cofAgreement$ =  cofAgreement;
    this.initiatedBy$ =  initiatedBy;
    this.tokenId$ =  tokenId;
    this.customer$ =  customer;
    this.platform$ =  platform;
    this.paymentOptions$ =  paymentOptions;
    this.recurrence$ =  recurrence;
    this.appearance$ =  appearance;
    this.metadata$ =  metadata;
    this.paymentMethod$ =  paymentMethod;
    this.subscription$ =  subscription;

    Object.defineProperties(this, {
      id: {
        get: () => this.id$,
        enumerable: true
      },
      amount: {
        get: () => this.amount$,
        enumerable: true
      },
      currency: {
        get: () => this.currency$,
        enumerable: true
      },
      callbackUrl: {
        get: () => this.callbackUrl$,
        enumerable: true
      },
      returnUrl: {
        get: () => this.returnUrl$,
        enumerable: true
      },
      expiryDate: {
        get: () => this.expiryDate$,
        enumerable: true
      },
      status: {
        get: () => this.status$,
        enumerable: true
      },
      merchantId: {
        get: () => this.merchantId$,
        enumerable: true
      },
      merchantPublicKey: {
        get: () => this.merchantPublicKey$,
        enumerable: true
      },
      language: {
        get: () => this.language$,
        enumerable: true
      },
      merchantReferenceId: {
        get: () => this.merchantReferenceId$,
        enumerable: true
      },
      paymentIntentId: {
        get: () => this.paymentIntentId$,
        enumerable: true
      },
      paymentOperation: {
        get: () => this.paymentOperation$,
        enumerable: true
      },
      cardOnFile: {
        get: () => this.cardOnFile$,
        enumerable: true
      },
      cofAgreement: {
        get: () => this.cofAgreement$,
        enumerable: true
      },
      initiatedBy: {
        get: () => this.initiatedBy$,
        enumerable: true
      },
      tokenId: {
        get: () => this.tokenId$,
        enumerable: true
      },
      customer: {
        get: () => this.customer$,
        enumerable: true
      },
      platform: {
        get: () => this.platform$,
        enumerable: true
      },
      paymentOptions: {
        get: () => this.paymentOptions$,
        enumerable: true
      },
      recurrence: {
        get: () => this.recurrence$,
        enumerable: true
      },
      appearance: {
        get: () => this.appearance$,
        enumerable: true
      },
      metadata: {
        get: () => this.metadata$,
        enumerable: true
      },
      paymentMethod: {
        get: () => this.paymentMethod$,
        enumerable: true
      },
      subscription: {
        get: () => this.subscription$,
        enumerable: true
      },
    });
  }

  static fromJson(json) {
    if (json == null) {
      return null;
    }

    const {
      id,
      amount,
      currency,
      callbackUrl,
      returnUrl,
      expiryDate,
      status,
      merchantId,
      merchantPublicKey,
      language,
      merchantReferenceId,
      paymentIntentId,
      paymentOperation,
      cardOnFile,
      cofAgreement,
      initiatedBy,
      tokenId,
      customer,
      platform,
      paymentOptions,
      recurrence,
      appearance,
      metadata,
      paymentMethod,
      subscription
    } = json;

    return new Session({
      id,
      amount,
      currency,
      callbackUrl,
      returnUrl,
      expiryDate,
      status,
      merchantId,
      merchantPublicKey,
      language,
      merchantReferenceId,
      paymentIntentId,
      paymentOperation,
      cardOnFile,
      cofAgreement,
      initiatedBy,
      tokenId,
      customer,
      platform,
      paymentOptions,
      recurrence,
      appearance: appearance || {},
      metadata: metadata || {},
      paymentMethod: paymentMethod || {},
      subscription
    });
  }
}
