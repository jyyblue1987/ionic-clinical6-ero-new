export enum AppState {
  start,       // Fresh install
  loggedin,    // App already logged in at least once
  eagreement,  // PIN created DPA/CDA in progress
  registered,  // All DPA/CDA completed
}
