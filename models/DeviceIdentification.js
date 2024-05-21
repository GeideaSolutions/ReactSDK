import BaseRequestBody from '../request/base/BaseRequestBody'

export default class DeviceIdentification {
  static providerDeviceId$ = '_providerDeviceId'
  static language$ = '_language'
  static userAgent$ = '_userAgent'
  
  constructor(_providerDeviceId, _language, _userAgent) {
    this.providerDeviceId = _providerDeviceId
    this.language = _language
    this.userAgent = _userAgent
  }


  toMap() {
    let params = {}
    if (this.language != null) {
      params[BaseRequestBody.fieldLanguage] = this.language
    }
    if (this.providerDeviceId != null) {
      params[BaseRequestBody.fieldProviderDeviceId] = this.providerDeviceId
    }
    if (this.userAgent != null) {
      params[BaseRequestBody.fieldUserAgent] = this.userAgent
    }
    return params
  }

  static fromJson(map) {
    if (map == null) {
      return null
    }
    let providerDeviceId = map && 'providerDeviceId' in map ? map.providerDeviceId : null
    let language = map && 'language' in map ? map.language : null
    let userAgent = map && 'userAgent' in map ? map.userAgent : null

    return new DeviceIdentification({
        _providerDeviceId: providerDeviceId,
      _language: language,
      _userAgent: userAgent,
    })
  }
}
