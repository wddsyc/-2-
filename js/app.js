(function(){
  let app = {
    LOCAL_STORAGE_KEY : `wddsyc`,

    init() {
      this.notes = [{text:"伟大的四叶草"},{text:"wddscy"}];  
      this.noteindex = null;
      this.$el = document.querySelector(`.app`);
      this.$el.addEventListener(`click`,this,false);
      this.$mainv = this.$el.querySelector(`.main-view`);
      this.$notev = this.$el.querySelector(`.note-view`);
      this.$editor = this.$el.querySelector(`.editor`);
      this.$notes = this.$mainv.querySelector(`.notes`);
      this.$trash = this.$notev.querySelector(`.nav-btn-trash`);
      this.render();
    },

    handleEvent(event) {
      let target = event.target;
      switch(true) {
        case target.matches(`.sheZhi`):this.goset();
        break;
        case target.matches(`.sanGang`):this.gonotes();
        break;
        case target.matches(`.note`) || target.matches(`.add-note`) || target.parentElement.matches(`.add-note`): this.gonote(target);
        break;
        case target.matches(`.fanHui`): this.gomainv();
        break;
        
      }
    },

    goset() {
      this.$mainv.classList.remove(`gonotes`);
      this.$mainv.classList.add(`goset`);
    },
    gonotes() {
      this.$mainv.classList.remove(`goset`);
      this.$mainv.classList.add(`gonotes`);
    },
    gonote(event){
      this.noteindex = event.dataset.index;
      this.$editor.value = this.notes[this.noteindex].text;
      this.$notev.classList.add(`push`);
      if(!event.matches(`.note`)){
        this.$trash.style.visibility = `hidden`;
      }
    },
    gomainv() {
      this.notes[this.noteindex].text = this.$editor.value;
      this.render();
      this.$notev.classList.remove(`push`);
    },
    render() {
      this.$notes.innerHTML = this.notes.map((note,i)=>`<div class="note"data-index=${i}>${note.text}</div>`).join(``)
    }

  };

  document.addEventListener(`DOMContentLoaded`,function(){
    app.init();
  })

  window.app = app;
})()























