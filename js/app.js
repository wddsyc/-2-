(function () {
  let app = {
    LOCAL_STORAGE_KEY: `wddsyc-notes`,//localstorage的key值

    init() {
      this.notes = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) || [];//notes的内容来自app.local...key里面的值转化为数组。
      this.selectedIndex = null; //用来选择note
      this.$el = document.querySelector(`.app`);
      this.$el.addEventListener(`click`, this, false);
      this.$main = this.$el.querySelector(`.main-view`);
      this.$note = this.$el.querySelector(`.note-view`);
      this.$notes = this.$main.querySelector(`.notes`);
      this.$trash = this.$note.querySelector(`.nav-btn-trash`);
      this.$editor = this.$note.querySelector(`.editor`);
      this.render();
    },

    home() {
      this.$main.classList.remove(`goset`);
      this.$main.classList.add(`gonotes`);
    },
    set() {
      this.$main.classList.remove(`gonotes`);
      this.$main.classList.add(`goset`);
    },
    add() {
      this.selectedIndex = null;
      this.$trash.style.visibility = `hidden`;
      this.$note.classList.add(`push`);
    },
    alter(target) {
      this.selectedIndex=target.dataset.index;
      this.$trash.style.visibility = `visible`;
      this.$editor.value = this.notes[this.selectedIndex].text;
      this.$note.classList.add(`push`);
    },
    repush() {
      if((this.selectedIndex === null) && this.$editor.value.length>0){ //添加note 1.有内容添加到notes 2，没内容直接退出
        this.notes.push({text:this.$editor.value})
      };
      if((this.selectedIndex === null) && this.$editor.value.length ===0){
        return this.depush();
      };
      if((this.selectedIndex !== null) && this.$editor.value.length===0){
        this.notes.splice(this.selectedIndex,1);
      };
      if((this.selectedIndex !== null) && this.$editor.value.length>0){  //修改note 1，有内容修改notes 2，没内容删除该note
        this.notes[this.selectedIndex].text = this.$editor.value;
      };
      this.save();
      this.render();
      this.$editor.value=``;
      this.depush();
    },
    depush(){
      this.$note.classList.remove(`push`);
    },
    save() {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.notes));
    },
    render(){
      this.$notes.innerHTML = this.notes.map((note,i)=>`<div class='note' data-index=${i}>${note.text}</div>`).join(``)
    },
    trash() {
      this.notes.splice(this.selectedIndex,1);
      this.save();
      this.render();
      this.$editor.value=``;
      this.depush();
    },

    handleEvent(event) {
      let target = event.target;
      switch(true) {
        case target.matches(`.add-note`)||target.parentElement.matches(`.add-note`):this.add();
        break;
        case target.matches(`.note`):this.alter(target);
        break;
        case target.matches(`.fanHui`):this.repush();
        break;
        case target.matches(`.laJi`):this.trash();
        break;      }
    },
  };


  document.addEventListener(`DOMContentLoaded`,function(){
    app.init();
  });
  window.app = app;
})()





















