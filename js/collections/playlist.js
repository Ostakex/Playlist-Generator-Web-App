 var app = app || {};

  var PlaylistList = Backbone.Collection.extend({

    model: app.Playlist,

    localStorage: new Backbone.LocalStorage('playlist-backbone'),

    remaining: function() {
      return this.without.apply( this, this.completed() );
    },

    nextOrder: function() {
      if ( !this.length ) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function( playlist ) {
      return playlist.get('playlist');
    }
  });

  // Create our global collection of **Todos**.
  app.Playlist = new PlaylistList();