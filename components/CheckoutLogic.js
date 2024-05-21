import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Switch} from 'react-native';
import {Section, Button} from './common';
import GeideaApi from '../actions/GeideaApi';
import InitiateV6AuthenticationRequestBody from '../request/InitiateV6AuthenticationRequestBody';
import InitiateV4AuthenticationRequestBody from '../request/InitiateV4AuthenticationRequestBody';
import PayerV4AuthenticationRequestBody from '../request/PayerV4AuthenticationRequestBody';
import PayerV6AuthenticationRequestBody from '../request/PayerV6AuthenticationRequestBody';
import PayDirectRequestBody from '../request/PayDirectRequestBody';
import PaymentCard from '../models/PaymentCard';
import expiryDate from '../models/expiryDate';
import AuthenticationApiResponse from '../response/AuthenticationApiResponse';
import OrderResponse from '../response/OrderApiResponse';
import {formatAmount, formatCurrencyAmountLabel} from '../utils';
import ThreeDSScreenModal from './ThreeDSModal';
import Address from '../models/adress';
import PayV2DirectRequestBody from '../request/PayV2DirectRequestBody';
import CreateSessionRequestBody from '../request/CreateSessionRequestBody';
import base64 from 'react-native-base64';
import SessionApiResponse from '../response/SessionApiResponse';
import moment from 'moment/moment';
import CryptoJS from 'crypto-js';
import DeviceIdentification from '../models/DeviceIdentification';

