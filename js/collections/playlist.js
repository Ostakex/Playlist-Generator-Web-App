  var app = app || {};

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  app.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#playlistapp',

    // New
    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'keypress #new-todo': 'createOnEnter',
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      this.$input = this.$('#new-playlist');
      this.$footer = this.$('#footer');
      this.$main = this.$('#main');

      this.listenTo(app.Playlist, 'add', this.addOne);
      this.listenTo(app.Playlist, 'reset', this.addAll);

      // New
      this.listenTo(app.Playlist, 'change:completed', this.filterOne);
      this.listenTo(app.Playlist,'filter', this.filterAll);
      this.listenTo(app.Playlist, 'all', this.render);

      app.Playlist.fetch();
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function( playlist ) {
      var view = new app.TodoView({ model: todo });
      $('#playlist-list').append( view.render().el );
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.$('#playlist-list').html('');
      app.Playlist.each(this.addOne, this);
    },

    // New
    filterOne : function (playlist) {
      todo.trigger('visible');
    },

    // New
    filterAll : function () {
      app.Playlist.each(this.filterOne, this);
    },


    // New
    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        title: this.$input.val().trim(),
        order: app.Todos.nextOrder(),
        completed: false
      };
    },

    // New
    // If you hit return in the main input field, create new Todo model,
    // persisting it to localStorage.
    createOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
        return;
      }

      app.Playlist.create( this.newAttributes() );
      this.$input.val('');
    }
  });