AFRAME.registerComponent('expand',{
    schema: {
        mouseIsInside: {type:'string',default:'none'},
        ids: {type:'array',default:[]}
    },
    init: function() {
        var children = this.el.children;
        for(child of children) {
            this.data.ids.push(child.id);
            child.addEventListener('mouseenter',e=>{
                this.data.mouseIsInside = child.id;
            });
        }
    },
    tick: function() {
        console.log(this.data.mouseIsInside);
    }
});