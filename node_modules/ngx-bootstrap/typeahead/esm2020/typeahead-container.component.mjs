import { ChangeDetectorRef, Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { Utils } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { Subscription } from 'rxjs';
import { latinize } from './typeahead-utils';
import { typeaheadAnimation } from './typeahead-animations';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/positioning";
import * as i2 from "@angular/common";
let nextWindowId = 0;
export class TypeaheadContainerComponent {
    constructor(positionService, renderer, element, changeDetectorRef) {
        this.positionService = positionService;
        this.renderer = renderer;
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        // eslint-disable-next-line @angular-eslint/no-output-rename
        this.activeChangeEvent = new EventEmitter();
        this.isFocused = false;
        this.positionServiceSubscription = new Subscription();
        this.height = 0;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._matches = [];
        this.renderer.setAttribute(this.element.nativeElement, 'id', this.popupId);
        this.positionServiceSubscription.add(this.positionService.event$?.subscribe(() => {
            if (this.isAnimated) {
                this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
                this.changeDetectorRef.detectChanges();
                return;
            }
            this.animationState = 'unanimated';
            this.changeDetectorRef.detectChanges();
        }));
    }
    get typeaheadTemplateMethods() {
        return {
            selectMatch: this.selectMatch.bind(this),
            selectActive: this.selectActive.bind(this),
            isActive: this.isActive.bind(this)
        };
    }
    get active() {
        return this._active;
    }
    set active(active) {
        this._active = active;
        this.activeChanged();
    }
    get matches() {
        return this._matches;
    }
    set matches(value) {
        this.positionService.setOptions({
            modifiers: { flip: { enabled: this.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._matches = value;
        this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
        if (this.typeaheadScrollable) {
            setTimeout(() => {
                this.setScrollableMode();
            });
        }
        if (this.typeaheadIsFirstItemActive && this._matches.length > 0) {
            this.setActive(this._matches[0]);
            if (this._active?.isHeader()) {
                this.nextActiveMatch();
            }
        }
        if (this._active && !this.typeaheadIsFirstItemActive) {
            const concurrency = this._matches.find(match => match.value === this._active?.value);
            if (concurrency) {
                this.selectActive(concurrency);
                return;
            }
            this.active = void 0;
        }
    }
    get isTopPosition() {
        return this.element.nativeElement.classList.contains('top');
    }
    get optionsListTemplate() {
        return this.parent ? this.parent.optionsListTemplate : undefined;
    }
    get isAnimated() {
        return this.parent ? this.parent.isAnimated : false;
    }
    get adaptivePosition() {
        return this.parent ? this.parent.adaptivePosition : false;
    }
    get typeaheadScrollable() {
        return this.parent ? this.parent.typeaheadScrollable : false;
    }
    get typeaheadOptionsInScrollableView() {
        return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
    }
    get typeaheadIsFirstItemActive() {
        return this.parent ? this.parent.typeaheadIsFirstItemActive : true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get itemTemplate() {
        return this.parent ? this.parent.typeaheadItemTemplate : undefined;
    }
    get canSelectItemsOnBlur() {
        return !!this.parent?.selectItemOnBlur;
    }
    selectActiveMatch(isActiveItemChanged) {
        if (this._active && this.parent?.typeaheadSelectFirstItem) {
            this.selectMatch(this._active);
        }
        if (!this.parent?.typeaheadSelectFirstItem && isActiveItemChanged) {
            this.selectMatch(this._active);
        }
    }
    activeChanged() {
        if (!this._active) {
            return;
        }
        const index = this.matches.indexOf(this._active);
        this.activeChangeEvent.emit(`${this.popupId}-${index}`);
    }
    prevActiveMatch() {
        if (!this._active) {
            return;
        }
        const index = this.matches.indexOf(this._active);
        this.setActive(this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1]);
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollPrevious(index);
        }
    }
    nextActiveMatch() {
        const index = this._active ? this.matches.indexOf(this._active) : -1;
        this.setActive(this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1]);
        if (this._active?.isHeader()) {
            this.nextActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollNext(index);
        }
    }
    selectActive(value) {
        this.isFocused = true;
        this.setActive(value);
    }
    highlight(match, query) {
        let itemStr = match.value;
        let itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        let startIdx;
        let tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            const queryLen = query.length;
            for (let i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                            `${itemStr.substring(startIdx + tokenLen)}`;
                    itemStrHelper =
                        `${itemStrHelper.substring(0, startIdx)}        ${' '.repeat(tokenLen)}         ` +
                            `${itemStrHelper.substring(startIdx + tokenLen)}`;
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr =
                    `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                        `${itemStr.substring(startIdx + tokenLen)}`;
            }
        }
        return itemStr;
    }
    focusLost() {
        this.isFocused = false;
        if (!this.canSelectItemsOnBlur) {
            this.setActive(void 0);
        }
    }
    isActive(value) {
        return this.active === value;
    }
    selectMatch(value, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.parent?.changeModel(value);
        setTimeout(() => this.parent?.typeaheadOnSelect.emit(value), 0);
        return false;
    }
    setScrollableMode() {
        if (!this.ulElement) {
            this.ulElement = this.element;
        }
        if (this.liElements?.first) {
            const ulStyles = Utils.getStyles(this.ulElement.nativeElement);
            const liStyles = Utils.getStyles(this.liElements.first.nativeElement);
            const ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '')
                .replace('px', ''));
            const ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0')
                .replace('px', ''));
            const optionHeight = parseFloat((liStyles.height ? liStyles.height : '0')
                .replace('px', ''));
            const height = this.typeaheadOptionsInScrollableView * optionHeight;
            this.guiHeight = `${height + ulPaddingTop + ulPaddingBottom}px`;
        }
        this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
    }
    scrollPrevious(index) {
        if (index === 0) {
            this.scrollToBottom();
            return;
        }
        if (this.liElements && this.ulElement) {
            const liElement = this.liElements.toArray()[index - 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
            }
        }
    }
    scrollNext(index) {
        if (index + 1 > this.matches.length - 1) {
            this.scrollToTop();
            return;
        }
        if (this.liElements && this.ulElement) {
            const liElement = this.liElements.toArray()[index + 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop =
                    liElement.nativeElement.offsetTop -
                        Number(this.ulElement.nativeElement.offsetHeight) +
                        Number(liElement.nativeElement.offsetHeight);
            }
        }
    }
    ngOnDestroy() {
        this.positionServiceSubscription.unsubscribe();
    }
    setActive(value) {
        this._active = value;
        let preview;
        if (!(this._active == null || this._active.isHeader())) {
            preview = value;
        }
        this.parent?.typeaheadOnPreview.emit(preview);
    }
    isScrolledIntoView(elem) {
        if (!this.ulElement) {
            return false;
        }
        const containerViewTop = this.ulElement.nativeElement.scrollTop;
        const containerViewBottom = containerViewTop + Number(this.ulElement.nativeElement.offsetHeight);
        const elemTop = elem.offsetTop;
        const elemBottom = elemTop + elem.offsetHeight;
        return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
    }
    ;
    scrollToBottom() {
        if (!this.ulElement?.nativeElement) {
            return;
        }
        this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
    }
    scrollToTop() {
        if (!this.ulElement?.nativeElement) {
            return;
        }
        this.ulElement.nativeElement.scrollTop = 0;
    }
}
TypeaheadContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: TypeaheadContainerComponent, deps: [{ token: i1.PositioningService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TypeaheadContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.3", type: TypeaheadContainerComponent, selector: "typeahead-container", outputs: { activeChangeEvent: "activeChange" }, host: { listeners: { "mouseleave": "focusLost()", "blur": "focusLost()" }, properties: { "style.height": "needScrollbar ? guiHeight: 'auto'", "style.visibility": "'inherit'", "class.dropup": "dropup", "attr.role": "'listbox'" }, styleAttribute: "position: absolute;display: block;", classAttribute: "dropdown open bottom dropdown-menu" }, viewQueries: [{ propertyName: "ulElement", first: true, predicate: ["ulElement"], descendants: true }, { propertyName: "liElements", predicate: ["liElements"], descendants: true }], ngImport: i0, template: "<!-- inject options list template -->\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || bs4Template\"\n             [ngTemplateOutletContext]=\"{\n               matches: matches,\n               itemTemplate: itemTemplate || bsItemTemplate,\n               query: query,\n               $implicit: typeaheadTemplateMethods\n             }\">\n</ng-template>\n\n<!-- default options item template -->\n<ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\">\n  <span [innerHtml]=\"highlight(match, query)\"></span>\n</ng-template>\n\n<!-- Bootstrap 4 options list template -->\n<ng-template #bs4Template>\n  <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n    <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6>\n    <ng-template [ngIf]=\"!match.isHeader()\">\n      <button #liElements\n              [id]=\"popupId + '-' + i\"\n              role=\"option\"\n              [@typeaheadAnimation]=\"animationState\"\n              class=\"dropdown-item\"\n              (click)=\"selectMatch(match, $event)\"\n              (mouseenter)=\"selectActive(match)\"\n              [class.active]=\"isActive(match)\">\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\n                     [ngTemplateOutletContext]=\"{item: match.item, index: i, match: match, query: query}\">\n        </ng-template>\n      </button>\n    </ng-template>\n  </ng-template>\n</ng-template>\n", styles: [":host.dropdown{z-index:1000}:host.dropdown-menu,.dropdown-menu{overflow-y:auto;height:100px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], animations: [typeaheadAnimation] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.3", ngImport: i0, type: TypeaheadContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'typeahead-container', host: {
                        class: 'dropdown open bottom dropdown-menu',
                        '[style.height]': `needScrollbar ? guiHeight: 'auto'`,
                        '[style.visibility]': `'inherit'`,
                        '[class.dropup]': 'dropup',
                        style: 'position: absolute;display: block;',
                        '[attr.role]': `'listbox'`
                    }, animations: [typeaheadAnimation], template: "<!-- inject options list template -->\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || bs4Template\"\n             [ngTemplateOutletContext]=\"{\n               matches: matches,\n               itemTemplate: itemTemplate || bsItemTemplate,\n               query: query,\n               $implicit: typeaheadTemplateMethods\n             }\">\n</ng-template>\n\n<!-- default options item template -->\n<ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\">\n  <span [innerHtml]=\"highlight(match, query)\"></span>\n</ng-template>\n\n<!-- Bootstrap 4 options list template -->\n<ng-template #bs4Template>\n  <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n    <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6>\n    <ng-template [ngIf]=\"!match.isHeader()\">\n      <button #liElements\n              [id]=\"popupId + '-' + i\"\n              role=\"option\"\n              [@typeaheadAnimation]=\"animationState\"\n              class=\"dropdown-item\"\n              (click)=\"selectMatch(match, $event)\"\n              (mouseenter)=\"selectActive(match)\"\n              [class.active]=\"isActive(match)\">\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\n                     [ngTemplateOutletContext]=\"{item: match.item, index: i, match: match, query: query}\">\n        </ng-template>\n      </button>\n    </ng-template>\n  </ng-template>\n</ng-template>\n", styles: [":host.dropdown{z-index:1000}:host.dropdown-menu,.dropdown-menu{overflow-y:auto;height:100px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.PositioningService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { activeChangeEvent: [{
                type: Output,
                args: ['activeChange']
            }], ulElement: [{
                type: ViewChild,
                args: ['ulElement', { static: false }]
            }], liElements: [{
                type: ViewChildren,
                args: ['liElements']
            }], focusLost: [{
                type: HostListener,
                args: ['mouseleave']
            }, {
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZWFoZWFkL3R5cGVhaGVhZC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBRVosU0FBUyxFQUNULFNBQVMsRUFFVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBRzVELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQTZCckIsTUFBTSxPQUFPLDJCQUEyQjtJQW9DdEMsWUFDVSxlQUFtQyxFQUNuQyxRQUFtQixFQUNwQixPQUFtQixFQUNsQixpQkFBb0M7UUFIcEMsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBQ25DLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNsQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBdkM5Qyw0REFBNEQ7UUFDcEMsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUkvRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBU2xCLGdDQUEyQixHQUFH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QkFEaEIsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUlqQyxVQUFVO3NCQURqQixZQUFZO3VCQUFDLFlBQVk7Z0JBK00xQixTQUFTO3NCQUZSLFlBQVk7dUJBQUMsWUFBWTs7c0JBQ3pCLFlBQVk7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGxhdGluaXplIH0gZnJvbSAnLi90eXBlYWhlYWQtdXRpbHMnO1xuaW1wb3J0IHsgVHlwZWFoZWFkTWF0Y2ggfSBmcm9tICcuL3R5cGVhaGVhZC1tYXRjaC5jbGFzcyc7XG5pbXBvcnQgeyBUeXBlYWhlYWREaXJlY3RpdmUgfSBmcm9tICcuL3R5cGVhaGVhZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgdHlwZWFoZWFkQW5pbWF0aW9uIH0gZnJvbSAnLi90eXBlYWhlYWQtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25JdGVtQ29udGV4dCwgVHlwZWFoZWFkT3B0aW9uTGlzdENvbnRleHQsIFR5cGVhaGVhZFRlbXBsYXRlTWV0aG9kcyB9IGZyb20gJy4vbW9kZWxzJztcblxubGV0IG5leHRXaW5kb3dJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3R5cGVhaGVhZC1jb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkcm9wZG93biBvcGVuIGJvdHRvbSBkcm9wZG93bi1tZW51JyxcbiAgICAnW3N0eWxlLmhlaWdodF0nOiBgbmVlZFNjcm9sbGJhciA/IGd1aUhlaWdodDogJ2F1dG8nYCxcbiAgICAnW3N0eWxlLnZpc2liaWxpdHldJzogYCdpbmhlcml0J2AsXG4gICAgJ1tjbGFzcy5kcm9wdXBdJzogJ2Ryb3B1cCcsXG4gICAgc3R5bGU6ICdwb3NpdGlvbjogYWJzb2x1dGU7ZGlzcGxheTogYmxvY2s7JyxcbiAgICAnW2F0dHIucm9sZV0nOiBgJ2xpc3Rib3gnYFxuICB9LFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgOmhvc3QuZHJvcGRvd24ge1xuICAgICAgei1pbmRleDogMTAwMDtcbiAgICB9XG5cbiAgICA6aG9zdC5kcm9wZG93bi1tZW51LCAuZHJvcGRvd24tbWVudSB7XG4gICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICB9XG4gIGBcbiAgXSxcbiAgYW5pbWF0aW9uczogW3R5cGVhaGVhZEFuaW1hdGlvbl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1yZW5hbWVcbiAgQE91dHB1dCgnYWN0aXZlQ2hhbmdlJykgYWN0aXZlQ2hhbmdlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcGFyZW50PzogVHlwZWFoZWFkRGlyZWN0aXZlO1xuICBxdWVyeT86IHN0cmluZ1tdIHwgc3RyaW5nO1xuICBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgdG9wPzogc3RyaW5nO1xuICBsZWZ0Pzogc3RyaW5nO1xuICBkaXNwbGF5Pzogc3RyaW5nO1xuICBwbGFjZW1lbj86IHN0cmluZztcbiAgZHJvcHVwPzogYm9vbGVhbjtcbiAgZ3VpSGVpZ2h0Pzogc3RyaW5nO1xuICBuZWVkU2Nyb2xsYmFyPzogYm9vbGVhbjtcbiAgYW5pbWF0aW9uU3RhdGU/OiBzdHJpbmc7XG4gIHBvc2l0aW9uU2VydmljZVN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgaGVpZ2h0ID0gMDtcbiAgcG9wdXBJZCA9IGBuZ2ItdHlwZWFoZWFkLSR7bmV4dFdpbmRvd0lkKyt9YDtcblxuICBnZXQgdHlwZWFoZWFkVGVtcGxhdGVNZXRob2RzKCk6IFR5cGVhaGVhZFRlbXBsYXRlTWV0aG9kcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdE1hdGNoOiB0aGlzLnNlbGVjdE1hdGNoLmJpbmQodGhpcyksXG4gICAgICBzZWxlY3RBY3RpdmU6IHRoaXMuc2VsZWN0QWN0aXZlLmJpbmQodGhpcyksXG4gICAgICBpc0FjdGl2ZTogdGhpcy5pc0FjdGl2ZS5iaW5kKHRoaXMpXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfYWN0aXZlPzogVHlwZWFoZWFkTWF0Y2g7XG4gIHByb3RlY3RlZCBfbWF0Y2hlczogVHlwZWFoZWFkTWF0Y2hbXSA9IFtdO1xuXG4gIEBWaWV3Q2hpbGQoJ3VsRWxlbWVudCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwcml2YXRlIHVsRWxlbWVudD86IEVsZW1lbnRSZWY7XG5cbiAgQFZpZXdDaGlsZHJlbignbGlFbGVtZW50cycpXG4gIHByaXZhdGUgbGlFbGVtZW50cz86IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBvc2l0aW9uU2VydmljZTogUG9zaXRpb25pbmdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2lkJywgdGhpcy5wb3B1cElkKTtcbiAgICB0aGlzLnBvc2l0aW9uU2VydmljZVN1YnNjcmlwdGlvbi5hZGQodGhpcy5wb3NpdGlvblNlcnZpY2UuZXZlbnQkPy5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0ZWQpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gdGhpcy5pc1RvcFBvc2l0aW9uID8gJ2FuaW1hdGVkLXVwJyA6ICdhbmltYXRlZC1kb3duJztcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAndW5hbmltYXRlZCc7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgICkpO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZSgpOiBUeXBlYWhlYWRNYXRjaCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIHNldCBhY3RpdmUoYWN0aXZlOiBUeXBlYWhlYWRNYXRjaCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcbiAgICB0aGlzLmFjdGl2ZUNoYW5nZWQoKTtcbiAgfVxuXG4gIGdldCBtYXRjaGVzKCk6IFR5cGVhaGVhZE1hdGNoW10ge1xuICAgIHJldHVybiB0aGlzLl9tYXRjaGVzO1xuICB9XG5cbiAgc2V0IG1hdGNoZXModmFsdWU6IFR5cGVhaGVhZE1hdGNoW10pIHtcbiAgICB0aGlzLnBvc2l0aW9uU2VydmljZS5zZXRPcHRpb25zKHtcbiAgICAgIG1vZGlmaWVyczogeyBmbGlwOiB7IGVuYWJsZWQ6IHRoaXMuYWRhcHRpdmVQb3NpdGlvbiB9IH0sXG4gICAgICBhbGxvd2VkUG9zaXRpb25zOiBbJ3RvcCcsICdib3R0b20nXVxuICAgIH0pO1xuXG4gICAgdGhpcy5fbWF0Y2hlcyA9IHZhbHVlO1xuXG4gICAgdGhpcy5uZWVkU2Nyb2xsYmFyID0gdGhpcy50eXBlYWhlYWRTY3JvbGxhYmxlICYmIHRoaXMudHlwZWFoZWFkT3B0aW9uc0luU2Nyb2xsYWJsZVZpZXcgPCB0aGlzLm1hdGNoZXMubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkU2Nyb2xsYWJsZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U2Nyb2xsYWJsZU1vZGUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGVhaGVhZElzRmlyc3RJdGVtQWN0aXZlICYmIHRoaXMuX21hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRBY3RpdmUodGhpcy5fbWF0Y2hlc1swXSk7XG5cbiAgICAgIGlmICh0aGlzLl9hY3RpdmU/LmlzSGVhZGVyKCkpIHtcbiAgICAgICAgdGhpcy5uZXh0QWN0aXZlTWF0Y2goKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYWN0aXZlICYmICF0aGlzLnR5cGVhaGVhZElzRmlyc3RJdGVtQWN0aXZlKSB7XG4gICAgICBjb25zdCBjb25jdXJyZW5jeSA9IHRoaXMuX21hdGNoZXMuZmluZChtYXRjaCA9PiBtYXRjaC52YWx1ZSA9PT0gdGhpcy5fYWN0aXZlPy52YWx1ZSk7XG5cbiAgICAgIGlmIChjb25jdXJyZW5jeSkge1xuICAgICAgICB0aGlzLnNlbGVjdEFjdGl2ZShjb25jdXJyZW5jeSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZSA9IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNUb3BQb3NpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b3AnKTtcbiAgfVxuXG4gIGdldCBvcHRpb25zTGlzdFRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPFR5cGVhaGVhZE9wdGlvbkxpc3RDb250ZXh0PiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQub3B0aW9uc0xpc3RUZW1wbGF0ZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCBpc0FuaW1hdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmlzQW5pbWF0ZWQgOiBmYWxzZTtcbiAgfVxuXG4gIGdldCBhZGFwdGl2ZVBvc2l0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmFkYXB0aXZlUG9zaXRpb24gOiBmYWxzZTtcbiAgfVxuXG4gIGdldCB0eXBlYWhlYWRTY3JvbGxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnR5cGVhaGVhZFNjcm9sbGFibGUgOiBmYWxzZTtcbiAgfVxuXG4gIGdldCB0eXBlYWhlYWRPcHRpb25zSW5TY3JvbGxhYmxlVmlldygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnR5cGVhaGVhZE9wdGlvbnNJblNjcm9sbGFibGVWaWV3IDogNTtcbiAgfVxuXG4gIGdldCB0eXBlYWhlYWRJc0ZpcnN0SXRlbUFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC50eXBlYWhlYWRJc0ZpcnN0SXRlbUFjdGl2ZSA6IHRydWU7XG4gIH1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgZ2V0IGl0ZW1UZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxUeXBlYWhlYWRPcHRpb25JdGVtQ29udGV4dD4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnR5cGVhaGVhZEl0ZW1UZW1wbGF0ZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCBjYW5TZWxlY3RJdGVtc09uQmx1cigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnBhcmVudD8uc2VsZWN0SXRlbU9uQmx1cjtcbiAgfVxuXG4gIHNlbGVjdEFjdGl2ZU1hdGNoKGlzQWN0aXZlSXRlbUNoYW5nZWQ/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZSAmJiB0aGlzLnBhcmVudD8udHlwZWFoZWFkU2VsZWN0Rmlyc3RJdGVtKSB7XG4gICAgICB0aGlzLnNlbGVjdE1hdGNoKHRoaXMuX2FjdGl2ZSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnBhcmVudD8udHlwZWFoZWFkU2VsZWN0Rmlyc3RJdGVtICYmIGlzQWN0aXZlSXRlbUNoYW5nZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0TWF0Y2godGhpcy5fYWN0aXZlKTtcbiAgICB9XG4gIH1cblxuICBhY3RpdmVDaGFuZ2VkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5fYWN0aXZlKTtcbiAgICB0aGlzLmFjdGl2ZUNoYW5nZUV2ZW50LmVtaXQoYCR7dGhpcy5wb3B1cElkfS0ke2luZGV4fWApO1xuICB9XG5cbiAgcHJldkFjdGl2ZU1hdGNoKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLl9hY3RpdmUpO1xuICAgIHRoaXMuc2V0QWN0aXZlKHRoaXMubWF0Y2hlc1tcbiAgICAgIGluZGV4IC0gMSA8IDAgPyB0aGlzLm1hdGNoZXMubGVuZ3RoIC0gMSA6IGluZGV4IC0gMVxuICAgICAgXSk7XG5cbiAgICBpZiAodGhpcy5fYWN0aXZlLmlzSGVhZGVyKCkpIHtcbiAgICAgIHRoaXMucHJldkFjdGl2ZU1hdGNoKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkU2Nyb2xsYWJsZSkge1xuICAgICAgdGhpcy5zY3JvbGxQcmV2aW91cyhpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dEFjdGl2ZU1hdGNoKCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fYWN0aXZlID8gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5fYWN0aXZlKSA6IC0xO1xuICAgIHRoaXMuc2V0QWN0aXZlKHRoaXMubWF0Y2hlc1tcbiAgICAgIGluZGV4ICsgMSA+IHRoaXMubWF0Y2hlcy5sZW5ndGggLSAxID8gMCA6IGluZGV4ICsgMVxuICAgICAgXSk7XG5cbiAgICBpZiAodGhpcy5fYWN0aXZlPy5pc0hlYWRlcigpKSB7XG4gICAgICB0aGlzLm5leHRBY3RpdmVNYXRjaCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGVhaGVhZFNjcm9sbGFibGUpIHtcbiAgICAgIHRoaXMuc2Nyb2xsTmV4dChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0QWN0aXZlKHZhbHVlOiBUeXBlYWhlYWRNYXRjaCk6IHZvaWQge1xuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnNldEFjdGl2ZSh2YWx1ZSk7XG4gIH1cblxuICBoaWdobGlnaHQobWF0Y2g6IFR5cGVhaGVhZE1hdGNoLCBxdWVyeTogc3RyaW5nW10gfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBpdGVtU3RyOiBzdHJpbmcgPSBtYXRjaC52YWx1ZTtcbiAgICBsZXQgaXRlbVN0ckhlbHBlcjogc3RyaW5nID0gKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnR5cGVhaGVhZExhdGluaXplXG4gICAgICA/IGxhdGluaXplKGl0ZW1TdHIpXG4gICAgICA6IGl0ZW1TdHIpLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHN0YXJ0SWR4OiBudW1iZXI7XG4gICAgbGV0IHRva2VuTGVuOiBudW1iZXI7XG4gICAgLy8gUmVwbGFjZXMgdGhlIGNhcHR1cmUgc3RyaW5nIHdpdGggdGhlIHNhbWUgc3RyaW5nIGluc2lkZSBvZiBhIFwic3Ryb25nXCIgdGFnXG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHF1ZXJ5TGVuOiBudW1iZXIgPSBxdWVyeS5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXJ5TGVuOyBpICs9IDEpIHtcbiAgICAgICAgLy8gcXVlcnlbaV0gaXMgYWxyZWFkeSBsYXRpbml6ZWQgYW5kIGxvd2VyIGNhc2VcbiAgICAgICAgc3RhcnRJZHggPSBpdGVtU3RySGVscGVyLmluZGV4T2YocXVlcnlbaV0pO1xuICAgICAgICB0b2tlbkxlbiA9IHF1ZXJ5W2ldLmxlbmd0aDtcbiAgICAgICAgaWYgKHN0YXJ0SWR4ID49IDAgJiYgdG9rZW5MZW4gPiAwKSB7XG4gICAgICAgICAgaXRlbVN0ciA9XG4gICAgICAgICAgICBgJHtpdGVtU3RyLnN1YnN0cmluZygwLCBzdGFydElkeCl9PHN0cm9uZz4ke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4LCBzdGFydElkeCArIHRva2VuTGVuKX08L3N0cm9uZz5gICtcbiAgICAgICAgICAgIGAke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4ICsgdG9rZW5MZW4pfWA7XG4gICAgICAgICAgaXRlbVN0ckhlbHBlciA9XG4gICAgICAgICAgICBgJHtpdGVtU3RySGVscGVyLnN1YnN0cmluZygwLCBzdGFydElkeCl9ICAgICAgICAkeycgJy5yZXBlYXQodG9rZW5MZW4pfSAgICAgICAgIGAgK1xuICAgICAgICAgICAgYCR7aXRlbVN0ckhlbHBlci5zdWJzdHJpbmcoc3RhcnRJZHggKyB0b2tlbkxlbil9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocXVlcnkpIHtcbiAgICAgIC8vIHF1ZXJ5IGlzIGFscmVhZHkgbGF0aW5pemVkIGFuZCBsb3dlciBjYXNlXG4gICAgICBzdGFydElkeCA9IGl0ZW1TdHJIZWxwZXIuaW5kZXhPZihxdWVyeSk7XG4gICAgICB0b2tlbkxlbiA9IHF1ZXJ5Lmxlbmd0aDtcbiAgICAgIGlmIChzdGFydElkeCA+PSAwICYmIHRva2VuTGVuID4gMCkge1xuICAgICAgICBpdGVtU3RyID1cbiAgICAgICAgICBgJHtpdGVtU3RyLnN1YnN0cmluZygwLCBzdGFydElkeCl9PHN0cm9uZz4ke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4LCBzdGFydElkeCArIHRva2VuTGVuKX08L3N0cm9uZz5gICtcbiAgICAgICAgICBgJHtpdGVtU3RyLnN1YnN0cmluZyhzdGFydElkeCArIHRva2VuTGVuKX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVtU3RyO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBmb2N1c0xvc3QoKTogdm9pZCB7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuY2FuU2VsZWN0SXRlbXNPbkJsdXIpIHtcbiAgICAgIHRoaXMuc2V0QWN0aXZlKHZvaWQgMCk7XG4gICAgfVxuICB9XG5cbiAgaXNBY3RpdmUodmFsdWU6IFR5cGVhaGVhZE1hdGNoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlID09PSB2YWx1ZTtcbiAgfVxuXG4gIHNlbGVjdE1hdGNoKHZhbHVlPzogVHlwZWFoZWFkTWF0Y2gsIGV2ZW50PzogRXZlbnQpOiBib29sZWFuIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQ/LmNoYW5nZU1vZGVsKHZhbHVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGFyZW50Py50eXBlYWhlYWRPblNlbGVjdC5lbWl0KHZhbHVlKSwgMCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzZXRTY3JvbGxhYmxlTW9kZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudWxFbGVtZW50KSB7XG4gICAgICB0aGlzLnVsRWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5saUVsZW1lbnRzPy5maXJzdCkge1xuICAgICAgY29uc3QgdWxTdHlsZXMgPSBVdGlscy5nZXRTdHlsZXModGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICBjb25zdCBsaVN0eWxlcyA9IFV0aWxzLmdldFN0eWxlcyh0aGlzLmxpRWxlbWVudHMuZmlyc3QubmF0aXZlRWxlbWVudCk7XG4gICAgICBjb25zdCB1bFBhZGRpbmdCb3R0b20gPSBwYXJzZUZsb2F0KCh1bFN0eWxlc1sncGFkZGluZy1ib3R0b20nXSA/IHVsU3R5bGVzWydwYWRkaW5nLWJvdHRvbSddIDogJycpXG4gICAgICAgIC5yZXBsYWNlKCdweCcsICcnKSk7XG4gICAgICBjb25zdCB1bFBhZGRpbmdUb3AgPSBwYXJzZUZsb2F0KCh1bFN0eWxlc1sncGFkZGluZy10b3AnXSA/IHVsU3R5bGVzWydwYWRkaW5nLXRvcCddIDogJzAnKVxuICAgICAgICAucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgY29uc3Qgb3B0aW9uSGVpZ2h0ID0gcGFyc2VGbG9hdCgobGlTdHlsZXMuaGVpZ2h0ID8gbGlTdHlsZXMuaGVpZ2h0IDogJzAnKVxuICAgICAgICAucmVwbGFjZSgncHgnLCAnJykpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy50eXBlYWhlYWRPcHRpb25zSW5TY3JvbGxhYmxlVmlldyAqIG9wdGlvbkhlaWdodDtcbiAgICAgIHRoaXMuZ3VpSGVpZ2h0ID0gYCR7aGVpZ2h0ICsgdWxQYWRkaW5nVG9wICsgdWxQYWRkaW5nQm90dG9tfXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG4gIH1cblxuICBzY3JvbGxQcmV2aW91cyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMubGlFbGVtZW50cyAmJiB0aGlzLnVsRWxlbWVudCkge1xuICAgICAgY29uc3QgbGlFbGVtZW50ID0gdGhpcy5saUVsZW1lbnRzLnRvQXJyYXkoKVtpbmRleCAtIDFdO1xuICAgICAgaWYgKGxpRWxlbWVudCAmJiAhdGhpcy5pc1Njcm9sbGVkSW50b1ZpZXcobGlFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgIHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gbGlFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNjcm9sbE5leHQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpbmRleCArIDEgPiB0aGlzLm1hdGNoZXMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmxpRWxlbWVudHMgJiYgdGhpcy51bEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGxpRWxlbWVudCA9IHRoaXMubGlFbGVtZW50cy50b0FycmF5KClbaW5kZXggKyAxXTtcbiAgICAgIGlmIChsaUVsZW1lbnQgJiYgIXRoaXMuaXNTY3JvbGxlZEludG9WaWV3KGxpRWxlbWVudC5uYXRpdmVFbGVtZW50KSkge1xuICAgICAgICB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9XG4gICAgICAgICAgbGlFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wIC1cbiAgICAgICAgICBOdW1iZXIodGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpICtcbiAgICAgICAgICBOdW1iZXIobGlFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnBvc2l0aW9uU2VydmljZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldEFjdGl2ZSh2YWx1ZT86IFR5cGVhaGVhZE1hdGNoKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlID0gdmFsdWU7XG4gICAgbGV0IHByZXZpZXc7XG4gICAgaWYgKCEodGhpcy5fYWN0aXZlID09IG51bGwgfHwgdGhpcy5fYWN0aXZlLmlzSGVhZGVyKCkpKSB7XG4gICAgICBwcmV2aWV3ID0gdmFsdWU7XG4gICAgfVxuICAgIHRoaXMucGFyZW50Py50eXBlYWhlYWRPblByZXZpZXcuZW1pdChwcmV2aWV3KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTY3JvbGxlZEludG9WaWV3KGVsZW06IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnVsRWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjb250YWluZXJWaWV3VG9wOiBudW1iZXIgPSB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBjb25zdCBjb250YWluZXJWaWV3Qm90dG9tID0gY29udGFpbmVyVmlld1RvcCArIE51bWJlcih0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgY29uc3QgZWxlbVRvcCA9IGVsZW0ub2Zmc2V0VG9wO1xuICAgIGNvbnN0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgZWxlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICByZXR1cm4gKChlbGVtQm90dG9tIDw9IGNvbnRhaW5lclZpZXdCb3R0b20pICYmIChlbGVtVG9wID49IGNvbnRhaW5lclZpZXdUb3ApKTtcbiAgfTtcblxuICBwcml2YXRlIHNjcm9sbFRvQm90dG9tKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy51bEVsZW1lbnQ/Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9Ub3AoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnVsRWxlbWVudD8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gIH1cbn1cbiIsIjwhLS0gaW5qZWN0IG9wdGlvbnMgbGlzdCB0ZW1wbGF0ZSAtLT5cbjxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJvcHRpb25zTGlzdFRlbXBsYXRlIHx8IGJzNFRlbXBsYXRlXCJcbiAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICAgICAgICAgbWF0Y2hlczogbWF0Y2hlcyxcbiAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogaXRlbVRlbXBsYXRlIHx8IGJzSXRlbVRlbXBsYXRlLFxuICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgJGltcGxpY2l0OiB0eXBlYWhlYWRUZW1wbGF0ZU1ldGhvZHNcbiAgICAgICAgICAgICB9XCI+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIGRlZmF1bHQgb3B0aW9ucyBpdGVtIHRlbXBsYXRlIC0tPlxuPG5nLXRlbXBsYXRlICNic0l0ZW1UZW1wbGF0ZSBsZXQtbWF0Y2g9XCJtYXRjaFwiIGxldC1xdWVyeT1cInF1ZXJ5XCI+XG4gIDxzcGFuIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0KG1hdGNoLCBxdWVyeSlcIj48L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIEJvb3RzdHJhcCA0IG9wdGlvbnMgbGlzdCB0ZW1wbGF0ZSAtLT5cbjxuZy10ZW1wbGF0ZSAjYnM0VGVtcGxhdGU+XG4gIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtbWF0Y2ggbGV0LWk9XCJpbmRleFwiIFtuZ0Zvck9mXT1cIm1hdGNoZXNcIj5cbiAgICA8aDYgKm5nSWY9XCJtYXRjaC5pc0hlYWRlcigpXCIgY2xhc3M9XCJkcm9wZG93bi1oZWFkZXJcIj57eyBtYXRjaCB9fTwvaDY+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFtYXRjaC5pc0hlYWRlcigpXCI+XG4gICAgICA8YnV0dG9uICNsaUVsZW1lbnRzXG4gICAgICAgICAgICAgIFtpZF09XCJwb3B1cElkICsgJy0nICsgaVwiXG4gICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgICBbQHR5cGVhaGVhZEFuaW1hdGlvbl09XCJhbmltYXRpb25TdGF0ZVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RNYXRjaChtYXRjaCwgJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxuICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlKG1hdGNoKVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbVRlbXBsYXRlIHx8IGJzSXRlbVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTogbWF0Y2guaXRlbSwgaW5kZXg6IGksIG1hdGNoOiBtYXRjaCwgcXVlcnk6IHF1ZXJ5fVwiPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=