let returnUrl = 'https://returnurl.com';
const ENCRYPTION_ALGORITHM = 'HmacSHA256';
class CheckoutLogic extends Component {
  
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this._calculateState(props), {
      loading: false,
      selectedOption: '',
      amount: '',
      creditCardFormValid: false,
      creditCardFormData: {},
      rememberMe: false,
      threeDSecureModalVisible: false,
      htmlBodyContent: '',
      successResponse: '',
      failureResponse: '',
      orderId: null,
      threeDSecureId: null,
      sessionId: null,
      sameAddress: true,
      billingAddress: new Address(),
      shippingAddress: new Address(),
      customerEmail: null,
      phoneNumber: null,
      showSuccessReceipt: false,
      showFailureReceipt: false,
      callbackUrl: '',
      merchantReferenceId: '',
      selectedEnvironment: 'Egypt - Production',
      selectedEnvironmentUrl: 'https://api.merchant.geidea.net/pgw',
      selectedEnvironmentSessionUrl:'https://api.merchant.geidea.net/payment-intent',
    });
    this.type = 'modal';
    if (props.route != null && props.route.params != null) {
      this.type = 'screen';
      this.myProps = this.props.route.params;
    }
    this.onDataChange = this.onDataChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.handlePaymentDetails = this.handlePaymentDetails.bind(this);
  }
  onDataChange(form) {
    this.setState({creditCardFormValid: form.valid});
    this.setState({creditCardFormData: form.values});
  }


  onAddressChange(key, isBilling, value) {
    if (isBilling) {
      const billingAddress = { ...this.state.billingAddress, [key]: value };
      const shippingAddress = this.state.sameAddress ? { ...this.state.shippingAddress, [key]: value } : { ...this.state.shippingAddress };
      this.setState({ billingAddress, shippingAddress });
    } else {
      const shippingAddress = { ...this.state.shippingAddress, [key]: value };
      this.setState({ shippingAddress });
    }
  }

  handlePaymentDetails(key, value) {
    this.setState({[key]: value});
  }

  _calculateState(props) {
    var shippingAddress;
    var billingAddress;
    var customerEmail;
    var phoneNumber;
    var merchantReferenceId;
    var language;
    var selectedEnvironment;
    var selectedEnvironmentUrl;
    var selectedEnvironmentSessionUrl;
    if (props != null && props.shippingAddress != null) {
      shippingAddress = props.shippingAddress;
    }
    if (props != null && props.billingAddress != null) {
      billingAddress = props.billingAddress;
    }
    if (props != null && props.customerEmail != null) {
      customerEmail = props.customerEmail;
    }
    if (props != null && props.phoneNumber != null) {
      phoneNumber = props.phoneNumber;
    }
    if (props != null && props.merchantReferenceID != null) {
      merchantReferenceId = props.merchantReferenceID;
    }
    if(props!=null && props.language !=null){
      language = props.language;
    }
    if(props!=null && props.selectedEnvironment !=null){
      selectedEnvironment = props.selectedEnvironment;
    }
    var callbackUrl = 'https://returnurl.com';
    if (props != null && props.route != null && props.route.params != null) {
      shippingAddress = this.props.route.params.shippingAddress;
      billingAddress = this.props.route.params.billingAddress;
      customerEmail = this.props.route.params.customerEmail;
      phoneNumber = this.props.route.params.phoneNumber;
      merchantReferenceId = this.props.route.params.merchantReferenceID;
      selectedEnvironment = this.props.route.params.selectedEnvironment;
      callbackUrl =
        this.props.route.params.callbackUrl == ''
          ? 'https://returnurl.com'
          : this.props.route.params.callbackUrl;

      GeideaApi.setSelectedEnvironment(selectedEnvironment);
    }

    return {
      loading: false,
      creditCardFormValid: false,
      creditCardFormData: {},
      rememberMe: false,
      threeDSecureModalVisible: false,
      htmlBodyContent: '',
      orderId: null,
      threeDSecureId: null,
      billingAddress: new Address(billingAddress),
      shippingAddress: new Address(shippingAddress),
      customerEmail: customerEmail,
      phoneNumber: phoneNumber,
      callbackUrl: callbackUrl,
      merchantReferenceId: merchantReferenceId,
      selectedEnvironment: selectedEnvironment,
      selectedEnvironmentUrl: selectedEnvironmentUrl,
      selectedEnvironmentSessionUrl:selectedEnvironmentSessionUrl,
    };
  }

  onPaymentSuccess(res) {
    this.props.navigation.navigate({
      name: this.myProps.previousScreen,
      params: {successResponse: res, failureResponse: ''},
      merge: true,
    });
  }
  onPaymentFailure(res) {
    this.props.navigation.navigate({
      name: this.myProps.previousScreen,
      params: {successResponse: '', failureResponse: res},
      merge: true,
    });
  }

  closeScreen() {
    this.props.navigation.pop(1);
  }

  getCurrentTimestamp() {
    return moment().format("M/D/YYYY h:mm:ss A");
  }
  

  _handlePaymentRequest(amount) {
    const {
      currency,
      publicKey,
      apiPassword,
      paymentOperation,
      callbackUrl,
      returnUrl,
      phoneNumber,
      merchantReferenceID,
    } = this.type === 'modal' ? this.props : this.myProps;
    

    console.log('printing state params' +JSON.stringify(this.state));
    const {rememberMe} = this.state;
    const customerEmail = this.state.customerEmail ?? this.myProps.customerEmail;
    const sameAddress = this.state.sameAddress ?? this.myProps.sameAddress;

    this.setState({amount: amount});
    this.setState({loading: true});
    let billingAdd = new Address({
      countryCode: this.state.billingAddress?._countryCode ?? this.myProps.billingAddress?._countryCode,
      street: this.state.billingAddress?._street
        ?? this.myProps.billingAddress?._street,
      city: this.state.billingAddress?._city
        ?? this.myProps.billingAddress?._city,
      postCode: this.state.billingAddress?._postCode
        ?? this.myProps.billingAddress?._postCode,
    });
    let shippingAdd;
    if (sameAddress) {
      shippingAdd = new Address({
        countryCode: billingAdd.countryCode,
        street: billingAdd.street,
        city: billingAdd.city,
        postCode: billingAdd.postCode,
      });
    } else {
      shippingAdd = new Address({
        countryCode: this.state.shippingAddress?._countryCode
          ?? this.myProps.shippingAddress?._countryCode,
        street: this.state.shippingAddress?._street
          ?? this.myProps.shippingAddress?._street,
        city: this.state.shippingAddress?._city
          ?? this.myProps.shippingAddress?._city,
        postCode: this.state.shippingAddress?._postCode
          ?? this.myProps.shippingAddress?._postCode,
      });
    }
    let timestamp = this.getCurrentTimestamp();
    let merchantReferenceId = merchantReferenceID;
    this._createSession(
      amount,
      currency,
      callbackUrl,
      merchantReferenceId,
      timestamp,
      this.generateSignature(publicKey,amount,currency,merchantReferenceID,apiPassword,timestamp),
      publicKey,
      apiPassword,
    ).then(res => { 
      let sessionApiResponse = SessionApiResponse.fromJson(res);
      if (sessionApiResponse.responseCode !== '000') {
        return this.onPaymentFailure(sessionApiResponse);
      }
       this._initiateV6Authentication(
        sessionApiResponse.session.id,
        callbackUrl,
        returnUrl,
        this.state.creditCardFormData.number.replace(/\s+/g, ''),
        publicKey,
        apiPassword,
      )
        .then(res => {
          let initiateAuthenticationResponse =
            AuthenticationApiResponse.fromJson(res);
          if (initiateAuthenticationResponse.responseCode !== '000') {
            return this.onPaymentFailure(initiateAuthenticationResponse);
          }
  
          const deviceIdentification = new DeviceIdentification('bc8e1fc68c1c6188f95947cec64ce1b0',
            'en',
            'Desktops/windows/Safari-537.36/Website');
          this._payerV6Authentication(
            sessionApiResponse.session.id,
            initiateAuthenticationResponse.orderId,
            deviceIdentification,
            -120,
            'HPP',
            callbackUrl,
            returnUrl,
            publicKey,
            apiPassword,
          )
            .then(payerAuthenticationResponse => {
              let response = AuthenticationApiResponse.fromJson(
                payerAuthenticationResponse,
              );
              if (response.responseCode === '000') {
                //handle 3d secure
                let htmlBodyContent = response.html.replace(
                  'target="redirectTo3ds1Frame"',
                  'target="_top"',
                );
                htmlBodyContent = htmlBodyContent.replace(
                  'target="challengeFrame"',
                  'target="_top"',
                );
                this.setState({
                  sessionId: sessionApiResponse.session.id,
                  source: 'HPP',
                  threeDSecureModalVisible: true,
                  htmlBodyContent: htmlBodyContent,
                  orderId: response.orderId,
                  threeDSecureId: response.threeDSecureId,
                });
              } else {
                return this.onPaymentFailure(response);
              }
            })
            .catch(err => {
              return this.onPaymentFailure(err);
            });
        }).catch(err => {
          this.onPaymentFailure(err)
        });
    })
    .catch(err => {
      this.onPaymentFailure(err)
    });
  }

  _createSession( 
    amount,
    currency,
    callbackUrl,
    merchantReferenceId,
    timestamp,
    signature,
    publicKey,
    apiPassword){
    let createSessionRequestBody =
      new CreateSessionRequestBody(
        amount,
        currency,
        timestamp,
        null,
        callbackUrl,
        merchantReferenceId,
        null,
        null,
        null,
        signature,
        null
      );
    return GeideaApi.createSession(
      createSessionRequestBody,
      publicKey,
      apiPassword,
    );
  }

  _initiateAuthentication(
    amount,
    currency,
    callbackUrl,
    returnUrl,
    publicKey,
    apiPassword,
    billingAddressProp,
    shippingAddressProp,
    customerEmailProp,
    phoneNumberProp,
  ) {
    let billingAddress = new Address({
      countryCode: billingAddressProp?._countryCode,
      street: billingAddressProp?._street,
      city: billingAddressProp?._city,
      postCode: billingAddressProp?._postCode,
    });

    let shippingAddress = new Address({
      countryCode: shippingAddressProp?._countryCode,
      street: shippingAddressProp?._street,
      city: shippingAddressProp?._city,
      postCode: shippingAddressProp?._postCode,
    });

    let customerEmail = customerEmailProp;
    let phoneNumber = phoneNumberProp;

    let initiateAuthenticationRequestBody =
      new InitiateV4AuthenticationRequestBody(
        amount,
        currency,
        this.state.creditCardFormData.number.replace(/\s+/g, ''),
        {
          callbackUrl: callbackUrl,
          returnUrl: returnUrl,
          cardOnFile: this.state.rememberMe,
          billing: billingAddress,
          shipping: shippingAddress,
          customerEmail: customerEmail,
          phoneNumber: phoneNumber
        },
      );
    return GeideaApi.initiateV4Authentication(
      initiateAuthenticationRequestBody,
      publicKey,
      apiPassword,
    );
  }

  _initiateV6Authentication(
    sessionId,
    callbackUrl,
    returnUrl,
    cardNumber,
    publicKey,
    apiPassword,
  ) {
    
    let initiateAuthenticationRequestBody =
      new InitiateV6AuthenticationRequestBody(
        sessionId,callbackUrl,cardNumber, returnUrl,null
      );
    return GeideaApi.initiateV6Authentication(
      initiateAuthenticationRequestBody,
      publicKey,
      apiPassword,
    );
  }

  _payerAuthentication(
    amount,
    currency,
    orderId,
    callbackUrl,
    returnUrl,
    cardOnFile,
    publicKey,
    apiPassword,
    paymentOperation,
    customerEmail,
    billingAddressProp,
    shippingAddressProp,
  ) {
    let expireDate = this.state.creditCardFormData.expiry.replace(/\s+/g, '');
    var monthYear = expireDate.split('/');
    let exDate = new expiryDate(monthYear[0], monthYear[1]);
    let card = new PaymentCard(
      this.state.creditCardFormData.name.replace(/\s+/g, ''),
      this.state.creditCardFormData.number.replace(/\s+/g, ''),
      this.state.creditCardFormData.cvc.replace(/\s+/g, ''),
      exDate,
    );
    let billingAddress = new Address({
      countryCode: billingAddressProp?._countryCode,
      street: billingAddressProp?._street,
      city: billingAddressProp?._city,
      postCode: billingAddressProp?._postCode,
    });

    let shippingAddress = new Address({
      countryCode: shippingAddressProp?._countryCode,
      street: shippingAddressProp?._street,
      city: shippingAddressProp?._city,
      postCode: shippingAddressProp?._postCode,
    });
    let payerAuthenticationRequestBody = new PayerV4AuthenticationRequestBody(
      amount,
      currency,
      card,
      orderId,
      {
        callbackUrl: callbackUrl,
        returnUrl: returnUrl,
        cardOnFile: cardOnFile,
        paymentOperation: paymentOperation,
        customerEmail: customerEmail,
        billing: billingAddress,
        shipping: shippingAddress
      },
    );
    return GeideaApi.payerV4Authentication(
      payerAuthenticationRequestBody,
      publicKey,
      apiPassword,
      null,
    );
  }

  _payerV6Authentication(
    sessionId,
      orderId,
      deviceIdentification,
      timeZone,
      source,
      callbackUrl,
      returnUrl,
    publicKey,
    apiPassword,
  ) {
    let expireDate = this.state.creditCardFormData.expiry.replace(/\s+/g, '');
    var monthYear = expireDate.split('/');
    let exDate = new expiryDate(monthYear[0], monthYear[1]);
    let card = new PaymentCard(
      this.state.creditCardFormData.name.replace(/\s+/g, ''),
      this.state.creditCardFormData.number.replace(/\s+/g, ''),
      this.state.creditCardFormData.cvc.replace(/\s+/g, ''),
      exDate,
    );
    let payerAuthenticationRequestBody = new PayerV6AuthenticationRequestBody(
      sessionId,
      orderId,
      card,
      deviceIdentification,
      timeZone,
      source,
      {
        callbackUrl: callbackUrl,
        returnUrl: returnUrl,
      },
    );
    return GeideaApi.payerV6Authentication(
      payerAuthenticationRequestBody,
      publicKey,
      apiPassword,
      null,
    );
  }
  
  generateSignature(publicKey, orderAmount, orderCurrency, merchantRefId, apiPass, timestamp) {
      const amountStr = formatAmount(orderAmount);
      const data = `${publicKey}${amountStr}${orderCurrency}${merchantRefId}${timestamp}`;
      // Convert the key to WordArray
      const key = CryptoJS.enc.Utf8.parse(apiPass);
      // Compute HMAC
      const hash = CryptoJS.HmacSHA256(data, key);
      // Encode the hash as Base64
      const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      return hashInBase64;
  }

  _directPay(
    amount,
    currency,
    orderId,
    threeDSecureId,
    sessionId,
    publicKey,
    apiPassword,
    billingAddress,
    shippingAddress,
  ) {
    let expireDate = this.state.creditCardFormData.expiry.replace(/\s+/g, '');
    var monthYear = expireDate.split('/');
    let exDate = new expiryDate(monthYear[0], monthYear[1]);
    let card = new PaymentCard(
      this.state.creditCardFormData.name.replace(/\s+/g, ''),
      this.state.creditCardFormData.number.replace(/\s+/g, ''),
      this.state.creditCardFormData.cvc.replace(/\s+/g, ''),
      exDate,
    );
    let payDirectRequestBody = new PayDirectRequestBody(
      threeDSecureId,
      orderId,
      amount,
      currency,
      card,
      sessionId,
      {
        billing: billingAddress,
        shipping: shippingAddress,
      },
    );
    return GeideaApi.payDirect(payDirectRequestBody, publicKey, apiPassword);
  }

  _directPayV2(
    sessionId,
    orderId,
    threeDSecureId,
    source,
    publicKey,
    apiPassword,
  ) {
    let expireDate = this.state.creditCardFormData.expiry.replace(/\s+/g, '');
    var monthYear = expireDate.split('/');
    let exDate = new expiryDate(monthYear[0], monthYear[1]);
    let card = new PaymentCard(
      this.state.creditCardFormData.name.replace(/\s+/g, ''),
      this.state.creditCardFormData.number.replace(/\s+/g, ''),
      this.state.creditCardFormData.cvc.replace(/\s+/g, ''),
      exDate,
    );
    let payDirectRequestBody = new PayV2DirectRequestBody(
      sessionId,
      threeDSecureId,
      orderId,
      card,
      source,
      {}
    );
    return GeideaApi.payV2Direct(payDirectRequestBody, publicKey, apiPassword);
  }

  _closeThreeDSecureModal() {
    const {currency, publicKey, apiPassword} =
      this.type === 'modal' ? this.props : this.myProps;
    const {sessionId, orderId, threeDSecureId, source, sameAddress} = this.state;
    let billingAdd = new Address({
      countryCode: this.state.billingAddress?._countryCode
        ?? this.myProps.billingAddress?._countryCode,
      street: this.state.billingAddress?._street
        ?? this.myProps.billingAddress?._street,
      city: this.state.billingAddress?._city
        ?? this.myProps.billingAddress?._city,
      postCode: this.state.billingAddress?._postCode
        ?? this.myProps.billingAddress?._postCode,
    });
    let shippingAdd;
    if (sameAddress) {
      shippingAdd = new Address({
        countryCode: billingAdd.countryCode,
        street: billingAdd.street,
        city: billingAdd.city,
        postCode: billingAdd.postCode,
      });
    } else {
      shippingAdd = new Address({
        countryCode: this.state.shippingAddress?._countryCode
          ?? this.myProps.shippingAddress?._countryCode,
        street: this.state.shippingAddress?._street
          ?? this.myProps.shippingAddress?._street,
        city: this.state.shippingAddress?._city
          ?? this.myProps.shippingAddress?._city,
        postCode: this.state.shippingAddress?._postCode
          ?? this.myProps.shippingAddress?._postCode,
      });
    }
    if (orderId && threeDSecureId && sessionId) {
      this.setState({
        threeDSecureModalVisible: false,
      });
      this._directPayV2(
        sessionId,
        orderId,
        threeDSecureId,
        source,
        publicKey,
        apiPassword,
      )
        .then(res => {
          let orderResponse = OrderResponse.fromJson(res);
          this.onPaymentSuccess(orderResponse);
        })
        .catch(err => this.onPaymentFailure(err));
    }
  }

  getTextColor() {
    const props = this.type === 'modal' ? this.props : this.myProps;
    const textColor = '#000000';
    if (this.type === 'modal') {
      return '#000';
    }
    return textColor;
  }
  getBackgroundColor() {
    const props = this.type === 'modal' ? this.props : this.myProps;
    const backgroundColor = '#ffffff';
    return backgroundColor;
  }
  getLanguage() {
    const props = this.type === 'modal' ? this.props : this.myProps;
    const lang = props.lang ? props.lang : 'English';
    return lang;
  }
  TitleStyle() {
    const textColor = this.getTextColor();
    return {
      fontSize: 16,
      marginBottom: 10,
      marginTop: 40,
      fontWeight: 'bold',
      color: textColor,
      textAlign: 'center',
    };
  }
  TitleNoMarginStyle() {
    const textColor = this.getTextColor();
    return {
      fontSize: 14,
      fontWeight: 'bold',
      marginHorizontal: 10,
      color: textColor,
    };
  }
  PaymentTitleStyle() {
    const textColor = this.getTextColor();
    return {
      fontWeight: '500',
      fontSize: 16,
      color: textColor,
    };
  }
  TextInputRowStyle() {
    const textColor = this.getTextColor();
    const backgroundColor = this.getBackgroundColor();
    const language = this.getLanguage();
    return {
      marginVertical: 10,
      backgroundColor: backgroundColor,
      textColor: textColor,
      highlightColor: textColor,
      textAlign: language === 'English' ? 'left' : 'right',
    };
  }
  _renderThreeDSecure() {
    const {threeDSecureModalVisible, htmlBodyContent} = this.state;
    return (
      <ThreeDSScreenModal
        visible={threeDSecureModalVisible}
        onRequestClose={() => this._closeThreeDSecureModal()}
        content={htmlBodyContent}
        returnUrl={returnUrl}
      />
    );
  }

  renderPaymentInfo() {
    const props = this.type === 'modal' ? this.props : this.myProps;
    return (
      <View style={styles.paymentSummary}>
        <Image
          style={styles.image}
          source={require('../assets/defaultLogo.png')}
        />
        <Text style={this.PaymentTitleStyle()}>Powered by Geidea</Text>
      </View>
    );
  }
  renderButtonType(amount) {
    const props = this.type === 'modal' ? this.props : this.myProps;
    const {loading, creditCardFormValid} = this.state;
    const label = formatCurrencyAmountLabel(props, amount);
    return (
      <Section>
        <Button
          labelText={label}
          onPress={
            creditCardFormValid && !loading
              ? () => this._handlePaymentRequest(amount)
              : null
          }
          loading={loading}
          buttonStyle={
            creditCardFormValid ? styles.payButton : styles.payButtonDisabled
          }
          buttonTextStyle={styles.payButtonText}
          underlayColor="#ff4d00"
          disabled={loading || !creditCardFormValid}
        />
      </Section>
    );
  }

  renderRememberMe() {
    const lang = this.getLanguage();
    const toggleSwitch = () =>
      this.setState({rememberMe: !this.state.rememberMe});
    const {rememberMe} = this.state;
    return (
      <Section>
        <View
          style={
            lang == 'English'
              ? styles.checkboxContainer
              : styles.checkboxContainerAr
          }>
          <Text style={this.TitleNoMarginStyle()}>
            {' '}
            {lang == 'English' ? 'Remember my card?' : 'حفظ الكارت؟'}
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#f4f3f4'}}
            thumbColor={rememberMe ? '#ff4d00' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={rememberMe}
          />
        </View>
      </Section>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  checkboxText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 40,
  },
  paymentContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  parentSection: {
    flexDirection: 'row',
    padding: 15,
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  paymentForm: {
    backgroundColor: '#FBFBFB',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
  },
  paymentSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 15,
  },
  inputContainer: {
    flex: 1,
    height: 36,
  },
  spacing: {
    marginLeft: 12,
  },

  totalAmount: {
    color: '#16A085',
    fontSize: 18,
  },
  paymentDescription: {
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    height: 40,
    borderRadius: 25,
    width: 40,
  },
  tabContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    height: 46,
  },
  tab: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    textAlign: 'center',
  },
  activeTab: {
    borderColor: '#372E4C',
    backgroundColor: '#372E4C',
    color: '#FFF',
  },
  notification: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorNotification: {
    backgroundColor: '#C0392B',
  },
  infoNotification: {
    backgroundColor: '#2980b9',
  },
  notificationText: {
    textAlign: 'center',
    color: '#FFF',
  },
  payButton: {
    backgroundColor: '#ff4d00',
    borderColor: '#ff4d00',
  },
  payButtonDisabled: {
    backgroundColor: '#999',
    borderColor: '#999',
  },
  payButtonText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#C0C0C0',
    borderColor: '#C0C0C0',
  },
  closeButtonText: {
    color: 'black',
    fontWeight: '400',
  },
  closeModalIconContainer: {
    alignItems: 'flex-end',
    right: 8,
    top: 3,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkboxContainerAr: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  useTokenContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  tokenNotification: {
    flex: 1,
    flexDirection: 'row',
  },
  TextInput: {
    margin: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },
  CheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginVertical: 10,
  },
  successMessageContainer: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  successMessageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export {CheckoutLogic, styles};
