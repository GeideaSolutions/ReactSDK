import base64 from 'react-native-base64'
import AuthenticationApiResponse from '../response/AuthenticationApiResponse'
import OrderApiResponse from '../response/OrderApiResponse'
import SessionApiResponse from '../response/SessionApiResponse';
import TokenApiResponse from '../response/TokenApiResponse';


const Environment = {
  'egy_production': { 
    name: 'Egypt - Production',
    environmentUrl: 'https://api.merchant.geidea.net',
    webUrl: 'https://www.merchant.geidea.net'
  },
  'egy_preproduction': { 
    name: 'Egypt - Preproduction',
    environmentUrl: 'https://api-merchant.staging.geidea.net',
    webUrl: 'https://www.gd-pprod-infra.net'
  },
  'uae_production': { 
    name: 'UAE - Production',
    environmentUrl: 'https://api.merchant.geidea.ae',
    webUrl: 'https://payments.geidea.ae'
  },
  'uae_preproduction': { 
    name: 'UAE - Preproduction',
    environmentUrl: 'https://api-merchant.staging.geidea.ae',
    webUrl: 'https://www.staging.geidea.ae'
  },
  'ksa_production': { 
    name: 'KSA - Production',
    environmentUrl: 'https://api.ksamerchant.geidea.net',
    webUrl: 'https://www.ksamerchant.geidea.net'
  },
  'ksa_preproduction': { 
    name: 'KSA - Preproduction',
    environmentUrl: 'https://api-ksamerchant.staging.geidea.net',
    webUrl: 'https://www.gd-pprod-infra.net' 
  }
};

const processRequestGET = async(path, method, publicKey, apiPassword) => {
  const url = path
  var utf8 = require('utf8')
  const utf8Bytes = utf8.encode(publicKey + ':' + apiPassword)
  const credentials = base64.encode(utf8Bytes)

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Basic ' + credentials,
      },
    })
    const json = await response.json()
    return json
  } catch (err) {
    console.log('Error in fetch' + err)
    throw err
  }
}

const processRequest = async (path, method, data, publicKey, apiPassword) => {
  data.billingAddress = {
    countryCode: data.billing?.countryCode,
    street: data.billing?.street,
    city: data.billing?.city,
    postCode: data.billing?.postCode,
  } 
  data.shippingAddress = {
    countryCode: data.shipping?.countryCode,
    street: data.shipping?.street,
    city: data.shipping?.city,
    postCode: data.shipping?.postCode,
  } 
  const url = path
  var utf8 = require('utf8')
  const utf8Bytes = utf8.encode(publicKey + ':' + apiPassword)
  const credentials = base64.encode(utf8Bytes)

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Basic ' + credentials,
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    return json
  } catch (err) {
    console.log('Error in fetch' + err)
    throw err
  }
}

class GeideaApi {
  
  static getEnumFromName = (name) => {
    for (const key in Environment) {
      if (Environment.hasOwnProperty(key)) {
        if (Environment[key].name === name) {
          return Environment[key];
        }
      }
    }
    return Environment.egy_production; // If no enum with the provided name is found
  };

  static environment;

  static getEnvironments = () =>{
    return Object.values(Environment).map(env => env.name);
  }

  static setSelectedEnvironment =(environment)=>{
      this.environment = environment;
  }

  static getBaseUrl = () => {
    return this.getEnumFromName(this.environment).environmentUrl;
  };

  static getWebUrl = () =>{
    return this.getEnumFromName(this.environment).webUrl;
  }
  
