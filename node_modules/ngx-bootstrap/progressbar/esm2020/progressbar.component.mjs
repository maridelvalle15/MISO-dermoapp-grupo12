import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import * as i0 from "@angular/core";
import * as i1 from "./progressbar.config";
import * as i2 from "@angular/common";
import * as i3 from "./bar.component";
export class ProgressbarComponent {
    constructor(config) {
        /** maximum total value of progress element */
        this.max = 100;
        /** if `true` changing value of progress bar will be animated */
        this.animate = false;
        /** If `true`, striped classes are applied */
        this.striped = false;
        this.isStacked = false;
        this._value = 0;
        Object.assign(this, config);
    }
    /** current value of progress bar. Could be a number or array of objects
     * like {"value":15,"type":"info","label":"15 %"}
     */
    set value(value) {
        this.isStacked = Array.isArray(value);
        if (typeof value === 'number') {
            this._value = value;
            this._values = void 0;
        }
        else {
            this._value = void 0;
            this._values = value;
        }
    }
}
ProgressbarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: ProgressbarComponent, deps: [{ token: i1.ProgressbarConfig }], target: i0.ɵɵFactoryTarget.Component });
ProgressbarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: ProgressbarComponent, selector: "progressbar", inputs: { max: "max", animate: "animate", striped: "striped", type: "type", value: "value" }, host: { properties: { "class.progress": "true", "attr.max": "max" } }, ngImport: i0, template: "<ng-container *ngIf=\"!isStacked then NotStacked else Stacked\"></ng-container>\n\n<ng-template #NotStacked>\n  <bar [type]=\"type\" [value]=\"_value\" [max]=\"max\" [animate]=\"animate\" [striped]=\"striped\">\n    <ng-content></ng-content>\n  </bar>\n</ng-template>\n\n<ng-template #Stacked>\n  <bar *ngFor=\"let item of _values\"\n       [type]=\"item.type\" [value]=\"item.value\" [max]=\"item.max || max\" [animate]=\"animate\" [striped]=\"striped\">{{ item.label }}</bar>\n</ng-template>\n", styles: [":host{width:100%;display:flex}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.BarComponent, selector: "bar", inputs: ["max", "value", "animate", "striped", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: ProgressbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'progressbar', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.progress]': 'true',
                        '[attr.max]': 'max'
                    }, template: "<ng-container *ngIf=\"!isStacked then NotStacked else Stacked\"></ng-container>\n\n<ng-template #NotStacked>\n  <bar [type]=\"type\" [value]=\"_value\" [max]=\"max\" [animate]=\"animate\" [striped]=\"striped\">\n    <ng-content></ng-content>\n  </bar>\n</ng-template>\n\n<ng-template #Stacked>\n  <bar *ngFor=\"let item of _values\"\n       [type]=\"item.type\" [value]=\"item.value\" [max]=\"item.max || max\" [animate]=\"animate\" [striped]=\"striped\">{{ item.label }}</bar>\n</ng-template>\n", styles: [":host{width:100%;display:flex}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ProgressbarConfig }]; }, propDecorators: { max: [{
                type: Input
            }], animate: [{
                type: Input
            }], striped: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFpQnpELE1BQU0sT0FBTyxvQkFBb0I7SUFnQy9CLFlBQVksTUFBeUI7UUEvQnJDLDhDQUE4QztRQUNyQyxRQUFHLEdBQUcsR0FBRyxDQUFDO1FBRW5CLGdFQUFnRTtRQUN2RCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXpCLDZDQUE2QztRQUNwQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBb0J6QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFdBQU0sR0FBSSxDQUFDLENBQUM7UUFJVixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBckJEOztPQUVHO0lBQ0gsSUFDSSxLQUFLLENBQUMsS0FBMEI7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDdEI7SUFDSCxDQUFDOztpSEExQlUsb0JBQW9CO3FHQUFwQixvQkFBb0Isd05DbkJqQyxpZkFZQTsyRkRPYSxvQkFBb0I7a0JBZmhDLFNBQVM7K0JBQ0UsYUFBYSxtQkFFTix1QkFBdUIsQ0FBQyxNQUFNLFFBRXpDO3dCQUNKLGtCQUFrQixFQUFFLE1BQU07d0JBQzFCLFlBQVksRUFBRSxLQUFLO3FCQUNwQjt3R0FTUSxHQUFHO3NCQUFYLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBTUYsS0FBSztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhclZhbHVlLCBQcm9ncmVzc2JhclR5cGUgfSBmcm9tICcuL3Byb2dyZXNzYmFyLXR5cGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFByb2dyZXNzYmFyQ29uZmlnIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwcm9ncmVzc2JhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9ncmVzc2Jhci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgICdbY2xhc3MucHJvZ3Jlc3NdJzogJ3RydWUnLFxuICAgICdbYXR0ci5tYXhdJzogJ21heCdcbiAgfSxcbiAgc3R5bGVzOiBbYFxuICAgIDpob3N0IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9IGBdXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzYmFyQ29tcG9uZW50IHtcbiAgLyoqIG1heGltdW0gdG90YWwgdmFsdWUgb2YgcHJvZ3Jlc3MgZWxlbWVudCAqL1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG5cbiAgLyoqIGlmIGB0cnVlYCBjaGFuZ2luZyB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgd2lsbCBiZSBhbmltYXRlZCAqL1xuICBASW5wdXQoKSBhbmltYXRlID0gZmFsc2U7XG5cbiAgLyoqIElmIGB0cnVlYCwgc3RyaXBlZCBjbGFzc2VzIGFyZSBhcHBsaWVkICovXG4gIEBJbnB1dCgpIHN0cmlwZWQgPSBmYWxzZTtcblxuICAvKiogcHJvdmlkZSBvbmUgb2YgdGhlIGZvdXIgc3VwcG9ydGVkIGNvbnRleHR1YWwgY2xhc3NlczogYHN1Y2Nlc3NgLCBgaW5mb2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAgKi9cbiAgQElucHV0KCkgdHlwZT86IFByb2dyZXNzYmFyVHlwZTtcblxuICAvKiogY3VycmVudCB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIuIENvdWxkIGJlIGEgbnVtYmVyIG9yIGFycmF5IG9mIG9iamVjdHNcbiAgICogbGlrZSB7XCJ2YWx1ZVwiOjE1LFwidHlwZVwiOlwiaW5mb1wiLFwibGFiZWxcIjpcIjE1ICVcIn1cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyIHwgQmFyVmFsdWVbXSkge1xuICAgIHRoaXMuaXNTdGFja2VkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZXMgPSB2b2lkIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdm9pZCAwO1xuICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgaXNTdGFja2VkID0gZmFsc2U7XG4gIF92YWx1ZT8gPSAwO1xuICBfdmFsdWVzPzogQmFyVmFsdWVbXTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IFByb2dyZXNzYmFyQ29uZmlnKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzU3RhY2tlZCB0aGVuIE5vdFN0YWNrZWQgZWxzZSBTdGFja2VkXCI+PC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjTm90U3RhY2tlZD5cbiAgPGJhciBbdHlwZV09XCJ0eXBlXCIgW3ZhbHVlXT1cIl92YWx1ZVwiIFttYXhdPVwibWF4XCIgW2FuaW1hdGVdPVwiYW5pbWF0ZVwiIFtzdHJpcGVkXT1cInN0cmlwZWRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvYmFyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNTdGFja2VkPlxuICA8YmFyICpuZ0Zvcj1cImxldCBpdGVtIG9mIF92YWx1ZXNcIlxuICAgICAgIFt0eXBlXT1cIml0ZW0udHlwZVwiIFt2YWx1ZV09XCJpdGVtLnZhbHVlXCIgW21heF09XCJpdGVtLm1heCB8fCBtYXhcIiBbYW5pbWF0ZV09XCJhbmltYXRlXCIgW3N0cmlwZWRdPVwic3RyaXBlZFwiPnt7IGl0ZW0ubGFiZWwgfX08L2Jhcj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=