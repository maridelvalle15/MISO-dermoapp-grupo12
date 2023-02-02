import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CLASS_NAME, DISMISS_REASONS, ModalOptions, TRANSITION_DURATIONS } from './modal-options.class';
import * as i0 from "@angular/core";
import * as i1 from "./modal-options.class";
import * as i2 from "ngx-bootstrap/focus-trap";
export class ModalContainerComponent {
    constructor(options, _element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.isShown = false;
        this.isAnimated = false;
        this.isModalHiding = false;
        this.clickStartedInContent = false;
        this.config = Object.assign({}, options);
    }
    ngOnInit() {
        if (this.isAnimated) {
            this._renderer.addClass(this._element.nativeElement, CLASS_NAME.FADE);
        }
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        setTimeout(() => {
            this.isShown = true;
            this._renderer.addClass(this._element.nativeElement, CLASS_NAME.SHOW);
        }, this.isAnimated ? TRANSITION_DURATIONS.BACKDROP : 0);
        if (document && document.body) {
            if (this.bsModalService && this.bsModalService.getModalsCount() === 1) {
                this.bsModalService.checkScrollbar();
                this.bsModalService.setScrollbar();
            }
            this._renderer.addClass(document.body, CLASS_NAME.OPEN);
            this._renderer.setStyle(document.body, 'overflow-y', 'hidden');
        }
        if (this._element.nativeElement) {
            this._element.nativeElement.focus();
        }
    }
    onClickStarted(event) {
        this.clickStartedInContent = event.target !== this._element.nativeElement;
    }
    onClickStop(event) {
        const clickedInBackdrop = event.target === this._element.nativeElement && !this.clickStartedInContent;
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            !clickedInBackdrop) {
            this.clickStartedInContent = false;
            return;
        }
        this.bsModalService?.setDismissReason(DISMISS_REASONS.BACKRDOP);
        this.hide();
    }
    onPopState() {
        this.bsModalService?.setDismissReason(DISMISS_REASONS.BACK);
        this.hide();
    }
    onEsc(event) {
        if (!this.isShown) {
            return;
        }
        if (event.keyCode === 27 || event.key === 'Escape') {
            event.preventDefault();
        }
        if (this.config.keyboard &&
            this.level === this.bsModalService?.getModalsCount()) {
            this.bsModalService?.setDismissReason(DISMISS_REASONS.ESC);
            this.hide();
        }
    }
    ngOnDestroy() {
        if (this.isShown) {
            this._hide();
        }
    }
    hide() {
        if (this.isModalHiding) {
            return;
        }
        if (this.config.closeInterceptor) {
            this.config.closeInterceptor().then(() => this._hide(), () => undefined);
            return;
        }
        this._hide();
    }
    _hide() {
        this.isModalHiding = true;
        this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.SHOW);
        setTimeout(() => {
            this.isShown = false;
            if (document &&
                document.body &&
                this.bsModalService?.getModalsCount() === 1) {
                this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
                this._renderer.setStyle(document.body, 'overflow-y', '');
            }
            this.bsModalService?.hide(this.config.id);
            this.isModalHiding = false;
        }, this.isAnimated ? TRANSITION_DURATIONS.MODAL : 0);
    }
}
ModalContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: ModalContainerComponent, deps: [{ token: i1.ModalOptions }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: ModalContainerComponent, selector: "modal-container", host: { attributes: { "role": "dialog", "tabindex": "-1" }, listeners: { "mousedown": "onClickStarted($event)", "click": "onClickStop($event)", "window:popstate": "onPopState()", "window:keydown.esc": "onEsc($event)" }, properties: { "attr.aria-modal": "true", "attr.aria-labelledby": "config.ariaLabelledBy", "attr.aria-describedby": "config.ariaDescribedby" }, classAttribute: "modal" }, ngImport: i0, template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')"
         role="document"
         focusTrap>
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.FocusTrapDirective, selector: "[focusTrap]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["focusTrap"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: ModalContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'modal-container',
                    template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')"
         role="document"
         focusTrap>
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        class: 'modal',
                        role: 'dialog',
                        tabindex: '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'config.ariaLabelledBy',
                        '[attr.aria-describedby]': 'config.ariaDescribedby'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.ModalOptions }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { onClickStarted: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], onClickStop: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onPopState: [{
                type: HostListener,
                args: ['window:popstate']
            }], onEsc: [{
                type: HostListener,
                args: ['window:keydown.esc', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2RhbC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFHWixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFVBQVUsRUFDVixlQUFlLEVBQ2YsWUFBWSxFQUNaLG9CQUFvQixFQUNyQixNQUFNLHVCQUF1QixDQUFDOzs7O0FBd0IvQixNQUFNLE9BQU8sdUJBQXVCO0lBU2xDLFlBQVksT0FBcUIsRUFDWCxRQUFvQixFQUN0QixTQUFvQjtRQURsQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFUeEMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRVgsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBS3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixVQUFVLENBQUMsSUFBSSxDQUNoQixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLFNBQVMsRUFDVCxPQUFPLENBQ1IsQ0FBQztRQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZ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O3dHQUF2Qix1QkFBdUIsNmJBbkJ4Qjs7Ozs7Ozs7R0FRVDsyRkFXVSx1QkFBdUI7a0JBckJuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDtvQkFDRCxxRUFBcUU7b0JBQ3JFLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsT0FBTzt3QkFDZCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxtQkFBbUIsRUFBRSxNQUFNO3dCQUMzQix3QkFBd0IsRUFBRSx1QkFBdUI7d0JBQ2pELHlCQUF5QixFQUFFLHdCQUF3QjtxQkFDcEQ7aUJBQ0Y7b0pBaURDLGNBQWM7c0JBRGIsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTXJDLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBaUJqQyxVQUFVO3NCQURULFlBQVk7dUJBQUMsaUJBQWlCO2dCQU8vQixLQUFLO3NCQURKLFlBQVk7dUJBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENMQVNTX05BTUUsXG4gIERJU01JU1NfUkVBU09OUyxcbiAgTW9kYWxPcHRpb25zLFxuICBUUkFOU0lUSU9OX0RVUkFUSU9OU1xufSBmcm9tICcuL21vZGFsLW9wdGlvbnMuY2xhc3MnO1xuaW1wb3J0IHsgQnNNb2RhbFNlcnZpY2UgfSBmcm9tICcuL2JzLW1vZGFsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKGNvbmZpZy5jbGFzcyA/ICcgJyArIGNvbmZpZy5jbGFzcyA6ICcnKVwiXG4gICAgICAgICByb2xlPVwiZG9jdW1lbnRcIlxuICAgICAgICAgZm9jdXNUcmFwPlxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdtb2RhbCcsXG4gICAgcm9sZTogJ2RpYWxvZycsXG4gICAgdGFiaW5kZXg6ICctMScsXG4gICAgJ1thdHRyLmFyaWEtbW9kYWxdJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2NvbmZpZy5hcmlhTGFiZWxsZWRCeScsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ2NvbmZpZy5hcmlhRGVzY3JpYmVkYnknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGNvbmZpZzogTW9kYWxPcHRpb25zO1xuICBpc1Nob3duID0gZmFsc2U7XG4gIGxldmVsPzogbnVtYmVyO1xuICBpc0FuaW1hdGVkID0gZmFsc2U7XG4gIGJzTW9kYWxTZXJ2aWNlPzogQnNNb2RhbFNlcnZpY2U7XG4gIHByaXZhdGUgaXNNb2RhbEhpZGluZyA9IGZhbHNlO1xuICBwcml2YXRlIGNsaWNrU3RhcnRlZEluQ29udGVudCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE1vZGFsT3B0aW9ucyxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKFxuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIENMQVNTX05BTUUuRkFERVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnZGlzcGxheScsXG4gICAgICAnYmxvY2snXG4gICAgKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNTaG93biA9IHRydWU7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICBDTEFTU19OQU1FLlNIT1dcbiAgICAgICk7XG4gICAgfSwgdGhpcy5pc0FuaW1hdGVkID8gVFJBTlNJVElPTl9EVVJBVElPTlMuQkFDS0RST1AgOiAwKTtcbiAgICBpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuYm9keSkge1xuICAgICAgaWYgKHRoaXMuYnNNb2RhbFNlcnZpY2UgJiYgdGhpcy5ic01vZGFsU2VydmljZS5nZXRNb2RhbHNDb3VudCgpID09PSAxKSB7XG4gICAgICAgIHRoaXMuYnNNb2RhbFNlcnZpY2UuY2hlY2tTY3JvbGxiYXIoKTtcbiAgICAgICAgdGhpcy5ic01vZGFsU2VydmljZS5zZXRTY3JvbGxiYXIoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksIENMQVNTX05BTUUuT1BFTik7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSlcbiAgb25DbGlja1N0YXJ0ZWQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNsaWNrU3RhcnRlZEluQ29udGVudCA9IGV2ZW50LnRhcmdldCAhPT0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrU3RvcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGNsaWNrZWRJbkJhY2tkcm9wID0gZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgJiYgIXRoaXMuY2xpY2tTdGFydGVkSW5Db250ZW50O1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLmlnbm9yZUJhY2tkcm9wQ2xpY2sgfHxcbiAgICAgIHRoaXMuY29uZmlnLmJhY2tkcm9wID09PSAnc3RhdGljJyB8fFxuICAgICAgIWNsaWNrZWRJbkJhY2tkcm9wXG4gICAgKSB7XG4gICAgICB0aGlzLmNsaWNrU3RhcnRlZEluQ29udGVudCA9IGZhbHNlO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYnNNb2RhbFNlcnZpY2U/LnNldERpc21pc3NSZWFzb24oRElTTUlTU19SRUFTT05TLkJBQ0tSRE9QKTtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpwb3BzdGF0ZScpXG4gIG9uUG9wU3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5ic01vZGFsU2VydmljZT8uc2V0RGlzbWlzc1JlYXNvbihESVNNSVNTX1JFQVNPTlMuQkFDSyk7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5lc2MnLCBbJyRldmVudCddKVxuICBvbkVzYyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1Nob3duKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3IHx8IGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcua2V5Ym9hcmQgJiZcbiAgICAgIHRoaXMubGV2ZWwgPT09IHRoaXMuYnNNb2RhbFNlcnZpY2U/LmdldE1vZGFsc0NvdW50KClcbiAgICApIHtcbiAgICAgIHRoaXMuYnNNb2RhbFNlcnZpY2U/LnNldERpc21pc3NSZWFzb24oRElTTUlTU19SRUFTT05TLkVTQyk7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1Nob3duKSB7XG4gICAgICB0aGlzLl9oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc01vZGFsSGlkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLmNsb3NlSW50ZXJjZXB0b3IpIHtcbiAgICAgIHRoaXMuY29uZmlnLmNsb3NlSW50ZXJjZXB0b3IoKS50aGVuKFxuICAgICAgICAoKSA9PiB0aGlzLl9oaWRlKCksXG4gICAgICAgICgpID0+IHVuZGVmaW5lZCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNNb2RhbEhpZGluZyA9IHRydWU7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICBDTEFTU19OQU1FLlNIT1dcbiAgICApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5pc1Nob3duID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIGRvY3VtZW50ICYmXG4gICAgICAgIGRvY3VtZW50LmJvZHkgJiZcbiAgICAgICAgdGhpcy5ic01vZGFsU2VydmljZT8uZ2V0TW9kYWxzQ291bnQoKSA9PT0gMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIENMQVNTX05BTUUuT1BFTik7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRvY3VtZW50LmJvZHksICdvdmVyZmxvdy15JywgJycpO1xuICAgICAgfVxuICAgICAgdGhpcy5ic01vZGFsU2VydmljZT8uaGlkZSh0aGlzLmNvbmZpZy5pZCk7XG4gICAgICB0aGlzLmlzTW9kYWxIaWRpbmcgPSBmYWxzZTtcbiAgICB9LCB0aGlzLmlzQW5pbWF0ZWQgPyBUUkFOU0lUSU9OX0RVUkFUSU9OUy5NT0RBTCA6IDApO1xuICB9XG59XG4iXX0=