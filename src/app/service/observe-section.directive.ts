import { Directive, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[observeSection]'
})
export class ObserveSectionDirective implements AfterViewInit {
    @Output() sectionInView = new EventEmitter<string>();

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const id = this.el.nativeElement.getAttribute('id');
                    this.sectionInView.emit(id);
                }
            },
            {
                threshold: 0.6 // Adjust sensitivity
            }
        );

        observer.observe(this.el.nativeElement);
    }
}
