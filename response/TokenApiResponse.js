import expiryDate from '../models/expiryDate'
import ApiResponse from './base/ApiResponse'


export default class TokenApiResponse extends ApiResponse {

    static lastFourDigits$ = 'ApiResponse.lastFourDigits'
    static schema$ = 'ApiResponse.schema'
    static isAppleToken$ = 'ApiResponse.isAppleToken'
    static expiryDate$ = 'ApiResponse.expiryDate'

  constructor(opts) {
    super(opts)
    let expiryDate = opts && 'expiryDate' in opts ? opts.expiryDate : null
    let lastFourDigits = opts && 'lastFourDigits' in opts ? opts.lastFourDigits : null
    let isAppleToken =
      opts && 'isAppleToken' in opts ? opts.isAppleToken : null
    let schema = opts && 'schema' in opts ? opts.schema : null
    this.lastFourDigits = lastFourDigits
    this.isAppleToken = isAppleToken
    this.schema = schema
    this.expiryDate = expiryDate
  }
  get expiryDate() {
    return this[TokenApiResponse.expiryDate$]
  }
  set expiryDate(value) {
    this[TokenApiResponse.expiryDate$] = value
  }
  get schema() {
    return this[TokenApiResponse.schema$]
  }
  set schema(value) {
    this[TokenApiResponse.schema$] = value
  }
  get isAppleToken() {
    return this[TokenApiResponse.isAppleToken$]
  }
  set isAppleToken(value) {
    this[TokenApiResponse.isAppleToken$] = value
  }
  get lastFourDigits() {
    return this[TokenApiResponse.lastFourDigits$]
  }
  set lastFourDigits(value) {
    this[TokenApiResponse.lastFourDigits$] = value
  }

  static fromJson(map) {
    let response = super.fromJson(map)
    let lastFourDigits = map && 'lastFourDigits' in map ? map.lastFourDigits : null
    let isAppleToken =
      map && 'isAppleToken' in map ? map.isAppleToken : null
    let schema = map && 'schema' in map ? map.schema : null
    let expiryDateLocal = map && 'expiryDate' in map ? map.expiryDate : null
    if (response != null) {
      response.expiryDate = expiryDateLocal
      response.schema = schema
      response.isAppleToken = isAppleToken
      response.lastFourDigits = lastFourDigits
    }
    return response
  }
}
