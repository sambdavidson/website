import { BackgroundModule } from '../backgroundModules';

interface SquareFrameStyle {
    (frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number, hueRange: number, hueOffset: number): string
}

export class Pattern implements BackgroundModule {
    public static IsMobileFriendly = true;
    public static IsPoorConnectionFriendly = true;
    public static IconTooltip = 'Colorful Pixel Background';
    public static IconFontAwesomeHTML = `<i class="fas fa-th"></i>`;

    // Static
    private styles: [SquareFrameStyle, string][] = [];
    private buttons: HTMLTableElement | null;
    private canvas: HTMLCanvasElement | null;
    private ctx: CanvasRenderingContext2D;
    private buttonContainerTable: HTMLTableElement;
    private boundFrame: ()=>void;
    private activeAlgorithmName: HTMLTableDataCellElement;

    // Animation State
    private frameNumber: number = 0;
    private activeStyle: number = 0;
    private squareSize: number = 20;
    private hueRange: number = 100;
    private hueOffset: number = 200;
    private tornDown: boolean = false;

    public constructor() {
        /* CANVAS */
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            background-color: black;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        `;
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        document.body.appendChild(this.canvas);

        /* ANIMATION FRAMES */
        this.styles = [
            [Pattern.Swirl, 'wrl'],
            [Pattern.Diamond, 'dai'],
            [Pattern.coloredStatic, 'stc'],
            [Pattern.cyclingRangePatterns, 'czy'],
        ];
        this.activeStyle = Math.floor(Math.random() * this.styles.length);
        this.boundFrame = this.renderActiveFrame.bind(this);

        /* BUTTONS */
        this.buttons = this.createButtonContainer();
        document.body.appendChild(this.buttons);

        window.requestAnimationFrame(this.boundFrame);

    }

    public PortraitBonus() {
        const origSize = this.squareSize;
        const startFrame = this.frameNumber;
        let f = () => {
            this.squareSize  = origSize + Math.abs(Math.sin((this.frameNumber - startFrame) / 600) * 200);
            window.requestAnimationFrame(f);
        };
        window.requestAnimationFrame(f);
    }

    public TearDown() {
        this.tornDown = true;
        this.canvas.parentElement.removeChild(this.canvas);
        this.buttons.parentElement.removeChild(this.buttons);
        this.canvas = null;
        this.buttons = null;
        this.ctx = null;
        this.activeAlgorithmName = null;

    }

    private checkedForBoringRender: boolean = false;
    private renderActiveFrame() {
        if (this.tornDown) {
            return;
        }
        this.frameNumber++;
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.fillStyle = '#5a6476';
        const unitsWide = Math.ceil(w / this.squareSize);
        const unitsHigh = Math.ceil(h / this.squareSize);
        let changed = false;
        let lastStyle = "";
        for (let i = 0; i < unitsWide; i++) {
            for (let j = 0; j < unitsHigh; j++) {
                let newStyle = this.styles[this.activeStyle][0](this.frameNumber, w, h, this.squareSize, i, j, this.hueRange, this.hueOffset);
                if (lastStyle == "") {
                    lastStyle = newStyle;
                } else if (lastStyle != newStyle) {
                    changed = true;
                }
                this.ctx.fillStyle = newStyle;
                this.ctx.fillRect(this.squareSize * i, this.squareSize * j, this.squareSize, this.squareSize);
            }
        }
        // Check if this initial render is boring (all one color)
        if (this.styles[this.activeStyle][0] == Pattern.cyclingRangePatterns && !this.checkedForBoringRender) {
            this.checkedForBoringRender = true;
            if (!changed) { // If it was boring (no change in color), lets tweak the range.
                this.hueRange = Math.min(360, Math.max(30, (this.hueRange - 10)));
            }
        }
        window.requestAnimationFrame(this.boundFrame);
    }

    static Swirl(frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number, hueRange: number, hueOffset: number): string {
        const squaresWide = Math.ceil(width / squareSize);
        const offsetWidth = Math.abs((squaresWide/2) - xIndex);
        const offset = frame + (offsetWidth * yIndex);
        return `hsl(${hueOffset + (offset % hueRange)}, 100%, 50%)`;
    }

    static Diamond(frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number, hueRange: number, hueOffset: number): string {
        const wOffset = Math.abs((xIndex*squareSize) - (width/2)) / width;
        const hOffset = Math.abs((yIndex*squareSize) - (height/2)) / height;
        const offset = frame + (hOffset * height) + (wOffset * width);
        return `hsl(${hueOffset + (offset % hueRange)}, 100%, 50%)`;
    }

    static coloredStatic(frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number, hueRange: number, hueOffset: number): string {
        const hue = Math.floor(Math.random() * 360);
        let saturation = '15%';
        let lightness = '15%';
        if (Math.random() < 0.001) {
            saturation = '100%';
            lightness = '25%';
        }
        return `hsl(${hueOffset + (hue % hueRange)}, ${saturation}, ${lightness})`;
    }

    static cyclingRangePatterns(frame: number, width: number, height: number, squareSize: number, xIndex: number, yIndex: number, hueRange: number, hueOffset: number): string {
        const xOffset = Math.abs((xIndex * squareSize) - (width/2));
        const yOffset = yIndex * squareSize;
        const offset = (xOffset*xOffset) + (yOffset*yOffset);
        let hue =  (hueOffset + ((offset + frame) % hueRange));
        return `hsl(${hue}, 90%, 50%)`;
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight
    }

    private createButtonContainer(): HTMLTableElement {
        const rangeRow = Pattern.buildValueTableRow(
            this.hueRange.toString(),
            `RANGE of background:\thue = offset + (x % RANGE);`,
            ()=>{
                this.hueRange = Math.min(360, Math.max(30, (this.hueRange + 10)));
                return this.hueRange.toString();
            },
            ()=>{
                this.hueRange = Math.min(360, Math.max(30, (this.hueRange - 10)));
                return this.hueRange.toString();
            });
        const offsetRow = Pattern.buildValueTableRow(
            this.hueOffset.toString(),
            `OFFSET of background:\thue = OFFSET + (x % range);`,
            ()=>{
                this.hueOffset = Math.min(350, Math.max(0, (this.hueOffset + 10)));
                return this.hueOffset.toString();
            },
            ()=>{
                this.hueOffset = Math.min(350, Math.max(0, (this.hueOffset - 10)));
                return this.hueOffset.toString();
            });

        const cycleRight = document.createElement('td');
        cycleRight.title = 'Next color pattern';
        cycleRight.innerHTML = `<i class="fas fa-chevron-right"></i>`;
        cycleRight.addEventListener('click', () => {
            this.activeStyle = (this.activeStyle + 1) % this.styles.length;
            this.activeAlgorithmName.innerText = this.styles[this.activeStyle][1];
        });
        const cycleLeft = document.createElement('td');
        cycleLeft.title = 'Previous pixel render algorithm';
        cycleLeft.innerHTML = `<i class="fas fa-chevron-left"></i>`;
        cycleLeft.addEventListener('click', () => {
            this.activeStyle = this.activeStyle == 0 ? this.styles.length - 1 : this.activeStyle - 1;
            this.activeAlgorithmName.innerText = this.styles[this.activeStyle][1];
        });
        const cycleText = document.createElement('td');
        cycleText.title = 'Change pixel render algorithm';
        cycleText.innerText = this.styles[this.activeStyle][1];
        this.activeAlgorithmName = cycleText;
        const cycleRow = document.createElement('tr');
        cycleRow.appendChild(cycleLeft);
        cycleRow.appendChild(cycleText);
        cycleRow.appendChild(cycleRight);

        this.buttonContainerTable = document.createElement('table');
        this.buttonContainerTable.className = 'corner-button-container-table active-corner'; // See CSS for styles
        this.buttonContainerTable.appendChild(rangeRow);
        this.buttonContainerTable.appendChild(offsetRow);
        this.buttonContainerTable.appendChild(cycleRow);

        return this.buttonContainerTable;
    }

    private static buildValueTableRow(startValue: string,  title: string, increment: ()=>string, decrement: ()=>string): HTMLTableRowElement {
        const value = document.createElement('td');
        value.innerText = startValue;
        value.title = title;

        const minus = document.createElement('td');
        minus.innerHTML = `<i class="fas fa-minus"></i>`;
        minus.addEventListener('click', () => {value.innerText = decrement(); });
        minus.title = title;

        const plus = document.createElement('td');
        plus.innerHTML = `<i class="fas fa-plus"></i>`;
        plus.addEventListener('click', () => {value.innerText = increment(); });
        plus.title = title;

        const container = document.createElement('tr');
        container.appendChild(minus);
        container.appendChild(value);
        container.appendChild(plus);

        return container;
    }
}
