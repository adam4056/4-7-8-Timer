class BreathTimer {
    constructor() {
        this.phases = [
            { name: 'Inhale', duration: 4, segments: 4 },
            { name: 'Hold', duration: 7, segments: 7 },
            { name: 'Exhale', duration: 8, segments: 8 }
        ];
        
        this.currentPhase = 0;
        this.timeLeft = this.phases[0].duration;
        this.isRunning = false;
        this.interval = null;
        
        this.breathText = document.getElementById('breathText');
        this.timer = document.getElementById('timer');
        this.progressBar = document.getElementById('progressBar');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.cyclesInput = document.getElementById('cyclesInput');
        this.cycleInfo = document.getElementById('cycleInfo');
        
        this.initializeEventListeners();
        this.createProgressBar();
        this.updateDisplay();

        this.totalCycles = Math.max(1, parseInt(this.cyclesInput.value || '1', 10));
        this.currentCycle = 1;
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.cyclesInput.addEventListener('change', () => {
            const value = Math.max(1, parseInt(this.cyclesInput.value || '1', 10));
            this.totalCycles = value;
            this.cyclesInput.value = String(value);
            if (!this.isRunning) {
                this.currentCycle = 1;
                this.updateDisplay();
            }
        });
    }
    
    createProgressBar() {
        const maxSegments = Math.max(...this.phases.map(p => p.segments));
        this.progressBar.innerHTML = '';
        
        for (let i = 0; i < maxSegments; i++) {
            const segment = document.createElement('div');
            segment.className = 'segment empty';
            segment.style.width = '20px';
            segment.style.height = '60px';
            this.progressBar.appendChild(segment);
        }
        
        // Initialize with first phase segments
        this.updateProgressBar();
    }
    
    updateProgressBar() {
        const segments = this.progressBar.children;
        if (!segments || segments.length === 0) {
            return;
        }
        const currentPhaseData = this.phases[this.currentPhase];
        const totalSegments = currentPhaseData.segments;
        
        // Calculate how many segments should be filled based on remaining time
        // Segments should be filled from left to right as time progresses
        const filledSegments = totalSegments - this.timeLeft;
        
        // Hide all segments first
        for (let i = 0; i < segments.length; i++) {
            segments[i].style.display = 'none';
        }
        
        // Show and update segments for current phase
        for (let i = 0; i < totalSegments; i++) {
            segments[i].style.display = 'block';
            if (i < filledSegments) {
                segments[i].className = 'segment filled';
            } else {
                segments[i].className = 'segment empty';
            }
        }
    }
    
    updateDisplay() {
        const currentPhaseData = this.phases[this.currentPhase];
        this.breathText.textContent = currentPhaseData.name;
        this.timer.textContent = this.timeLeft;
        this.updateProgressBar();
        if (this.cycleInfo) {
            this.cycleInfo.textContent = `Cycle ${this.currentCycle} / ${this.totalCycles}`;
        }
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;

        this.cyclesInput.disabled = true;
        // Toggle buttons: hide Start, show Reset
        this.startBtn.classList.add('hidden');
        this.resetBtn.classList.remove('hidden');
        
        this.interval = setInterval(() => {
            this.timeLeft--;

            if (this.timeLeft <= 0) {
                // Show 0 for the last second, then move on immediately
                this.timer.textContent = 0;
                this.updateProgressBar();
                this.nextPhase();
                return;
            }

            this.updateDisplay();
        }, 1000);
    }
    
    reset() {
        this.isRunning = false;
        this.currentPhase = 0;
        this.timeLeft = this.phases[0].duration;
        this.currentCycle = 1;
        
        clearInterval(this.interval);
        
        this.cyclesInput.disabled = false;
        // Toggle buttons: show Start, hide Reset
        this.startBtn.classList.remove('hidden');
        this.resetBtn.classList.add('hidden');
        
        this.breathText.textContent = 'Click Start';
        this.updateDisplay();
    }
    
    nextPhase() {
        this.currentPhase++;
        
        // Check if we've completed all phases
        if (this.currentPhase >= this.phases.length) {
            // Completed one full breathing cycle
            this.currentPhase = 0;
            this.currentCycle++;
            if (this.currentCycle > this.totalCycles) {
                // All requested cycles finished
                this.timeLeft = this.phases[0].duration;
                this.isRunning = false;
                this.cyclesInput.disabled = false;
                // Toggle buttons: show Start, hide Reset
                this.startBtn.classList.remove('hidden');
                this.resetBtn.classList.add('hidden');
                clearInterval(this.interval);
                this.breathText.textContent = 'Done! Click to repeat';
                this.updateDisplay();
                return;
            }
            // Start next cycle automatically
            this.timeLeft = this.phases[0].duration;
            this.updateDisplay();
            return;
        }
        
        // Move to next phase
        this.timeLeft = this.phases[this.currentPhase].duration;
        this.updateDisplay();
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    new BreathTimer();
}); 