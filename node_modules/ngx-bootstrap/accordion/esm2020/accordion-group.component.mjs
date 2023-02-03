import { Component, HostBinding, Inject, Input, Output, EventEmitter } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ngx-bootstrap/collapse";
import * as i3 from "./accordion.component";
/**
 * ### Accordion heading
 * Instead of using `heading` attribute on the `accordion-group`, you can use
 * an `accordion-heading` attribute on `any` element inside of a group that
 * will be used as group's header template.
 */
export class AccordionPanelComponent {
    constructor(accordion) {
        /** turn on/off animation */
        this.isAnimated = false;
        /** Provides an ability to use Bootstrap's contextual panel classes
         * (`panel-primary`, `panel-success`, `panel-info`, etc...).
         * List of all available classes [available here]
         * (https://getbootstrap.com/docs/3.3/components/#panels-alternatives)
         */
        this.panelClass = 'panel-default';
        /** if <code>true</code> — disables accordion group */
        this.isDisabled = false;
        /** Emits when the opened state changes */
        this.isOpenChange = new EventEmitter();
        this._isOpen = false;
        this.accordion = accordion;
    }
    // Questionable, maybe .panel-open should be on child div.panel element?
    /** Is accordion group open or closed. This property supports two-way binding */
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        if (value !== this.isOpen) {
            if (value) {
                this.accordion.closeOtherPanels(this);
            }
            this._isOpen = value;
            Promise.resolve(null)
                .then(() => {
                this.isOpenChange.emit(value);
            });
        }
    }
    ngOnInit() {
        this.accordion.addGroup(this);
    }
    ngOnDestroy() {
        this.accordion.removeGroup(this);
    }
    toggleOpen() {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
}
AccordionPanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: AccordionPanelComponent, deps: [{ token: AccordionComponent }], target: i0.ɵɵFactoryTarget.Component });
AccordionPanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: AccordionPanelComponent, selector: "accordion-group, accordion-panel", inputs: { heading: "heading", panelClass: "panelClass", isDisabled: "isDisabled", isOpen: "isOpen" }, outputs: { isOpenChange: "isOpenChange" }, host: { properties: { "class.panel-open": "this.isOpen" }, styleAttribute: "display: block", classAttribute: "panel" }, ngImport: i0, template: "<div class=\"panel card\" [ngClass]=\"panelClass\">\n  <div\n    class=\"panel-heading card-header\"\n    role=\"tab\"\n    (click)=\"toggleOpen()\"\n    [ngClass]=\"isDisabled ? 'panel-disabled' : 'panel-enabled'\"\n  >\n    <div class=\"panel-title\">\n      <div role=\"button\" class=\"accordion-toggle\" [attr.aria-expanded]=\"isOpen\">\n        <button class=\"btn btn-link\" *ngIf=\"heading\" [ngClass]=\"{ 'text-muted': isDisabled }\" type=\"button\">\n          {{ heading }}\n        </button>\n        <ng-content select=\"[accordion-heading]\"></ng-content>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-collapse collapse\" role=\"tabpanel\" [collapse]=\"!isOpen\" [isAnimated]=\"isAnimated\">\n    <div class=\"panel-body card-block card-body\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n", styles: [":host .card-header.panel-enabled{cursor:pointer}:host .card-header.panel-disabled .btn.btn-link{cursor:default;text-decoration:none}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.CollapseDirective, selector: "[collapse]", inputs: ["display", "isAnimated", "collapse"], outputs: ["collapsed", "collapses", "expanded", "expands"], exportAs: ["bs-collapse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: AccordionPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'accordion-group, accordion-panel', host: {
                        class: 'panel',
                        style: 'display: block'
                    }, template: "<div class=\"panel card\" [ngClass]=\"panelClass\">\n  <div\n    class=\"panel-heading card-header\"\n    role=\"tab\"\n    (click)=\"toggleOpen()\"\n    [ngClass]=\"isDisabled ? 'panel-disabled' : 'panel-enabled'\"\n  >\n    <div class=\"panel-title\">\n      <div role=\"button\" class=\"accordion-toggle\" [attr.aria-expanded]=\"isOpen\">\n        <button class=\"btn btn-link\" *ngIf=\"heading\" [ngClass]=\"{ 'text-muted': isDisabled }\" type=\"button\">\n          {{ heading }}\n        </button>\n        <ng-content select=\"[accordion-heading]\"></ng-content>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-collapse collapse\" role=\"tabpanel\" [collapse]=\"!isOpen\" [isAnimated]=\"isAnimated\">\n    <div class=\"panel-body card-block card-body\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n", styles: [":host .card-header.panel-enabled{cursor:pointer}:host .card-header.panel-disabled .btn.btn-link{cursor:default;text-decoration:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i3.AccordionComponent, decorators: [{
                    type: Inject,
                    args: [AccordionComponent]
                }] }]; }, propDecorators: { heading: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], isOpenChange: [{
                type: Output
            }], isOpen: [{
                type: HostBinding,
                args: ['class.panel-open']
            }, {
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLWdyb3VwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9hY2NvcmRpb24vYWNjb3JkaW9uLWdyb3VwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxZQUFZLEVBQy9FLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQUUzRDs7Ozs7R0FLRztBQVdILE1BQU0sT0FBTyx1QkFBdUI7SUF3Q2xDLFlBQXdDLFNBQTZCO1FBdkNyRSw0QkFBNEI7UUFDNUIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUduQjs7OztXQUlHO1FBQ00sZUFBVSxHQUFHLGVBQWUsQ0FBQztRQUN0QyxzREFBc0Q7UUFDN0MsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUM1QiwwQ0FBMEM7UUFDaEMsaUJBQVksR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXVCekQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUl4QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBMUJELHdFQUF3RTtJQUN4RSxnRkFBZ0Y7SUFDaEYsSUFFSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3ZCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDekIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QztZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUNwQixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNULElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBU0QsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1QjtJQUNILENBQUM7O29IQXhEVSx1QkFBdUIsa0JBd0NkLGtCQUFrQjt3R0F4QzNCLHVCQUF1QixpVkNyQnBDLHEwQkFzQkE7MkZERGEsdUJBQXVCO2tCQVZuQyxTQUFTOytCQUNFLGtDQUFrQyxRQUd0Qzt3QkFDSixLQUFLLEVBQUUsT0FBTzt3QkFDZCxLQUFLLEVBQUUsZ0JBQWdCO3FCQUN4Qjs7MEJBMkNZLE1BQU07MkJBQUMsa0JBQWtCOzRDQXBDN0IsT0FBTztzQkFBZixLQUFLO2dCQU1HLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxZQUFZO3NCQUFyQixNQUFNO2dCQU1ILE1BQU07c0JBRlQsV0FBVzt1QkFBQyxrQkFBa0I7O3NCQUM5QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWNjb3JkaW9uQ29tcG9uZW50IH0gZnJvbSAnLi9hY2NvcmRpb24uY29tcG9uZW50JztcblxuLyoqXG4gKiAjIyMgQWNjb3JkaW9uIGhlYWRpbmdcbiAqIEluc3RlYWQgb2YgdXNpbmcgYGhlYWRpbmdgIGF0dHJpYnV0ZSBvbiB0aGUgYGFjY29yZGlvbi1ncm91cGAsIHlvdSBjYW4gdXNlXG4gKiBhbiBgYWNjb3JkaW9uLWhlYWRpbmdgIGF0dHJpYnV0ZSBvbiBgYW55YCBlbGVtZW50IGluc2lkZSBvZiBhIGdyb3VwIHRoYXRcbiAqIHdpbGwgYmUgdXNlZCBhcyBncm91cCdzIGhlYWRlciB0ZW1wbGF0ZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWNjb3JkaW9uLWdyb3VwLCBhY2NvcmRpb24tcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWNjb3JkaW9uLWdyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3BhbmVsJyxcbiAgICBzdHlsZTogJ2Rpc3BsYXk6IGJsb2NrJ1xuICB9LFxuICBzdHlsZVVybHM6IFsnLi9hY2NvcmRpb24uc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvblBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKiogdHVybiBvbi9vZmYgYW5pbWF0aW9uICovXG4gIGlzQW5pbWF0ZWQgPSBmYWxzZTtcbiAgLyoqIENsaWNrYWJsZSB0ZXh0IGluIGFjY29yZGlvbidzIGdyb3VwIGhlYWRlciwgY2hlY2sgYGFjY29yZGlvbiBoZWFkaW5nYCBiZWxvdyBmb3IgdXNpbmcgaHRtbCBpbiBoZWFkZXIgKi9cbiAgQElucHV0KCkgaGVhZGluZyE6IHN0cmluZztcbiAgLyoqIFByb3ZpZGVzIGFuIGFiaWxpdHkgdG8gdXNlIEJvb3RzdHJhcCdzIGNvbnRleHR1YWwgcGFuZWwgY2xhc3Nlc1xuICAgKiAoYHBhbmVsLXByaW1hcnlgLCBgcGFuZWwtc3VjY2Vzc2AsIGBwYW5lbC1pbmZvYCwgZXRjLi4uKS5cbiAgICogTGlzdCBvZiBhbGwgYXZhaWxhYmxlIGNsYXNzZXMgW2F2YWlsYWJsZSBoZXJlXVxuICAgKiAoaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvMy4zL2NvbXBvbmVudHMvI3BhbmVscy1hbHRlcm5hdGl2ZXMpXG4gICAqL1xuICBASW5wdXQoKSBwYW5lbENsYXNzID0gJ3BhbmVsLWRlZmF1bHQnO1xuICAvKiogaWYgPGNvZGU+dHJ1ZTwvY29kZT4g4oCUIGRpc2FibGVzIGFjY29yZGlvbiBncm91cCAqL1xuICBASW5wdXQoKSBpc0Rpc2FibGVkID0gZmFsc2U7XG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBvcGVuZWQgc3RhdGUgY2hhbmdlcyAqL1xuICBAT3V0cHV0KCkgaXNPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gUXVlc3Rpb25hYmxlLCBtYXliZSAucGFuZWwtb3BlbiBzaG91bGQgYmUgb24gY2hpbGQgZGl2LnBhbmVsIGVsZW1lbnQ/XG4gIC8qKiBJcyBhY2NvcmRpb24gZ3JvdXAgb3BlbiBvciBjbG9zZWQuIFRoaXMgcHJvcGVydHkgc3VwcG9ydHMgdHdvLXdheSBiaW5kaW5nICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MucGFuZWwtb3BlbicpXG4gIEBJbnB1dCgpXG4gIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgfVxuXG4gIHNldCBpc09wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaXNPcGVuKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hY2NvcmRpb24uY2xvc2VPdGhlclBhbmVscyh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2lzT3BlbiA9IHZhbHVlO1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9pc09wZW4gPSBmYWxzZTtcbiAgcHJvdGVjdGVkIGFjY29yZGlvbjogQWNjb3JkaW9uQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQWNjb3JkaW9uQ29tcG9uZW50KSBhY2NvcmRpb246IEFjY29yZGlvbkNvbXBvbmVudCkge1xuICAgIHRoaXMuYWNjb3JkaW9uID0gYWNjb3JkaW9uO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hY2NvcmRpb24uYWRkR3JvdXAodGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmFjY29yZGlvbi5yZW1vdmVHcm91cCh0aGlzKTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cInBhbmVsIGNhcmRcIiBbbmdDbGFzc109XCJwYW5lbENsYXNzXCI+XG4gIDxkaXZcbiAgICBjbGFzcz1cInBhbmVsLWhlYWRpbmcgY2FyZC1oZWFkZXJcIlxuICAgIHJvbGU9XCJ0YWJcIlxuICAgIChjbGljayk9XCJ0b2dnbGVPcGVuKClcIlxuICAgIFtuZ0NsYXNzXT1cImlzRGlzYWJsZWQgPyAncGFuZWwtZGlzYWJsZWQnIDogJ3BhbmVsLWVuYWJsZWQnXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbC10aXRsZVwiPlxuICAgICAgPGRpdiByb2xlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY2NvcmRpb24tdG9nZ2xlXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpc09wZW5cIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGlua1wiICpuZ0lmPVwiaGVhZGluZ1wiIFtuZ0NsYXNzXT1cInsgJ3RleHQtbXV0ZWQnOiBpc0Rpc2FibGVkIH1cIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAge3sgaGVhZGluZyB9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2FjY29yZGlvbi1oZWFkaW5nXVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCIgcm9sZT1cInRhYnBhbmVsXCIgW2NvbGxhcHNlXT1cIiFpc09wZW5cIiBbaXNBbmltYXRlZF09XCJpc0FuaW1hdGVkXCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHkgY2FyZC1ibG9jayBjYXJkLWJvZHlcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==