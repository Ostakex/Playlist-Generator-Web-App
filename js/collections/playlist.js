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

    comparator: function( playlist ) {
      return playlist.get('playlist');
    }
  });

  app.Playlist = new PlaylistList();