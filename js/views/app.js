  var app = app || {};

  app.AppView = Backbone.View.extend({

    el: '#playlistapp',

    events: {
      'keypress #new-todo': 'createOnEnter',
    },

    initialize: function() {
      this.$input = this.$('#new-playlist');
      this.$footer = this.$('#footer');
      this.$main = this.$('#main');

      this.listenTo(app.Playlist, 'add', this.addOne);
      this.listenTo(app.Playlist, 'reset', this.addAll);

      // New
      this.listenTo(app.Playlist,'filter', this.filterAll);
      this.listenTo(app.Playlist, 'all', this.render);

      app.Playlist.fetch();
    },

    addOne: function( playlist ) {
      var view = new app.TodoView({ model: todo });
      $('#playlist-list').append( view.render().el );
    },

    addAll: function() {
      this.$('#playlist-list').html('');
      app.Playlist.each(this.addOne, this);
    },

    filterOne : function (playlist) {
      todo.trigger('visible');
    },

    filterAll : function () {
      app.Playlist.each(this.filterOne, this);
    },


    newAttributes: function() {
      return {
        title: this.$input.val().trim(),
        order: app.Todos.nextOrder(),
        completed: false
      };
    },

    createOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
        return;
      }

      app.Playlist.create( this.newAttributes() );
      this.$input.val('');
    }
  });