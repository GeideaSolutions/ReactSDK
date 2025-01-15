import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import OrderApiResponse from '../response/OrderApiResponse';
import GeideaApi from '../actions/GeideaApi';


const PaymentWebViewScreen = ({ route }) => {
  const { sessionId , onGoBack, publicKey, apiPassword, returnUrl } = route.params;
  const webViewRef = useRef(null);
  // const redirectURI = 'https://www.google.com'; // Your registered redirect URI
  const redirectURI = returnUrl;
  const [blockNavigation, setBlockNavigation] = useState(false);


  const handleNavigationStateChange = (navState) => {
    const newUrl = navState.url;

    if (newUrl.startsWith(redirectURI)) {
      // Handle successful redirect
      const transactionData = parseRedirectURL(newUrl); // Parse data from redirect URL
      GeideaApi.getPaymentInfo(transactionData.orderId, publicKey, apiPassword).then(res => {
        let orderResponse = OrderApiResponse.fromJson(res);
        onPaymentSuccess(orderResponse);
      })
      .catch(err => onPaymentFailure(err));
      setBlockNavigation(true);
      return false;
    }
    return true;
  };

  const handleReturn = (success, res) => {
    setBlockNavigation(false);
    if (onGoBack) {
      onGoBack(success, res);
    }
  };

  const onPaymentSuccess = (res) =>  {
    handleReturn(true, res);
  }

  const onPaymentFailure = (res) => {
    handleReturn(false, res);
  }


  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: `${GeideaApi.getWebUrl()}/hpp/checkout/?${sessionId}` }}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={(event) => {
          if (blockNavigation && event.url.startsWith(redirectURI)) {
            return false; // Block the navigation
          }
          return handleNavigationStateChange(event);
        }}
      />
    </View>
  );
};

// Helper function to parse data from redirect URL (implementation details omitted)
const parseRedirectURL = (url) => {
  // Extract relevant data from the redirect URL based on the merchant's format
  const queryString = url.split('?')[1]; // Extract query string after the '?'
  if (!queryString) return {}; // Return empty object if no query string

  const queryParams = queryString.split('&'); // Split by '&'
  const jsonObject = {};

  for (const param of queryParams) {
    const [key, value] = param.split('=');
    jsonObject[key] = value;
  }

  return jsonObject;
};

export default PaymentWebViewScreen;