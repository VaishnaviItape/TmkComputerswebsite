import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private isDarkTheme = true;

    constructor() {
        const savedTheme = localStorage.getItem('tmk-theme');
        this.isDarkTheme = savedTheme === 'dark' || !savedTheme;
        this.applyTheme();
    }

    toggleTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
        localStorage.setItem('tmk-theme', this.isDarkTheme ? 'dark' : 'light');
        this.applyTheme();
    }

    get currentTheme(): 'dark' | 'light' {
        return this.isDarkTheme ? 'dark' : 'light';
    }

    private applyTheme(): void {
        const body = document.body;
        if (this.isDarkTheme) {
            body.classList.add('tmk-dark');
            body.classList.remove('tmk-light');
        } else {
            body.classList.add('tmk-light');
            body.classList.remove('tmk-dark');
        }
    }
}
