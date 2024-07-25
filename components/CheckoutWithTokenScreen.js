import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native';
import {CheckoutLogic} from './CheckoutLogic';
import PaymentReceiptWidget from './ReceiptPage';

class CheckoutWithTokenScreen extends CheckoutLogic {
  constructor(props) {
    super(props);
    this.state = {
      cvv: '',
      cardType: {
        type: require('./CreditCardScreen/components/CreateCard/icons/stp_card_unknown.png'),
      },
      cardData: null,
      loading: true,
      sessionId: null,
    };
  }

  async componentDidMount() {
    const { tokenInfo, sessionId } = await this.fetchCardData(this.props.route.params?.amount, this.props.route.params?.token);

    if (tokenInfo) {
      this.setState({
        cardData: tokenInfo,
        loading: false,
        cardType: {
          type: this.getIcon(tokenInfo.schema),
        },
        sessionId: sessionId
      });
    } else {
      this.setState({ loading: false, error: 'Failed to fetch card data' });
    }
  }

  getIcon = (type) => {
    var iconType;
    if(type === 'american-express' || type === 'americanexpress') {
      iconType = require('./CreditCardScreen/components/CreateCard/icons/stp_card_amex.png')
    } 
    else if(type === 'diners-club' || type === 'dinersclub') {
      iconType = require('./CreditCardScreen/components/CreateCard/icons/stp_card_diners.png')
    }
    else if(type === 'discover') {
      iconType = require('./CreditCardScreen/components/CreateCard/icons/stp_card_discover.png')
    }
    else if(type === 'jcb') {
      iconType = require('./CreditCardScreen/components/CreateCard/icons/stp_card_jcb.png')
    }
    else if(type === 'master-card' || type==='mastercard') {
      iconType = require('./CreditCardScreen/components/CreateCard/icons/stp_card_mastercard.png')
    }
    else if(type === 'visa') {
      iconType = require('./CreditCardScreen/components/CreateCard/icons/stp_card_visa.png')
    }
    else {
      iconType = require('./CreditCardScreen/components/CreateCard/icons/stp_card_unknown.png')
    }
    return iconType
  }


  handleNext = () => {
    this._handleTokenPaymentRequest(this.state.sessionId, this.state.cvv);
  };

  handleCancel = () => {
    // Handle the Cancel button press
    this.props.navigation.navigate('Home');
  };

  handleCvvChange = (cvv) => {
    this.setState({ cvv });
  };

  onPaymentSuccess = res => {
    this.orderId = res.order.orderId;
    this.operation = res.order.paymentOperation;
    const message = res.detailedResponseMessage;
    const geideaApiResponse = res.order;

    this.setState({showSuccessReceipt: true, successResponse: message}, () => {
      setTimeout(() => {
        this.setState({showSuccessReceipt: false, successResponse: ''}, () => {
          let publickeyforrefund = this.props.route.params?.publicKey;
          let apipasswordforrefund = this.props.route.params?.apiPassword;
          this.props.navigation.navigate('PaymentDetails',  {
            geideaApiResponse,
            publickeyforrefund,
            apipasswordforrefund,
          });
        });
      }, 500);
    });
  };

  onPaymentFailure = res => {
    const geideaApiResponse = res;
    this.orderId = this.state.orderId;
    this.failureMesg = res;
    this.setState({showFailureReceipt: true, failureResponse: res}, () => {
      setTimeout(() => {
        this.setState({showFailureReceipt: false, failureResponse: ''}, () => {
          this.props.navigation.navigate('PaymentFailure', {
            geideaApiResponse,
          });
        });
      }, 1500);
    });
  };


  render() {
    const { loading, cardData } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      );
    }

    if (!cardData) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>No card data available</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
       
        {/* <Text style={styles.title}>Walid Shop BM TEST</Text> */}
        <Text style={styles.subtitle}>Please enter your card verification code</Text>

        <View style={styles.cardContainer}>
          <Image source={this.state.cardType.type} name="credit-card" size={24} color="#000" style={styles.icon} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardType} numberOfLines={1} ellipsizeMode='middle'>{cardData.schema} ****{cardData.lastFourDigits}</Text>
            <Text style={styles.cardExpiry}>Expiry : {cardData.expiryDate}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Enter your CVV code below</Text>
        <TextInput
          style={styles.input}
          placeholder="123"
          value={this.state.cvv}
          onChangeText={this.handleCvvChange}
          keyboardType="numeric"
          maxLength={3}
        />

        <TouchableOpacity style={styles.nextButton} onPress={this.handleNext}>
          <Text style={styles.nextButtonText}>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={this.handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <View
            style={{
              marginTop: 15,
            }}
          />
        { this._renderThreeDSecure() }
          {this.orderId && (
            <Modal
              visible={
                (this.state.showSuccessReceipt ||
                  this.state.showFailureReceipt) &&
                this.myProps.showReceipt
              }
              transparent={true}
              animationType="slide">
              <View style={styles.container}>
                <PaymentReceiptWidget
                  lang={this.myProps.lang}
                  amount={amount}
                  currency={currency}
                  orderId={this.orderId}
                  merchantReferenceID={this.myProps.merchantReferenceID}
                  operation={this.operation}
                  showSuccessReceipt={this.state.showSuccessReceipt}
                  failureMesg={this.failureMesg}
                />
              </View>
            </Modal>
          )}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardInfo:{
    width: '75%', 
  },
  icon:{
    width: '25%', // Set image width to 30%
    resizeMode: 'contain', // Optional for aspect ratio preservation
  },
  cardExpiry: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    borderColor: '#ced4da',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutWithTokenScreen;
