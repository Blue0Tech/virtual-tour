AFRAME.registerComponent("tour", {
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
    
  },
  schema: {
    state: {type:'string',default:'places-list'},
    selectedCard: {type:'string',default:'#card1'}
  },
  hideElement: function(elList) {
    elList.map(el=>{
      el.setAttribute('visible',false);
    });
  },
  showView: function() {
    const sky = document.querySelector('#main-container');
    const {selectedCard} = this.data;
    sky.setAttribute('material',{
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: 'white'
    });
  },
  tick: function() {
    const {state} = this.el.getAttribute('tour');
    if(state=='view') {
      this.hideElement([this.placesContainer]);
      this.showView();
    }
  },
  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png",
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg",
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.jpg",
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      const borderEl = this.createBorder(position,item.id);
      
      const TN = this.createThumbnailRef(item);
      borderEl.appendChild(TN);
     
      const titleEl = this.createTitle(position,item);
      borderEl.appendChild(titleEl);
      
      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function(position,id) {
    const entityElement = document.createElement('a-entity');
    entityElement.setAttribute('id',id);
    entityElement.setAttribute('position',position);
    entityElement.setAttribute('visible',true);
    entityElement.setAttribute('geometry',{
      primitive:'ring',
      radiusInner: 9,
      radiusOuter: 10
    });
    entityElement.setAttribute('material',{
      color: 'orange',
      opacity: 0.7
    });
    return entityElement;
  },
  createThumbnailRef: function(item) {
    const entityElement = document.createElement('a-entity');
    entityElement.setAttribute('visible',true);
    entityElement.setAttribute('geometry',{
      primitive: 'circle',
      radius: 9
    });
    entityElement.setAttribute('material',{
      src: item.url
    });
    return entityElement;
  },
  createTitle: function(position,item) {
    const entityElement = document.createElement('a-entity');
    entityElement.setAttribute('text',{
      font: 'exo2bold',
      align: 'center',
      width: 60,
      color: 'red',
      value: item.title
    });
    position.y-=30;
    entityElement.setAttribute('position',position);
    entityElement.setAttribute('visible',true);
    return entityElement;
  }
});
