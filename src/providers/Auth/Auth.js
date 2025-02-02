import { Auth } from "aws-amplify";
export default class AuthClass {
  constructor(authInstanceProvider) {
    this.auth = authInstanceProvider;
  }

  async login(username, password, recaptchaToken) {
    await this.auth.login(username, password, 'autobizTrade', true, recaptchaToken);
  }

  async refreshToken() {
    await this.auth.refreshToken(this.auth.tokenData()?.refreshToken);
  }

  async isLogged() {
    const tokenData = this.auth.tokenData();
    if (!tokenData) throw new Error("error ");
    if (!("refreshToken" in tokenData)) throw new Error("error ");
    if (!("accessToken" in tokenData))
      await this.auth.refreshToken(tokenData.refreshToken);
  }

  async logout() {
    await this.auth.logout(this.auth.tokenData().accessToken);
    return true;
  }

  async request(method, endpoint, data) {
    return await this.auth.request(method, endpoint, data);
  }

  token() {
    return this.auth.tokenData()?.accessToken;
  }

  currentUser() {
    if (!this.token()) return {};
    return this.auth.currentUser(this.token());
  }

  tokenData() {
    return this.auth.tokenData();
  }

  userId() {
    return parseInt(this.currentUser().userId, 10);
  }

  fullName() {
    return `${this.currentUser().firstname || ""} ${
      this.currentUser().lastname || ""
    }`;
  }

  country() {
    return this.currentUser()?.country;
  }

  role() {
    return this.auth.tokenData()?.user.role;
  }

  roles() {
    return this.auth.tokenData()?.user.roles;
  }

  isAdmin() {
    return this.auth.tokenData()?.user.role === "admin";
  }

  awsIdentity() {
    return this.auth.awsData();
  }

  async federateSignInCognito() {
    const awsIdentity = this.awsIdentity();
    const { token, domain, tokenDuration, identityId } = awsIdentity;
    Auth.federatedSignIn(
      domain,
      {
        token,
        identity_id: identityId,
        expires_at: tokenDuration * 1000 + new Date().getTime(),
      },
      this.currentUser()
    ).catch((e) => {
      console.log("error", e.message);
    });
  }
}
