import { ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { getBsVer } from 'ngx-bootstrap/utils';
import { PlacementForBs5, checkMargins } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
import * as i1 from "./popover.config";
import * as i2 from "@angular/common";
export class PopoverContainerComponent {
    constructor(config) {
        this._placement = 'top';
        Object.assign(this, config);
    }
    set placement(value) {
        if (!this._bsVersions.isBs5) {
            this._placement = value;
        }
        else {
            this._placement = PlacementForBs5[value];
        }
    }
    ;
    get _bsVersions() {
        return getBsVer();
    }
    checkMarginNecessity() {
        return checkMargins(this._placement);
    }
}
PopoverContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: PopoverContainerComponent, deps: [{ token: i1.PopoverConfig }], target: i0.ɵɵFactoryTarget.Component });
PopoverContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: PopoverContainerComponent, selector: "popover-container", inputs: { placement: "placement", title: "title" }, host: { attributes: { "role": "tooltip" }, properties: { "attr.id": "popoverId", "class": "\"popover in popover-\" + _placement + \" \" + \"bs-popover-\" + _placement + \" \" + _placement + \" \" + containerClass + \" \" + checkMarginNecessity()", "class.show": "!_bsVersions.isBs3", "class.bs3": "_bsVersions.isBs3" }, styleAttribute: "display:block;" }, ngImport: i0, template: "<div class=\"popover-arrow arrow\"></div>\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\n<div class=\"popover-content popover-body\">\n  <ng-content></ng-content>\n</div>\n", styles: [":host.bs3.popover-top{margin-bottom:10px}:host.bs3.popover.top>.arrow{margin-left:-2px}:host.bs3.popover.top{margin-bottom:10px}:host.popover.bottom>.arrow{margin-left:-4px}:host.bs3.bs-popover-left{margin-right:.5rem}:host.bs3.bs-popover-right .arrow,:host.bs3.bs-popover-left .arrow{margin:.3rem 0}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: PopoverContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'popover-container', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.id]': 'popoverId',
                        '[class]': '"popover in popover-" + _placement + " " + "bs-popover-" + _placement + " " + _placement + " " + containerClass + " " + checkMarginNecessity()',
                        '[class.show]': '!_bsVersions.isBs3',
                        '[class.bs3]': '_bsVersions.isBs3',
                        role: 'tooltip',
                        style: 'display:block;'
                    }, template: "<div class=\"popover-arrow arrow\"></div>\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\n<div class=\"popover-content popover-body\">\n  <ng-content></ng-content>\n</div>\n", styles: [":host.bs3.popover-top{margin-bottom:10px}:host.bs3.popover.top>.arrow{margin-left:-2px}:host.bs3.popover.top{margin-bottom:10px}:host.popover.bottom>.arrow{margin-left:-4px}:host.bs3.bs-popover-left{margin-right:.5rem}:host.bs3.bs-popover-right .arrow,:host.bs3.bs-popover-left .arrow{margin:.3rem 0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.PopoverConfig }]; }, propDecorators: { placement: [{
                type: Input
            }], title: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BvcG92ZXIvcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3BvcG92ZXIvcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQWMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBdUIsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQXVDL0YsTUFBTSxPQUFPLHlCQUF5QjtJQW1CcEMsWUFBWSxNQUFxQjtRQU5qQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBT2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFwQkQsSUFBYSxTQUFTLENBQUMsS0FBMEI7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFJLGVBQWUsQ0FBQyxLQUFxQyxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDO0lBQUEsQ0FBQztJQVFGLElBQUksV0FBVztRQUNiLE9BQU8sUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQU1ELG9CQUFvQjtRQUNsQixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7c0hBekJVLHlCQUF5QjswR0FBekIseUJBQXlCLGlkQzFDdEMsNk1BS0E7MkZEcUNhLHlCQUF5QjtrQkFyQ3JDLFNBQVM7K0JBQ0UsbUJBQW1CLG1CQUNaLHVCQUF1QixDQUFDLE1BQU0sUUFFekM7d0JBQ0osV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLFNBQVMsRUFDUCxnSkFBZ0o7d0JBQ2xKLGNBQWMsRUFBRSxvQkFBb0I7d0JBQ3BDLGFBQWEsRUFBRSxtQkFBbUI7d0JBQ2xDLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxnQkFBZ0I7cUJBQ3hCO29HQTBCWSxTQUFTO3NCQUFyQixLQUFLO2dCQVFHLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3BvdmVyQ29uZmlnIH0gZnJvbSAnLi9wb3BvdmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBnZXRCc1ZlciwgSUJzVmVyc2lvbiB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuaW1wb3J0IHsgUGxhY2VtZW50Rm9yQnM1LCBjaGVja01hcmdpbnMsIEF2YWlsYmxlQlNQb3NpdGlvbnMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncG9wb3Zlci1jb250YWluZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIuaWRdJzogJ3BvcG92ZXJJZCcsXG4gICAgJ1tjbGFzc10nOlxuICAgICAgJ1wicG9wb3ZlciBpbiBwb3BvdmVyLVwiICsgX3BsYWNlbWVudCArIFwiIFwiICsgXCJicy1wb3BvdmVyLVwiICsgX3BsYWNlbWVudCArIFwiIFwiICsgX3BsYWNlbWVudCArIFwiIFwiICsgY29udGFpbmVyQ2xhc3MgKyBcIiBcIiArIGNoZWNrTWFyZ2luTmVjZXNzaXR5KCknLFxuICAgICdbY2xhc3Muc2hvd10nOiAnIV9ic1ZlcnNpb25zLmlzQnMzJyxcbiAgICAnW2NsYXNzLmJzM10nOiAnX2JzVmVyc2lvbnMuaXNCczMnLFxuICAgIHJvbGU6ICd0b29sdGlwJyxcbiAgICBzdHlsZTogJ2Rpc3BsYXk6YmxvY2s7J1xuICB9LFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgOmhvc3QuYnMzLnBvcG92ZXItdG9wIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgfVxuICAgIDpob3N0LmJzMy5wb3BvdmVyLnRvcD4uYXJyb3cge1xuICAgICAgbWFyZ2luLWxlZnQ6IC0ycHg7XG4gICAgfVxuICAgIDpob3N0LmJzMy5wb3BvdmVyLnRvcCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgIH1cbiAgICA6aG9zdC5wb3BvdmVyLmJvdHRvbT4uYXJyb3cge1xuICAgICAgbWFyZ2luLWxlZnQ6IC00cHg7XG4gICAgfVxuICAgIDpob3N0LmJzMy5icy1wb3BvdmVyLWxlZnQge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAuNXJlbTtcbiAgICB9XG4gICAgOmhvc3QuYnMzLmJzLXBvcG92ZXItcmlnaHQgLmFycm93LCA6aG9zdC5iczMuYnMtcG9wb3Zlci1sZWZ0IC5hcnJvd3tcbiAgICAgIG1hcmdpbjogLjNyZW0gMDtcbiAgICB9XG4gICAgYFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb250YWluZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBzZXQgcGxhY2VtZW50KHZhbHVlOiBBdmFpbGJsZUJTUG9zaXRpb25zKSB7XG4gICAgaWYgKCF0aGlzLl9ic1ZlcnNpb25zLmlzQnM1KSB7XG4gICAgICB0aGlzLl9wbGFjZW1lbnQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGxhY2VtZW50ID0gIFBsYWNlbWVudEZvckJzNVt2YWx1ZSBhcyBrZXlvZiB0eXBlb2YgUGxhY2VtZW50Rm9yQnM1XTtcbiAgICB9XG4gIH07XG5cbiAgQElucHV0KCkgdGl0bGU/OiBzdHJpbmc7XG5cbiAgY29udGFpbmVyQ2xhc3M/OiBzdHJpbmc7XG4gIHBvcG92ZXJJZD86IHN0cmluZztcbiAgX3BsYWNlbWVudCA9ICd0b3AnO1xuXG4gIGdldCBfYnNWZXJzaW9ucygpOiBJQnNWZXJzaW9uIHtcbiAgICByZXR1cm4gZ2V0QnNWZXIoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUG9wb3ZlckNvbmZpZykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxuXG4gIGNoZWNrTWFyZ2luTmVjZXNzaXR5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNoZWNrTWFyZ2lucyh0aGlzLl9wbGFjZW1lbnQpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwicG9wb3Zlci1hcnJvdyBhcnJvd1wiPjwvZGl2PlxuPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZSBwb3BvdmVyLWhlYWRlclwiICpuZ0lmPVwidGl0bGVcIj57eyB0aXRsZSB9fTwvaDM+XG48ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50IHBvcG92ZXItYm9keVwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbiJdfQ==