
class DraggableBehaviorArchitect {

    /**
     * 
     * @var {String[]}
     */
    static get BORDERS_SIDE() {
        return [
            'top',
            'bottom',
            'left',
            'right'
        ];
    }

    architect(oElement) {
        this.#createDraggableBorders(oElement);
        return this;
    }

    onDragStart(oEvent) {
        this.createDragStartEvent(oEvent.target);
    }
    
    createDragStartEvent(oElement) {
        oElement.classList.add('dragging');
    }

    onDragEnd(oEvent) {
        this.createDragEndEvent(oEvent.target);
    }
    
    createDragEndEvent(oElement) {
        oElement.classList.remove('dragging');
    }

    #createDraggableBorders(oElement) {
        DraggableBehaviorArchitect.BORDERS_SIDE
            .forEach(this.#createDraggableBorder.bind(this, oElement));
    }

    #createDraggableBorder(oElement, sSide) {
        const oBorder = document.createElement('div');
        oBorder.classList.add(`drag-border-${sSide}`);
        oElement.appendChild(oBorder);
        oBorder.addEventListener('dragstart', this.createDragStartEvent.bind(oElement));
        oBorder.addEventListener('dragend', this.createDragEndEvent.bind(oElement));
        return oBorder;
    }



}