  static Create_Session_URL = () =>  `${this.getBaseUrl()}/payment-intent/api/v2/direct/session`;
  static InitiateAuthentication_URL = () =>  `${this.getBaseUrl()}/pgw/api/v3/direct/authenticate/initiate`;
  static InitiateAuthentication_V4_URL = () =>  `${this.getBaseUrl()}/pgw/api/v4/direct/authenticate/initiate`;
  static InitiateAuthentication_V6_URL = () =>  `${this.getBaseUrl()}/pgw/api/v6/direct/authenticate/initiate`;
  static InitiateAuthentication_V6_TOKEN_URL = () =>  `${this.getBaseUrl()}/pgw/api/v6/direct/authenticate/initiate/token`;
  static AuthenticatePayer_URL = () =>  `${this.getBaseUrl()}/pgw/api/v3/direct/authenticate/payer`;
  static AuthenticatePayer_V4_URL = () =>  `${this.getBaseUrl()}/pgw/api/v4/direct/authenticate/payer`;
  static AuthenticatePayer_V6_URL = () =>  `${this.getBaseUrl()}/pgw/api/v6/direct/authenticate/payer`;
  static AuthenticatePayer_V6_TOKEN_URL = () =>  `${this.getBaseUrl()}/pgw/api/v6/direct/authenticate/payer/token`;
  static DirectPay_URL = () =>  `${this.getBaseUrl()}/pgw/api/v1/direct/pay`;
  static DirectPay_V2_URL = () =>  `${this.getBaseUrl()}/pgw/api/v2/direct/pay`;
  static DirectPay_V2_TOKEN_URL = () =>  `${this.getBaseUrl()}/pgw/api/v2/direct/pay/token`;
  static PayWithToken_URL = () =>  `${this.getBaseUrl()}/pgw/api/v1/direct/pay/token`;
  static Cancel_URL = () =>  `${this.getBaseUrl()}/pgw/api/v1/direct/cancel`;
  static Capture_URL = () =>  `${this.getBaseUrl()}/pgw/api/v1/direct/capture`;
  static Refund_URL = () =>  `${this.getBaseUrl()}/pgw/api/v1/direct/refund`;
  static VoidOperation_URL = () =>  `${this.getBaseUrl()}/pgw/api/v1/direct/refund`;
  static Get_Payment_Info = () =>  `${this.getBaseUrl()}/pgw/api/v1/direct/order/`;
  static Get_Token_Info = () => `${this.getBaseUrl()}/pgw/api/v1/token?sessionId=`;


  static _processPayment(url, publicKey, apiPassword, payload) {
    console.log('API_URL',url)
    console.log('API_PAYLOAD',payload)
    return new Promise((resolve, reject) => {
      processRequest(url, 'POST', payload, publicKey, apiPassword)
        .then((res) => {
          console.log('API_RESPONSE',res)
          if (
            res.detailedResponseCode != null &&
            res.detailedResponseCode === '000'
          ) {
            resolve(res)
          } else if (
            res.detailedResponseCode != null &&
            res.detailedResponseCode !== '000'
          ) {
            resolve(res)
          } else {
            reject(res.title)
          }
        })
        .catch((err) => {
          console.log('API_ERROR',err)
          reject(err)
        })
    })
  }

  static _processPaymentGET(url, publicKey, apiPassword) {
    console.log('API_URL GET',url)
    return new Promise((resolve, reject) => {
      processRequestGET(url, 'GET', publicKey, apiPassword)
        .then((res) => {
          console.log('API_RESPONSE GET',res)
          if (
            res.detailedResponseCode != null &&
            res.detailedResponseCode === '000'
          ) {
            resolve(res)
          } else if (
            res.detailedResponseCode != null &&
            res.detailedResponseCode !== '000'
          ) {
            resolve(res)
          } else {
            reject(res.title)
          }
        })
        .catch((err) => {
          console.log('API_ERROR',err)
          reject(err)
        })
    })
  }

  static getPaymentInfo(orderId, publicKey, apiPassword)
  {
   const getPaymentInfoRequest = async () => {
     const apiResponse = await this._processPaymentGET(
       this.Get_Payment_Info() + orderId, publicKey, apiPassword
     )
     return apiResponse
   }
   let myPromise = new Promise(function (myResolve, myReject) {
     let apiResponse = getPaymentInfoRequest()
     apiResponse
       .then((res) => {
         let response = OrderApiResponse.fromJson(res)
         if (response.responseCode === '000') {
           myResolve(response)
         } else {
           myReject(response.detailedResponseMessage)
         }
       })
       .catch((err) => {
         myReject(err)
       })
   })
   return myPromise
 }

 static getTokenInfo(sessionId, publicKey, apiPassword)
  {
   const getTokenInfoRequest = async () => {
     const apiResponse = await this._processPaymentGET(
       this.Get_Token_Info() + sessionId, publicKey, apiPassword
     )
     return apiResponse
   }
   let myPromise = new Promise(function (myResolve, myReject) {
     let apiResponse = getTokenInfoRequest()
     apiResponse
       .then((res) => {
         let response = TokenApiResponse.fromJson(res)
         if (response.responseCode === '000') {
           myResolve(response)
         } else {
           myReject(response.detailedResponseMessage)
         }
       })
       .catch((err) => {
         myReject(err)
       })
   })
   return myPromise
 }

