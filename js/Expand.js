AFRAME.registerComponent('expand',{
    schema: {
        mouseIsInside: {type:'string',default:'none'},
        ids: {type:'array',default:[]},
        selectedItemId : {type:'string',default:''}
    },
    handleClick: function() {
        this.el.addEventListener('click',e=>{
            const container = document.querySelector('#places-container');
            const {state} = container.getAttribute('tour');
            if(state=='places-list') {
                const id = e.path[1].id;
                console.log(id);
                const ids = this.data.ids;
                if(ids.includes(id)) {
                    container.setAttribute('tour',{
                        state: 'view',
                        selectedCard: id
                    });
                }
            }
        });
    },
    init: function() {
        var children = this.el.children;
        for(child of children) {
            this.data.ids.push(child.id);
        }
        this.handleClick();
        for(child of children) {
            addEventListener('mouseenter',e=>{
                if(e.path[1].id!='camera' && e.path[1].id!='places-container') {
                    this.data.mouseIsInside = e.path[1].id;
                }
            });
            addEventListener('mouseleave',e=>{
                this.data.mouseIsInside = 'none';
                this.resetAll();
            });
        }
    },
    tick: function() {
        if(this.data.mouseIsInside!=='none') {
            const entity = document.querySelector(`#${this.data.mouseIsInside}`);
            entity.setAttribute('material',{
                color: 'red',
                opacity: 1
            });
            entity.setAttribute('geometry',{
                radiusInner: 10,
                radiusOuter: 12
            });
            entity.firstChild.setAttribute('geometry',{
                radius: 10
            });
        };
    },
    resetAll: function() {
        for(id of this.data.ids) {
            var entity = document.querySelector(`#${id}`)
            entity.setAttribute('material',{
                color: 'orange',
                opacity: 0.7
            });
            entity.setAttribute('geometry',{
                radiusInner: 9,
                radiusOuter: 10
            });
            entity.firstChild.setAttribute('geometry',{
                radius: 9
            });
        };
    }
});