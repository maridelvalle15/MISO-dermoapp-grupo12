import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CLASS_NAME } from './modal-options.class';
import { Utils } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
/** This component will be added as background layout for modals if enabled */
export class ModalBackdropComponent {
    constructor(element, renderer) {
        this._isAnimated = false;
        this._isShown = false;
        this.element = element;
        this.renderer = renderer;
    }
    get isAnimated() {
        return this._isAnimated;
    }
    set isAnimated(value) {
        this._isAnimated = value;
    }
    get isShown() {
        return this._isShown;
    }
    set isShown(value) {
        this._isShown = value;
        if (value) {
            this.renderer.addClass(this.element.nativeElement, `${CLASS_NAME.SHOW}`);
        }
        else {
            this.renderer.removeClass(this.element.nativeElement, `${CLASS_NAME.SHOW}`);
        }
    }
    ngOnInit() {
        if (this.isAnimated) {
            this.renderer.addClass(this.element.nativeElement, `${CLASS_NAME.FADE}`);
            Utils.reflow(this.element.nativeElement);
        }
        this.isShown = true;
    }
}
ModalBackdropComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: ModalBackdropComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ModalBackdropComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: ModalBackdropComponent, selector: "bs-modal-backdrop", host: { classAttribute: "modal-backdrop" }, ngImport: i0, template: ' ', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: ModalBackdropComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-modal-backdrop',
                    template: ' ',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: { class: CLASS_NAME.BACKDROP }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYmFja2Ryb3AuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLWJhY2tkcm9wLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFHNUMsOEVBQThFO0FBTzlFLE1BQU0sT0FBTyxzQkFBc0I7SUFrQ2pDLFlBQVksT0FBbUIsRUFBRSxRQUFtQjtRQUgxQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFwQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxLQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUNyQixDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQ3JCLENBQUM7U0FDSDtJQUNILENBQUM7SUFhRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQ3JCLENBQUM7WUFDRixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzttSEFoRFUsc0JBQXNCO3VHQUF0QixzQkFBc0IscUdBSnZCLEdBQUc7MkZBSUYsc0JBQXNCO2tCQU5sQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxHQUFHO29CQUNiLHFFQUFxRTtvQkFDckUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUU7aUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDTEFTU19OQU1FIH0gZnJvbSAnLi9tb2RhbC1vcHRpb25zLmNsYXNzJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XG5cblxuLyoqIFRoaXMgY29tcG9uZW50IHdpbGwgYmUgYWRkZWQgYXMgYmFja2dyb3VuZCBsYXlvdXQgZm9yIG1vZGFscyBpZiBlbmFibGVkICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdicy1tb2RhbC1iYWNrZHJvcCcsXG4gIHRlbXBsYXRlOiAnICcsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7IGNsYXNzOiBDTEFTU19OQU1FLkJBQ0tEUk9QIH1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxCYWNrZHJvcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGdldCBpc0FuaW1hdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0FuaW1hdGVkO1xuICB9XG5cbiAgc2V0IGlzQW5pbWF0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0FuaW1hdGVkID0gdmFsdWU7XG4gIH1cblxuICBnZXQgaXNTaG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93bjtcbiAgfVxuXG4gIHNldCBpc1Nob3duKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNTaG93biA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIGAke0NMQVNTX05BTUUuU0hPV31gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKFxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgYCR7Q0xBU1NfTkFNRS5TSE9XfWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZWxlbWVudDogRWxlbWVudFJlZjtcbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBwcm90ZWN0ZWQgX2lzQW5pbWF0ZWQgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIF9pc1Nob3duID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNBbmltYXRlZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIGAke0NMQVNTX05BTUUuRkFERX1gXG4gICAgICApO1xuICAgICAgVXRpbHMucmVmbG93KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZTtcbiAgfVxufVxuIl19