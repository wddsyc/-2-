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
      this.selectedIndex = null;//添加新的note的索引
      this.$note.classList.add(`push`);
      this.$trash.style.visibility = `hidden`;
    },
    push() {
      this.selectedIndex = event.target.dataset.index;
      this.$editor.value = this.notes[this.selectedIndex].text;
      this.$note.classList.add(`push`);
      this.$trash.style.visibility = `visible`;
    },
    back() {         
      if (this.selectedIndex === null && this.$editor.value.length > 0) {
        this.notes.push({ text: this.$editor.value });
      }                                                            //当新建一个note，notes中添加一组note
      if (this.selectedIndex !== null) {
        this.notes[this.selectedIndex].text = this.$editor.value;
      }                                                           //当编辑之前note，从notes中找note的索引，从而选中text,保存在notes中
      this.save();
      // this.clear();
      this.render();
      this.pop();
      //将保存在notes里的内容(notes是数组)保存到localStorage（保存的内容需要是字符串）,清空编辑区内容（），渲染将notes整个html复制到$notes
    },

    save() {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.notes))//
    },
    pop() {
      this.$note.classList.remove(`push`);
    },
    clear() {
      this.$editor.value = ``;
    },
    trash() {
      if (this.selectedIndex === null) return;
      if (!confirm(`确定删除本便签么`)) return;
      this.$editor.value = ``;
      this.notes.splice(this.selectedIndex,1);
      this.save();
      this.render();
      this.pop();
    },
    render() {
      this.$notes.innerHTML = this.notes.map((note, i) => `<div class='note' data-index='${i}'>${note.text}</div>`).join(``)
    },

    handleEvent(event) {
      let target = event.target;
      switch (true) {
        case target.matches(`.sanGang`): this.home();
          break;
        case target.matches('.fa.fa-gear'):
          this.set();
          break;
        case target.matches('.note'):
          this.push(event);
          break;
        case target.matches('.add-note') || target.parentElement.matches('.add-note'):
          this.add();
          break;
        case target.matches('.nav-btn-back'):
          this.back(event);
          break;
        case target.matches('.nav-btn-trash'):
          this.trash(event);
          break;
      }
    }
  };
  document.addEventListener(`DOMContentLoaded`,function(){
    app.init();
  });
  window.app = app;
})()