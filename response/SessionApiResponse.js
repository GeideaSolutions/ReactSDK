import Session from '../models/Session'
import ApiResponse from './base/ApiResponse'

export default class SessionApiResponse extends ApiResponse {
  static session$ = 'SessionApiResponse.session'

  constructor(opts) {
    super(opts)
    let session = opts && 'session' in opts ? opts.session : null
    this.session = session
  }
  get session() {
    return this[SessionApiResponse.session$]
  }
  set session(value) {
    this[SessionApiResponse.session$] = value
  }
  
  static fromJson(map) {
    let response = super.fromJson(map)
    let session = map && 'session' in map ? map.session : null
   
    if (response != null) {
        response.session = Session.fromJson(session)
    }
    return response
  }
}