  static createSession(
    createSessionRequestBody,
    PublicKey,
    ApiPassword
  ) {
    const createSessionRequest = async () => {
      const apiResponse = await this._processPayment(
        this.Create_Session_URL(),
        PublicKey,
        ApiPassword,
        createSessionRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = createSessionRequest()
      apiResponse
        .then((res) => {
          let response = SessionApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static initiateAuthentication(
    initiateAuthenticationRequestBody,
    PublicKey,
    ApiPassword
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.InitiateAuthentication_URL(),
        PublicKey,
        ApiPassword,
        initiateAuthenticationRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = AuthenticationApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static initiateV4Authentication(
    initiateAuthenticationRequestBody,
    PublicKey,
    ApiPassword
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
       this.InitiateAuthentication_V4_URL(),
        PublicKey,
        ApiPassword,
        initiateAuthenticationRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = AuthenticationApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static initiateV6Authentication(
    initiateAuthenticationRequestBody,
    PublicKey,
    ApiPassword
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.InitiateAuthentication_V6_URL(),
        PublicKey,
        ApiPassword,
        initiateAuthenticationRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = AuthenticationApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static initiateV6TokenAuthentication(
    initiateAuthenticationRequestBody,
    PublicKey,
    ApiPassword
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.InitiateAuthentication_V6_TOKEN_URL(),
        PublicKey,
        ApiPassword,
        initiateAuthenticationRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = AuthenticationApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }


  static payerAuthentication(
    payerAuthenticationRequestBody,
    PublicKey,
    ApiPassword,
    navigationProp
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.AuthenticatePayer_URL(),
        PublicKey,
        ApiPassword,
        payerAuthenticationRequestBody.paramsMap()
      )
      let status =
        apiResponse.responseMessage != null
          ? apiResponse.responseMessage.toLowerCase()
          : null
      let code =
        apiResponse.responseCode != null
          ? apiResponse.responseCode.toLowerCase()
          : null
      if (status === 'success' && code === '000') {
        let htmlBodyContent = apiResponse.htmlBodyContent.replace(
          'target="redirectTo3ds1Frame"',
          'target="_top"'
        )
        if (navigationProp) {
          navigationProp.push('Browser', {
            title: '3DS',
            content: htmlBodyContent,
            returnUrl: payerAuthenticationRequestBody.returnUrl,
          })
        }
      }
      return apiResponse
    }
    if (navigationProp == null) {
      return processPayment()
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse.catch((err) => {
        console.log('err:' + err)
        myReject(err)
      })
      navigationProp.addListener('focus', () => {
        apiResponse
          .then((res) => {
            let response = AuthenticationApiResponse.fromJson(res)
            if (response.responseCode === '000') {
              myResolve(response)
            } else {
              myReject(response.detailedResponseMessage)
            }
          })
          .catch((err) => {
            console.log('apiResponse error ' + err)
            myReject(err)
          })
      })
    })
    return myPromise
  }
  static payerV4Authentication(
    payerAuthenticationRequestBody,
    PublicKey,
    ApiPassword,
    navigationProp
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.AuthenticatePayer_V4_URL(),
        PublicKey,
        ApiPassword,
        payerAuthenticationRequestBody.paramsMap()
      )
      let status =
        apiResponse.responseMessage != null
          ? apiResponse.responseMessage.toLowerCase()
          : null
      let code =
        apiResponse.responseCode != null
          ? apiResponse.responseCode.toLowerCase()
          : null
      if (status === 'success' && code === '000') {
        let htmlBodyContent = apiResponse.htmlBodyContent.replace(
          'target="redirectTo3ds1Frame"',
          'target="_top"'
        )
        if (navigationProp) {
          navigationProp.push('Browser', {
            title: '3DS',
            content: htmlBodyContent,
            returnUrl: payerAuthenticationRequestBody.returnUrl,
          })
        }
      }
      return apiResponse
    }
    if (navigationProp == null) {
      return processPayment()
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse.catch((err) => {
        console.log('err:' + err)
        myReject(err)
      })
      navigationProp.addListener('focus', () => {
        apiResponse
          .then((res) => {
            let response = AuthenticationApiResponse.fromJson(res)
            if (response.responseCode === '000') {
              myResolve(response)
            } else {
              myReject(response.detailedResponseMessage)
            }
          })
          .catch((err) => {
            console.log('apiResponse error ' + err)
            myReject(err)
          })
      })
    })
    return myPromise
  }


  static payerV6Authentication(
    payerAuthenticationRequestBody,
    PublicKey,
    ApiPassword,
    navigationProp
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.AuthenticatePayer_V6_URL(),
        PublicKey,
        ApiPassword,
        payerAuthenticationRequestBody.paramsMap()
      )
      let status =
        apiResponse.responseMessage != null
          ? apiResponse.responseMessage.toLowerCase()
          : null
      let code =
        apiResponse.responseCode != null
          ? apiResponse.responseCode.toLowerCase()
          : null
      if (status === 'success' && code === '000') {
        let htmlBodyContent = apiResponse.htmlBodyContent.replace(
          'target="redirectTo3ds1Frame"',
          'target="_top"'
        )
        if (navigationProp) {
          navigationProp.push('Browser', {
            title: '3DS',
            content: htmlBodyContent,
            returnUrl: payerAuthenticationRequestBody.returnUrl,
          })
        }
      }
      return apiResponse
    }
    if (navigationProp == null) {
      return processPayment()
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse.catch((err) => {
        console.log('err:' + err)
        myReject(err)
      })
      navigationProp.addListener('focus', () => {
        apiResponse
          .then((res) => {
            let response = AuthenticationApiResponse.fromJson(res)
            if (response.responseCode === '000') {
              myResolve(response)
            } else {
              myReject(response.detailedResponseMessage)
            }
          })
          .catch((err) => {
            console.log('apiResponse error ' + err)
            myReject(err)
          })
      })
    })
    return myPromise
  }

  static payerV6TokenAuthentication(
    payerAuthenticationRequestBody,
    PublicKey,
    ApiPassword,
    navigationProp
  ) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.AuthenticatePayer_V6_TOKEN_URL(),
        PublicKey,
        ApiPassword,
        payerAuthenticationRequestBody.paramsMap()
      )
      let status =
        apiResponse.responseMessage != null
          ? apiResponse.responseMessage.toLowerCase()
          : null
      let code =
        apiResponse.responseCode != null
          ? apiResponse.responseCode.toLowerCase()
          : null
      if (status === 'success' && code === '000') {
        let htmlBodyContent = apiResponse.htmlBodyContent.replace(
          'target="redirectTo3ds1Frame"',
          'target="_top"'
        )
        if (navigationProp) {
          navigationProp.push('Browser', {
            title: '3DS',
            content: htmlBodyContent,
            returnUrl: payerAuthenticationRequestBody.returnUrl,
          })
        }
      }
      return apiResponse
    }
    if (navigationProp == null) {
      return processPayment()
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse.catch((err) => {
        console.log('err:' + err)
        myReject(err)
      })
      navigationProp.addListener('focus', () => {
        apiResponse
          .then((res) => {
            let response = AuthenticationApiResponse.fromJson(res)
            if (response.responseCode === '000') {
              myResolve(response)
            } else {
              myReject(response.detailedResponseMessage)
            }
          })
          .catch((err) => {
            console.log('apiResponse error ' + err)
            myReject(err)
          })
      })
    })
    return myPromise
  }

  static payDirect(payDirectRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.DirectPay_URL(),
        PublicKey,
        ApiPassword,
        payDirectRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static payV2Direct(payDirectRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.DirectPay_V2_URL(),
        PublicKey,
        ApiPassword,
        payDirectRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static payV2Token(payDirectRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.DirectPay_V2_TOKEN_URL(),
        PublicKey,
        ApiPassword,
        payDirectRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }


  static payWithToken(payTokenRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.PayWithToken_URL(),
        PublicKey,
        ApiPassword,
        payTokenRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static refund(refundRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.Refund_URL(),
        PublicKey,
        ApiPassword,
        refundRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static cancel(cancelRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.Cancel_URL(),
        PublicKey,
        ApiPassword,
        cancelRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static voidOperation(refundRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.VoidOperation_URL(),
        PublicKey,
        ApiPassword,
        refundRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }

  static capture(captureRequestBody, PublicKey, ApiPassword) {
    const processPayment = async () => {
      const apiResponse = await this._processPayment(
        this.Capture_URL(),
        PublicKey,
        ApiPassword,
        captureRequestBody.paramsMap()
      )
      return apiResponse
    }
    let myPromise = new Promise(function (myResolve, myReject) {
      let apiResponse = processPayment()
      apiResponse
        .then((res) => {
          let response = OrderApiResponse.fromJson(res)
          if (response.responseCode === '000') {
            myResolve(response)
          } else {
            myReject(response.detailedResponseMessage)
          }
        })
        .catch((err) => {
          myReject(err)
        })
    })
    return myPromise
  }
}

export default GeideaApi
