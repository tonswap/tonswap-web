import {
  TonhubConnector,
  TonhubCreatedSession,
  TonhubSessionAwaited,
  TonhubSessionState,
  TonhubTransactionRequest,
  TonhubTransactionResponse,
  TonhubWalletConfig,
} from "ton-x";

const name = "ton swap";
const url = "https://localhost:3000";

interface RequestTxArgs {
  to: string;
  value: string;
  text: string;
  payload: string;
}

class Tonhub {
  static connector = new TonhubConnector({ testnet: true });
  static sessionId = "";
  static sessionSeed = "";
  static sessionLink = "";
  static walletConfig?: TonhubWalletConfig;

  constructor() {

      
  }
  public static async initSession() {
    try {
      let session: TonhubCreatedSession = await this.connector.createNewSession(
        {
          name,
          url,
        }
      );

      this.sessionId = session.id;
      this.sessionSeed = session.seed;
      this.sessionLink = session.link;
        this.awaitSessionReady()
       
      
        
    } catch (error) {
      console.log(error);
    }
  }

  public static async awaitSessionReady() {
    const session: TonhubSessionAwaited =
      await this.connector.awaitSessionReady(this.sessionId, 5 * 60 * 1000); // 5 min timeout
    if (session.state === "revoked" || session.state === "expired") {
      // Handle revoked or expired session
      console.log('revoked');
      
    } else if (session.state === "ready") {
        console.log('ready');
      this.walletConfig = session.wallet;
      const correctConfig: boolean = TonhubConnector.verifyWalletConfig(this.sessionId, this.walletConfig!!);
      console.log(correctConfig);
    }
  }

  public static async getSessionState() {
    return this.connector.getSessionState(this.sessionId);
  }

  public static async requestTransaction({
    to,
    value,
    text,
    payload,
  }: RequestTxArgs) {
    const request: TonhubTransactionRequest = {
      seed: this.sessionSeed, // Session Seed
      appPublicKey: "walletConfig.appPublicKey", // Wallet's app public key
      to, // Destination
      value, // Amount in nano-tons
      timeout: 5 * 60 * 1000, // 5 minut timeout
      stateInit: "....", // Optional serialized to base64 string state_init cell
      text, // Optional comment. If no payload specified - sends actual content, if payload is provided this text is used as UI-only hint
      payload, // Optional serialized to base64 string payload cell
    };
    const response: TonhubTransactionResponse =
      await this.connector.requestTransaction(request);
    if (response.type === "rejected") {
      // Handle rejection
    } else if (response.type === "expired") {
      // Handle expiration
    } else if (response.type === "invalid_session") {
      // Handle expired or invalid session
    } else if (response.type === "success") {
      // Handle successful transaction
      const externalMessage = response.response; // Signed external message that was sent to the network
    } else {
      throw new Error("Impossible");
    }
  }
}

export { Tonhub as TonhubConnector };
