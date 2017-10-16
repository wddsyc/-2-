(function(){
  let app = {
    LOCAL_STORAGE_KEY : `wddsyc`,

    init() {
      this.notes = [{text:"进入note时分为直接和带入原内容以及索引进入"},{text:"进入main时分为在原来内容上修改和新增内容"}];  
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
        case target.matches(`.note`): this.gonote(target);
        break;
        case target.matches(`.add-note`) || target.parentElement.matches(`.add-note`):this.add();
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
    add() {
      this.$notev.classList.add(`push`); 
      this.$trash.style.visibility = `hidden`;
    },
    gonote(event){
      this.noteindex = event.dataset.index;
      this.$editor.value = this.notes[this.noteindex].text;
      this.$notev.classList.add(`push`);
    },
    gomainv() {
      if(this.noteindex === null && this.$editor.value.length>0){
        this.notes.push({text:this.$editor.value});
      };
      if(this.noteindex !==null){
        this.notes[this.noteindex].text = this.$editor.value;
      }
      this.render();
      this.$editor.value = "";
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