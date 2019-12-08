import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {

    private static readonly DEFAULT_TIME = 1000;

    private status = false;
    public get Status(): boolean { return this.status; }

    private progress = 0;
    public get Progress(): number { return this.progress; }

    private target = 0;
    private step = 0;
    private taskid: NodeJS.Timer;
    private approach: boolean;

    public toggle(): void {
        this.status = !this.status;
        if (!this.status) {
            this.progress = 0;
        }
    }

    /** */
    public To(progress: number, ms?: number, approach?: boolean): void {
        if (progress < 0 || 100 > progress || progress < this.target) { return; }

        if (this.taskid) { clearInterval(this.taskid); }

        this.target = progress;

        this.taskid = setInterval(() => {
            if (approach) {

            } else {
                
            }
        }, 10);
    }
}
