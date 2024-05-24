export class BrowserCheck {
  static isChromium(): boolean {
    switch (BrowserCheck.getBrowserName()) {
      case 'Firefox':
        return false;
        break;
      case 'Internet Explorer':
        return false;
        break;
      default:
        return true;
        break;
    }
  }

  static getBrowserName(): string {
    const userAgent = navigator.userAgent;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      return 'Chrome';
    } else if (userAgent.match(/firefox|fxios/i)) {
      return 'Firefox';
    } else if (userAgent.match(/safari/i)) {
      return 'Safari';
    } else if (userAgent.match(/edg/i)) {
      return 'Edge';
    } else if (userAgent.match(/opr\//i)) {
      return 'Opera';
    } else if (userAgent.match(/msie|trident/i)) {
      return 'Internet Explorer';
    } else {
      return 'Unknown';
    }
  }
}
