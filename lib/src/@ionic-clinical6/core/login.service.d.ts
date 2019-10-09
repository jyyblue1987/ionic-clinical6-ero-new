export declare class AppLoginService {
    loginState: any;
    MAXATTEMPTS: number;
    remainingAttempts: number;
    /**
     * Used to reset values
     */
    uuid: string;
    technology: string;
    appVersion: string;
    currToken: string;
    MOBILE_APP_KEY: string;
    constructor();
    reset(): void;
    /**
     * Authentication steps:
     *  1. Device Registration
     *  2. Mobile User Registration
     *  3. Session Registration
     *
     * Let's move from 1 to 3 depending on available information
     */
    authenticateDevice(): Promise<any>;
    _authenticateDevice(): Promise<any>;
    authenticateUser(username: any, password: any): Promise<any>;
    _authenticateUser(username: any, password: any): any;
    guestSignIn(): Promise<any>;
    _guestSignIn(): any;
    verifyPinExists(): Promise<boolean>;
    clearAuthInfo(): void;
    resetDeviceInfo(): void;
    clearUserInfo(): void;
    registerAccount(input: any): Promise<any>;
    postLoginInits(): void;
}
export declare const AUTHSTATE: {
    STARTING_UP: number;
    RESTARTING_UP: number;
    NEW_INSTALL: number;
    DEVICE_AUTHORIZED: number;
    DEVICE_NOT_AUTHORIZED: number;
    USER_AUTHENTICATED: number;
    SIGNED_IN_AS_GUEST: number;
};
