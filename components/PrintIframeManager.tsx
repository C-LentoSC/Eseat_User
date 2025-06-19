export class PrintIframeManager {
  private iframe: HTMLIFrameElement | null = null;
  private removed: boolean = false;

  createIframe() {
    this.iframe = document.createElement('iframe');
    this.iframe.style.position = 'fixed';
    this.iframe.style.top = '-1000px';
    this.iframe.style.left = '-1000px';
    this.iframe.style.width = '0';
    this.iframe.style.height = '0';
    this.iframe.style.border = 'none';
    this.removed = false;

    document.body.appendChild(this.iframe);
  }

  writeContent(htmlContent: string) {
    if (!this.iframe) return;

    const doc = this.iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();
    }
  }

  triggerPrint(callback?: () => void) {
    if (!this.iframe) return;

    this.iframe.onload = () => {
      setTimeout(() => {
        this.iframe?.contentWindow?.focus();
        this.iframe?.contentWindow?.print();

        // Schedule removal after printing
        setTimeout(() => {
          this.removeIframe(callback);
        }, 1000);
      }, 500);
    };
  }

  removeIframe(callback?: () => void) {
    if (this.iframe && this.iframe.parentNode) {
      document.body.removeChild(this.iframe);
      this.iframe = null;
      this.removed = true;
      console.log("Iframe has been removed");

      if (callback) callback();
    }
  }

  isRemoved(): boolean {
    return this.removed;
  }
}