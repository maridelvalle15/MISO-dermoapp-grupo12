import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { getBsVer } from 'ngx-bootstrap/utils';
import { PlacementForBs5 } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
import * as i1 from "./tooltip.config";
export class TooltipContainerComponent {
    constructor(config) {
        Object.assign(this, config);
    }
    get _bsVersions() {
        return getBsVer();
    }
    ngAfterViewInit() {
        this.classMap = { in: false, fade: false };
        if (this.placement) {
            if (this._bsVersions.isBs5) {
                this.placement = PlacementForBs5[this.placement];
            }
            this.classMap[this.placement] = true;
        }
        this.classMap[`tooltip-${this.placement}`] = true;
        this.classMap["in"] = true;
        if (this.animation) {
            this.classMap["fade"] = true;
        }
        if (this.containerClass) {
            this.classMap[this.containerClass] = true;
        }
    }
}
TooltipContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: TooltipContainerComponent, deps: [{ token: i1.TooltipConfig }], target: i0.ɵɵFactoryTarget.Component });
TooltipContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: TooltipContainerComponent, selector: "bs-tooltip-container", host: { attributes: { "role": "tooltip" }, properties: { "class": "\"show tooltip in tooltip-\" + placement + \" \" + \"bs-tooltip-\" + placement + \" \" + placement + \" \" + containerClass", "attr.id": "this.id" } }, ngImport: i0, template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `, isInline: true, styles: [":host.tooltip{display:block;pointer-events:none}:host.bs3.tooltip.top>.arrow{margin-left:-2px}:host.bs3.tooltip.bottom{margin-top:0}:host.bs3.bs-tooltip-left,:host.bs3.bs-tooltip-right{margin:0}:host.bs3.bs-tooltip-right .arrow,:host.bs3.bs-tooltip-left .arrow{margin:.3rem 0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: TooltipContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bs-tooltip-container', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': '"show tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
                        '[attr.id]': 'this.id',
                        role: 'tooltip'
                    }, template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `, styles: [":host.tooltip{display:block;pointer-events:none}:host.bs3.tooltip.top>.arrow{margin-left:-2px}:host.bs3.tooltip.bottom{margin-top:0}:host.bs3.bs-tooltip-left,:host.bs3.bs-tooltip-right{margin:0}:host.bs3.bs-tooltip-right .arrow,:host.bs3.bs-tooltip-left .arrow{margin:.3rem 0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.TooltipConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Rvb2x0aXAvdG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFxQzVELE1BQU0sT0FBTyx5QkFBeUI7SUFXcEMsWUFBWSxNQUFxQjtRQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBTkQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBTUQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQXlDLENBQUMsQ0FBQzthQUNuRjtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzlCO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUMzQztJQUNILENBQUM7O3NIQWxDVSx5QkFBeUI7MEdBQXpCLHlCQUF5Qix1UkFMMUI7OztLQUdQOzJGQUVRLHlCQUF5QjtrQkFuQ3JDLFNBQVM7K0JBQ0Usc0JBQXNCLG1CQUNmLHVCQUF1QixDQUFDLE1BQU0sUUFFekM7d0JBQ0osU0FBUyxFQUNQLG1IQUFtSDt3QkFDckgsV0FBVyxFQUFFLFNBQVM7d0JBQ3RCLElBQUksRUFBRSxTQUFTO3FCQUNoQixZQXFCUzs7O0tBR1AiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbHRpcENvbmZpZyB9IGZyb20gJy4vdG9vbHRpcC5jb25maWcnO1xuaW1wb3J0IHsgZ2V0QnNWZXIsIElCc1ZlcnNpb24gfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IFBsYWNlbWVudEZvckJzNSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdicy10b29sdGlwLWNvbnRhaW5lcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzpcbiAgICAgICdcInNob3cgdG9vbHRpcCBpbiB0b29sdGlwLVwiICsgcGxhY2VtZW50ICsgXCIgXCIgKyBcImJzLXRvb2x0aXAtXCIgKyBwbGFjZW1lbnQgKyBcIiBcIiArIHBsYWNlbWVudCArIFwiIFwiICsgY29udGFpbmVyQ2xhc3MnLFxuICAgICdbYXR0ci5pZF0nOiAndGhpcy5pZCcsXG4gICAgcm9sZTogJ3Rvb2x0aXAnXG4gIH0sXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdC50b29sdGlwIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICAgIDpob3N0LmJzMy50b29sdGlwLnRvcD4uYXJyb3cge1xuICAgICAgbWFyZ2luLWxlZnQ6IC0ycHg7XG4gICAgfVxuICAgIDpob3N0LmJzMy50b29sdGlwLmJvdHRvbSB7XG4gICAgICBtYXJnaW4tdG9wOiAwcHg7XG4gICAgfVxuICAgIDpob3N0LmJzMy5icy10b29sdGlwLWxlZnQsIDpob3N0LmJzMy5icy10b29sdGlwLXJpZ2h0e1xuICAgICAgbWFyZ2luOiAwcHg7XG4gICAgfVxuICAgIDpob3N0LmJzMy5icy10b29sdGlwLXJpZ2h0IC5hcnJvdywgOmhvc3QuYnMzLmJzLXRvb2x0aXAtbGVmdCAuYXJyb3cge1xuICAgICAgbWFyZ2luOiAuM3JlbSAwO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWFycm93IGFycm93XCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNsYXNzTWFwPzogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH07XG4gIHBsYWNlbWVudD86IHN0cmluZztcbiAgY29udGFpbmVyQ2xhc3M/OiBzdHJpbmc7XG4gIGFuaW1hdGlvbj86IGJvb2xlYW47XG4gIGlkPzogc3RyaW5nO1xuXG4gIGdldCBfYnNWZXJzaW9ucygpOiBJQnNWZXJzaW9uIHtcbiAgICByZXR1cm4gZ2V0QnNWZXIoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogVG9vbHRpcENvbmZpZykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsYXNzTWFwID0geyBpbjogZmFsc2UsIGZhZGU6IGZhbHNlIH07XG4gICAgaWYgKHRoaXMucGxhY2VtZW50KSB7XG4gICAgICBpZiAodGhpcy5fYnNWZXJzaW9ucy5pc0JzNSkge1xuICAgICAgICB0aGlzLnBsYWNlbWVudCA9ICBQbGFjZW1lbnRGb3JCczVbdGhpcy5wbGFjZW1lbnQgYXMga2V5b2YgdHlwZW9mIFBsYWNlbWVudEZvckJzNV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xhc3NNYXBbdGhpcy5wbGFjZW1lbnRdID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5jbGFzc01hcFtgdG9vbHRpcC0ke3RoaXMucGxhY2VtZW50fWBdID0gdHJ1ZTtcblxuICAgIHRoaXMuY2xhc3NNYXBbXCJpblwiXSA9IHRydWU7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLmNsYXNzTWFwW1wiZmFkZVwiXSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udGFpbmVyQ2xhc3MpIHtcbiAgICAgIHRoaXMuY2xhc3NNYXBbdGhpcy5jb250YWluZXJDbGFzc10gPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19