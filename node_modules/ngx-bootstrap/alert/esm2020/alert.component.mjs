import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertConfig } from './alert.config';
import { OnChange } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
import * as i1 from "./alert.config";
import * as i2 from "@angular/common";
export class AlertComponent {
    constructor(_config, changeDetection) {
        this.changeDetection = changeDetection;
        /** Alert type.
         * Provides one of four bootstrap supported contextual classes:
         * `success`, `info`, `warning` and `danger`
         */
        this.type = 'warning';
        /** If set, displays an inline "Close" button */
        this.dismissible = false;
        /** Is alert visible */
        this.isOpen = true;
        /** This event fires immediately after close instance method is called,
         * $event is an instance of Alert component.
         */
        this.onClose = new EventEmitter();
        /** This event fires when alert closed, $event is an instance of Alert component */
        this.onClosed = new EventEmitter();
        this.classes = '';
        this.dismissibleChange = new EventEmitter();
        Object.assign(this, _config);
        this.dismissibleChange.subscribe(( /*dismissible: boolean*/) => {
            this.classes = this.dismissible ? 'alert-dismissible' : '';
            this.changeDetection.markForCheck();
        });
    }
    ngOnInit() {
        if (this.dismissOnTimeout) {
            // if dismissOnTimeout used as attr without binding, it will be a string
            setTimeout(() => this.close(), parseInt(this.dismissOnTimeout, 10));
        }
    }
    // todo: animation ` If the .fade and .in classes are present on the element,
    // the alert will fade out before it is removed`
    /**
     * Closes an alert by removing it from the DOM.
     */
    close() {
        if (!this.isOpen) {
            return;
        }
        this.onClose.emit(this);
        this.isOpen = false;
        this.changeDetection.markForCheck();
        this.onClosed.emit(this);
    }
}
AlertComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: AlertComponent, deps: [{ token: i1.AlertConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AlertComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: AlertComponent, selector: "alert,bs-alert", inputs: { type: "type", dismissible: "dismissible", dismissOnTimeout: "dismissOnTimeout", isOpen: "isOpen" }, outputs: { onClose: "onClose", onClosed: "onClosed" }, ngImport: i0, template: "<ng-template [ngIf]=\"isOpen\">\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\n    <ng-template [ngIf]=\"dismissible\">\n      <button type=\"button\" class=\"close btn-close\" aria-label=\"Close\" (click)=\"close()\">\n        <span aria-hidden=\"true\" class=\"visually-hidden\">&times;</span>\n        <span class=\"sr-only visually-hidden\">Close</span>\n      </button>\n    </ng-template>\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    OnChange(),
    __metadata("design:type", Object)
], AlertComponent.prototype, "dismissible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'alert,bs-alert', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"isOpen\">\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\n    <ng-template [ngIf]=\"dismissible\">\n      <button type=\"button\" class=\"close btn-close\" aria-label=\"Close\" (click)=\"close()\">\n        <span aria-hidden=\"true\" class=\"visually-hidden\">&times;</span>\n        <span class=\"sr-only visually-hidden\">Close</span>\n      </button>\n    </ng-template>\n    <ng-content></ng-content>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AlertConfig }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { type: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], dismissOnTimeout: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], onClose: [{
                type: Output
            }], onClosed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9hbGVydC9hbGVydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFPL0MsTUFBTSxPQUFPLGNBQWM7SUF5QnpCLFlBQVksT0FBb0IsRUFBVSxlQUFrQztRQUFsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUF4QjVFOzs7V0FHRztRQUNNLFNBQUksR0FBRyxTQUFTLENBQUM7UUFDMUIsZ0RBQWdEO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBSTdDLHVCQUF1QjtRQUNkLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFFdkI7O1dBRUc7UUFDTyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDdkQsbUZBQW1GO1FBQ3pFLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUd4RCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2Isc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUc5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEVBQUMsd0JBQXdCLEVBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsd0VBQXdFO1lBQ3hFLFVBQVUsQ0FDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQ2xCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQTBCLEVBQUUsRUFBRSxDQUFDLENBQzlDLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCw2RUFBNkU7SUFDN0UsZ0RBQWdEO0lBQ2hEOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7MkdBekRVLGNBQWM7K0ZBQWQsY0FBYywyTkNqQjNCLHllQVdBO0FEYUU7SUFBQyxRQUFRLEVBQUU7O21EQUFrQzsyRkFQbEMsY0FBYztrQkFMMUIsU0FBUzsrQkFDRSxnQkFBZ0IsbUJBRVQsdUJBQXVCLENBQUMsTUFBTTtrSUFPdEMsSUFBSTtzQkFBWixLQUFLO2dCQUVtQixXQUFXO3NCQUFyQixLQUFLO2dCQUVYLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFHRyxNQUFNO3NCQUFkLEtBQUs7Z0JBS0ksT0FBTztzQkFBaEIsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRDb25maWcgfSBmcm9tICcuL2FsZXJ0LmNvbmZpZyc7XG5pbXBvcnQgeyBPbkNoYW5nZSB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbGVydCxicy1hbGVydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgLyoqIEFsZXJ0IHR5cGUuXG4gICAqIFByb3ZpZGVzIG9uZSBvZiBmb3VyIGJvb3RzdHJhcCBzdXBwb3J0ZWQgY29udGV4dHVhbCBjbGFzc2VzOlxuICAgKiBgc3VjY2Vzc2AsIGBpbmZvYCwgYHdhcm5pbmdgIGFuZCBgZGFuZ2VyYFxuICAgKi9cbiAgQElucHV0KCkgdHlwZSA9ICd3YXJuaW5nJztcbiAgLyoqIElmIHNldCwgZGlzcGxheXMgYW4gaW5saW5lIFwiQ2xvc2VcIiBidXR0b24gKi9cbiAgQE9uQ2hhbmdlKCkgICBASW5wdXQoKSAgIGRpc21pc3NpYmxlID0gZmFsc2U7XG4gIC8qKiBOdW1iZXIgaW4gbWlsbGlzZWNvbmRzLCBhZnRlciB3aGljaCBhbGVydCB3aWxsIGJlIGNsb3NlZCAqL1xuICBASW5wdXQoKSBkaXNtaXNzT25UaW1lb3V0PzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8qKiBJcyBhbGVydCB2aXNpYmxlICovXG4gIEBJbnB1dCgpIGlzT3BlbiA9IHRydWU7XG5cbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgaW1tZWRpYXRlbHkgYWZ0ZXIgY2xvc2UgaW5zdGFuY2UgbWV0aG9kIGlzIGNhbGxlZCxcbiAgICogJGV2ZW50IGlzIGFuIGluc3RhbmNlIG9mIEFsZXJ0IGNvbXBvbmVudC5cbiAgICovXG4gIEBPdXRwdXQoKSBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxBbGVydENvbXBvbmVudD4oKTtcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgd2hlbiBhbGVydCBjbG9zZWQsICRldmVudCBpcyBhbiBpbnN0YW5jZSBvZiBBbGVydCBjb21wb25lbnQgKi9cbiAgQE91dHB1dCgpIG9uQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbGVydENvbXBvbmVudD4oKTtcblxuXG4gIGNsYXNzZXMgPSAnJztcbiAgZGlzbWlzc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IoX2NvbmZpZzogQWxlcnRDb25maWcsIHByaXZhdGUgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgX2NvbmZpZyk7XG4gICAgdGhpcy5kaXNtaXNzaWJsZUNoYW5nZS5zdWJzY3JpYmUoKC8qZGlzbWlzc2libGU6IGJvb2xlYW4qLykgPT4ge1xuICAgICAgdGhpcy5jbGFzc2VzID0gdGhpcy5kaXNtaXNzaWJsZSA/ICdhbGVydC1kaXNtaXNzaWJsZScgOiAnJztcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzbWlzc09uVGltZW91dCkge1xuICAgICAgLy8gaWYgZGlzbWlzc09uVGltZW91dCB1c2VkIGFzIGF0dHIgd2l0aG91dCBiaW5kaW5nLCBpdCB3aWxsIGJlIGEgc3RyaW5nXG4gICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAoKSA9PiB0aGlzLmNsb3NlKCksXG4gICAgICAgIHBhcnNlSW50KHRoaXMuZGlzbWlzc09uVGltZW91dCBhcyBzdHJpbmcsIDEwKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyB0b2RvOiBhbmltYXRpb24gYCBJZiB0aGUgLmZhZGUgYW5kIC5pbiBjbGFzc2VzIGFyZSBwcmVzZW50IG9uIHRoZSBlbGVtZW50LFxuICAvLyB0aGUgYWxlcnQgd2lsbCBmYWRlIG91dCBiZWZvcmUgaXQgaXMgcmVtb3ZlZGBcbiAgLyoqXG4gICAqIENsb3NlcyBhbiBhbGVydCBieSByZW1vdmluZyBpdCBmcm9tIHRoZSBET00uXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vbkNsb3NlLmVtaXQodGhpcyk7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLm9uQ2xvc2VkLmVtaXQodGhpcyk7XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc09wZW5cIj5cbiAgPGRpdiBbY2xhc3NdPVwiJ2FsZXJ0IGFsZXJ0LScgKyB0eXBlXCIgcm9sZT1cImFsZXJ0XCIgW25nQ2xhc3NdPVwiY2xhc3Nlc1wiPlxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJkaXNtaXNzaWJsZVwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZSBidG4tY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiAoY2xpY2spPVwiY2xvc2UoKVwiPlxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seSB2aXN1YWxseS1oaWRkZW5cIj5DbG9zZTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=